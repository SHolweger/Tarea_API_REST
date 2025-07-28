// importamos db los modelos en este caso si tenemos uno o mas, se puede referenciar
const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "¡El nombre no puede estar vacío!"
        });
        return;
    }

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
    };

    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Producto."
            });
        });
};

// Obtener todos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los Productos."
            });
        });
};

// Obtener por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Producto con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Producto fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Producto con id=${id}. ¡Quizás no se encontró el Producto o el cuerpo de la solicitud está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Producto con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Producto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Producto fue eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el Producto con id=${id}. ¡El Producto no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Producto con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Productos fueron eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los Productos."
            });
        });
};
