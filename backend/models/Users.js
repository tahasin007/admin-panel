module.exports = (sequelize, DataTypes)=>{
    const Users = sequelize.define('Users', {
      firstName: {
        type: DataTypes.STRING,
        allownNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allownNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allownNull: false,
      },
    })
    return Users
}