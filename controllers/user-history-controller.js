
const router = require("express").Router();
// let validateSession = require("../middleware/validate-session");
const UserHistory = require("../db").import("../models/user-history");

//FUNCTIONING
router.post("/post", (req, res) => {
  const userHistory = {
    // owner: req.user.id,
    datePlayed: req.body.userHistory.datePlayed,
    triviaTopic: req.body.userHistory.triviaTopic,
    difficulty: req.body.userHistory.difficulty,
    winner: req.body.userHistory.winner,
    gameNotes: req.body.userHistory.gameNotes,
    gameId: req.body.userHistory.gameId,
  };
  UserHistory.create(userHistory)
    .then((history) => res.status(200).json(history))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get/:id", (req, res) => {
  let userid = req.user.id.toString();
  UserHistory.findAll({
    where: { owner: userid },
  })
    .then((history) => res.status(200).json(history))
    .catch((err) => res.status(500).json({ error: err }));
});

//FUNCTIONING
router.get("/getall", (req, res) => {
  UserHistory.findAll()
    .then((history) => res.status(200).json(history))
    .catch((err) => res.status(500).json({ error: err }));
});

//FUNCTIONING
router.put("/updatenotes/:id", function (req, res) {
  const updateNote = {
      // owner: req.user.id,
      datePlayed: req.body.userHistory.datePlayed,
      triviaTopic: req.body.userHistory.triviaTopic,
      difficulty: req.body.userHistory.difficulty,
      winner: req.body.userHistory.winner,
      gameNotes: req.body.userHistory.gameNotes,
      gameId: req.body.userHistory.gameId,
  };

  const query = { where: { id: req.params.id} };

  UserHistory.update(updateNote, query)
    .then((history) => res.status(200).json(history))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", function (req, res) {
  const query = { where: { id: req.params.id, 
    // owner: req.user.id.toString() 
  } };

  UserHistory.destroy(query)
    .then(() => res.status(200).json({ message: "User History Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
})

module.exports = router;