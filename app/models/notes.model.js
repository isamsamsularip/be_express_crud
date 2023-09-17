module.exports = (sequelize, Sequelize) => {
  const Notes = sequelize.define("notes", {
    title: {
      type: Sequelize.STRING(250) 
    },
    content: {
      type: Sequelize.TEXT 
    }
  });

  return Notes;
};
