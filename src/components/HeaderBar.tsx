import { AppBar, Toolbar, Typography } from "@mui/material";

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
