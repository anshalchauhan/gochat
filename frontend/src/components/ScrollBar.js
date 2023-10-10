import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ScrollBar = styled(Box)(() => ({
  "&.scrollbar::-webkit-scrollbar": {
    width: 10,
    backgroundColor: "transparent",
  },

  "&.scrollbar::-webkit-scrollbar-thumb": {
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  "&.scrollbar:hover::-webkit-scrollbar-thumb": {
    borderRadius: 20,
    background: "#6c6b6b",
  },
}));

export default ScrollBar;
