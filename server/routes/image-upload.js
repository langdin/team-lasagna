const express = require("express");
const router = express.Router();
const passport = require("passport");

const imgUploadController = require("../controllers/imgUploadController");
const aboutImgController = require("../controllers/aboutImgController");

router.post(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  imgUploadController.imgUpload
);
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  imgUploadController.imgDelete
);
router.put(
  "/about-me/:userId",
  passport.authenticate("jwt", { session: false }),
  aboutImgController.addImg
);
router.put(
  "/delete-about-me/:userId",
  passport.authenticate("jwt", { session: false }),
  aboutImgController.imgDelete
);

module.exports = router;
