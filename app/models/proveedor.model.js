module.exports = (sequelize, Sequelize) => {
  const Proveedor = sequelize.define("proveedor", {
    nombre: Sequelize.STRING,
    telefono: Sequelize.STRING,
    direccion: Sequelize.STRING
  });
  return Proveedor;
};