import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "react-credit-cards/es/styles-compiled.css";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  mobileHide: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rightBorder: {
    borderRight: "2px solid #f5f5f5",
    padding: "10px 0",
  },
  head: {
    padding: "0 10px 10px 20px",
    borderBottom: "2px solid #f5f5f5",
    minHeight: "52px",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "10px",
  },
}));

export default function Contact({ contacts, chooseRecipient }) {
  const classes = useStyles();
  return (
    <>
      <Grid
        item
        xs={12}
        sm={3}
        className={classes.mobileHide + " " + classes.rightBorder}
      >
        <Grid item xs={12} className={classes.head}>
          <Typography variant="h6" fontWeight="fontWeightBold">
            Chats
          </Typography>
        </Grid>
        <List>
          {contacts.map((contact, index) => (
            <ListItem
              button
              key={contact.profile._id}
              onClick={() =>
                chooseRecipient(contact.conversationId, contact.profile)
              }
            >
              <Avatar
                alt={`${contact.profile.firstName} ${contact.profile.lastName}`}
                src={contact.profile.profilePic}
                className={classes.avatar}
              />
              <ListItemText
                primary={`${contact.profile.firstName} ${contact.profile.lastName}`}
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}
