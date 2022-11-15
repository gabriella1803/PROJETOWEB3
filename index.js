const express = require("express");
const res = require("express/lib/response");
const app = express();

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static ("public"));

require('dotenv/config');

const session=require ("express-session");
app.use(session({
    secret:'ifpe',
    saveUninitialized:false,
    resave:false
}));

//Rotas:
const pacienteRoutes=require("./routes/pacienteRoutes");
app.use(pacienteRoutes);

const medicoRoutes=require("./routes/medicoRoutes");
app.use(medicoRoutes);

const usuarioRoutes=require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

// banco de dados 
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const auth=require("./middlewares/usuarioAuth");
app.get ("/", auth ,function(req,res){
    res.render("index")
})

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
});
