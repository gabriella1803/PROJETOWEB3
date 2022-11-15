const  MedicoModel= require ("../models/MedicoModel");

class MedicoController{
    static async paginaInicial(req,res){
        res.render("index")
    }

    static async listar(req,res){
        const salvoM= req.query.sa;
        const deletadoM=req.query.de;
        const listarMedico=await MedicoModel.find()
        res.render("listamedicos",{listarMedico,salvoM,deletadoM});
    };

    static async cadastrarGetM(req,res){
        const crm= req.params.crm;
        let medico={};
        if(crm){
            medico=await MedicoModel.findOne({crm:crm})
        }
        res.render("cadastromedico",{medico});
    };

    static async cadastrarPostM(req,res){
        const medico=req.body;
        // atualizacao
        if (medico.id){
            await MedicoModel.findOneAndUpdate({crm:medico.crm},
                {
                     nome:medico.nome,
                     idade:medico.idade,
                     telefone:medico.telefone,
                     cpf:medico.cpf,
                     especialidade:medico.especialidade

                });
                res.redirect("/medico?sa=1")
            // cadastro 
            }else {
            const novoMedico=new MedicoModel({
            nome:req.body.nome,
            idade:req.body.idade,
            cpf:req.body.cpf,
            telefone:req.body.telefone,
            especialidade:req.body.especialidade,
            crm:req.body.crm,
            })
                await novoMedico.save();
                res.redirect("/medico?sa=1")  
        };

}

    static async detalharMedico(req,res){
        const crm= req.params.crm;
        const resultado2=await MedicoModel.findOne({crm:crm})
        res.render ("detalhemedico",{resultado2});
     };

     static async removerMedico(req,res){
        const crm= req.params.crm;
        await MedicoModel.findOneAndDelete({crm:crm})
        res.redirect ("/medico?de=1");
    };

}

module.exports=MedicoController;