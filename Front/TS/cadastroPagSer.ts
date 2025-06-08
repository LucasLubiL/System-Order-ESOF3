let listaPagamentosConsulta: any[] = [];
let listaServicosConsulta: any[] = [];
let indicePagAtual = 0;
let indiceSerAtual = 0;

window.addEventListener("DOMContentLoaded", () => {

    const selectCadastro = document.getElementById("select-cadastro") as HTMLSelectElement;
    const selectPSConsulta = document.getElementById("select-consulta") as HTMLSelectElement;
    const form4 = document.getElementById("formPag") as HTMLDivElement | null;
    const btnSalvar4 = document.getElementById("bP") as HTMLDivElement | null;
    const form5 = document.getElementById("formService") as HTMLDivElement | null;
    const btnSalvar5 = document.getElementById("bS") as HTMLDivElement | null;
    const selectPagConsulta = document.getElementById("select-pagamento-consulta") as HTMLSelectElement;
    const selectSerConsulta = document.getElementById("select-servico-consulta") as HTMLSelectElement;
    const form44 = document.getElementById("formPagConsulta") as HTMLDivElement | null;
    const btnSalvar44 = document.getElementById("bPC") as HTMLDivElement | null;
    const form55 = document.getElementById("formServiceConsulta") as HTMLDivElement | null;
    const btnSalvar55 = document.getElementById("bSC") as HTMLDivElement | null;
    const btnAnteriorP = document.getElementById("prev-btnP") as HTMLLIElement | null;
    const btnProximoP = document.getElementById("next-btnP") as HTMLLIElement | null;
    const btnAnteriorS = document.getElementById("prev-btnS") as HTMLLIElement | null;
    const btnProximoS = document.getElementById("next-btnS") as HTMLLIElement | null;
    
    if(btnAnteriorP && btnProximoP){
        btnAnteriorP.addEventListener("click", (event) => {
            event.preventDefault();

            if (indicePagAtual > 0) {
                indicePagAtual--;
                const pag = listaPagamentosConsulta[indicePagAtual];
                preencherCampoPagamentoConsulta(pag);
                selectPagConsulta.value = pag.idpag.toString();
            }
        });

        btnProximoP.addEventListener("click", (event) => {
            event.preventDefault();

            if (indicePagAtual < listaPagamentosConsulta.length - 1) {
                indicePagAtual++;
                const pag = listaPagamentosConsulta[indicePagAtual];
                preencherCampoPagamentoConsulta(pag);
                selectPagConsulta.value = pag.idpag.toString();
            }
        });
    }
    
    if(btnAnteriorS && btnProximoS){
        btnAnteriorS.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceSerAtual > 0) {
                indiceSerAtual--;
                const ser = listaServicosConsulta[indiceSerAtual];
                preencherCampoServicoConsulta(ser);
                selectSerConsulta.value = ser.idservice.toString();
            }
        });

        btnProximoS.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceSerAtual < listaServicosConsulta.length - 1) {
                indiceSerAtual++;
                const ser = listaServicosConsulta[indiceSerAtual];
                preencherCampoServicoConsulta(ser);
                selectSerConsulta.value = ser.idservice.toString();
            }
        });
    }
    
    if(selectCadastro){
        selectCadastro.addEventListener("change", () => {

            if(selectCadastro.value === "pagamento"){
                abrirMiniTelaPagamento();
            }else if(selectCadastro.value === "servico"){
                abrirMiniTelaServico();
            }

        });
    }
    
    if(selectPSConsulta){
        selectPSConsulta.addEventListener("change", () => {

            if(selectPSConsulta.value === "pagamento-consulta"){
                abrirMiniTelaPagamentoConsulta();
            }else if(selectPSConsulta.value === "servico-consulta"){
                abrirMiniTelaServicoConsulta();
            }

        });
    }
    
    if(selectPagConsulta){
        selectPagConsulta.addEventListener("change", () => {

            const idSelecionado = parseInt(selectPagConsulta.value);
            const pagSelecionado = listaPagamentosConsulta.find(pag => pag.idpag === idSelecionado);
            
            if (pagSelecionado) {
                preencherCampoPagamentoConsulta(pagSelecionado);
            }

            indicePagAtual = listaPagamentosConsulta.findIndex(pag => pag.idpag === idSelecionado);

        });
    }
    
    if(selectSerConsulta){
        selectSerConsulta.addEventListener("change", () => {

            const idSelecionado = parseInt(selectSerConsulta.value);
            const serSelecionado = listaServicosConsulta.find(ser => ser.idservice === idSelecionado);
            
            if (serSelecionado) {
                preencherCampoServicoConsulta(serSelecionado);
            }

            indiceSerAtual = listaServicosConsulta.findIndex(ser => ser.idservice === idSelecionado);

        });
    }
    
    if(form4 && btnSalvar4){

        form4.addEventListener("submit", async(event) => {
            event.preventDefault();
            await salvarDadosPagamento();
        });

    }

    if(form44 && btnSalvar44){

        form44.addEventListener("submit", async(event) => {
            event.preventDefault();
            await atualizarDadosPagamento();
        });

    }

    if(form5 && btnSalvar5){

        form5.addEventListener("submit", async(event) => {
            event.preventDefault();
            await salvarDadosServico();
        });

    }

    if(form55 && btnSalvar55){

        form55.addEventListener("submit", async(event) => {
            event.preventDefault();
            await atualizarDadosServico();
        });

    }

});

function habilitarEdicaoPagamento(): void {

    const fieldset = document.getElementById("fieldset-pagamento") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bPC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bPEx") as HTMLButtonElement;

    fieldset.disabled = false;
    btnSalvar.disabled = false;
    btnSalvar.style.opacity = "1";
    btnSalvar.style.cursor = "pointer";
    btnExcluir.style.opacity = "0.5";
    btnExcluir.style.cursor = "default";
    btnExcluir.disabled = true;
  
}

function habilitarEdicaoServico(): void {

    const fieldset = document.getElementById("fieldset-servico") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bSC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bSEx") as HTMLButtonElement;

    fieldset.disabled = false;
    btnSalvar.disabled = false;
    btnSalvar.style.opacity = "1";
    btnSalvar.style.cursor = "pointer";
    btnExcluir.style.opacity = "0.5";
    btnExcluir.style.cursor = "default";
    btnExcluir.disabled = true;
  
}

function closeModelPagSer(){

    const alter = document.getElementById("mini-tela-pagamento") as HTMLDivElement;
    const alter2 = document.getElementById("mini-tela-servico") as HTMLDivElement;
    const alter3 = document.getElementById("select-cadastro") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.style.display = "none";
    alter3.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaPagSer();

}

function closeModelPagamentoConsulta(){

    const alter = document.getElementById("mini-tela-pagamento-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-pagamento-consulta") as HTMLSelectElement;
    const alter3 = document.getElementById("select-consulta") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;
    const fieldset = document.getElementById("fieldset-pagamento") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bPC") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    alter3.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaPagSer();

}

function closeModelServicoConsulta(){

    const alter = document.getElementById("mini-tela-servico-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-servico-consulta") as HTMLSelectElement;
    const alter3 = document.getElementById("select-consulta") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;
    const fieldset = document.getElementById("fieldset-servico") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bSC") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    alter3.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaPagSer();

}

function removerDadosTelaPagSer(): void{

    const input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLInputElement>;

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }

}

function abrirMiniTelaPagamento(): void{

    const alter = document.getElementById("mini-tela-pagamento") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

async function abrirMiniTelaPagamentoConsulta(): Promise<void>{

    await carregarPagamentosConsulta();

    const alter = document.getElementById("mini-tela-pagamento-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

async function abrirMiniTelaServicoConsulta(): Promise<void>{

    await carregarServicosConsulta();

    const alter = document.getElementById("mini-tela-servico-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function preencherCampoPagamentoConsulta(pagamento: any): void {
   
    (document.getElementById("id-pagamento-consulta-barra") as HTMLInputElement).value = pagamento.idpag.toString();
    (document.getElementById("nome-pagamento-consulta") as HTMLInputElement).value = pagamento.nome;
    
}

function preencherCampoServicoConsulta(servico: any): void {
   
    (document.getElementById("id-servico-consulta-barra") as HTMLInputElement).value = servico.idservice.toString();
    (document.getElementById("servico-input-consulta") as HTMLInputElement).value = servico.nome_service;
    
}

function abrirMiniTelaServico(): void{

    const alter = document.getElementById("mini-tela-servico") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

async function salvarDadosPagamento(): Promise<void> {

    const data = {

        nome: (document.getElementById("pag-input") as HTMLInputElement).value,

    };


    const responsePagamento = await fetch("http://localhost:3000/pagamento/cadastrarPagamento", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    if(responsePagamento.ok){
        alert("Pagamento cadastrado com sucesso!");
    }else{
        alert("Pagamento já está cadastrado");
    }

    removerDadosTelaPagSer();

}

async function atualizarDadosPagamento(): Promise<void> {

    const data = {

        id: (document.getElementById("id-pagamento-consulta-barra") as HTMLInputElement).value,
        nome: (document.getElementById("nome-pagamento-consulta") as HTMLInputElement).value,

    };


    const responseFunc = await fetch("http://localhost:3000/pagamento/atualizarPagamento", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseFunc);

    if(responseFunc.ok){
        alert("Pagamento atualizado com sucesso!");
    }else{
        alert("Não foi possível atualizar o pagamento.");
    }

    const fieldset = document.getElementById("fieldset-pagamento") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bPC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bPEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarPagamentosConsulta();

}

async function atualizarDadosServico(): Promise<void> {

    const data = {

        id: (document.getElementById("id-servico-consulta-barra") as HTMLInputElement).value,
        nome: (document.getElementById("servico-input-consulta") as HTMLInputElement).value,

    };


    const responseSer = await fetch("http://localhost:3000/servico/atualizarServico", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseSer);

    if(responseSer.ok){
        alert("Serviço atualizado com sucesso!");
    }else{
        alert("Não foi possível atualizar o serviço.");
    }

    const fieldset = document.getElementById("fieldset-servico") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bSC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bSEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarServicosConsulta();

}

async function carregarPagamentosConsulta(): Promise<void> {

    const select = document.getElementById("select-pagamento-consulta") as HTMLSelectElement;
    indicePagAtual = 0;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/pagamento/select");
    const pagamentos = await response.json();

    if(response.ok){

        listaPagamentosConsulta = pagamentos

        pagamentos.forEach((pag: {idpag: number, nome: string}) => {
            const option = document.createElement("option");
            option.value = pag.idpag.toString();
            option.textContent = pag.idpag + " | " + pag.nome;
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoPagamentoConsulta(pagamentos[0]);

    }else{
        console.error("Erro ao carregar tipos de pagamentos para o select.");
    }

}

async function carregarServicosConsulta(): Promise<void> {

    const select = document.getElementById("select-servico-consulta") as HTMLSelectElement;
    indiceSerAtual = 0;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/servico/select");
    const servicos = await response.json();

    if(response.ok){

        listaServicosConsulta = servicos

        servicos.forEach((ser: {idservice: number, nome_service: string}) => {
            const option = document.createElement("option");
            option.value = ser.idservice.toString();
            option.textContent = ser.idservice + " | " + ser.nome_service;
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoServicoConsulta(servicos[0]);

    }else{
        console.error("Erro ao carregar tipos de serviços para o select.");
    }

}
    
async function salvarDadosServico(): Promise<void> {

    const data = {

        nome: (document.getElementById("servico-input") as HTMLInputElement).value,

    };


    const responseServico = await fetch("http://localhost:3000/servico/cadastrarServico", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    if(responseServico.ok){
        alert("Serviço cadastrado com sucesso!");
    }else{
        alert("Serviço já está cadastrado");
    }

    removerDadosTelaPagSer();

}

async function excluirDadosPagamento(): Promise<void> {

    const data = {

        id: (document.getElementById("id-pagamento-consulta-barra") as HTMLInputElement).value,

    };


    const responsePag = await fetch("http://localhost:3000/pagamento/excluirPagamento", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responsePag);

    if(responsePag.ok){
        alert("Pagamento excluído com sucesso!");
    }else{
        alert("Não foi possível excluir o pagamento, pois o mesmo já possui vínculos no sistema.");
    }

    const fieldset = document.getElementById("fieldset-pagamento") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bPC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bPEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarPagamentosConsulta();

}

async function excluirDadosServico(): Promise<void> {

    const data = {

        id: (document.getElementById("id-servico-consulta-barra") as HTMLInputElement).value,

    };


    const responseService = await fetch("http://localhost:3000/servico/excluirServico", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    console.log(responseService);

    if(responseService.ok){
        alert("Serviço excluído com sucesso!");
    }else{
        alert("Não foi possível excluir o serviço, pois o mesmo já possui vínculos no sistema.");
    }

    const fieldset = document.getElementById("fieldset-servico") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bSC") as HTMLButtonElement;
    const btnExcluir = document.getElementById("bSEx") as HTMLButtonElement;

    fieldset.disabled = true;
    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";
    btnExcluir.style.opacity = "1";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.disabled = false;

    carregarServicosConsulta();

}