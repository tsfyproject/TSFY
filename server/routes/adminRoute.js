const express = require("express");
const router = express.Router();
const {
  createYtb,
  getAllYoutubers,
  editYoutuber,
  getSingleYoutubers,
  deleteYoutuber
} = require("../controllers/adminController");

router.post("/create-ytb", createYtb);
router.get("/get-ytb", getAllYoutubers);
router.put("/edit-ytb", editYoutuber);
router.get("/get-single-ytb/:ytbId", getSingleYoutubers);
router.delete("/delete-youtuber", deleteYoutuber)

module.exports = router;