import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeaderBar() {
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: "white",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6">My Fridger</Typography>
      </Toolbar>
    </AppBar>
  );
}
