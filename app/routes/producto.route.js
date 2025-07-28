module.exports = app => {
    const productos = require("../controllers/producto.controller.js");
    var router = require("express").Router();
    // POST a new Producto
    router.post("/create/", productos.create);
    // GET all Producto
    router.get("/", productos.findAll);
    // GET a single Producto with id
    router.get("/:id", productos.findOne);
    // PUT a Producto with id
    router.put("/update/:id", productos.update);
    // DELETE a Producto with id
    router.delete("/delete/:id", productos.delete);
    // DELETE all Producto
    router.delete("/delete/", productos.deleteAll);
    
    app.use("/api/customer/producto", router);
};