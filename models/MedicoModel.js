const mongoose=require ("mongoose");
const Schema=mongoose.Schema;

const medicoSchema=Schema({
    nome:String,
    idade:String,
    cpf:String,
    telefone:String,
    especialidade:String,
    crm:String,

})

module.exports=mongoose.model("medico",medicoSchema);
