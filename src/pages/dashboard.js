import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/header";
import { Send } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { createMessage } from "../firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshots) => {
      const list = [];
      snapshots.forEach((doc) => {
        const message = doc.data();
        list.push(message);
      });
      setMessages(list.sort((a, b) => a?.date?.seconds - b?.date?.seconds));
      // console.log("Current data: ", doc.data());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSendMessage = async () => {
    if (!message) return;
    try {
      setLoading(true);
      const messageObj = {
        uid: authUser.uid,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
        content: message,
        date: serverTimestamp(),
      };
      await createMessage(messageObj);
      setMessage("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display={"flex"} flex={1}>
        <Box display={"flex"} sx={{ background: "yellow" }} flex={1}></Box>
        <Box display={"flex"} flex={3} flexDirection={"column"}>
          <Box
            display={"flex"}
            flex={1}
            sx={{ background: "purple" }}
            flexDirection={"column"}
            padding={1}
          >
            {messages.map((message) => (
              <Box
                display="flex"
                gap={1}
                alignItems={"center"}
                boxShadow={1}
                padding={1}
                mb={1}
                sx={{ backgroundColor: "#fff" }}
              >
                <Avatar alt={message?.displayName} src={message?.photoURL} />
                <Typography>{message.content}</Typography>
              </Box>
            ))}
          </Box>
          <Box display={"flex"}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              placeholder="message"
            />
            <Button disabled={loading} onClick={onSendMessage}>
              {loading ? <CircularProgress /> : <Send />}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
