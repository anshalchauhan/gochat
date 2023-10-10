// Web Framework for Node.js
const express = require("express");

// HTTP request logger middleware for node.js
const morgan = require("morgan");

// Cross Origin Resource Sharing
const cors = require("cors");

// Security middlewares

// To limit repeated requests to public APIs and/or endpoints
const rateLimit = require("express-rate-limit");

// Helmet helps secure Express apps by setting HTTP response headers.
const helmet = require("helmet");

// Data Sanitization
const mongoSanitize = require("express-mongo-sanitize");

// Sanitize untrusted HTML to prevent XSS attacks.
const xss = require("xss-clean");

// Body Parser
// const bodyParser = require("body-parser");

// Global Error Handler
const globalErrorHandler = require("./controllers/errorController");

// AppError class
const AppError = require("./utils/appError");

// Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewares

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// app.use("/gochat", limiter);
app.use(limiter);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mongoSanitize());
app.use(xss());

// Routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
