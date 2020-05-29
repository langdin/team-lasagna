import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "react-credit-cards/es/styles-compiled.css";
import Button from "@material-ui/core/Button";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Contacts from "./Contacts";

const useStyles = makeStyles((theme) => ({
  messageRow: {
    minHeight: "80vh",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    padding: " 10px 0",
  },
  input: {
    padding: "0 20px 0 10px",
    maxHeight: "50px",
  },
  messages: {
    overflowY: "auto",
  },
  mobileHide: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rightBorder: {
    borderRight: "2px solid #f5f5f5",
    padding: "10px 0",
  },
  senderMessage: {
    textAlign: "right",
  },
  avatar: {
    margin: "0 20px",
  },
  head: {
    padding: "0 10px 10px 20px",
    borderBottom: "2px solid #f5f5f5",
  },
}));

export default function Messsanger({ contacts, messages, chooseRecipient }) {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Grid container>
        <Contacts contacts={contacts} chooseRecipient={chooseRecipient} />
        <Grid item xs={12} sm={9} className={classes.messageRow}>
          <Grid item xs={12} className={classes.messages}>
            <Grid
              item
              xs={12}
              className={classes.head + " " + classes.mobileHide}
            >
              <Typography
                variant="h6"
                fontWeight="fontWeightBold"
                className={classes.title}
              >
                FirstName LastName
              </Typography>
            </Grid>
            <List>
              {messages.map((message, index) =>
                message.profileId._id !==
                JSON.parse(localStorage.getItem("profile"))._id ? (
                  <ListItem button key={message.text}>
                    <Avatar
                      alt={`${message.profileId.firstName} ${message.profileId.lastName}`}
                      src={message.profileId.profilePic}
                      className={classes.avatar}
                    />
                    <ListItemText primary={message.text} />
                  </ListItem>
                ) : (
                  <ListItem
                    button
                    key={message.text}
                    className={classes.senderMessage}
                  >
                    <ListItemText primary={message.text} />
                    <Avatar
                      alt={`${message.profileId.firstName} ${message.profileId.lastName}`}
                      src={message.profileId.profilePic}
                      className={classes.avatar}
                    />
                  </ListItem>
                )
              )}
            </List>
          </Grid>
          <Grid item xs={12} className={classes.input}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container alignItems="flex-end">
                <Grid item xs={11}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
