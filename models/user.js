module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,   
        isUnique: true,     
      },
      
      admin: {
        type: DataTypes.BOOLEAN,        
      },

      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            min: 8,
          }         
      },
      
    });
    return User;
  };

