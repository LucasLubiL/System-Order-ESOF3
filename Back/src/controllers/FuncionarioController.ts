import { Request, Response } from "express";
import FuncionarioBO from "../bo/FuncionarioBO";
import Funcionario from "../models/Funcionario";

class FuncionarioController {

  async cadastrar(req: Request, res: Response) {

    console.log("Entrando no método cadastrar do FuncionarioController");

    const funcionarioData = req.body;
    const funcionarioBO = new FuncionarioBO();
    const funcionario = new Funcionario(
      funcionarioData.nome,
      funcionarioData.cpf,
      new Date(funcionarioData.data_nascimento),
      funcionarioData.endereco,
      funcionarioData.cidade,
      funcionarioData.estado,
      funcionarioData.funcao,
      funcionarioData.salario,
      funcionarioData.usuario
    );

    const resultado = await funcionarioBO.cadastrar(funcionario);

    if (resultado) {

      res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });

    } else {

      res.status(500).json({ error: "Erro ao cadastrar funcionário." });
      
    }
    
  }

  async atualizar(req: Request, res: Response) {

    const funcionarioData = req.body;
    const funcionarioBO = new FuncionarioBO();
    const funcionario = new Funcionario(
        funcionarioData.nome,
        funcionarioData.cpf,
        new Date(funcionarioData.data_nascimento),
        funcionarioData.endereco,
        funcionarioData.cidade,
        funcionarioData.estado,
        funcionarioData.funcao,
        funcionarioData.salario,
        true,
        Number(funcionarioData.id)
    );

    const resultado = await funcionarioBO.atualizar(funcionario);

    if (resultado) {

      res.status(201).json({ message: "Funcionário atualizado com sucesso!" });

    } else {

      res.status(400).json({ error: "Não é possível atualizar este funcionário." });
      
    }
    
  }

  async excluir(req: Request, res: Response) {

    const funcionarioData = req.body;
    const funcionarioBO = new FuncionarioBO();
    const id = funcionarioData.id;

    const resultado = await funcionarioBO.excluir(id);

    if (resultado) {

      res.status(201).json({ message: "Funcionário exclúido com sucesso!" });

    } else {

      res.status(409).json({ error: "Não é possível excluir este Funcionário." });
      
    }
    
  }

  async listarSelect(req: Request, res: Response){

    const funcionarioBO = new FuncionarioBO();

    const funcionarios = await funcionarioBO.listarSelect();

    if (funcionarios) {
       res.status(200).json(funcionarios);
    }else {
       res.status(500).json({ error: "Erro ao listar funcionários" });
    }

  }

}

export default FuncionarioController;
