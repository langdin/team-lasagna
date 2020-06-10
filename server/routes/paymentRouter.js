const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkoutController = require("../controllers/paymentController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkoutController.checkout
);
router.get(
  "/retrieve/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.retrieve
);
router.post(
  "/charge",
  passport.authenticate("jwt", { session: false }),
  checkoutController.charge
);
router.post(
  "/method/add",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addPaymentMethod
);
router.get(
  "/method/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.getPaymentMethod
);

module.exports = router;
