const router = require("express").Router();
const PlayerScores = require("../db").import("../models/player-scores");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");



  module.exports = router;