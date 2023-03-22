import React from "react";
import { Box, Typography, Avatar, Chip, Fab } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AddIcon from "./addbutton";
import Createpost from "./createpost";
import Post from "./post";
import { useParams } from "react-router-dom";

function ExampleUI() {
  console.log("in example ui of the opensubgreddit");
  console.log(useParams().id);
  const [subgredditposts, setsubgredditposts] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [open, setopen] = useState(false);
  const subgredditid = useParams().id;
  const [data, setData] = useState([]);
  const fabStyles = {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
  };
  console.log(subgredditid);
  useEffect(() => {
    const fetchsubgredditposts = async () => {
      try {
        const response = await axios.get(
          `/api/allsubgreddits/posts/${subgredditid}`
        );
        setsubgredditposts(response.data, "subgredditposts");
        setloaded(true);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchsubgredditposts();
  }, []);

  // get details of the subgreddit from the backend refer /backned/routes/allsubgreddits.js
  useEffect(() => {
    const fetchsubgredditdetails = async () => {
      try {
        const response = await axios.get(
          `/api/allsubgreddits/getsubgredditdetails/${subgredditid}`
        );
        setData(response.data);
        setloaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchsubgredditdetails();
  }, []);

  const handlecreateClick = () => {
    // Call any function you want here
    setopen(!open);
  };
  // const numposts = data.Posts.
  // get lenght of the posts array in data
  const numposts = data.Posts ? data.Posts.length : 0;
  return loaded ? (
    <>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          alt="User Image"
          // give source as random image from unsplash
          src = {`https://source.unsplash.com/random/200x200?sig=${Math.floor(Math.random() * 1000)}`}
          sx={{ width: 200, height: 200 }}
        />
        <Box>
          <Typography variant="h4" component="h1">
            {data.title}
          </Typography>
          <Typography variant="body1" component="p">
            {data.Description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip label={numposts + "-  posts"} />
            <Chip label={"created on: " + data.date} />
            <Chip label={"Bannedwords: " + data.BannedWords} />
          </Box>
        </Box>
      </Box>
      {/* sending the posts to Post as props */}
      <Box display="flex" flexDirection="column" gap={2} mt={10} maxWidth={600}>
        {subgredditposts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Box>
      <Fab
        sx={fabStyles}
        color="primary"
        aria-label="add"
        onClick={handlecreateClick}
      >
        <AddIcon />
      </Fab>
      <Createpost open={open} onClose={handlecreateClick}  bannedwords = {data.BannedWords} totalposts = {subgredditposts} totalpostsfun = {setsubgredditposts}/>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default ExampleUI;
