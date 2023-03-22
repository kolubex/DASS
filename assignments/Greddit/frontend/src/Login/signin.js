import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "./signup.js";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const theme = createTheme();

export default function SignIn() {
  const [user, setUser] = React.useState(false);
  const [signup, setSignup] = React.useState(false);
  const [mail, chmail] = React.useState(true);
  const [pass, chpass] = React.useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") !== "" && data.get("password") !== "") {
      // sending get request to axios
      console.log(data.get("email"));
      console.log(data.get("password"));
      const details = {
        Email: data.get("email"),
        Password: data.get("password"),
      };
      try {
        console.log(details);
        const res = await axios.post(
          "/api/signin/verify/",
          details
        );
        console.log(res.data);
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("userid", res.data.id);
        window.localStorage.setItem("username", res.data.username);
        window.localStorage.setItem("logincheck", "true");
        console.log("logged");
        setUser(true);
        navigate("/profile");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please enter valid details");
    }
  };
  const signupClick = () => {
    setSignup(true);
  };
  
  // React.useEffect(() => {
  //   if (localStorage.getItem("logincheck") === "true") {
  //     navigate("/profile");
  //   }
  // }, [user]);

  if (signup === true) {
    return <SignUp />;
  }
  return (
    <div>
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, alignContent: "center" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={function () {
                  chmail(false);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={function () {
                  chpass(false);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                disabled={mail || pass}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
              <Button
                onClick={signupClick}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
