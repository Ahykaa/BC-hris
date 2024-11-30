import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ paddingY: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Welcome to the Dashboard!
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
