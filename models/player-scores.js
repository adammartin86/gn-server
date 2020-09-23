module.exports = (sequelize, DataTypes) => {
    const PlayerScores = sequelize.define("playerScores", {
      player1: {
        type: DataTypes.STRING,
        
      },
      player2: {
        type: DataTypes.STRING,
        
      },
      player3: {
          type: DataTypes.STRING,
         
      },
      player4: {
          type: DataTypes.STRING,
      },
      player5: {
        type: DataTypes.STRING,
        
      },
      player6: {
          type: DataTypes.STRING,
          
      },
      player7: {
          type: DataTypes.STRING,
      },
      player8: {
          type: DataTypes.STRING,
      },
      player9: {
        type: DataTypes.STRING,
      },
      score1: {
          type: DataTypes.INTEGER,
      },
      score2: {
            type: DataTypes.INTEGER,
    },
        score3: {
            type: DataTypes.INTEGER,
        },
        score4: {
            type: DataTypes.INTEGER,
        },
        score5: {
            type: DataTypes.INTEGER,
        },
        score6: {
            type: DataTypes.INTEGER,
        },
        score7: {
            type: DataTypes.INTEGER,
        },
        score8: {
            type: DataTypes.INTEGER,
        },
        score9: {
            type: DataTypes.INTEGER,
        },
       
    });
    return PlayerScores;
  };