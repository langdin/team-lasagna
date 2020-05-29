import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "react-credit-cards/es/styles-compiled.css";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  collapse: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    backgroundColor: "#ffffff",
    padding: "20px 0",
    borderBottom: "2px solid #f5f5f5",
  },
  top: {
    display: "flex",
  },
}));

export default function ContactsCollapsed({ contacts, chooseRecipient }) {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  return (
    <>
      <Grid item xs={12} className={classes.collapse}>
        <div className={classes.top}>
          <Button onClick={toggleDrawer(true)}>
            <MoreVertIcon />
          </Button>
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            className={classes.title}
          >
            FirstName LastName
          </Typography>
        </div>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {contacts.map((contact, index) => (
                <ListItem
                  button
                  key={contact.profile._id}
                  onClick={() => chooseRecipient(contact.conversationId, contact.profile)}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={`${contact.profile.firstName} ${contact.profile.lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </Grid>
    </>
  );
}
