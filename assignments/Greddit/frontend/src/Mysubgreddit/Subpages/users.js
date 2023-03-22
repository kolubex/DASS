import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function statusColor(status) {
  switch (status) {
    case "moderator":
      return "primary";
    case "blocked":
      return "secondary";
    case "unblocked":
      return "default";
    default:
      return "default";
  }
}

function renderStatus(status) {
  const color = statusColor(status);
  const label = status.toUpperCase();
  return <Chip label={label} color={color} />;
}

function renderUser(user) {
  const { name, status } = user;
  const avatar = <Avatar>{name[0]}</Avatar>;
  return (
    <TableRow key={name}>
      <TableCell align="left">{avatar}</TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{renderStatus(status)}</TableCell>
    </TableRow>
  );
}

function UsersTable() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  // get the users of the given subgreddit id sent in params
  useEffect(() => {
    const fetchUsers = async () => {
      // get id from the present url in form - /mysubgreddits/:id using params
      const response = await axios.get(
        `/api/mysubgreddits/sendusers/${id}/`
      );
      setUsers(response.data);
      console.log(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{users.map(renderUser)}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
