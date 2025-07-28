module.exports = (sequelize, Sequelize) => {
  const Empleado = sequelize.define("Empleado", {
    nombre: Sequelize.STRING,
    puesto: Sequelize.STRING,
    salario: Sequelize.FLOAT
  });
  return Empleado;
};
