import axios from "axios";
import { useEffect, useState } from "react";
import CreateSubgreddit from "./createsubgreddit";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardGrid from "./cardgrid";
import { Box } from "@mui/system";
// This file is to show ones subgreddits and to create subgreddits
export default function MySubgreddit() {
  const [subgreddits, setSubgreddits] = useState([]);
  const [loaded, setloaded] = useState(true);
  const [open, setopen] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "/api/mysubgreddits/" + token
        );
        const data = await res.data;
        console.log(data);
        setSubgreddits(data);
        setloaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const fabStyles = {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
  };
  const handlecreateClick = () => {
    // Call any function you want here
    setopen(!open);
  };
  
  return (
    <>
      {loaded ? (
        <>
          <h1>My Subgreddits</h1>
          <Box display="flex" justifyContent="center" mb={4}>
            <CardGrid numColumns={3} cards={subgreddits} />
          </Box>
          {/* call Cardgrid with subgreddits as props */}
          {/* <CardGrid subgreddits={subgreddits} /> */}
          <Fab
            sx={fabStyles}
            color="primary"
            aria-label="add"
            onClick={handlecreateClick}
          >
            <AddIcon />
          </Fab>
          <CreateSubgreddit open={open} onClose={handlecreateClick} substillnow = {subgreddits} substillnowfun ={setSubgreddits}  />
        </>
      ) : (
        "Loading"
      )}
    </>
  );
}
