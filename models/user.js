module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, 
        },
        unique: true,
      },
      
      permission: {
        type: DataTypes.STRING,
        allowNull: false,        
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

