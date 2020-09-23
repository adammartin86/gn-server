const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");


//SIGN-UP - functioning? --
router.post('/signin', (req, res) => {
    let userModel = {
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 14),
    };
    
    User.create(userModel).then(user => {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            user: user.username,
            message: 'USER SUCCESSFULLY INITIALIZED',
            sessionToken: token
        });
    })
    .catch(err => {
        res.status(500).json({error: err, message: "NO INITIALIZATION TOOK PLACE"});
    });
});

//LOG-IN - functioning? --
router.post('/login', (req, res) => {
    let username = req.body.user.username
    User.findOne({
        where: {username: username}
    })
    .then(function logIn(user) {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24,})

                    res.status(200).json({
                        message: "COMMENCE TRIVIA!",
                        username: username,
                        sessionToken: token
                    })
                } else {
                    res.status(502).json({error: err, message: "WOMP WOMP... TRY AGAIN."})
                }
            });
        } else {
            res.status(500).json({error: "LEARN YOUR NAME. I BELIEVE IN YOU."})
        }
    })
    .catch(err => {
        res.status(500).json({error: err, message: "SOMETHING HAPPENED. GOOD LUCK WITH THAT."})
    })
})

//__________ADMIN______________

//SEE ALL USERS - functioning? --
router.get('/seeall', (req, res) => {
    User.findAll()
    .then(games => res.status(200).json(users))
    .catch(err => res.status(500).json({error: err, message: "NOT HAPPENIN'!"}))
});

//EDIT OR UPDATE USER - functioning? --
router.put('/edit', validateSession, (req, res) => {
    let userModel = {
        user: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 14)
    };

    let query = {where: {id: req.params.id, owner: req.user.id}};

    User.update(adminUpdateUser, query)
    .then((games) => res.status(200).json(users))
    .catch((err) => res.status(500).json({error: err, message: "OOPSIE POOPSIE"}))
});

//DELETE ENTRY - functioning? --
router.delete('/delete', validateSession, (req, res) => {
    let query = {where: {id: req.params.id, owner: req.user.id}};

    User.destroy(query)
    .then((deleteStatus) => {
        let message = deleteStatus != [0] ? "USER DELETED" : "DELETE DENIED"
        res.status(200).json({message: message})})
    .catch((err) => res.status(500).json({error: err, message: "DELETE DENIED"}))
})


  module.exports = router;