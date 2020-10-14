const router = require("express").Router();
const PlayerScores = require("../db").import("../models/player-scores");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");
let adminUser = require("../middleware/admin")

//POST players names at beginning of game; WORKING
//  http://localhost:3000/player-scores/startgame
router.post("/startgame", validateSession, (req, res) => {
  const playerScores = {
    owner: req.user.id,
    player1: req.body.playerScores.player1,
    player2: req.body.playerScores.player2,
    player3: req.body.playerScores.player3,
    player4: req.body.playerScores.player4,
    player5: req.body.playerScores.player5,
    player6: req.body.playerScores.player6,
    player7: req.body.playerScores.player7,
    player8: req.body.playerScores.player8,
    player9: req.body.playerScores.player9,
    score1: req.body.playerScores.score1,
    score2: req.body.playerScores.score2,
    score3: req.body.playerScores.score3,
    score4: req.body.playerScores.score4,
    score5: req.body.playerScores.score5,
    score6: req.body.playerScores.score6,
    score7: req.body.playerScores.score7,
    score8: req.body.playerScores.score8,
    score9: req.body.playerScores.score9,
  };
  PlayerScores.create(playerScores)
  .then((playerScores) => res.status(200).json(playerScores))
  .catch((err) => res.status(500).json({error: err}));
});

//PUT to insert the final scores of the players at the end of the game; WORKING
// http://localhost:3000/player-scores/update/:id
//Would we exclude playernames here since they don't get changed?
router.put("/update/:id", validateSession, function (req, res) {
  const playerScores = {
    player1: req.body.playerScores.player1,
    player2: req.body.playerScores.player2,
    player3: req.body.playerScores.player3,
    player4: req.body.playerScores.player4,
    player5: req.body.playerScores.player5,
    player6: req.body.playerScores.player6,
    player7: req.body.playerScores.player7,
    player8: req.body.playerScores.player8,
    player9: req.body.playerScores.player9,
    score1: req.body.playerScores.score1,
    score2: req.body.playerScores.score2,
    score3: req.body.playerScores.score3,
    score4: req.body.playerScores.score4,
    score5: req.body.playerScores.score5,
    score6: req.body.playerScores.score6,
    score7: req.body.playerScores.score7,
    score8: req.body.playerScores.score8,
    score9: req.body.playerScores.score9,
  };
  const query = {where: {id: req.params.id}}

  PlayerScores.update(playerScores, query)
  .then((playerScores) => res.status(200).json(playerScores))
  .catch((err) => res.status(500).json({error: err}));
});

//GET - see player scores for a specific game; WORKING
// http://localhost:3000/player-scores/seegame/:id
//Allowed me to see any user's game by id
router.get("/seegame/:id", validateSession, (req, res) => {
  let gameId = req.params.id;
  PlayerScores.findAll({
    where: {id: gameId}
  })
  .then((playerScores) => res.status(200).json(playerScores))
  .catch((err) => res.status(500).json({error: err}));
});

//GET - ADMIN - see ALL games
// http://localhost:3000/player-scores/seeallgames
//Admin working
router.get("/seeallgames", validateSession, adminUser(), (req, res) => {
  PlayerScores.findAll()
  .then((playerScores) => res.status(200).json(playerScores))
  .catch((err) => res.status(500).json({error: err}));
});

//DELETE - ADMIN - delete a whole game 
// http://localhost:3000/player-scores/delete/:id
//Admin working
router.delete('/delete/:id', validateSession, adminUser(), function (req, res) {
  const query = {where: { id: req.params.id}};
  PlayerScores.destroy(query)
  .then(() => res.status(200).json({ message: "Player Scores removed."}))
  .catch((err) => res.status(500).json({error: err}));
});


  module.exports = router;