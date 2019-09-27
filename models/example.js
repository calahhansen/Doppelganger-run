module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    creator: DataTypes.TEXT,
    category: DataTypes.TEXT,
    assignee: DataTypes.TEXT
  });
  return Example;
};
