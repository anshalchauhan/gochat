// MUI
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

const ElementWrapper = ({ onClick, children, isSelected }) => {
  // Style
  const boxStyle = {
    width: "100%",
    height: 60,
    borderRadius: 1,
    backgroundColor: (theme) =>
      isSelected
        ? theme.palette.mode === "light"
          ? alpha(theme.palette.primary.main, 0.5)
          : theme.palette.primary.main
        : theme.palette.mode === "light"
        ? "#fff"
        : alpha(theme.palette.background.default, 1),
  };

  return (
    <Box p={1} sx={boxStyle} onClick={onClick}>
      {children}
    </Box>
  );
};

export default ElementWrapper;
