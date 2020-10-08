require("dotenv").config();
let express = require("express");
let app = express();
let sequelize = require("./db");


let playerScores = require("./controllers/player-scores-controller");
let user = require("./controllers/user-controller");
let userHistory = require('./controllers/user-history-controller');

sequelize.sync();
//sequelize.sync({force: true})
app.use(require("./middleware/headers"));
app.use(express.json());



app.use("/player-scores", playerScores);
app.use('/user', user);
app.use('/user-history', userHistory);

app.listen(process.env.PORT, function () {
  console.log("App is listening on port 3000");
});