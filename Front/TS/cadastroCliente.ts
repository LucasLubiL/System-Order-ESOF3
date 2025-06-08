let listaClientesConsulta: any[] = [];
let indiceClienteAtual = 0;

window.addEventListener("DOMContentLoaded", () => {

    const selectCadastro = document.getElementById("select-cadastro") as HTMLSelectElement;
    const selectCConsulta = document.getElementById("select-consulta") as HTMLSelectElement;
    const form1 = document.getElementById("formCliente") as HTMLDivElement;
    const btnSalvar1 = document.getElementById("bC") as HTMLDivElement;
    const form11 = document.getElementById("formClienteConsulta") as HTMLDivElement;
    const btnSalvar11 = document.getElementById("bCC") as HTMLDivElement;
    const selectClienteConsulta = document.getElementById("select-cliente-consulta") as HTMLSelectElement;
    const btnConsultaCli = document.getElementById("bConsultaCli") as HTMLButtonElement; 
    const inputCpfConsulta = document.getElementById("cpf-cliente-consulta-barra") as HTMLInputElement;
    const btnAnterior = document.getElementById("prev-btn") as HTMLLIElement;
    const btnProximo = document.getElementById("next-btn") as HTMLLIElement;

    if(btnAnterior && btnProximo){
        btnAnterior.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceClienteAtual > 0) {
                indiceClienteAtual--;
                const cliente = listaClientesConsulta[indiceClienteAtual];
                preencherCampoClienteConsulta(cliente);
                selectClienteConsulta.value = cliente.idcliente.toString();
            }
        });

        btnProximo.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceClienteAtual < listaClientesConsulta.length - 1) {
                indiceClienteAtual++;
                const cliente = listaClientesConsulta[indiceClienteAtual];
                preencherCampoClienteConsulta(cliente);
                selectClienteConsulta.value = cliente.idcliente.toString();
            }
        });
    }
    
    if(selectCadastro){
        selectCadastro.addEventListener("change", () => {

            if(selectCadastro.value === "cliente"){
                abrirMiniTelaCliente();
            }

        });
    }
    
    if(selectCConsulta){
        selectCConsulta.addEventListener("change", () => {

            if(selectCConsulta.value === "cliente-consulta"){
                abrirMiniTelaClienteConsulta();
            }

        });
    }
    
    if(selectClienteConsulta){
        selectClienteConsulta.addEventListener("change", () => {

            const idSelecionado = parseInt(selectClienteConsulta.value);
            const clienteSelecionado = listaClientesConsulta.find(cliente => cliente.idcliente === idSelecionado);
            
            if (clienteSelecionado) {
                preencherCampoClienteConsulta(clienteSelecionado);
            }

            indiceClienteAtual = listaClientesConsulta.findIndex(cliente => cliente.idcliente === idSelecionado);

        });
    }
   
    if(btnConsultaCli){
        btnConsultaCli.addEventListener("click", () => {

            const cpfDigitado = inputCpfConsulta.value.trim();

            const clienteEncontrado = listaClientesConsulta.find(cliente => cliente.cpf === cpfDigitado);

            if(clienteEncontrado){

                preencherCampoClienteConsulta(clienteEncontrado);

                selectClienteConsulta.value = clienteEncontrado.idcliente.toString();
            }

            indiceClienteAtual = listaClientesConsulta.findIndex(cliente => cliente.cpf === cpfDigitado);

        });
    }
    
  
    if(form1 && btnSalvar1){

        form1.addEventListener("submit", async(event) => {
            event.preventDefault();
            await salvarDadosCliente();
        });

    }

    if(form11 && btnSalvar11){

        form11.addEventListener("submit", async(event) => {
            event.preventDefault();
            await atualizarDadosCliente();
        });

    }

});

function habilitarEdicaoCliente(): void {

    const fieldset = document.getElementById("fieldset-cliente") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bCC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bCEx") as HTMLButtonElement;

    fieldset.disabled = false;
    btnSalvar.disabled = false;
    btnSalvar.style.opacity = "1";
    btnSalvar.style.cursor = "pointer";
    btnExcluir.style.opacity = "0.5";
    btnExcluir.style.cursor = "default";
    btnExcluir.disabled = true;
  
}

function closeModelCliente(){

    const alter = document.getElementById("mini-tela-cliente") as HTMLDivElement;
    const alter2 = document.getElementById("select-cadastro") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaCliente();

}

function closeModelClienteConsulta(){

    const alter = document.getElementById("mini-tela-cliente-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-cliente-consulta") as HTMLSelectElement;
    const alter3 = document.getElementById("select-consulta") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;
    const fieldset = document.getElementById("fieldset-cliente") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bCC") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    alter3.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaCliente();

}

function removerDadosTelaCliente(): void{

    const input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLInputElement>;

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }

}

function abrirMiniTelaCliente(): void{

    const alter = document.getElementById("mini-tela-cliente") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function abrirMiniTelaClienteConsulta(): void{

    carregarClientesConsulta();

    const alter = document.getElementById("mini-tela-cliente-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function preencherCampoClienteConsulta(cliente: any): void {
   
    (document.getElementById("id-cliente-consulta-barra") as HTMLInputElement).value = cliente.idcliente.toString();
    (document.getElementById("name-cliente-consulta") as HTMLInputElement).value = cliente.nome;
    (document.getElementById("cpf-cliente-consulta") as HTMLInputElement).value = cliente.cpf;
    (document.getElementById("birthdate-cliente-consulta") as HTMLInputElement).value = cliente.data_nascimento.substring(0, 10);
    (document.getElementById("address-cliente-consulta") as HTMLInputElement).value = cliente.endereco;
    (document.getElementById("city-cliente-consulta") as HTMLInputElement).value = cliente.cidade;
    (document.getElementById("state-cliente-consulta") as HTMLInputElement).value = cliente.estado;

}

async function carregarClientesConsulta(): Promise<void> {

    const select = document.getElementById("select-cliente-consulta") as HTMLSelectElement;
    indiceClienteAtual = 0;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/cliente/select");
    const clientes = await response.json();

    console.log(clientes)

    if(response.ok){

        listaClientesConsulta = clientes;

        clientes.forEach((cliente: {idcliente: number, nome: string}) => {
            const option = document.createElement("option");
            option.value = cliente.idcliente.toString();
            option.textContent = cliente.idcliente + " | " + cliente.nome;
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoClienteConsulta(clientes[0]);

    }else{
        console.error("Erro ao carregar clientes para o select.");
    }

}

async function salvarDadosCliente(): Promise<void> {

    const data = {

        nome: (document.getElementById("name-cliente") as HTMLInputElement).value,
        cpf: (document.getElementById("cpf-cliente") as HTMLInputElement).value,
        data_nascimento: (document.getElementById("birthdate-cliente") as HTMLInputElement).value,
        endereco: (document.getElementById("address-cliente") as HTMLInputElement).value,
        cidade: (document.getElementById("city-cliente") as HTMLInputElement).value,
        estado: (document.getElementById("state-cliente") as HTMLInputElement).value

    };


    const responseCliente = await fetch("http://localhost:3000/cliente/cadastrarCliente", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseCliente);

    if(responseCliente.ok){
        alert("Cliente cadastrado com sucesso!");
    }else{
        alert("Cliente já está cadastrado");
    }

    removerDadosTelaCliente();

}

async function atualizarDadosCliente(): Promise<void> {

    const data = {

        id: (document.getElementById("id-cliente-consulta-barra") as HTMLInputElement).value,
        nome: (document.getElementById("name-cliente-consulta") as HTMLInputElement).value,
        cpf: (document.getElementById("cpf-cliente-consulta") as HTMLInputElement).value,
        data_nascimento: (document.getElementById("birthdate-cliente-consulta") as HTMLInputElement).value,
        endereco: (document.getElementById("address-cliente-consulta") as HTMLInputElement).value,
        cidade: (document.getElementById("city-cliente-consulta") as HTMLInputElement).value,
        estado: (document.getElementById("state-cliente-consulta") as HTMLInputElement).value

    };


    const responseCliente = await fetch("http://localhost:3000/cliente/atualizarCliente", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseCliente);

    if(responseCliente.ok){
        alert("Cliente atualizado com sucesso!");
    }else{
        alert("Não foi possível atualizar o cliente.");
    }

    const fieldset = document.getElementById("fieldset-cliente") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bCC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bCEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarClientesConsulta();

}

async function excluirDadosCliente(): Promise<void> {

    const data = {

        id: (document.getElementById("id-cliente-consulta-barra") as HTMLInputElement).value,

    };


    const responseCliente = await fetch("http://localhost:3000/cliente/excluirCliente", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseCliente);

    if(responseCliente.ok){
        alert("Cliente excluído com sucesso!");
    }else{
        alert("Não foi possível excluir o cliente, pois o mesmo já possui vínculo(s) no sistema.");
    }

    const fieldset = document.getElementById("fieldset-cliente") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bCC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bCEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarClientesConsulta();

}