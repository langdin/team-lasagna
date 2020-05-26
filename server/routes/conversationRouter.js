let express = require("express");
const router = express.Router();
const conversatinoController = require("../controllers/conversationController");

router.get("/:profileId", conversatinoController.getConversations);
router.post("/", conversatinoController.createConversation);
router.post("/message", conversatinoController.createMessage);

module.exports = router;
