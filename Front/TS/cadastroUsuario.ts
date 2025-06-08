let listaUsuariosConsulta: any[] = [];
let listaUsuariosFuncionarios: any[] = [];
let indiceUsuarioAtual = 0;

window.addEventListener("DOMContentLoaded", () => {

    const selectCadastro = document.getElementById("select-cadastro") as HTMLSelectElement;
    const selectUConsulta = document.getElementById("select-consulta") as HTMLSelectElement;
    const form2 = document.getElementById("formUser") as HTMLDivElement;
    const btnSalvar2 = document.getElementById("bU") as HTMLDivElement;
    const selectUserConsulta = document.getElementById("select-usuario-consulta") as HTMLSelectElement; 
    const form22 = document.getElementById("formUserConsulta") as HTMLDivElement;
    const btnSalvar22 = document.getElementById("bUC") as HTMLDivElement;
    const btnAnteriorU = document.getElementById("prev-btnU") as HTMLLIElement;
    const btnProximoU = document.getElementById("next-btnU") as HTMLLIElement;

    if(btnAnteriorU && btnProximoU){
        btnAnteriorU.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceUsuarioAtual > 0) {
                indiceUsuarioAtual--;
                const user = listaUsuariosConsulta[indiceUsuarioAtual];
                preencherCampoUsuariosConsulta(user);
                selectUserConsulta.value = user.iduser.toString();
            }
        });

        btnProximoU.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceUsuarioAtual < listaUsuariosConsulta.length - 1) {
                indiceUsuarioAtual++;
                const user = listaUsuariosConsulta[indiceUsuarioAtual];
                preencherCampoUsuariosConsulta(user);
                selectUserConsulta.value = user.iduser.toString();
            }
        });
    }
    
    if(selectCadastro){
        selectCadastro.addEventListener("change", () => {

        if(selectCadastro.value === "usuario"){
            abrirMiniTelaUsuario();
        }

        });
    }
    
    if(selectUConsulta){
        selectUConsulta.addEventListener("change", () => {

        if(selectUConsulta.value === "usuario-consulta"){
            abrirMiniTelaUsuarioConsulta();
        }

        });
    }
    
    if(selectUserConsulta){
        selectUserConsulta.addEventListener("change", () => {

        const idSelecionado = parseInt(selectUserConsulta.value);
        const userSelecionado = listaUsuariosConsulta.find(user => user.iduser === idSelecionado);
        
        if (userSelecionado) {
            preencherCampoUsuariosConsulta(userSelecionado);
        }

        indiceUsuarioAtual = listaUsuariosConsulta.findIndex(user => user.iduser === idSelecionado);

        });
    }
    

    if(form2 && btnSalvar2){

        form2.addEventListener("submit", async(event) => {
            event.preventDefault();
            await salvarDadosUsuario();
        });

    }

    if(form22 && btnSalvar22){

        form22.addEventListener("submit", async(event) => {
            event.preventDefault();
            await atualizarDadosUsuario();
        });

    }

});

function habilitarEdicaoUsuario(): void {

    const fieldset = document.getElementById("fieldset-usuario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bUC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bUEx") as HTMLButtonElement;

    fieldset.disabled = false;
    btnSalvar.disabled = false;
    btnSalvar.style.opacity = "1";
    btnSalvar.style.cursor = "pointer";
    btnExcluir.style.opacity = "0.5";
    btnExcluir.style.cursor = "default";
    btnExcluir.disabled = true;
  
}

function closeModelUsuario(){

    const alter = document.getElementById("mini-tela-usuario") as HTMLDivElement;
    const alter2 = document.getElementById("select-cadastro") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaUsuario();

}

function closeModelUsuarioConsulta(){

    const alter = document.getElementById("mini-tela-usuario-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-usuario-consulta") as HTMLSelectElement;
    const alter3 = document.getElementById("select-consulta") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;
    const fieldset = document.getElementById("fieldset-usuario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bUC") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    alter3.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaUsuario();

}

function removerDadosTelaUsuario(): void{

    const input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLInputElement>;
    const select = document.getElementById("select-funcionarios") as HTMLSelectElement;

    select.selectedIndex = 0;

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }

}

function abrirMiniTelaUsuario(): void{

    carregarFuncionarios();

    const alter = document.getElementById("mini-tela-usuario") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

async function abrirMiniTelaUsuarioConsulta(): Promise<void>{

    await carregarFuncionarios();
    await carregarUsuariosConsulta();

    const alter = document.getElementById("mini-tela-usuario-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function preencherCampoUsuariosConsulta(usuario: any): void {
   
    (document.getElementById("id-usuario-consulta-barra") as HTMLInputElement).value = usuario.iduser.toString();
    (document.getElementById("user-funcionario-consulta") as HTMLInputElement).value = usuario.usuario;
    (document.getElementById("password-funcionario-consulta") as HTMLInputElement).value = usuario.senha;
    (document.getElementById("select-funcionarios-consulta") as HTMLSelectElement).value = usuario.idfunc;
    
}

async function salvarDadosUsuario(): Promise<void> {

    const data = {

        usuario: (document.getElementById("user-funcionario") as HTMLInputElement).value,
        senha: (document.getElementById("password-funcionario") as HTMLInputElement).value,
        func: (document.getElementById("select-funcionarios") as HTMLSelectElement).value

    };

    console.log(data)

    const responseUsuario = await fetch("http://localhost:3000/usuarios/cadastrarUser", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseUsuario);

    if(responseUsuario.ok){
        alert("Usuário cadastrado com sucesso!");
    }else{
        alert("Usuário já cadastrado.");
    }

    removerDadosTelaUsuario();

}

async function carregarFuncionarios(): Promise<void> {

    const select = document.getElementById("select-funcionarios") as HTMLSelectElement;
    const select2 = document.getElementById("select-funcionarios-consulta") as HTMLSelectElement;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    select2.innerHTML = "";
    const defaultOption2 = document.createElement("option");
    defaultOption2.value = "";
    defaultOption2.textContent = "Selecione";
    select2.appendChild(defaultOption2);

    const response = await fetch("http://localhost:3000/funcionario/select");
    const funcionarios = await response.json();

    if(response.ok){

        listaUsuariosFuncionarios = funcionarios;

        funcionarios.forEach((func: {idfunc: number, nome: string}) => {
            const option = document.createElement("option");
            option.value = func.idfunc.toString();
            option.textContent = func.idfunc + " | " + func.nome;
            select.appendChild(option);

            const option2 = document.createElement("option");
            option2.value = func.idfunc.toString();
            option2.textContent = func.idfunc + " | " + func.nome;
            select2.appendChild(option2);
        });

    }else{
        console.error("Erro ao carregar funcionarios para o select.");
    }

}

async function carregarUsuariosConsulta(): Promise<void> {

    const select = document.getElementById("select-usuario-consulta") as HTMLSelectElement;
    indiceUsuarioAtual = 0;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/usuarios/selectUsuario");
    const usuarios = await response.json();

    if(response.ok){

        listaUsuariosConsulta = usuarios

        usuarios.forEach((user: {iduser: number, usuario: string}) => {
            const option = document.createElement("option");
            option.value = user.iduser.toString();
            option.textContent = user.iduser + " | " + user.usuario;
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoUsuariosConsulta(usuarios[0]);

    }else{
        console.error("Erro ao carregar usuários para o select.");
    }

}

async function atualizarDadosUsuario(): Promise<void> {

    const data = {

        id: (document.getElementById("id-usuario-consulta-barra") as HTMLInputElement).value,
        usuario: (document.getElementById("user-funcionario-consulta") as HTMLInputElement).value,
        senha: (document.getElementById("password-funcionario-consulta") as HTMLInputElement).value,
        idfunc: (document.getElementById("select-funcionarios-consulta") as HTMLSelectElement).value,

    };

    const responseUser = await fetch("http://localhost:3000/usuarios/atualizarUsuario", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseUser);

    if(responseUser.ok){
        alert("Usuário atualizado com sucesso!");
    }else{
        alert("Não foi possível atualizar o usuário.");
    }

    const fieldset = document.getElementById("fieldset-usuario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bUC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bUEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarUsuariosConsulta();

}

async function excluirDadosUsuario(): Promise<void> {

    const data = {

        id: (document.getElementById("id-usuario-consulta-barra") as HTMLInputElement).value,
        idfunc: (document.getElementById("select-funcionarios-consulta") as HTMLSelectElement).value,

    };

    console.log(data);

    const responseUser = await fetch("http://localhost:3000/usuarios/excluirUsuario", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseUser);

    if(responseUser.ok){
        alert("Usuário excluído com sucesso!");
    }else{
        alert("Não foi possível excluir o usuário, pois o mesmo já possui vínculos no sistema.");
    }

    const fieldset = document.getElementById("fieldset-usuario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bUC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bUEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarUsuariosConsulta();

}