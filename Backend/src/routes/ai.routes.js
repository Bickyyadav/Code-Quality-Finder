const express = require("express");
const { getReview } = require("../controllers/ai.controller");
const router = express.Router();
const aiController = require("../controllers/ai.controller")

router.post("/get-review",aiController.getReview);

module.exports = router;
