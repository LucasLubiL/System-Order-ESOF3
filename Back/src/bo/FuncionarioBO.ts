import FuncionarioDAO from "../dao/FuncionarioDAO";
import Funcionario from "../models/Funcionario";

class FuncionarioBO {

    private funcionarioDAO: FuncionarioDAO;

    constructor() {

      this.funcionarioDAO = new FuncionarioDAO();

    }

    async cadastrar(funcionario: Funcionario): Promise<boolean> {

      const verific = await this.funcionarioDAO.verificar(funcionario.cpf);

      if(verific){
          return false;
      }

      return await this.funcionarioDAO.cadastrar(funcionario);
      
    }

    async atualizar(funcionario: Funcionario): Promise<boolean> {

      return await this.funcionarioDAO.atualizar(funcionario);
      
    }

    async excluir(id: number): Promise<boolean> {

      return await this.funcionarioDAO.excluir(id);
      
    }

    async listarSelect(){

      return await this.funcionarioDAO.listarSelect();
      
    }

}

export default FuncionarioBO;
