import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "react-credit-cards/es/styles-compiled.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Contacts from "./Contacts";

const useStyles = makeStyles((theme) => ({
  messageRow: {
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
    minHeight: "60vh",
    maxHeight: "60vh",
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
    display: "inline-flex",
    verticalAlign: "middle",
    textAlign: "center",
  },
  head: {
    padding: "0 10px 0 20px",
    borderBottom: "2px solid #f5f5f5",
    minHeight: "52px",
  },
  title: {
    display: "inline-block",
    verticalAlign: "middle",
  },
  icon: {
    color: "#ff0000",
  },
}));

export default function Messsanger({
  contacts,
  messages,
  chooseRecipient,
  recipient,
  handleSubmit,
  newMessage,
  setNewMessage,
  messagesEndRef,
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Contacts contacts={contacts} chooseRecipient={chooseRecipient} />
        <Grid item xs={12} sm={9} className={classes.messageRow}>
          <Grid item xs={12}>
            <Grid
              item
              xs={12}
              className={classes.head + " " + classes.mobileHide}
            >
              {recipient._id ? (
                <Avatar
                  alt={`${recipient.firstName} ${recipient.lastName}`}
                  src={recipient.profilePic}
                  className={classes.avatar}
                />
              ) : (
                ""
              )}
              <Typography
                variant="h6"
                fontWeight="fontWeightBold"
                className={classes.title}
              >
                {recipient.firstName
                  ? recipient.firstName + " " + recipient.lastName
                  : ""}
              </Typography>
            </Grid>
            <List className={classes.messages}>
              {messages.map((message, index) =>
                message.profileId._id !==
                JSON.parse(localStorage.getItem("profile"))._id ? (
                  <ListItem button key={message._id}>
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
              <div ref={messagesEndRef} />
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
                    autoComplete="off"
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton type="submit" className={classes.icon}>
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
