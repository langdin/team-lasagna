import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "react-credit-cards/es/styles-compiled.css";
import { Grid } from "@material-ui/core";
import Messanger from "../Components/Messages/Messanger";
import ContactsCollapsed from "../Components/Messages/ContactsCollapsed";
import socket from "../utils/socket";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: "#ffffff",
  },
}));

export default function Messages() {
  const classes = useStyles();
  const [recipient, setRecipient] = useState({});
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState("");
  const messagesEndRef = React.createRef();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (conversation === "" || newMessage.length === 0) return;
    try {
      const msg = await axios.post(
        `http://localhost:3001/conversation/message`,
        {
          conversationId: conversation,
          profileId: JSON.parse(localStorage.getItem("profile"))._id,
          text: newMessage,
        }
      );
      socket.emit("new message", msg.data.message);
    } catch (err) {
      console.log(err);
    }
    setNewMessage("");
  };

  const getMessages = async () => {
    if (conversation === "") return;
    try {
      const msgArray = await axios.get(
        `http://localhost:3001/conversation/messages/${conversation}`
      );
      if (msgArray.data) {
        setMessages(msgArray.data.messages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getContacts = async () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    try {
      const contacts = await axios.get(
        `http://localhost:3001/conversation/${profile._id}`
      );
      if (contacts.data) {
        const arr = [];
        for (let contact of contacts.data.conversations) {
          if (contact.members[0]._id !== profile._id) {
            arr.push({
              profile: contact.members[0],
              conversationId: contact._id,
            });
          } else {
            arr.push({
              profile: contact.members[1],
              conversationId: contact._id,
            });
          }
        }
        setContacts(arr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const chooseRecipient = (conversationId, friend) => {
    setConversation(conversationId);
    setRecipient(friend);
  };

  useEffect(() => {
    socket.on("new message", (msg) => {
      messages.push(msg);
      setMessages([...messages]);
    });
  }, []);

  useEffect(() => {
    getContacts();
    getMessages();
    scrollToBottom();
  }, [contacts.length, messages.length, conversation]);

  return (
    <>
      <ContactsCollapsed
        contacts={contacts}
        chooseRecipient={chooseRecipient}
        recipient={recipient}
      />
      <Grid item xs={12} className={classes.wrapper}>
        <Messanger
          contacts={contacts}
          messages={messages}
          chooseRecipient={chooseRecipient}
          recipient={recipient}
          handleSubmit={handleSubmit}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messagesEndRef={messagesEndRef}
        />
      </Grid>
    </>
  );
}
