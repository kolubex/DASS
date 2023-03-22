import React from "react";
import { Box, Typography, Avatar, Chip, Fab } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Post from "./cardgrid";

function SavedPosts() {
  const id = localStorage.getItem("userid");
  const [savedposts, setsavedposts] = useState([]);
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    const fetchsavedposts = async () => {
      try {
        const response = await axios.get(
          "/api/savedposts/" + id
        );
        setsavedposts(response.data);
        console.log(response.data);
        setloaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchsavedposts();
  }, []);

  return loaded ? (
    <>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h4" component="h1">
          SavedPosts
        </Typography>
        <Typography variant="body1" component="p">
          {savedposts.length} posts
        </Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {savedposts.map((post) => (
          <Post post={post} />
        ))}
      </Box>
    </>
  ) : (
    <Typography variant="h4" component="h1">
      Loading...
    </Typography>
  );
}

export default SavedPosts;