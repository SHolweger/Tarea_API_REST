const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "¡El nombre no puede estar vacío!"
        });
        return;
    }

    const proveedor = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    };

    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Proveedor."
            });
        });
};

//Get all
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los Proveedores."
            });
        });
};

// Get by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Proveedor con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Proveedor fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Proveedor con id=${id}. ¡Quizás no se encontró el Proveedor o el cuerpo de la solicitud está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Proveedor con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Proveedor.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Proveedor fue eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el Proveedor con id=${id}. ¡El Proveedor no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Proveedor con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Proveedor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Proveedores fueron eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los Proveedores."
            });
        });
};
