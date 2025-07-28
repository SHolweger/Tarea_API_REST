module.exports = app => {
    const departamentos = require("../controllers/departamento.controller.js");
    var router = require("express").Router();
    router.post("/create/", departamentos.create);
    router.get("/", departamentos.findAll);
    router.get("/:id", departamentos.findOne);
    router.put("/update/:id", departamentos.update);
    router.delete("/delete/:id", departamentos.delete);
    router.delete("/delete/", departamentos.deleteAll);
    
    app.use("/api/customer/departamento", router);
};