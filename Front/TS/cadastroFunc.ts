let listaFuncionariosConsulta: any[] = [];
let indiceFuncionarioAtual = 0;

window.addEventListener("DOMContentLoaded", () => {

    const selectCadastro = document.getElementById("select-cadastro") as HTMLSelectElement;
    const selectFConsulta = document.getElementById("select-consulta") as HTMLSelectElement;
    const form = document.getElementById("formFunc") as HTMLDivElement | null;
    const btnSalvar = document.getElementById("bF") as HTMLDivElement | null;
    const formm = document.getElementById("formFuncConsulta") as HTMLDivElement | null;
    const btnSalvarr = document.getElementById("bFC") as HTMLDivElement | null;
    const selectFuncConsulta = document.getElementById("select-funcionario-consulta") as HTMLSelectElement;
    const btnConsultaFunc = document.getElementById("bConsultaFunc") as HTMLButtonElement; 
    const inputCpfConsultaFunc = document.getElementById("cpf-funcionario-consulta-barra") as HTMLInputElement;
    const btnAnteriorF = document.getElementById("prev-btnF") as HTMLLIElement;
    const btnProximoF = document.getElementById("next-btnF") as HTMLLIElement;

    if(btnAnteriorF && btnProximoF){
        btnAnteriorF.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceFuncionarioAtual > 0) {
                indiceFuncionarioAtual--;
                const func = listaFuncionariosConsulta[indiceFuncionarioAtual];
                preencherCampoFuncionarioConsulta(func);
                selectFuncConsulta.value = func.idfunc.toString();
            }
        });

        btnProximoF.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceFuncionarioAtual < listaFuncionariosConsulta.length - 1) {
                indiceFuncionarioAtual++;
                const func = listaFuncionariosConsulta[indiceFuncionarioAtual];
                preencherCampoFuncionarioConsulta(func);
                selectFuncConsulta.value = func.idfunc.toString();
            }
        });
    }
    
    if(selectCadastro){
        selectCadastro.addEventListener("change", () => {

        if(selectCadastro.value === "funcionario"){
            abrirMiniTela();
        }

       });
    }
    
    if(selectFConsulta){
        selectFConsulta.addEventListener("change", () => {

        if(selectFConsulta.value === "funcionario-consulta"){
            abrirMiniTelaFuncionarioConsulta();
        }

        });
    }
    
    if(selectFuncConsulta){
        selectFuncConsulta.addEventListener("change", () => {

        const idSelecionado = parseInt(selectFuncConsulta.value);
        const funcSelecionado = listaFuncionariosConsulta.find(func => func.idfunc === idSelecionado);
        
        if (funcSelecionado) {
            preencherCampoFuncionarioConsulta(funcSelecionado);
        }

        indiceFuncionarioAtual = listaFuncionariosConsulta.findIndex(func => func.idfunc === idSelecionado);

        });

    }
    
    if(btnConsultaFunc){
        btnConsultaFunc.addEventListener("click", () => {

        const cpfDigitado = inputCpfConsultaFunc.value.trim();

        const funcionarioEncontrado = listaFuncionariosConsulta.find(func => func.cpf === cpfDigitado);

        if(funcionarioEncontrado){

            preencherCampoFuncionarioConsulta(funcionarioEncontrado);

            selectFuncConsulta.value = funcionarioEncontrado.idfunc.toString();
        }

        indiceFuncionarioAtual = listaFuncionariosConsulta.findIndex(func => func.cpf === cpfDigitado);

        });
    }

    if(form && btnSalvar){

        form.addEventListener("submit", async(event) => {
            event.preventDefault();
            await salvarDadosFuncionario();
        });

    }

    if(formm && btnSalvarr){

        formm.addEventListener("submit", async(event) => {
            event.preventDefault();
            await atualizarDadosFuncionario();
        });

    }

});

function habilitarEdicaoFuncionario(): void {

    const fieldset = document.getElementById("fieldset-funcionario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bFC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bFEx") as HTMLButtonElement;

    fieldset.disabled = false;
    btnSalvar.disabled = false;
    btnSalvar.style.opacity = "1";
    btnSalvar.style.cursor = "pointer";
    btnExcluir.style.opacity = "0.5";
    btnExcluir.style.cursor = "default";
    btnExcluir.disabled = true;
  
}

function closeModel(){

    const alter = document.getElementById("mini-tela") as HTMLDivElement;
    const alter2 = document.getElementById("select-cadastro") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaFuncionario();

}

function closeModelFuncionarioConsulta(){

    const alter = document.getElementById("mini-tela-funcionario-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-funcionario-consulta") as HTMLSelectElement;
    const alter3 = document.getElementById("select-consulta") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;
    const fieldset = document.getElementById("fieldset-funcionario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bFC") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    alter3.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaFuncionario();

}

function removerDadosTelaFuncionario(): void{

    const input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLInputElement>;
    const funcao = document.getElementById("position-funcionario") as HTMLSelectElement;

    funcao.selectedIndex = 0;

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }

}

function abrirMiniTela(): void{

    const alter = document.getElementById("mini-tela") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function abrirMiniTelaFuncionarioConsulta(): void{

    carregarFuncionariosConsulta();

    const alter = document.getElementById("mini-tela-funcionario-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function preencherCampoFuncionarioConsulta(funcionario: any): void {
   
    (document.getElementById("id-funcionario-consulta-barra") as HTMLInputElement).value = funcionario.idfunc.toString();
    (document.getElementById("name-funcionario-consulta") as HTMLInputElement).value = funcionario.nome;
    (document.getElementById("cpf-funcionario-consulta") as HTMLInputElement).value = funcionario.cpf;
    (document.getElementById("birthdate-funcionario-consulta") as HTMLInputElement).value = funcionario.data_nascimento.substring(0, 10);
    (document.getElementById("address-funcionario-consulta") as HTMLInputElement).value = funcionario.endereco;
    (document.getElementById("city-funcionario-consulta") as HTMLInputElement).value = funcionario.cidade;
    (document.getElementById("state-funcionario-consulta") as HTMLInputElement).value = funcionario.estado;
    (document.getElementById("salary-funcionario-consulta") as HTMLInputElement).value = funcionario.salario.toString();
    (document.getElementById("position-funcionario-consulta") as HTMLSelectElement).value = funcionario.funcao;

}

async function salvarDadosFuncionario(): Promise<void> {

    const data = {

        nome: (document.getElementById("name-funcionario") as HTMLInputElement).value,
        cpf: (document.getElementById("cpf-funcionario") as HTMLInputElement).value,
        data_nascimento: (document.getElementById("birthdate-funcionario") as HTMLInputElement).value,
        funcao: (document.getElementById("position-funcionario") as HTMLSelectElement).value,
        salario: parseFloat((document.getElementById("salary-funcionario") as HTMLInputElement).value),
        endereco: (document.getElementById("address-funcionario") as HTMLInputElement).value,
        cidade: (document.getElementById("city-funcionario") as HTMLInputElement).value,
        estado: (document.getElementById("state-funcionario") as HTMLInputElement).value

    };


    const response = await fetch("http://localhost:3000/funcionario/cadastrar", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(response);

    if(response.ok){
        alert("Funcionário cadastrado com sucesso!");
    }else{
        alert("Funcionario já cadastrado.");
    }

    removerDadosTelaFuncionario();

}

async function carregarFuncionariosConsulta(): Promise<void> {

    const select = document.getElementById("select-funcionario-consulta") as HTMLSelectElement;
    indiceFuncionarioAtual = 0;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/funcionario/select");
    const funcionarios = await response.json();

    if(response.ok){

        listaFuncionariosConsulta = funcionarios;

        funcionarios.forEach((func: {idfunc: number, nome: string}) => {
            const option = document.createElement("option");
            option.value = func.idfunc.toString();
            option.textContent = func.idfunc + " | " + func.nome;
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoFuncionarioConsulta(funcionarios[0]);

    }else{
        console.error("Erro ao carregar funcionarios para o select.");
    }

}

async function atualizarDadosFuncionario(): Promise<void> {

    const data = {

        id: (document.getElementById("id-funcionario-consulta-barra") as HTMLInputElement).value,
        nome: (document.getElementById("name-funcionario-consulta") as HTMLInputElement).value,
        cpf: (document.getElementById("cpf-funcionario-consulta") as HTMLInputElement).value,
        data_nascimento: (document.getElementById("birthdate-funcionario-consulta") as HTMLInputElement).value,
        funcao: (document.getElementById("position-funcionario-consulta") as HTMLSelectElement).value,
        salario: parseFloat((document.getElementById("salary-funcionario-consulta") as HTMLInputElement).value),
        endereco: (document.getElementById("address-funcionario-consulta") as HTMLInputElement).value,
        cidade: (document.getElementById("city-funcionario-consulta") as HTMLInputElement).value,
        estado: (document.getElementById("state-funcionario-consulta") as HTMLInputElement).value

    };


    const responseFunc = await fetch("http://localhost:3000/funcionario/atualizarFuncionario", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseFunc);

    if(responseFunc.ok){
        alert("Funcionário atualizado com sucesso!");
    }else{
        alert("Não foi possível atualizar o funcionário.");
    }

    const fieldset = document.getElementById("fieldset-funcionario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bFC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bFEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarFuncionariosConsulta();

}

async function excluirDadosFuncionario(): Promise<void> {

    const data = {

        id: (document.getElementById("id-funcionario-consulta-barra") as HTMLInputElement).value,

    };


    const responseFunc = await fetch("http://localhost:3000/funcionario/excluirFuncionario", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseFunc);

    if(responseFunc.ok){
        alert("Funcionário excluído com sucesso!");
    }else{
        alert("Não foi possível excluir o funcionário, pois o mesmo já possui vínculos no sistema.");
    }

    const fieldset = document.getElementById("fieldset-funcionario") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bFC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bFEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarFuncionariosConsulta();

}