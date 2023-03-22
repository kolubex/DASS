import React, { useState } from "react";
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
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Reportpost from "./createreport";

function Post(props) {
  // const { post, savedpoststillnow, savedpostsfun} = props;
  const { post } = props;
  console.log(post);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [open, setOpen] = useState(false);




  const handleLikeClick = async () => {
    setLiked(!liked);
    setDisliked(false);
    // refer the backend1/routes/Posts.js and make a post request to the backend
    if (!liked) {
      const likefun = async () => {
        try {
          const response = await fetch(
            "/api/regposts/upvote/" + post._id,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: localStorage.getItem("userid"),
              }),
            }
          );
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
        const response = await fetch(
          "/api/regposts/downvote/" + post._id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: localStorage.getItem("userid"),
            }),
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    dislikefun();
  };

  const handleFollowClick = async () => {
    setFollowed(!followed);
    // handle follow button click
    // send a post request with post.postby in params and localStorage.getItem("userid") in body
    const followfun = async () => {
      try {
        const res = await axios.post(
          "/api/regposts/follow/" + post.PostedBy,
          {
            id: localStorage.getItem("userid"),
          }
        );
        if(res.data !== "followed")
        {
          alert("You are already following this user")
        }

      } catch (err) {
        console.log(err);
      }
    };
    followfun();
  };

  const handleCommentClick = () => {
    // handle comment button click
    // easy di or optimised di
    
  };
  const handleReportClick = () => {
    setOpen(!open);
  };

  const handledeleteClick = async () => {
    // send a request to remove the post from saved posts list of the user
    const deletefun = async () => {
      try {
        const res = await axios.post(
          "/api/savedposts/delete/" + post._id,
          {
            id: localStorage.getItem("userid"),
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    deletefun();
    // props.savedpostsfun(...props.savedpoststillnow.filter((item) => item._id !== post._id));
  };

  return (
    // {props.posts
    <Card>
      <CardHeader title={post.Content} />
      <CardContent>
        <Typography variant="body1">{post.username}</Typography>
        <Typography variant="body2">{post.subgredditname}</Typography>
      </CardContent>
      <IconButton aria-label="delete" onClick={handledeleteClick}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="comment" onClick={handleCommentClick}>
        <AddCommentIcon />
      </IconButton>
      <IconButton aria-label="like" onClick={handleLikeClick}>
        {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </IconButton>
      <IconButton aria-label="like" onClick={handleDislikeClick}>
        {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
      </IconButton>
      <IconButton aria-label="follow" onClick={handleFollowClick}>
        <PersonAddAlt1Icon />
      </IconButton>
      <IconButton></IconButton>
      <IconButton aria-label="report" onClick={handleReportClick}>
        <ReportIcon />
      </IconButton>
      <Reportpost open = {open} onClose = {handleReportClick} postid = {post._id}/>
    </Card>
    // }
  );
}

export default Post;
