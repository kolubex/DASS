import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
  TextField,
} from "@mui/material";
import axios from "axios";

function CreateSubredditDialog(props) {
  const [title, setTitle] = useState("");
  const [bannedWords, setBannedWords] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const { open, onClose, substillnow, substillnowfun } = props;
  // Disable create button until title and description are filled
  const isCreateDisabled = !(title && description);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleBannedWordsChange = (event) => setBannedWords(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const token = localStorage.getItem("token");

  const createsubgreddit = async (event) => {
    event.preventDefault();
    const post = {
      Title: title,
      Description: description,
      Members: localStorage.getItem("userid"),
      Moderator: localStorage.getItem("userid"),
      Tags: tags,
      BannedWords: bannedWords,
      Posts: [],
      token : token
    };
    const details = {
      id: localStorage.getItem("id"),
    };
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "/api/mysubgreddits/create/", post
        );
        const data = await res.data;
        console.log(data);
        substillnowfun([...substillnow, data]);
        onClose();
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
  const handleCanelClick = () => onClose();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Subreddit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the required details for your new subreddit.
        </DialogContentText>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="subreddit-title-input">Title*</InputLabel>
          <Input
            id="subreddit-title-input"
            value={title}
            onChange={handleTitleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="subreddit-banned-words-input">
            Banned Words
          </InputLabel>
          <Input
            id="subreddit-banned-words-input"
            value={bannedWords}
            onChange={handleBannedWordsChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="subreddit-banned-words-input">tags</InputLabel>
          <Input
            id="subreddit-banned-words-input"
            value={tags}
            onChange={handleTagsChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="subreddit-description-input"
            label="Description*"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleCanelClick}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isCreateDisabled}
          onClick={createsubgreddit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSubredditDialog;