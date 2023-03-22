import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
function PostDialog(props) {
  const [postText, setPostText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const idofsubgreddit = useParams().id;

  const handlePostTextChange = (event) => {
    const text = event.target.value;
    setPostText(text);
    setSubmitDisabled(text.trim().length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subgreddit = idofsubgreddit;
    const post = {
      Content: postText,
      PostedBy: localStorage.getItem("userid"),
    };
    // make a post request to create a post
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `/api/regposts/uploadpost/${subgreddit}/`,
          post
        );
        const data = await res.data;
        console.log(data);
        props.totalpostsfun([...props.totalposts, data]);
        props.onClose();
      } catch (err) {
        console.log(err);
      }
    };
    const words = postText.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (props.bannedwords.includes(words[i])) {
        alert("Your post contains banned words. Please remove them and try again.");
        fetchData();
        break;
      }
      else
      {
        fetchData();
        break;
      }
    }
    
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="What's on your mind?"
          value={postText}
          onChange={handlePostTextChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={submitDisabled}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostDialog;
