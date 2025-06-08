import pool from "../config/database";
import Ordem from "../models/Ordem";

class OrdemDAO {

    async criarOrdem(ordem: Ordem): Promise<boolean> {

        try {

            const query = `INSERT INTO ordem (valor, idpag, idservice, idcliente, idfunc, description_cliente, status_char)VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING idord`;
            const values = [
                ordem.valor,
                ordem.idPag,
                ordem.idService,
                ordem.idCliente,
                ordem.idFunc,
                ordem.descriptionCliente,
                "Aberto"
            ];

            console.log("Executando INSERT ORDEM com:", values);

            const result = await pool.query(query, values);

            if (result && result.rows && result.rows[0]) {

                console.log(`OS criada com sucesso! ID: ${result.rows[0].idord}`);
                return true;

            } else {

               console.error("Erro: Nenhum dado da OS foi inserido.");
                return false;

            }

        } catch (error) {
            console.error("Erro ao criar OS no banco:", error);
            return false;
        }
        
    }

    async finalizarOrdem(ordem: Ordem): Promise<boolean> {

        try {

            const query = `UPDATE ordem SET status = 1, status_char = 'Finalizado', idpag = $1, valor = $2, description = $3, ord_data_final = NOW() WHERE idord = $4`;
            const values = [
                ordem.idPag,
                ordem.valor,
                ordem.description,
                ordem.id    
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao finalizar O.S. no banco:", error);
            return false;
        }
        
    }

    async enviarOrdem(ordem: Ordem): Promise<boolean> {

        try {

            const query = `UPDATE ordem SET idpag = $1, valor = $2, msg_dev = $3, dev = 1 WHERE idord = $4`;
            const values = [
                ordem.idPag,
                ordem.valor,
                ordem.msgDev,
                ordem.id    
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao enviar O.S. no banco:", error);
            return false;
        }
        
    }

    async cancelarOrdem(idord: number): Promise<boolean> {

        try {

            const query = `UPDATE ordem SET status = 2, status_char = 'Cancelado' WHERE idord = $1`;
            const values = [
                idord
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao cancelar a ordem no banco:", error);
            return false;
        }
        
    }

    async listarSelect(){

        try{

            const query = `SELECT * FROM ordem ORDER BY idord`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar O.S. no banco:", error);
            return false;
        }
    }

    async relato(){

        try{

            const query = `SELECT * FROM ordem WHERE dev = 1`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar O.S. no banco:", error);
            return false;
        }
    }

    async finalizar(relato: Ordem): Promise<boolean> {

        try {

            const query = `UPDATE ordem SET status = 1, status_char = 'Finalizado', dev = 0, description = $1, ord_data_final = NOW() WHERE idord = $2`;
            const values = [
                relato.description,
                relato.id
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao finalizar O.S. no banco:", error);
            return false;
        }
        
    }
        
}

export default OrdemDAO;
