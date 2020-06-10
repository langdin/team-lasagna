const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  requestController.getRequestList
);

// get user created request/bookings by passing the owner(user) id
router.get(
  "/owner/:userId",
  passport.authenticate("jwt", { session: false }),
  requestController.getOwnerRequestList
);

// needed for updates on all documents but not used.
router.put("/", requestController.updateAllDocs);

// cancel request by user
router.put(
  "/owner/:id",
  passport.authenticate("jwt", { session: false }),
  requestController.cancelRequest
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  requestController.getRequestById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  requestController.createRequest
);

// Update Request, request id as param
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  requestController.updateRequest
);

// Your next booking: Approved requests, your upcoming booking. pass sitterId
router.get(
  "/upcomingBookings/:sitterId",
  passport.authenticate("jwt", { session: false }),
  requestController.getUpcomingBookedRequests
);

// Current bookings: Requests pending approval/deny, pass sitterId
router.get(
  "/pendingBookings/:sitterId",
  passport.authenticate("jwt", { session: false }),
  requestController.getPendingRequests
);

// Complete Request after work is done, pass request _id. and post (start(date), end(date) and complete(Boolean value))
router.put(
  "/completeBooking/:id",
  passport.authenticate("jwt", { session: false }),
  requestController.completeRequest
);

// Past bookings: Approved requested, completed and in the past. pass sitterId
router.get(
  "/completedPastBookings/:sitterId",
  passport.authenticate("jwt", { session: false }),
  requestController.getCompletedRequests
);

// User automatically pay for the service rendered by the sitter, request id is passed as param
router.post(
  "/:id/pay",
  passport.authenticate("jwt", { session: false }),
  requestController.payRequest
);

// The sitter is paid for the service they have rendered in the last two weeks, sitterId is passed as param.

module.exports = router;
