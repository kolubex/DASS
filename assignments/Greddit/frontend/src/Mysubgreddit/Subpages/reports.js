import { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import ArchiveIcon from "@mui/icons-material/Archive";
import axios from "axios";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
function Reports() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [reports, setReports] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [deletebutton, setdeletebutton] = useState(false);
  const [blockbutton, setblockbutton] = useState(false);
  const [countdelteclicks, setcountdelteclicks] = useState(0);
  const [whichreport, setwhichreport] = useState(null);

  // sending a get request to get all the reports in a subgreddit
  const subgredditid = useParams();
  const subgredditid1 = subgredditid.id;
  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axios.get(
          `/api/reports/getreports/${subgredditid1}`
        );
        setReports(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReports();
  }, []);

  function nowdelete(id) {
    console.log("Hello World!");
    // function to delete report with given id from the database and from the subgreddit
    // post request to backend to delete the post from the subgreddit
    const deleteReport = async () => {
      try {
        const response = await axios.post(
          `/api/reports/deletepost/${subgredditid1}`,
          { id }
        );
        alert(response.message);
      } catch (err) {
        console.log(err);
      }
    };
    deleteReport();
  }

  const handleDeleteClick = async (id) => {
    // function to delete report with given id
    // give a counter on the button for 3 seconds and then delete the post
    setwhichreport(id);

    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setCountdown(null);
      nowdelete(id);
    }, 3000);
  };

  const handleBlockClick = (id) => {
    // function to block user with given id
    // post request to backed to add the abuser to the blocked list of the subgreddit
    const blockUser = async () => {
      try {
        const response = await axios.post(
          `/api/reports/blockuser/${subgredditid1}`,
          { id }
        );
        alert(response.message);
      } catch (err) {
        console.log(err);
      }
    };
    blockUser();
  };

  const handleIgnoreClick = (id) => {
    // function to ignore report with given id
    // disable both the delete and block button
    setdeletebutton(true);
    setblockbutton(true);
    setwhichreport(id);
    // post request to backend to change the status of the report to ignored
    const ignoreReport = async () => {
      try {
        const response = await axios.post(
          `/api/reports/ignorepost/${subgredditid1}`,
          { id }
        );
        alert(response.message);
      } catch (err) {
        console.log(err);
      }
    };
    ignoreReport();
  };

  // categorize reports into to list status-> pending one list , and other list
  const pendingReports = reports.filter(
    (report) => report.status === "pending"
  );
  const deletedReports = reports.filter(
    (report) => report.status === "deleted"
  );
  const ignoredReports = reports.filter(
    (report) => report.status === "ignored"
  );
  const blockedReports = reports.filter(
    (report) => report.status === "blocked"
  );

  return (
    <div style={{ margin: "20px" }}>
      {/* heading */}
      <Typography>Pending Reports</Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reported by</TableCell>
              <TableCell>Abuser</TableCell>
              <TableCell>Concern</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Block</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Ignore</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingReports.map((report) => (
              <TableRow>
                <TableCell>{report.reportedBy}</TableCell>
                <TableCell>{report.abuser.UserName}</TableCell>
                <TableCell>{report.concern}</TableCell>
                <TableCell>{report.time}</TableCell>
                {
                  report.post ? (<TableCell>{report.post.Content}</TableCell>):(<TableCell>Post is Here</TableCell>)
                }
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<BlockIcon />}
                    onClick={() => handleBlockClick(report.id)}
                    disabled={blockbutton && whichreport === report.id}
                  >
                    Block
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(report.id)}
                    disabled={deletebutton && whichreport === report.id}
                  >
                    {countdown !== null && whichreport === report.id
                      ? "Cancel in " + countdown + " seconds"
                      : "Delete"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ArchiveIcon />}
                    onClick={() => handleIgnoreClick(report.id)}
                  >
                    Ignore
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography marginTop={10}>Blocked Reports</Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reported by</TableCell>
              <TableCell>Abuser</TableCell>
              <TableCell>Concern</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.reportedBy}</TableCell>
                <TableCell>{report.abuser.Concern}</TableCell>
                <TableCell>{report.concern}</TableCell>
                <TableCell>{report.time}</TableCell>
                {
                  report.post ? (<TableCell>{report.post.Content}</TableCell>):(<TableCell>Post is Here</TableCell>)
                }
                <TableCell>BLOCKED</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography marginTop={10}>Ignored Reports</Typography>
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reported by</TableCell>
              <TableCell>Abuser</TableCell>
              <TableCell>Concern</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ignoredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.reportedBy}</TableCell>
                <TableCell>{report.abuser.UserName}</TableCell>
                <TableCell>{report.concern}</TableCell>
                <TableCell>{report.time}</TableCell>
                <TableCell>IGNORED</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Reports;
