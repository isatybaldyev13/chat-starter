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
    const unsubscribe = onSnapshot(collection(db, "kattar"), (docs) => {
      const list = [];
      docs.forEach((doc) => {
        const message = doc.data();
        list.push(message);
      });
      setMessages(list);
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
        photoUrl: authUser.photoURL,
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
    <Box display="flex" flex={1} flexDirection="column" height="100vh">
      <Header />
      <Box display="flex" flex={1}>
        <Box display={"flex"} flex={1} sx={{ backgroundColor: "orange" }}></Box>
        <Box display={"flex"} flex={3} flexDirection={"column"}>
          <Box p={1} display={"flex"} flex={1} flexDirection={"column"}>
            {messages.map((message) => (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{ backgroundColor: "silver" }}
                marginBottom={1}
                p={1}
              >
                <Avatar alt={message?.displayName} src={message?.photoUrl} />
                <Typography>{message.content}</Typography>
              </Box>
            ))}
          </Box>
          <Box display={"flex"}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              placeholder="Enter youressage"
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
