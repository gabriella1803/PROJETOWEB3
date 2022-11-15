const express = require("express");
const routes = express.Router();
const auth=require("../middlewares/usuarioAuth");

const usuarioController = require("../controllers/usuarioController");

routes.get("/usuarios/",auth,usuarioController.listar);
routes.get("/usuarios/cadastrar/:email?",usuarioController.cadastrarGet);
routes.post("/usuarios", usuarioController.cadastrarPost);
routes.get("/usuarios/login",usuarioController.login);
routes.post("/usuarios/login",usuarioController.loginPost);




module.exports = routes;