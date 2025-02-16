import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  console.log("Navbar");

  return (
    <AppBar position="static" sx={{ bgcolor: "#f4a226" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Travel List title is now a link to Home */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
        >
          Travel List
        </Typography>

        <Box>
          {token ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
