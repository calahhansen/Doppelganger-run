module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.TEXT,
    city: DataTypes.TEXT
  });

  Task.associate = function(models) {
    models.Task.hasOne(models.User, {
      as: "creator"
    });
  };

  Task.associate = function(models) {
    models.Task.hasOne(models.User, {
      as: "assignee"
    });
  };

  return Task;
};
