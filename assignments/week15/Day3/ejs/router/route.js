const express = require("express");

const router = express.Router();
const controller = require("./../controller/dataController");

router.route("/").get(controller.getAllData).post(controller.postData);
router.route("/:id").get(controller.getByID);

module.exports = router;
