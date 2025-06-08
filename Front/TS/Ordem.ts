let listaOrdensConsulta: any[] = [];
let listaFuncConsulta: any[] = [];
let listaServConsulta: any[] = [];
let listaPagConsulta: any[] = [];
let listaCliConsulta: any[] = [];
let consulta = 0;
let indiceOrdemAtual = 0;

window.addEventListener("DOMContentLoaded", () => {

    const selectOrdem = document.getElementById("select-ordem") as HTMLSelectElement;
    const selectOrdemConsulta = document.getElementById("select-ordem-consulta") as HTMLSelectElement;
    const form3 = document.getElementById("formOrdem") as HTMLDivElement;
    const btnSalvar3 = document.getElementById("bO") as HTMLDivElement;
    const btnConsultaOrd = document.getElementById("bConsultaOrdem") as HTMLButtonElement; 
    const inputIdConsultaOrd = document.getElementById("id-ordem-consulta-barra") as HTMLInputElement;
    const btnFinalizar = document.getElementById("bOC") as HTMLButtonElement;
    const btnDeveloper = document.getElementById("bOD") as HTMLButtonElement;
    const formOrdem = document.getElementById("formOrdemConsulta") as HTMLDivElement;
    const btnAnteriorO = document.getElementById("prev-btnO") as HTMLLIElement;
    const btnProximoO = document.getElementById("next-btnO") as HTMLLIElement;

    if(btnAnteriorO && btnProximoO){
        btnAnteriorO.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceOrdemAtual > 0) {
                indiceOrdemAtual--;
                const ordem = listaOrdensConsulta[indiceOrdemAtual];
                preencherCampoOrdemConsulta(ordem);
                selectOrdemConsulta.value = ordem.idord.toString();
            }
        });

        btnProximoO.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceOrdemAtual < listaOrdensConsulta.length - 1) {
                indiceOrdemAtual++;
                const ordem = listaOrdensConsulta[indiceOrdemAtual];
                preencherCampoOrdemConsulta(ordem);
                selectOrdemConsulta.value = ordem.idord.toString();
            }
        });
    }
    
    if(selectOrdem){
        selectOrdem.addEventListener("change", () => {

        if(selectOrdem.value === "criar-ordem"){
            consulta = 0;
            abrirMiniTelaOrdem();
        }else if(selectOrdem.value === "ordem-consulta"){
            consulta = 1;
            abrirMiniTelaOrdemConsulta();
        }

        });
    }
    
    if(selectOrdemConsulta){
        selectOrdemConsulta.addEventListener("change", () => {

        const idSelecionado = parseInt(selectOrdemConsulta.value);
        const ordSelecionado = listaOrdensConsulta.find(ord => ord.idord === idSelecionado);
        
        if (ordSelecionado) {
            preencherCampoOrdemConsulta(ordSelecionado);
        }

        indiceOrdemAtual = listaOrdensConsulta.findIndex(ord => ord.idord === idSelecionado);

        });
    }
    
    if(btnConsultaOrd){
        btnConsultaOrd.addEventListener("click", () => {

        const idDigitado = inputIdConsultaOrd.value.trim();

        const ordemEncontrado = listaOrdensConsulta.find(ord => ord.idord.toString() === idDigitado);

        if(ordemEncontrado){

            preencherCampoOrdemConsulta(ordemEncontrado);

            selectOrdemConsulta.value = ordemEncontrado.idord.toString();
        }

        indiceOrdemAtual = listaOrdensConsulta.findIndex(ord => ord.idord.toString() === idDigitado);

        });
    }

    if(form3 && btnSalvar3){

        form3.addEventListener("submit", async(event) => {
            event.preventDefault();
            await salvarDadosOrdem();
        });

    }

    if (formOrdem) {

        formOrdem.addEventListener("submit", async (event: SubmitEvent) => {
            event.preventDefault();

            const botaoClicado = event.submitter as HTMLButtonElement;

            if (botaoClicado === btnFinalizar) {
                await finalizarDadosOrdem();
            } else if (botaoClicado === btnDeveloper) {
                await enviarDadosOrdemDev();
            }
        });
        
    }

});

function habilitarEdicaoOrdem(): void {

    const fieldset = document.getElementById("fieldset-ordem") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bOC") as HTMLButtonElement;
    const btnDev = document.getElementById("bOD") as HTMLButtonElement;
    const btnCancelar = document.getElementById("bOCan") as HTMLButtonElement;
    const btnEditar = document.getElementById("bOE") as HTMLButtonElement;

    fieldset.disabled = false;

    btnSalvar.disabled = false;
    btnSalvar.style.opacity = "1";
    btnSalvar.style.cursor = "pointer";

    btnCancelar.disabled = true;
    btnCancelar.style.opacity = "0.5";
    btnCancelar.style.cursor = "default";

    btnDev.disabled = false;
    btnDev.style.opacity = "1";
    btnDev.style.cursor = "pointer";

    btnEditar.disabled = true;
    btnEditar.style.opacity = "0.5";
    btnEditar.style.cursor = "default";
  
}

function closeModelOrdem(){

    const alter = document.getElementById("mini-tela-ordem") as HTMLDivElement;
    const alter2 = document.getElementById("select-ordem") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaOrdem();

}

function closeModelOrdemConsulta(){

    const alter = document.getElementById("mini-tela-ordem-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-ordem") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.selectedIndex = 0;
    nav.classList.remove("bloqueado");

    removerDadosTelaOrdem();

}

function removerDadosTelaOrdem(): void{

    const input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLInputElement>;
    const servico = document.getElementById("select-servico") as HTMLSelectElement;
    const pagamento = document.getElementById("select-pagamento") as HTMLSelectElement;
    const cliente = document.getElementById("select-cliente") as HTMLSelectElement;

    servico.selectedIndex = 0;
    pagamento.selectedIndex = 0;
    cliente.selectedIndex = 0;
    
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }

}

async function abrirMiniTelaOrdem(): Promise<void>{

    await carregarClientes();
    await carregarPagamentos();
    await carregarServicos();

    const alter = document.getElementById("mini-tela-ordem") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

async function abrirMiniTelaOrdemConsulta(): Promise<void>{

    await carregarFuncConsulta();
    await carregarClientes();
    await carregarServicos();
    await carregarPagamentos();
    await carregarOrdensConsulta();

    const alter = document.getElementById("mini-tela-ordem-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function preencherCampoOrdemConsulta(ordem: any): void {

    (document.getElementById("id-ordem-consulta") as HTMLInputElement).value = ordem.idord.toString();
    (document.getElementById("status-ordem-consulta") as HTMLInputElement).value = ordem.status_char;
    (document.getElementById("data-ordem-criacao-consulta") as HTMLInputElement).value = ordem.ord_data.substring(0, 10);
    (document.getElementById("data-ordem-finalizacao-consulta") as HTMLInputElement).value = ordem.ord_data_final ? ordem.ord_data_final.substring(0, 10) : "";
    (document.getElementById("criador-ordem-consulta") as HTMLInputElement).value = ordem.idfunc;
    (document.getElementById("select-cliente-ordem-consulta") as HTMLSelectElement).value = ordem.idcliente;
    (document.getElementById("select-servico-ordem-consulta") as HTMLSelectElement).value = ordem.idservice;
    (document.getElementById("select-pagamento-ordem-consulta") as HTMLSelectElement).value = ordem.idpag;
    (document.getElementById("input-valor-ordem-consulta") as HTMLInputElement).value = ordem.valor.toString();
    (document.getElementById("textarea-descricao-cliente-ordem-consulta") as HTMLTextAreaElement).value = ordem.description_cliente;
    (document.getElementById("textarea-descricao-funcionario-ordem-consulta") as HTMLTextAreaElement).value = ordem.description;

    const fieldset = document.getElementById("fieldset-ordem") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bOC") as HTMLButtonElement;
    const btnDev = document.getElementById("bOD") as HTMLButtonElement;
    const btnCancelar = document.getElementById("bOCan") as HTMLButtonElement;
    const btnEditar = document.getElementById("bOE") as HTMLButtonElement;

    if(ordem.status_char === "Cancelado" || ordem.status_char === "Finalizado" || ordem.dev === 1){

        fieldset.disabled = true;

        btnSalvar.disabled = true;
        btnSalvar.style.opacity = "0.5";
        btnSalvar.style.cursor = "default";

        btnCancelar.disabled = true;
        btnCancelar.style.opacity = "0.5";
        btnCancelar.style.cursor = "default";

        btnDev.disabled = true;
        btnDev.style.opacity = "0.5";
        btnDev.style.cursor = "default";

        btnEditar.disabled = true;
        btnEditar.style.opacity = "0.5";
        btnEditar.style.cursor = "default";
 
    }else{

        fieldset.disabled = true;

        btnSalvar.disabled = true;
        btnSalvar.style.opacity = "0.5";
        btnSalvar.style.cursor = "default";

        btnCancelar.disabled = false;
        btnCancelar.style.opacity = "1";
        btnCancelar.style.cursor = "pointer";

        btnDev.disabled = true;
        btnDev.style.opacity = "0.5";
        btnDev.style.cursor = "default";

        btnEditar.disabled = false;
        btnEditar.style.opacity = "1";
        btnEditar.style.cursor = "pointer";

    }

}

async function salvarDadosOrdem(): Promise<void> {

    const data = {

        cliente:(document.getElementById("select-cliente") as HTMLSelectElement).value,
        servico:(document.getElementById("select-servico") as HTMLSelectElement).value,
        pagamento:(document.getElementById("select-pagamento") as HTMLSelectElement).value,
        valor:(document.getElementById("input-valor") as HTMLInputElement).value,
        descricao:(document.getElementById("textarea-descricao-cliente") as HTMLTextAreaElement).value,

    };

    console.log(data)

    const response = await fetch("http://localhost:3000/ordem/criarOrdem", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Ordem de Serviço criada com sucesso!");
    }else{
        alert("Erro ao criar Ordem de Serviço! (Ordem.ts)");
    }

    removerDadosTelaOrdem();

}

async function carregarFuncConsulta(): Promise<void> {

    const response = await fetch("http://localhost:3000/funcionario/select");
    const funcionarios = await response.json();

    if(response.ok){

        listaFuncConsulta = funcionarios;

    }else{
        console.error("Erro ao carregar funcionarios para a ordem de serviço.");
    }

}

async function carregarClientes(): Promise<void> {

    const response = await fetch("http://localhost:3000/cliente/select");
    const clientes = await response.json();

    if(response.ok){

        if(consulta === 1){
            
            const selectConsulta = document.getElementById("select-cliente-ordem-consulta") as HTMLSelectElement;

            listaCliConsulta = clientes;

            selectConsulta.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione";
            selectConsulta.appendChild(defaultOption);

            clientes.forEach((cliente: {idcliente: number, nome: string}) => {
                const option = document.createElement("option");
                option.value = cliente.idcliente.toString();
                option.textContent = cliente.idcliente + " | " + cliente.nome;
                selectConsulta.appendChild(option);
            });

        }else{
 
            const select = document.getElementById("select-cliente") as HTMLSelectElement;
    
            select.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione";
            select.appendChild(defaultOption);

            clientes.forEach((cliente: {idcliente: number, nome: string}) => {
                const option = document.createElement("option");
                option.value = cliente.idcliente.toString();
                option.textContent = cliente.idcliente + " | " + cliente.nome;
                select.appendChild(option);
            });

        }

    }else{
        console.error("Erro ao carregar clientes para o select.");
    }

}   

async function carregarPagamentos(): Promise<void> {

    const response = await fetch("http://localhost:3000/pagamento/select");
    const pagamentos = await response.json();

    if(response.ok){

        if(consulta === 1){

            listaPagConsulta = pagamentos;

            const selectConsulta = document.getElementById("select-pagamento-ordem-consulta") as HTMLSelectElement;

            selectConsulta.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione";
            selectConsulta.appendChild(defaultOption);

            pagamentos.forEach((pag: {idpag: number, nome: string}) => {
                const option = document.createElement("option");
                option.value = pag.idpag.toString();
                option.textContent = pag.idpag + " | " + pag.nome;
                selectConsulta.appendChild(option);
            });

        }else{

            const select = document.getElementById("select-pagamento") as HTMLSelectElement;

            select.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione";
            select.appendChild(defaultOption);

            pagamentos.forEach((pag: {idpag: number, nome: string}) => {
                const option = document.createElement("option");
                option.value = pag.idpag.toString();
                option.textContent = pag.idpag + " | " + pag.nome;
                select.appendChild(option);
            });

        }

    }else{
        console.error("Erro ao carregar tipos de pagamentos para o select.");
    }

}

async function carregarServicos(): Promise<void> {

    const response = await fetch("http://localhost:3000/servico/select");
    const servicos = await response.json();

    if(response.ok){

        if(consulta === 1){

            listaServConsulta = servicos;

            const selectConsulta = document.getElementById("select-servico-ordem-consulta") as HTMLSelectElement;

            selectConsulta.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione";
            selectConsulta.appendChild(defaultOption);

            servicos.forEach((servico: {idservice: number, nome_service: string}) => {
                const option = document.createElement("option");
                option.value = servico.idservice.toString();
                option.textContent = servico.idservice + " | " + servico.nome_service;
                selectConsulta.appendChild(option);
            });

        }else{

            const select = document.getElementById("select-servico") as HTMLSelectElement;

            select.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione";
            select.appendChild(defaultOption);

            servicos.forEach((servico: {idservice: number, nome_service: string}) => {
                const option = document.createElement("option");
                option.value = servico.idservice.toString();
                option.textContent = servico.idservice + " | " + servico.nome_service;
                select.appendChild(option);
            });

        }
        
    }else{
        console.error("Erro ao carregar servicos para o select.");
    }

}

async function carregarOrdensConsulta(): Promise<void> {

    const select = document.getElementById("select-ordem-consulta") as HTMLSelectElement;
    indiceOrdemAtual = 0;

    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/ordem/selectOrdem");
    const ordens = await response.json();

    if(response.ok){

        listaOrdensConsulta = ordens;

        ordens.forEach((ord: {idord: number}) => {
            const option = document.createElement("option");
            option.value = ord.idord.toString();
            option.textContent = ord.idord.toString();
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoOrdemConsulta(ordens[0]);

    }else{
        console.error("Erro ao carregar ordens para o select.");
    }

}

async function cancelarOrdemConsulta(): Promise<void> {

    const data = {

        idord:(document.getElementById("id-ordem-consulta") as HTMLInputElement).value

    };

    const response = await fetch("http://localhost:3000/ordem/cancelarOrdem", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Ordem de Serviço cancelada com sucesso!");
    }else{
        console.error("Erro ao cancelar ordem de serviço.");
    }

    const fieldset = document.getElementById("fieldset-ordem") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bOC") as HTMLButtonElement;
    const btnDev = document.getElementById("bOD") as HTMLButtonElement;
    const btnCancelar = document.getElementById("bOCan") as HTMLButtonElement;
    const btnEditar = document.getElementById("bOE") as HTMLButtonElement;

    fieldset.disabled = true;

    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    btnCancelar.disabled = false;
    btnCancelar.style.opacity = "1";
    btnCancelar.style.cursor = "pointer";

    btnDev.disabled = true;
    btnDev.style.opacity = "0.5";
    btnDev.style.cursor = "default";

    btnEditar.disabled = true;
    btnEditar.style.opacity = "1";
    btnEditar.style.cursor = "pointer";

    carregarOrdensConsulta();

}

async function finalizarDadosOrdem(): Promise<void> {

    const data = {

        idord:(document.getElementById("id-ordem-consulta") as HTMLInputElement).value,
        pagamento:(document.getElementById("select-pagamento-ordem-consulta") as HTMLSelectElement).value,
        valor:(document.getElementById("input-valor-ordem-consulta") as HTMLInputElement).value,
        descricao:(document.getElementById("textarea-descricao-funcionario-ordem-consulta") as HTMLTextAreaElement).value,

    };

    const response = await fetch("http://localhost:3000/ordem/finalizarOrdem", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Ordem de Serviço finalizada com sucesso!");
    }else{
        console.error("Erro ao finalizar ordem de serviço.");
    }

    const fieldset = document.getElementById("fieldset-ordem") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bOC") as HTMLButtonElement;
    const btnDev = document.getElementById("bOD") as HTMLButtonElement;
    const btnCancelar = document.getElementById("bOCan") as HTMLButtonElement;
    const btnEditar = document.getElementById("bOE") as HTMLButtonElement;

    fieldset.disabled = true;

    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    btnCancelar.disabled = false;
    btnCancelar.style.opacity = "1";
    btnCancelar.style.cursor = "pointer";

    btnDev.disabled = true;
    btnDev.style.opacity = "0.5";
    btnDev.style.cursor = "default";

    btnEditar.disabled = true;
    btnEditar.style.opacity = "1";
    btnEditar.style.cursor = "pointer";

    carregarOrdensConsulta();

}

async function enviarDadosOrdemDev(): Promise<void> {

    const data = {

        idord:(document.getElementById("id-ordem-consulta") as HTMLInputElement).value,
        pagamento:(document.getElementById("select-pagamento-ordem-consulta") as HTMLSelectElement).value,
        valor:(document.getElementById("input-valor-ordem-consulta") as HTMLInputElement).value,
        msg_dev:(document.getElementById("textarea-descricao-funcionario-ordem-consulta") as HTMLTextAreaElement).value,

    };

    const response = await fetch("http://localhost:3000/ordem/enviarOrdem", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Ordem de Serviço enviada para o desenvolvimento com sucesso!");
    }else{
        console.error("Erro ao enviar ordem de serviço para o desenvolvimento.");
    }

    const fieldset = document.getElementById("fieldset-ordem") as HTMLFieldSetElement;
    const btnSalvar = document.getElementById("bOC") as HTMLButtonElement;
    const btnDev = document.getElementById("bOD") as HTMLButtonElement;
    const btnCancelar = document.getElementById("bOCan") as HTMLButtonElement;
    const btnEditar = document.getElementById("bOE") as HTMLButtonElement;

    fieldset.disabled = true;

    btnSalvar.disabled = true;
    btnSalvar.style.opacity = "0.5";
    btnSalvar.style.cursor = "default";

    btnCancelar.disabled = false;
    btnCancelar.style.opacity = "1";
    btnCancelar.style.cursor = "pointer";

    btnDev.disabled = true;
    btnDev.style.opacity = "0.5";
    btnDev.style.cursor = "default";

    btnEditar.disabled = true;
    btnEditar.style.opacity = "1";
    btnEditar.style.cursor = "pointer";

    carregarOrdensConsulta();

}

