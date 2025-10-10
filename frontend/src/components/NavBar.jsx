import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";

export default function NavBar() {
  const navigate = useNavigate();
  const user = (() => {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  })();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            Uber Web
          </Typography>
          <Button color="inherit" component={RouterLink} to="/rider">
            Rider
          </Button>
          <Button color="inherit" component={RouterLink} to="/driver">
            Driver
          </Button>
        </Box>
        <Box>
          {user ? (
            <>
              <Typography component="span" sx={{ mr: 2 }}>
                {user.name} ({user.role})
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
