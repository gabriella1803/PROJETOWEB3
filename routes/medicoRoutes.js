const express = require ("express");
const routes=express.Router();
const auth=require("../middlewares/usuarioAuth");


const MedicoController=require("../controllers/medicoController");

routes.get("/medico/",auth,MedicoController.listar);
routes.get("/medico/cadastrar/:crm?",auth,MedicoController.cadastrarGetM);
routes.post("/medico",auth,MedicoController.cadastrarPostM);
routes.get("/medico/deletar/:crm",auth,MedicoController.removerMedico);
routes.get("/medico/:crm",auth,MedicoController.detalharMedico);

module.exports=routes;