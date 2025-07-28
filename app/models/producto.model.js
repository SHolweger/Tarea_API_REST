module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Producto", {
        nombre: {
            type: Sequelize.STRING
        },
        precio:{
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER
        },
    });
    return Producto;
};