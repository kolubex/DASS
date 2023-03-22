import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import axios from "axios";
import { useParams } from "react-router-dom";

function SubRequests() {

  const [users, setUsers] = React.useState([]);
  const [render, setRender] = React.useState(false);
  const id = useParams();
  console.log(id.id);
  // remove if any spaces are there in the id
  // get users from backend by passing the subgreddit id in params
  React.useEffect(() => {
    const getusers = async () => {
      try {
        const res = await axios.get(
          `/api/mysubgreddits/requests/${id.id}/`
        );
        console.log(res.data);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getusers();
  }, []);


  const handleThumbsUpClick = (userId, event) => {
    // send a post request to backend with status as accepted and user id and subgreddit id in params
    event.preventDefault();
    const sendrequest = async () => {
      try {
        const res = await axios.post(
          "/api/mysubgreddits/requeststatus/" +
          id.id,
          {
            id: userId,
            status: "1",
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    sendrequest();
    // pop it from the list of users and render the page again
    setUsers(users.filter((user) => user._id !== userId));
    setRender(!render);

  };

  const handleThumbsDownClick = (userId,event) => {
    // similar to above but with status as rejected
    event.preventDefault();
    const sendrequest = async () => {
      try {
        const res = await axios.post(
          "/api/mysubgreddits/requeststatus/" +
          id.id,
          {
            id: userId,
            status: "0",
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    sendrequest();
    setUsers(users.filter((user) => user._id !== userId));
    setRender(!render);
  };

  return (
    <div style={{ margin: "20px", justifySelf:"center"  }}>
      <TableContainer component={Paper} style={{ maxWidth: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Thumbs Up</TableCell>
            <TableCell>Thumbs Down</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.UserName}</TableCell>
              <TableCell>
                <IconButton
                  color="success"
                  onClick={(event) => handleThumbsUpClick(user._id,event)}
                >
                  <ThumbUpAltIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  onClick={(event) => handleThumbsDownClick(user._id,event)}
                >
                  <ThumbDownAltIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default SubRequests;
