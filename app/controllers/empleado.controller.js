const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validamos que dentro del  request no venga vacio el nombre, de lo contrario returna error
    if (!req.body.nombre) {
        res.status(400).send({
            message: "¡El nombre no puede estar vacío!"
        });
        return;
    }

    const empleado = {
        nombre: req.body.nombre,
        puesto: req.body.puesto,
        salario: req.body.salario,
    };

    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el Empleado."
            });
        });
};

//Get all
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Empleado.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al obtener los Empleados."
            });
        });
};

// Get by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener el Empleado con id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Empleado fue actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Empleado con id=${id}. ¡Quizás no se encontró el Empleado o el cuerpo de la solicitud está vacío!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el Empleado con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Empleado.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Empleado fue eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el Empleado con id=${id}. ¡El Empleado no fue encontrado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Empleado con id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Empleado.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Empleados fueron eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al eliminar todos los Empleados."
            });
        });
};
