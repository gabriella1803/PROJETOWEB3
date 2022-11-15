const mongoose=require ("mongoose");
const Schema=mongoose.Schema;

const pacienteSchema=Schema({
    codigo:Number,
    nome:String,
    idade:String,
    cpf:String,
    telefone:String
})

module.exports=mongoose.model("paciente",pacienteSchema);
