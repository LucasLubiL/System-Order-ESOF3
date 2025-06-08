import { Request, Response } from "express";
import UsuarioBO from "../bo/UsuarioBO";
import Usuario from "../models/Usuario";

class UsuarioController {

    async login(req: Request, res: Response) {

        const { usuario, senha } = req.body;
        const usuarioBO = new UsuarioBO();
        const usuarioEncontrado = await usuarioBO.verificarLogin(usuario, senha); 

        if (usuarioEncontrado) {

            req.session.funcionarioId = usuarioEncontrado.idFuncionario;
            req.session.funcionarioNome = usuarioEncontrado.usuario;

            res.status(200).json(usuarioEncontrado);  // Envia os dados do usuário de volta ao frontend
       
        } else {

            res.status(401).json({ message: "Usuário ou senha inválidos" });  // Caso o login falhe, responde com erro
      
        }

    }

    async cadastrar(req: Request, res: Response){

        const data = req.body;
        const usuarioBO = new UsuarioBO();
        const user = new Usuario();
        user.usuario = data.usuario;
        user.senha = data.senha;
        user.idFuncionario = data.func;

        const resultado = await usuarioBO.cadastrar(user);

        if(resultado){

            res.status(201).json({ message: "Usuário cadastrado com sucesso!" });

        }else {

            res.status(409).json({ message: "Erro ao cadastrar Usuário" });
            
        }

    }

    async atualizar(req: Request, res: Response) {

        const usuarioData = req.body;
        const usuarioBO = new UsuarioBO();
        const usuario = new Usuario(
            usuarioData.id,
            usuarioData.usuario,
            usuarioData.senha,
            usuarioData.idfunc
        );

        const resultado = await usuarioBO.atualizar(usuario);

        if (resultado) {

        res.status(201).json({ message: "Usuário atualizado com sucesso!" });

        } else {

        res.status(400).json({ error: "Não é possível atualizar este usuário." });
        
        }
        
    }

    async excluir(req: Request, res: Response) {

        const usuarioData = req.body;
        const usuarioBO = new UsuarioBO();
        const usuario = new Usuario();
        usuario.id = usuarioData.id;
        usuario.idFuncionario = usuarioData.idfunc;
        

        const resultado = await usuarioBO.excluir(usuario);

        if (resultado) {

        res.status(201).json({ message: "Usuário exclúido com sucesso!" });

        } else {

        res.status(409).json({ error: "Não é possível excluir este Usuário." });
        
        }
        
    }

    async listarSelect(req: Request, res: Response){

        const usuarioBO = new UsuarioBO();

        const usuarios = await usuarioBO.listarSelect();

        if (usuarios) {
        res.status(200).json(usuarios);
        }else {
        res.status(500).json({ error: "Erro ao listar usuários" });
        }

    }
    
};

export default UsuarioController;
