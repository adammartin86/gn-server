module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,        
      },
      
      admin: {
        type: DataTypes.BOOLEAN,        
      },

      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            min: 8,
            isAlphanumeric: true,
          }         
      },
      
    });
    return User;
  };