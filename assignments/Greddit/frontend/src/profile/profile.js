import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../App.js";
import { Button, Label } from "reactstrap";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
// import ResponsiveAppBar from "../Navigation/Navigation.js";
import axios from "axios";

import { useState, useEffect } from "react";
import UserDetailsDialog from "./editdialog.js";
const theme = createTheme();

export default function Profile() {
  const [user, setUser] = useState(false);
  const [followers, setfollowers] = React.useState(false);
  const [following, setfollowing] = React.useState(false);
  const [open, setopen] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    
  }));
  //use effect to get data from api
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  Headers["authorization"] = token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/profile/"+userid);
        setUser(res.data);
        console.log("try");
      } catch (e) {
        console.log(e);
        console.log("error");
      }
    };
    fetchData();
  }, []);
  console.log("entered the profile page")

  const RemoveFollowers = async (id_follower) => {
    try {
      const res = await axios.post(
        "/api/profile/remove/"+token,
        { id: id_follower }
      );
      setUser(res.data);
      console.log("try");
    } catch (e) {
      console.log(e);
      console.log("error");
    }
  };
  const unfollow = async (id_following) => {
    const id = localStorage.getItem("id");
    try {
      const res = await axios.post(
        "/api/profile/unfollow/" + token,
        { id: id_following }
      );
      setUser(res.data);
      console.log("try");
    } catch (e) {
      console.log(e);
      console.log("error");
    }
  };

  console.log(user);
  const followersClick = () => {
    setfollowers(!followers);
  };
  const followingClick = () => {
    setfollowing(!following);
  };
  const handleeditclick = () => {
    setopen(!open);
  };
  return (
    <>
      {user &&(localStorage.getItem("logincheck") === "true") ? (
        <div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
              <CssBaseline />
              <Box
                sx={{
                  
                }}
              >
                <Box
                  sx={{
                    marginTop: 10,
                    marginLeft: 8,
                    display: "flex",
                    flexDirection: "column",
                    
                    maxWidth: "400",
                    minWidth: "300",
                  }}
                >
                  <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }}>
                    DB
                  </Avatar>
                  <Label
                    sx={{
                      p: 2,
                      marginTop: "50",
                      maxWidth: 100,
                      marginLeft: 50,
                    }}
                  >
                    {user.username}
                  </Label>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    bgcolor: "background.paper",
                    marginTop: -7,
                    marginLeft: 12,
                    boxShadow: 5,
                    borderRadius: 2,
                    p: 2,
                    
                  }}
                >
                  <Box marginTop={6}>
                    <Grid container spacing={30}>
                      <Grid item xs="auto">
                        <Button onClick={followersClick}>
                          <Typography align="center" variant="h5">
                            {user.Followers.length}
                          </Typography>
                          Followers
                        </Button>
                        <div>
                          {followers && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                bgcolor: "background.paper",
                                marginTop: -7,
                                marginLeft: 12,
                                boxShadow: 5,
                                borderRadius: 2,
                                p: 2,
                                
                              }}
                            >
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Followers
                              </Typography>
                              <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                              >
                                {user.Followers.map((follower) => (
                                  <div>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        
                                        bgcolor: "background.paper",
                                        marginTop: 2,
                                        marginLeft: 2,
                                        boxShadow: 5,
                                        borderRadius: 2,
                                        p: 2,
                                        
                                      }}
                                    >
                                      <Typography>
                                        {follower.UserName}
                                      </Typography>
                                      <Button
                                        sx={{
                                          marginLeft: 50,
                                        }}
                                        variant="contained"
                                        color="error"
                                        onClick={RemoveFollowers(follower._id)}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </div>
                                ))}
                              </Typography>
                            </Box>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs="auto">
                        <Button onClick={followingClick}>
                          <Typography align="center" variant="h5">
                            {user.Following.length}
                          </Typography>
                          Following
                        </Button>
                        <div>
                          {following && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                bgcolor: "background.paper",
                                marginTop: -7,
                                marginLeft: 12,
                                boxShadow: 5,
                                borderRadius: 2,
                                p: 2,
                                
                              }}
                            >
                              <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                              >
                                Following
                              </Typography>

                              {user.Following.map((following) => (
                                <div>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      
                                      bgcolor: "background.paper",
                                      marginTop: 2,
                                      marginLeft: 2,
                                      boxShadow: 5,
                                      borderRadius: 2,
                                      p: 2,
                                      
                                    }}
                                  >
                                    <Typography>
                                      {following.UserName}
                                    </Typography>
                                    <Button
                                      sx={{
                                        marginLeft: 50,
                                      }}
                                      variant="contained"
                                      color="error"
                                      onClick={() => {
                                        unfollow(following._id);
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </Box>
                                </div>
                              ))}
                            </Box>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box marginTop={6}>
                    <Grid container spacing={3}>
                      <Grid item xs="auto">
                        <Typography>First Name</Typography>
                        <Item>{user.FirstName}</Item>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography>Last Name</Typography>
                        <Item>{user.LastName}</Item>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography>AGE</Typography>
                        <Item>{user.Age}</Item>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box marginTop={4}>
                    <Grid container spacing={3}>
                      <Grid item xs="auto">
                        <Typography>EmailID</Typography>
                        <Item>{user.Email}</Item>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography>password</Typography>
                        <Item>{user.Password}</Item>
                      </Grid>
                      <Grid item xs="auto">
                        <Typography>Contact</Typography>
                        <Item>{user.Contact}</Item>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    sx={{
                      marginTop: 4,
                      marginLeft: 50,
                    }}
                    variant="contained"
                    color="error"
                    onClick={handleeditclick}
                  >Edit</Button>
                  <UserDetailsDialog isOpen={open} onClose={handleeditclick} />
                </Box>
              </Box>
              
            </Container>
          </ThemeProvider>
        </div>
      ) : null}
    </>
  );
}
