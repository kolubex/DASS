// refer ./createreport.js and sugges similar thing this is for report
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
function Reportpost(props) {
    const {ope, close, postid} = props;
    const [reportText, setReportText] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleReportTextChange = (event) => {
    const text = event.target.value;
    setReportText(text);
    setSubmitDisabled(text.trim().length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reportfun = async () => {
      try {
        const res = await axios.post(
          "/api/regposts/report/" + postid,
          {
            id: localStorage.getItem("userid"),
            Concern: reportText,
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    reportfun();
    props.onClose();
  };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Report</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="What is the issue?"
                    value={reportText}
                    onChange={handleReportTextChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={submitDisabled}>
                    Report
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Reportpost;