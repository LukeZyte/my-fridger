import AddIcon from "@mui/icons-material/Add";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HeaderBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        bgcolor: "white",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">My Fridger</Typography>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/newitem")}
        >
          Dodaj
        </Button>
      </Toolbar>
    </AppBar>
  );
}
