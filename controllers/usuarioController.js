const usuarioModel = require("../models/usuarioModel");
const bcryptjs=require("bcryptjs");

class usuarioController{
    static async paginaInicial(req, res){
        res.render("index")
    }

    static async listar(req, res){
        const salvo=req.query.s;
        const deletado=req.query.d;
        const usuarios = await usuarioModel.find();
        res.render("usuario/listar", {usuarios,salvo,deletado});
    }
    // LOGIN:
    static async login(req,res){
        const erro=req.query.e;
        res.render ("usuario",{erro});
    }
        static async loginPost (req,res){
        const usuario=req.body;
        const resultado= await usuarioModel.findOne({email: usuario.email});
        if (resultado){
            if(bcryptjs.compareSync(usuario.senha,resultado.senha)){
                req.session.usuario=resultado.email;
                res.redirect("/");
            }else {
                res.send ("usuario?e=1");
            }
        }else {
            res.send ("Email e/ou senha inválido(s)");
        }
   }

    static async cadastrarGet(req, res){
        const email= req.params.email;
        let usuario={};
        if(email){
            usuario=await usuarioModel.findOne({email:email})
        }
        res.render("usuario/cadastrar",{usuario});
    }

    static async cadastrarPost(req, res){
        const usuario=req.body;
        const salt= bcryptjs.genSaltSync();
        const hash=bcryptjs.hashSync(usuario.senha,salt);
        //atualizacao
        if(usuario.id){
            await usuarioModel.findOneAndUpdate({ email:usuario.email},
            {

               nome:usuario.nome,
               senha:hash

            });
        res.redirect("/usuarios?s=1")  
    } else{ //cadastro
        const novoUsuario=new usuarioModel({
            email:req.body.email,
            nome:req.body.nome,
            senha:hash
        });

        await novoUsuario.save();
        res.redirect("/usuarios?s=1")  
    }

}
//     static async relatorio (req,res){
//         const usuario= await usuarioModel.find();
//         res.render("usuario/relatorio",{usuario})
// }
//     static async detalhar(req,res){
//         const email= req.params.email;    
//         const resultado = await usuarioModel.findOne({email:email})
//         res.render ("usuario/detalhes",{resultado});
//     }
    
//     static async remover(req,res){
//         const email= req.params.email;  
//         await usuarioModel.findOneAndDelete({email:email})
//        res.redirect("/usuarios?d=1")
//     }
    
}
module.exports = usuarioController;