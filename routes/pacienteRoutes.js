const express = require ("express");
const routes=express.Router();
const auth=require("../middlewares/usuarioAuth");
 

const PacienteController=require("../controllers/pacienteController");

routes.get("/paciente/",auth,PacienteController.listar);
routes.get("/paciente/cadastrar/:codigo?",auth,PacienteController.cadastrarGet);
routes.post("/paciente",auth,PacienteController.cadastrarPost)
routes.get("/paciente/deletar/:codigo",auth,PacienteController.remover);
routes.get("/paciente/:codigo",auth,PacienteController.detalhar);


module.exports=routes;


