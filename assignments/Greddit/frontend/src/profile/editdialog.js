import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

const UserDetailsDialog = ({ isOpen, onClose }) => {
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Email, setEmailId] = useState("");
  const [Password, setPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [Age, setAge] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      FirstName.trim() !== "" &&
      LastName.trim() !== "" &&
      UserName.trim() !== "" &&
      Email.trim() !== "" &&
      Password.trim() !== "" &&
      Contact.trim() !== "" &&
      Age.trim() !== ""
    );
  }, [FirstName, LastName, UserName, Email, Password, Contact, Age]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/signin/", {
        LastName,
        FirstName,
        UserName,
        Email,
        Password,
        Contact,
        Age,
      });
      console.log(response.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          fullWidth
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Last Name"
          fullWidth
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="User Name"
          fullWidth
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email Id"
          fullWidth
          value={Email}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          fullWidth
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Contact"
          fullWidth
          value={Contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Age"
          fullWidth
          value={Age}
          onChange={(e) => setAge(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!isFormValid}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
