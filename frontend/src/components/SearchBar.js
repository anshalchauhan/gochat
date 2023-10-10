import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const SearchBar = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <MagnifyingGlass color="#709CE6" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search..."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBar;
