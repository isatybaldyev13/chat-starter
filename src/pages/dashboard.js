import { Box, Container, IconButton, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/header";
import { Add } from "@mui/icons-material";

const Dashboard = () => {
  const { authUser } = useAuth();

  console.log("authUser ", authUser);

  return (
    <>
      <Header />
      <Container>
        <Box display={"flex"} alignItems={"center"} pt={2} gap={1}>
          <Typography variant="h6">Expenses</Typography>
          <IconButton onClick={() => {}}>
            <Add />
          </IconButton>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
