const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "¡El nombre no puede estar vacío!"
        });
        return;
    }

    const departamento = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock,
    };

    Departamento.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Departamento."
            });
        });
};

//Get all
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Departamento.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los Departamentos."
            });
        });
};

// Get by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Departamento.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Departamento con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Departamento.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Departamento fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Departamento con id=${id}. ¡Quizás no se encontró el Departamento o el cuerpo de la solicitud está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Departamento con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Departamento.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Departamento fue eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el Departamento con id=${id}. ¡El Departamento no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Departamento con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Departamento.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Departamentos fueron eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los Departamentos."
            });
        });
};
