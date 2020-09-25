const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");


//SIGN-UP - functioning? YES 
router.post('/signup', (req, res) => {
    let userModel = {
        userName: req.body.user.userName,
        password: bcrypt.hashSync(req.body.user.password, 14),
    };
    
    User.create(userModel).then(user => {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            user: req.body.user.userName,
            message: 'USER SUCCESSFULLY INITIALIZED',
            sessionToken: token
        });
    })
    .catch(err => {
        res.status(500).json({error: err, message: "NO INITIALIZATION TOOK PLACE"});
    });
});

//LOG-IN - functioning? YES
router.post('/login', (req, res) => {
    let userName = req.body.user.userName
    User.findOne({
        where: {userName: userName}
    })
    .then(function logIn(user) {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24,})

                    res.status(200).json({
                        message: "COMMENCE TRIVIA!",
                        userName: userName,
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

  module.exports = router;