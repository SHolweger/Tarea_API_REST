module.exports = (sequelize, Sequelize) => {
  const Departamento = sequelize.define("departamento", {
    nombre: Sequelize.STRING,
    ubicacion: Sequelize.STRING
  });
  return Departamento;
};