module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
        
      },
      admin: {
        type: DataTypes.BOOLEAN,
        
      },
      password: {
          type: DataTypes.STRING,
         
      },
      
    });
    return User;
  };