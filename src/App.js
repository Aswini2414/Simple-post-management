import { useState,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from "@mui/material/InputBase";
import Posts from './Posts';
import './App.css';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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
  fontSize: "2rem",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));


function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getApiData("https://jsonplaceholder.typicode.com/posts");
  }, []);

  const getApiData = async (url) => {
    let response = await fetch(url);
    let apiData = await response.json();
    setData(apiData);
  }
  console.log(data);
  console.log(search);

  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log(id);
    setData(data.filter((post) => post.id !== id));
    
  };

  return (
    <>
    <Box>
      <AppBar>
        <Toolbar style={{ margin: "auto" }}>
          <Search>
            <SearchIconWrapper>
                <SearchIcon style={{fontSize:"3rem"}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e)=>setSearch(e.target.value)}
              />
          </Search>
        </Toolbar>
      </AppBar>
      </Box>
      <Posts data={data} search={search} handleDelete={handleDelete} />
  </>
  );
}

export default App;
