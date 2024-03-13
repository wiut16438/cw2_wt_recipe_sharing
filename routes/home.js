const express = require("express");
const router = express.Router();

const renderHomePage = require("../controllers/home");

router.get("/", renderHomePage);

module.exports = router;
