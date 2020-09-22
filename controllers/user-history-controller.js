const router = require("express").Router();
const UserHistory = require("../db").import("../models/user-history");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");



  module.exports = router;