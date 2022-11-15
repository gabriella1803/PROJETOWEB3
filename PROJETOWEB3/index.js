const express = require("express");
const res = require("express/lib/response");
const app = express();
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static ("public"));

// banco de dados 
const mongoose= require ("mongoose");
mongoose.connect("mongodb+srv://gabi:localhost1803@cluster0.enfawmc.mongodb.net/?retryWrites=true&w=majority");
const PacienteModel=require("./models/PacienteModel");
const MedicoModel=require("./models/MedicoModel");




app.get("/",function(req,res){
    res.render("index")
})

app.get("/listar", async function(req,res){
    const listar=await PacienteModel.find()
    res.render("listarpaciente",{listar});
});

app.post("/listar", async function(req, res){
    const novoPaciente=new PacienteModel({
        codigo:req.body.codigo,
        nome:req.body.nome,
        idade:req.body.idade,
        cpf:req.body.cpf,
        telefone:req.body.telefone
    })
    await novoPaciente.save();
    res.redirect("/listar")  
});


app.get("/cadastrar",function(req,res){
    res.render("cadastrarpaciente")
});

app.get("/listar/:codigo", async function(req,res){
    const codigo= req.params.codigo;
    const resultado=await PacienteModel.findOne({codigo:codigo})
    res.render ("detalhepaciente",{resultado});
});


app.get("/medicos",async function(req,res){
    const listarMedico=await MedicoModel.find()
    res.render("listamedicos",{listarMedico});
});

app.post("/medicos",async function(req, res){
    const novoMedico=new MedicoModel({
        nome:req.body.nome,
        idade:req.body.idade,
        cpf:req.body.cpf,
        telefone:req.body.telefone,
        especialidade:req.body.especialidade,
        crm:req.body.crm,
    })
    await novoMedico.save();
    res.redirect("/medicos")  
});

app.get("/cadastro/medico",function(req,res){
    res.render("cadastromedico");
});

app.get("/medicos/:crm", async function(req,res){
    const crm= req.params.crm;
    const resultado2=await MedicoModel.findOne({crm:crm})
    res.render ("detalhemedico",{resultado2});
});




app.listen(999, function(){
    console.log("Servidor iniciado");
});


