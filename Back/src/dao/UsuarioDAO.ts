import pool from "../config/database";
import Usuario from "../models/Usuario";

class UsuarioDAO {

    async buscarPorUsuarioESenha(usuario: string, senha: string): Promise<Usuario | null> {

        try{

            const query = "SELECT u.*, f.funcao FROM usuario u JOIN funcionario f ON f.idfunc = u.idfunc WHERE u.usuario = $1 and senha = $2";
            const values = [usuario, senha];

            const result = await pool.query(query, values);

            if (result.rows.length > 0) {
                const row = result.rows[0];
                const usuarioEncontrado = new Usuario(
                    row.iduser,
                    row.usuario,
                    row.senha,
                    row.idfunc,
                    row.funcao
                );
                return usuarioEncontrado;
            }
            

        }catch(error){
            console.error("Erro ao cadastar BANCO", error);
        }
        
        return null;
    }

    async cadastrarUsuario(user: Usuario): Promise<boolean> {

        try{

            const query = "INSERT INTO usuario(usuario,senha,idfunc) values($1, $2, $3) RETURNING iduser";
            const query2 = "UPDATE funcionario SET usuario = true WHERE idfunc = $1"
            const values = [user.usuario, user.senha, user.idFuncionario];
            const values2 = [user.idFuncionario]
            
            console.log("Executando INSERT com:", values);

            const result = await pool.query(query, values);

            if (result && result.rows && result.rows[0]) {
                
                pool.query(query2, values2);
                console.log(`Usuário cadastrado com sucesso! ID: ${result.rows[0].iduser}`);
                return true;

            } else {

                console.error("Erro: Nenhum dado foi inserido.");
                return false;

            }

        }catch (error) {
            console.error("Erro ao cadastrar usuário no banco:", error);
            return false;
        }

    }

    async verificar(idFunc: number): Promise<Boolean> {

        try{

            const query = "SELECT * FROM usuario WHERE idfunc = $1";
            const values = [idFunc];

            const result = await pool.query(query, values);

            return result.rows.length > 0;

        }catch(error){
            console.error("Erro ao buscar usuario no banco", error);
            return false
        }
         
    }

    async atualizar(usuario: Usuario): Promise<boolean> {

        try {

            const query = `UPDATE usuario SET usuario = $1, senha = $2, idfunc = $3 WHERE iduser = $4`;
            const values = [
                usuario.usuario,
                usuario.senha,
                usuario.idFuncionario,
                usuario.id
            ];

            console.log("Executando UPDATE com:", values);

            await pool.query(query, values);

            return true

        } catch (error) {
            console.error("Erro ao atualizar usuário no banco:", error);
            return false;
        }
        
    }

    async excluir(usuario: Usuario): Promise<boolean> {

        try {

            const query1 = `UPDATE funcionario SET usuario = false WHERE idfunc = $1`;
            const query = `DELETE FROM usuario WHERE iduser = $1`;
            const values = [
                usuario.id
            ]
            const values1 = [
                usuario.idFuncionario
            ]

            console.log("Executando DELETE com:", values);

            await pool.query(query, values);
            
            await pool.query(query1, values1);

            return true

        } catch (error) {
            console.error("Erro ao excluir usuário no banco:", error);
            return false;
        }
        
    }

    async listarSelect(){

        try{

            const query = `SELECT * FROM usuario ORDER BY iduser`;
            const result = await pool.query(query);
            return result.rows;

        }catch (error) {
            console.error("Erro ao buscar usuários no banco para o select do usuario:", error);
            return false;
        }
    }

}

export default UsuarioDAO;
