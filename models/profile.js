module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    image: DataTypes.STRING,
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    address: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    skills: DataTypes.TEXT,
    tasks: DataTypes.TEXT
  });

  // Task.associate = function(models) {
  //   models.Task.belongsTo(models.User, {
  //     as: "creator"
  //   });
  // };

  // Task.associate = function(models) {
  //   models.Task.belongsTo(models.User, {
  //     as: "assignee"
  //   });
  // };

  return Profile;
};
