import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./signin";
import axios from "axios";
const theme = createTheme();

export default function SignUp() {
  const [signin, setSignin] = React.useState(false);
  const [signedup, setsignedup] = React.useState(false);
  const [fn, setfn] = React.useState(true);
  const [ln, setln] = React.useState(true);
  const [con, setcon] = React.useState(true);
  const [us, setus] = React.useState(true);
  const [email, setemail] = React.useState(true);
  const [pass, setpass] = React.useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      data.get("email") !== "" &&
      data.get("password") !== "" &&
      data.get("firstName") !== "" &&
      data.get("lastName") !== "" &&
      data.get("contact") !== "" &&
      data.get("userName") !== ""
    ) {
      const post = {
        FirstName: data.get("firstName"),
        LastName: data.get("lastName"),
        Contact: data.get("contact"),
        UserName: data.get("userName"),
        Email: data.get("email"),
        Password: data.get("password"),
        Age: 8,
      };
      console.log(post);
      try {
        const res = await axios.post("/api/signin/", post);
        console.log(res.data);
        setsignedup(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please enter valid details");
    }
  };

  if (signedup === true) {
    return <SignIn />;
  }
  const signinClick = () => {
    setSignin(true);
  };
  if (signin === true) {
    return <SignIn />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={function () {
                    setfn(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={function () {
                    setln(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="family-name"
                  onChange={function () {
                    setus(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  autoComplete="family-name"
                  onChange={function () {
                    setcon(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={function () {
                    setemail(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={function () {
                    setpass(false);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              disabled={fn || ln || con || pass || us || email}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={signinClick}
              sx={{ mt: 1, mb: 2 }}
            >
              Have an account? Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
