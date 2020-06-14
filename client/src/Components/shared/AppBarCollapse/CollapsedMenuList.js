import React, { useState, useEffect, forwardRef } from "react";
import { Link, MenuItem } from "@material-ui/core";
import { authService } from "../../../services/auth.service";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    fontSize: "18px",
    fontWeight: "700",
    textAlign: "center",
    width: "100%",
  },
  myButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 42,
    padding: "0 25px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginRight: "10px",
  },
  collapsedMenu: {
    width: "350px",
  },
}));

const CollapsedMenuList = forwardRef((props, ref) => {
  const classes = useStyles();
  // let profile = {};
  const [authed, setAuthed] = useState(false);
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      setProfileId(JSON.parse(localStorage.getItem("profile"))._id);
    }
    setAuthed(props.isAuthenticated());
  }, [props.isAuthenticated()]);
  // dropdown events END

  const logout = (e) => {
    authService.logout();
  };

  return (
    <>
      {authed ? (
        <>
          <div className={classes.collapsedMenu}>
            <MenuItem>
              <Link href="/" className={classes.toolbarLink}>
                Profile Listing
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/messages" className={classes.toolbarLink}>
                Messages
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/ownerBookings" className={classes.toolbarLink}>
                My Requests
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/bookings" className={classes.toolbarLink}>
                My Jobs
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Link
                href={`/sitter-profile/${profileId}`}
                className={classes.toolbarLink}
              >
                My Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/editProfile" className={classes.toolbarLink}>
                Edit Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/profilePhoto" className={classes.toolbarLink}>
                Profile Photo
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/availability" className={classes.toolbarLink}>
                Availability
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/payment" className={classes.toolbarLink}>
                Payment
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/settings" className={classes.toolbarLink}>
                Settings
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/login"
                className={classes.toolbarLink}
                onClick={logout}
              >
                Logout
              </Link>
            </MenuItem>
          </div>
        </>
      ) : (
        <>
          <MenuItem>
            <Link
              href="/signup"
              className={classes.toolbarLink}
              onClick={logout}
            >
              Sign Up
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/login"
              className={classes.toolbarLink}
              onClick={logout}
            >
              Login
            </Link>
          </MenuItem>
        </>
      )}
    </>
  );
});

export default CollapsedMenuList;
