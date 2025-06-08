import PagamentoDAO from "../dao/PagamentoDAO";
import Pagamento from "../models/Pagamento";

class PagamentoBO {

    private pagamentoDAO: PagamentoDAO;

    constructor() {

      this.pagamentoDAO = new PagamentoDAO();

    }

    async cadastrar(pagamento: Pagamento): Promise<boolean> {

      const verific = await this.pagamentoDAO.verificar(pagamento.nome);

      if(verific){
        return false;
      }
      
      return await this.pagamentoDAO.cadastrar(pagamento);

    }

    async atualizar(pagamento: Pagamento): Promise<boolean> {

        return await this.pagamentoDAO.atualizar(pagamento);
      
    }

    async excluir(idpag: number): Promise<boolean> {

        return await this.pagamentoDAO.excluir(idpag);
      
    }

    async listarSelect(){

      return await this.pagamentoDAO.listarSelect();

    }

    async pagamentoRegistro(){

      return await this.pagamentoDAO.pagamentoRegistro();

    }

}

export default PagamentoBO;
