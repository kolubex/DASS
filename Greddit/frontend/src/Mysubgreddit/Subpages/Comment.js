import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";



function CommentsDialog({ props }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleAddComment = () => {
    // Add the new comment to the comments array
    comments.push({
      username: "You",
      comment: newComment,
    });
  
    // Reset the new comment input
    setNewComment("");
  
    // Close the dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Comments</DialogTitle>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={comment.comment}
              secondary={`By ${comment.username}`}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="Add Comment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
        margin="normal"
        fullWidth
      />
      <Button variant="contained" onClick={handleAddComment}>
        Submit
      </Button>
    </Dialog>
  );
}

export default CommentsDialog;
