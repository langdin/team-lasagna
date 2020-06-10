let express = require("express");
const router = express.Router();
const conversatinoController = require("../controllers/conversationController");
const passport = require("passport");

router.get(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  conversatinoController.getConversations
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  conversatinoController.createConversation
);
router.post(
  "/message",
  passport.authenticate("jwt", { session: false }),
  conversatinoController.createMessage
);
router.get(
  "/messages/:conversationId",
  passport.authenticate("jwt", { session: false }),
  conversatinoController.getMessages
);

module.exports = router;
