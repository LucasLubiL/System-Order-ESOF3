import ClienteDAO from "../dao/ClienteDAO";
import Cliente from "../models/Cliente";

class ClienteBO {

   private clienteDAO: ClienteDAO;

   constructor() {

       this.clienteDAO = new ClienteDAO();

   }

   async cadastrar(cliente: Cliente): Promise<boolean> {

      const verific = await this.clienteDAO.verificar(cliente.cpf);

      if(verific){
         return false;
      }

      return await this.clienteDAO.cadastrar(cliente);
      
   }

   async excluir(id: number): Promise<boolean> {

      return await this.clienteDAO.excluir(id);
      
   }

   async atualizar(cliente: Cliente): Promise<boolean> {

      return await this.clienteDAO.atualizar(cliente);
      
   }
   
   async listarSelect(){

      return await this.clienteDAO.listarSelect();

   }

   async clienteRegistro(){

      return await this.clienteDAO.clienteRegistro();

   }

}

export default ClienteBO;
