const  PacienteModel= require ("../models/PacienteModel");

class PacienteController{
 static async paginaInicial(req,res){
        res.render("index")
    }
    

     static async listar(req,res){
        const salvo= req.query.s;
        const deletado=req.query.d;
        const paciente=await PacienteModel.find()
        res.render("listarpaciente",{paciente,salvo,deletado});
    };
    
     static async cadastrarGet (req,res){
        const cod= req.params.codigo;
        let paciente={};
        if(cod){
            paciente=await PacienteModel.findOne({codigo:cod})
        }
        res.render("cadastrarpaciente",{paciente});
    };

    static async cadastrarPost (req,res){
        const paciente=req.body;
        // atualizacao
        if (paciente.id){
            await PacienteModel.findOneAndUpdate({codigo:paciente.codigo},
                {
                     nome:paciente.nome,
                     idade:paciente.idade,
                     telefone:paciente.telefone,
                     cpf:paciente.cpf

                });
                res.redirect("/paciente?s=1")
            }else {
            const novoPaciente=new PacienteModel({
                codigo:req.body.codigo,
                nome:req.body.nome,
                idade:req.body.idade,
                cpf:req.body.cpf,
                telefone:req.body.telefone
            })
            await novoPaciente.save();
            res.redirect("/paciente?s=1")
        }
    }



    static async detalhar (req,res){
        const codigo= req.params.codigo;
        const resultado=await PacienteModel.findOne({codigo:codigo})
        res.render ("detalhepaciente",{resultado});
    };
    static async remover (req,res){
        const codigo= req.params.codigo;
        await PacienteModel.findOneAndDelete({codigo:codigo})
        res.redirect ("/paciente?d=1");
    };

}

module.exports=PacienteController;
