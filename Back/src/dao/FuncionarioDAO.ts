import pool from "../config/database";
import Funcionario from "../models/Funcionario";

class FuncionarioDAO {

    async verificar(cpf: string): Promise<boolean> {

        try{

           const query = `SELECT * FROM funcionario WHERE cpf = $1`;

           const result = await pool.query(query, [cpf]);

           return result.rows.length > 0;

        } catch (error) {
            console.error("Erro ao buscar funcionário no banco:", error);
            return false;
        }


    }

    async cadastrar(funcionario: Funcionario): Promise<boolean> {

        try {

            const dataFormatada = new Date(funcionario.data_nascimento).toISOString().split('T')[0];
            const query = `INSERT INTO funcionario (nome, cpf, data_nascimento, funcao, salario, endereco, cidade, estado)VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING idfunc`;
            const values = [
                funcionario.nome,
                funcionario.cpf,
                dataFormatada,
                funcionario.funcao,
                funcionario.salario,
                funcionario.endereco,
                funcionario.cidade,
                funcionario.estado
            ];

            console.log("Executando INSERT com:", values);

            const result = await pool.query(query, values);

            if (result && result.rows && result.rows[0]) {

                console.log(`Funcionário cadastrado com sucesso! ID: ${result.rows[0].idfunc}`);
                return true;

            } else {

               console.error("Erro: Nenhum dado foi inserido.");
                return false;

            }

        } catch (error) {
            console.error("Erro ao cadastrar funcionário no banco:", error);
            return false;
        }
        
    }

    async atualizar(funcionario: Funcionario): Promise<boolean> {

        try {

            const dataFormatada = new Date(funcionario.data_nascimento).toISOString().split('T')[0];
            const query = `UPDATE funcionario SET nome = $1, cpf = $2, data_nascimento = $3, endereco = $4, cidade = $5, estado = $6, funcao = $7, salario = $8 WHERE idfunc = $9`;
            const values = [
                funcionario.nome,
                funcionario.cpf,
                dataFormatada,
                funcionario.endereco,
                funcionario.cidade,
                funcionario.estado,
                funcionario.funcao,
                funcionario.salario,
                funcionario.id
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao atualizar funcionário no banco:", error);
            return false;
        }
        
    }

    async excluir(id: number): Promise<boolean> {

        try {

            const query = `DELETE FROM funcionario WHERE idfunc = $1`;
            const values = [
                id
            ];

            console.log("Executando DELETE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao excluir funcionário no banco:", error);
            return false;
        }
        
    }

    async listarSelect(){

        try{

            const query = `SELECT * FROM funcionario ORDER BY idfunc`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar funcionário no banco para o select do usuario:", error);
            return false;
        }
    }

}

export default FuncionarioDAO;
