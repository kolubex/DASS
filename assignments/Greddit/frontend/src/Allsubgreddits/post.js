import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ReportIcon from "@mui/icons-material/Report";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Reportpost from "./createreport";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";
function Post(props) {
  const { post } = props;
  console.log(post);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const handleOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  
  // useeffect to check if the post is liked or disliked by the user 
  // refer the backend1/routes/Posts.js and make a get request to the backend
  useEffect(() => {
    const checkfun = async () => {
      try {
        const fetchfun = async () => {
          const response = await axios.get(
            "/api/regposts/comment/" + post._id,
          );
          setComments(response.data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    checkfun();
  }, []);        

  const handleLikeClick = async () => {
    setLiked(!liked);
    setDisliked(false);
    // refer the backend1/routes/Posts.js and make a post request to the backend
    if (!liked) {
      const likefun = async () => {
        try {
          const response = await fetch("/api/regposts/upvote/" + post._id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: localStorage.getItem("userid"),
            }),
          });
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      likefun();
    }
  };

  // similarly for downvote
  const handleDislikeClick = async () => {
    setDisliked(!disliked);
    setLiked(false);
    const dislikefun = async () => {
      try {
        const response = await fetch("/api/regposts/downvote/" + post._id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("userid"),
          }),
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    dislikefun();
  };

  const handleSaveClick = () => {
    // create a post request to save the post in the user's saved posts list in the backend
    // refer the backend1/routes/posts.js
    const savefun = async () => {
      try {
        const res = await axios.post("/api/regposts/save/" + post._id, {
          id: localStorage.getItem("userid"),
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    savefun();
  };

  const handleFollowClick = async () => {
    setFollowed(!followed);
    // handle follow button click
    // send a post request with post.postby in params and localStorage.getItem("userid") in body
    const followfun = async () => {
      try {
        const res = await axios.post("/api/regposts/follow/" + post.PostedBy, {
          id: localStorage.getItem("userid"),
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    followfun();
  };

  const handlecomment = () => {
    // send a post request to the backed to add a comment with postid in params and comment in body and user in body
    // refer the backend1/routes/posts.js
    const addcommentfun = async () => {
      console.log(newComment);
      try {
        const res = await axios.post("/api/regposts/comment/" + post._id, {
          comment: newComment,
          user: localStorage.getItem("userid"),
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    addcommentfun();
  };

  const handleReportClick = () => {
    setOpen(!open);
  };


  return (
    <Card>
      <CardHeader title={post.Title} subheader={post.username} />
      <CardContent>
        <Typography variant="body1">{post.Content}</Typography>
      </CardContent>
      <IconButton aria-label="comment" onClick={handleOpen}>
        <AddCommentIcon />
      </IconButton>
      <Dialog open={open1} onClose={handleClose}>
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
          <Button variant="contained" onClick={handlecomment}>
            Submit
          </Button>
        </Dialog>
      <IconButton aria-label="like" onClick={handleLikeClick}>
        {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <IconButton aria-label="like" onClick={handleDislikeClick}>
        {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
      </IconButton>
      <IconButton aria-label="save" onClick={handleSaveClick}>
        {<BookmarkAddIcon />}
      </IconButton>
      <IconButton aria-label="follow" onClick={handleFollowClick}>
        <PersonAddAlt1Icon />
      </IconButton>
      <IconButton aria-label="report" onClick={handleReportClick}>
        <ReportIcon />
      </IconButton>
      <Reportpost open={open} onClose={handleReportClick} postid={post._id} />
    </Card>
  );
}

export default Post;