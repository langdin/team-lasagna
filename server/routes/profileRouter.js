let express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const validation = require("../utils/profileValidation");
const passport = require("passport");

router.get("/", profileController.getProfileList);
router.get("/:id", profileController.getProfileById);
router.get("/user/:id", profileController.getProfileByUserId);
router.post("/", validation, profileController.createProfile);
router.put(
  "/:id",
  validation,
  passport.authenticate("jwt", { session: false }),
  profileController.updateProfile
);

// needed for updates on all documents but not used.
router.put("/", profileController.updateAllDocs);

module.exports = router;
