import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <HeaderBar />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
