import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Navigate } from "react-router-dom";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import BugReportIcon from "@mui/icons-material/BugReport";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const settings = ["Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const gomysubreddits = (event) => {
    event.preventDefault();
    navigate("/mysubgreddits");
  };
  const goprofile = (event) => {
    event.preventDefault();
    navigate("/profile");
  };
  const gosubreddits = (event) => {
    event.preventDefault();
    navigate("/allsubgreddits");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const gosavedposts = (event) => {
    event.preventDefault();
    navigate("/savedposts");
  };

  const [user, setUser] = React.useState("false");
  const logout = (event) => {
    event.preventDefault();
    window.localStorage.setItem("logincheck", "false");
    setUser(false);
  };
  if (user === false) {
    return navigate("/");
  }
  const logincheck = window.localStorage.getItem("logincheck");

  return (
    <>
      {logincheck === "true" ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                href="/"
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                REDDIT
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={goprofile}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={gomysubreddits}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <BrightnessHighIcon />
                  My Subgreddits
                </Button>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={gosubreddits}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <BugReportIcon />
                  Subgreddit
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={gosavedposts}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <BookmarkAddIcon/>
                  SavedPosts
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={goprofile}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <AccountBoxIcon />
                  profile
                </Button>
              </Box>
              
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="kolubex" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={logout}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <p></p>
      )}
    </>
  );
}
export default ResponsiveAppBar;
