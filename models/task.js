module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    creator: DataTypes.TEXT,
    category: DataTypes.TEXT,
    city: DataTypes.TEXT,
    assignee: DataTypes.TEXT
  });
  return Task;
};