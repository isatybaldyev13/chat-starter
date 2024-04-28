import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/header";
import { Add, Send } from "@mui/icons-material";
import { useState } from "react";

const Dashboard = () => {
  const { authUser } = useAuth();
  const [message, setMessage] = useState("");

  const onSendMessage = () => {};

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display={"flex"} flex={1}>
        <Box display={"flex"} sx={{ background: "yellow" }} flex={1}></Box>
        <Box display={"flex"} flex={3} flexDirection={"column"}>
          <Box display={"flex"} flex={1} sx={{ background: "purple" }}></Box>
          <Box display={"flex"}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              placeholder="message"
            />
            <Button onClick={onSendMessage}>
              <Send />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
