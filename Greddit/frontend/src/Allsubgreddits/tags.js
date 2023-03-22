// this function takes props from the allsubgreddits function and returns the handleTag function to the allsubgreddits function so that cards with the same tag can be displayed
import React from "react";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

function Tags({ handleTag }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/allsubgreddits/tags");
        setTags(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {tags.map((tag) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleTag(tag)}
          >
            {tag}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Tags;