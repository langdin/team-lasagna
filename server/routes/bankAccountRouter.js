const express = require("express");
const router = express.Router();
const bankAccountController = require("../controllers/bankAccountController");
const passport = require("passport");

router.post(
  "/get",
  passport.authenticate("jwt", { session: false }),
  bankAccountController.getBankAccount
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  bankAccountController.addBankAccount
);

module.exports = router;
