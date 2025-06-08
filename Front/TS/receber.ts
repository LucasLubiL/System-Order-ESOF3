let listaReceberConsulta: any[] = [];
let listaReceberConsultaCli: any[] = [];
let listaReceberConsultaPag: any[] = [];
let indiceRegistroAtual = 0;

window.addEventListener("DOMContentLoaded", () => {

    const recebimento = document.getElementById("registro") as HTMLDivElement | null;
    const selectRecebimento = document.getElementById("select-registro-consulta") as HTMLSelectElement;
    const btnConsultaOrd = document.getElementById("bConsultaRegistro") as HTMLButtonElement | null; 
    const inputIdOrd = document.getElementById("ord-registro-consulta-barra") as HTMLInputElement; 
    const btnFinalizar = document.getElementById("bRC") as HTMLButtonElement | null;
    const btnCriarRegistro = document.getElementById("bOC") as HTMLButtonElement | null;
    const btnCriarRegistroRelato = document.getElementById("bR") as HTMLButtonElement | null;
    const formOrdem = document.getElementById("formOrdemConsulta") as HTMLDivElement | null;
    const formOrdemRelato = document.querySelector(".form-relato") as HTMLFormElement | null;
    const formRegistro = document.getElementById("formRegistroConsulta") as HTMLDivElement | null;
    const btnAnteriorR = document.getElementById("prev-btnR") as HTMLLIElement | null;
    const btnProximoR = document.getElementById("next-btnR") as HTMLLIElement | null;

    if(btnAnteriorR && btnProximoR){
        btnAnteriorR.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceRegistroAtual > 0) {
                indiceRegistroAtual--;
                const registro = listaReceberConsulta[indiceRegistroAtual];
                preencherCampoRegistroConsulta(registro);
                selectRecebimento.value = registro.idrec.toString();
            }
        });

        btnProximoR.addEventListener("click", (event) => {
            event.preventDefault();

            if (indiceRegistroAtual < listaReceberConsulta.length - 1) {
                indiceRegistroAtual++;
                const registro = listaReceberConsulta[indiceRegistroAtual];
                preencherCampoRegistroConsulta(registro);
                selectRecebimento.value = registro.idrec.toString();
            }
        });
    }
    
    if(recebimento){
        recebimento.addEventListener("click", () => {

            abrirMiniTelaRegistro();

        });
    }
    
    if(selectRecebimento){
        selectRecebimento.addEventListener("change", () => {

            const idSelecionado = parseInt(selectRecebimento.value);
            const recSelecionado = listaReceberConsulta.find(rec => rec.idrec === idSelecionado);
            
            if (recSelecionado) {
                preencherCampoRegistroConsulta(recSelecionado);
            }

            indiceRegistroAtual = listaReceberConsulta.findIndex(rec => rec.idrec === idSelecionado);

        });
    }
    
    if(btnConsultaOrd){
        btnConsultaOrd.addEventListener("click", () => {

            const idDigitado = inputIdOrd.value.trim();

            const registroEncontrado = listaReceberConsulta.find(rec => rec.idord.toString() === idDigitado);

            if(registroEncontrado){

                preencherCampoRegistroConsulta(registroEncontrado);

                selectRecebimento.value = registroEncontrado.idrec.toString();
            }else{
                alert("Registro nao encontrado.");
            }

            indiceRegistroAtual = listaReceberConsulta.findIndex(rec => rec.idord.toString() === idDigitado);

        });
    }
    

    if(formRegistro && btnFinalizar){

        formRegistro.addEventListener("submit", async(event) => {
            event.preventDefault();
            await finalizarRegistro();
        });

    }

    if(formOrdem){

        formOrdem.addEventListener("submit", async (event: SubmitEvent) => {
            event.preventDefault();

            const botaoClicado = event.submitter as HTMLButtonElement;

            if (botaoClicado === btnCriarRegistro) {
                await criarRegistroPagamento();
            } 

        });

    }

    if(formOrdemRelato){

        formOrdemRelato.addEventListener("submit", async (event: SubmitEvent) => {
            event.preventDefault();

            const botaoClicado = event.submitter as HTMLButtonElement;

            if (botaoClicado === btnCriarRegistroRelato) {
                //await criarRegistroPagamentoDev();
            } 

        });

    }

});

async function preencherCampoRegistroConsulta(receber: any): Promise<void> {

    const pagamento = receber.idpag;
    const cliente = receber.idcliente;

    const pag = listaReceberConsultaPag.find(pag => pag.idpag === pagamento);
    const cli = listaReceberConsultaCli.find(cli => cli.idcliente === cliente);

    (document.getElementById("id-registro-consulta-barra") as HTMLInputElement).value = receber.idrec.toString();
    (document.getElementById("ordem-registro-consulta") as HTMLInputElement).value = receber.idord.toString();
    (document.getElementById("status-registro-consulta") as HTMLInputElement).value = receber.status;
    (document.getElementById("pagamento-registro-consulta-barra") as HTMLInputElement).value = pag.nome;
    (document.getElementById("cliente-registro-consulta-barra") as HTMLInputElement).value = cli.nome;
    (document.getElementById("valor-registro-consulta-barra") as HTMLInputElement).value = receber.valor.toString();
    (document.getElementById("rec-registro-consulta") as HTMLInputElement).value = receber.rec_date ? receber.rec_date.substring(0, 10) : "";
    
    const btnFim = document.getElementById("bRC") as HTMLButtonElement;
    if(receber.status === "Finalizado"){
        btnFim.disabled = true;
        btnFim.style.opacity = "0.5";
        btnFim.style.cursor = "default";
    }else{
        btnFim.disabled = false;
        btnFim.style.opacity = "1";
        btnFim.style.cursor = "pointer";
    }

}

async function abrirMiniTelaRegistro(): Promise<void>{

    await carregarClienteRegistro();
    await carregarPagamentoRegistro();
    await carregarRegistroConsulta();

    const alter = document.getElementById("mini-tela-registro-consulta") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function closeModelRegistroConsulta(){

    const alter = document.getElementById("mini-tela-registro-consulta") as HTMLDivElement;
    const alter2 = document.getElementById("select-registro-consulta") as HTMLSelectElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    alter2.selectedIndex = 1;
    nav.classList.remove("bloqueado");

    removerDadosTelaRegistro();

}

function removerDadosTelaRegistro(): void{

    const input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLInputElement>;

    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }

}

async function carregarRegistroConsulta(): Promise<void> {

    const select = document.getElementById("select-registro-consulta") as HTMLSelectElement;
    indiceRegistroAtual = 0;
    
    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione";
    select.appendChild(defaultOption);

    const response = await fetch("http://localhost:3000/receber/selectReceber");
    const receber = await response.json();

    if(response.ok){

        listaReceberConsulta = receber;

        receber.forEach((rec: {idrec: number}) => {
            const option = document.createElement("option");
            option.value = rec.idrec.toString();
            option.textContent = rec.idrec.toString();
            select.appendChild(option);
        });

        select.selectedIndex = 1;

        preencherCampoRegistroConsulta(receber[0]);

    }else{
        console.error("Erro ao carregar recebimentos para o select.");
    }

}

async function carregarClienteRegistro(): Promise<void> {


    const response = await fetch("http://localhost:3000/cliente/clienteReceber");
    const clientes = await response.json();

    if(response.ok){

        listaReceberConsultaCli = clientes;

        return clientes;

    }else{
        console.error("Erro ao carregar clientes para o recebimento.");
    }

}

async function carregarPagamentoRegistro(): Promise<void> {

    const response = await fetch("http://localhost:3000/pagamento/pagamentoRegistro");
    const pagamentos = await response.json();

    if(response.ok){

        listaReceberConsultaPag = pagamentos

        return pagamentos;

    }else{
        console.error("Erro ao carregar cliente para o recebimento.");
    }

}

async function criarRegistroPagamento(): Promise<void> {

    const data = {

        idord:(document.getElementById("id-ordem-consulta") as HTMLInputElement).value,
        pagamento:(document.getElementById("select-pagamento-ordem-consulta") as HTMLSelectElement).value,
        valor:(document.getElementById("input-valor-ordem-consulta") as HTMLInputElement).value,
        cliente:(document.getElementById("select-cliente-ordem-consulta") as HTMLSelectElement).value,

    }

    const response = await fetch("http://localhost:3000/receber/criarRegistro", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Registro de pagamento criada  com sucesso!");
    }else{
        console.error("Erro ao criar registro de pagamento.");
    }

}

async function criarRegistroPagamentoDev(): Promise<void> {

    const data = {

        idord:(document.getElementById("id-ordem-consulta") as HTMLInputElement).value,
        pagamento:(document.getElementById("select-pagamento-ordem-consulta") as HTMLSelectElement).value,
        valor:(document.getElementById("input-valor-ordem-consulta") as HTMLInputElement).value,
        cliente:(document.getElementById("select-cliente-ordem-consulta") as HTMLSelectElement).value,

    }

    const response = await fetch("http://localhost:3000/receber/criarRegistro", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Registro de pagamento criada  com sucesso!");
    }else{
        console.error("Erro ao criar registro de pagamento.");
    }

}

async function finalizarRegistro(): Promise<void> {

    const data = {

        idrec:(document.getElementById("id-registro-consulta-barra") as HTMLInputElement).value,

    }

    const response = await fetch("http://localhost:3000/receber/finalizarRegistro", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)

    });

    if(response.ok){
        alert("Registro de pagamento finalizado com sucesso!");
    }else{
        console.error("Erro ao finalizado registro de pagamento.");
    }

    carregarRegistroConsulta();

}
