module.exports = (sequelize, DataTypes) => {
    const UserHistory = sequelize.define("userHistory", {
      owner: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      
      triviaTopic: {
          type: DataTypes.STRING,
         
      },
      difficulty: {
          type: DataTypes.STRING,
      },
      winner: {
        type: DataTypes.STRING,
        
      },
      gameNotes: {
          type: DataTypes.STRING(8000),
          
      },
      gameId: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
    });
    return UserHistory;
  };