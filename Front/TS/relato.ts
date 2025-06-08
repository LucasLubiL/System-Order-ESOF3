let listaRelatos: any[] = [];

window.addEventListener("DOMContentLoaded", () => {

    const relato = document.getElementById("relato") as HTMLDivElement | null;

    if(relato){
        relato.addEventListener("click", () => {

            abrirMiniTelaRelato();

        });
    }
    
});

async function abrirMiniTelaRelato(): Promise<void>{

    await carregarRelatos();

    const alter = document.getElementById("mini-tela-relato") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "flex";
    nav.classList.add("bloqueado");

}

function closeModelRelato(){

    const alter = document.getElementById("mini-tela-relato") as HTMLDivElement;
    const nav = document.querySelector("nav") as HTMLElement;

    alter.style.display = "none";
    nav.classList.remove("bloqueado");

}

async function carregarRelatos(): Promise<void> {
    const container = document.getElementById("container-relatos") as HTMLDivElement;
    container.innerHTML = "";

    const response = await fetch("http://localhost:3000/ordem/relatoOS");
    const relatos = await response.json();

    if (response.ok) {
        listaRelatos = relatos;

        if (relatos.length === 0) {
            container.innerHTML = "<p style='text-align:center;'>Nenhuma O.S. pendente para a equipe de desenvolvimento.</p>";
            return;
        }

        relatos.forEach((ordem: any) => {
            const form = document.createElement("form");
            form.className = "form-relato";
            form.innerHTML = `
                <div class="div-label" style="margin-bottom: -10px;">
                    <div class="linha">
                        <div class="campo" style="width: 10px; margin-bottom: 20px;">
                            <label>ID Ordem de Serviço:</label>
                            <input style="width: 150px;" disabled class="input" type="text" value="${ordem.idord}">
                        </div>
                        <div class="campo" style="align-items: end; margin-top: 40px; padding-bottom: 10px">
                            <button id="bR" type="button" class="btn-finalizar" data-id="${ordem.idord}" data-idcli="${ordem.idcliente}" data-idpag="${ordem.idpag}" data-valor="${ordem.valor}">Finalizar</button>
                        </div>
                    </div>
                </div>
                <div class="div-label">
                    <div class="linha">
                        <div class="campo">
                            <label>Problema relatado:</label>
                            <textarea disabled class="input" rows="4" cols="50" style="resize: none; padding: 5px; font-size: 15px;" required>${ordem.msg_dev || ""}</textarea>
                        </div>
                        <div class="campo">
                            <label>Serviço executado:</label>
                            <textarea class="input textarea-relato" rows="4" cols="50" style="resize: none; padding: 5px; font-size: 15px;" required></textarea>
                        </div>
                    </div>
                </div>
                <hr>
            `;

            container.appendChild(form);
        });

        // Adiciona os eventos após criar os botões
        document.querySelectorAll(".btn-finalizar").forEach(btn => {
            btn.addEventListener("click", async (event) => {
                const button = event.target as HTMLButtonElement;
                const idord = button.getAttribute("data-id");
                const cliente = button.getAttribute("data-idcli");
                const pagamento = button.getAttribute("data-idpag");
                const valor = button.getAttribute("data-valor");

                const textarea = button.closest("form")!.querySelector(".textarea-relato") as HTMLTextAreaElement;
                const descricaoFinal = textarea.value.trim();

                if (descricaoFinal === "") {
                    alert("Descreva o serviço prestado antes de finalizar.");
                    return;
                }

                const resposta = await fetch("http://localhost:3000/ordem/finalizarRelato", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idord: parseInt(idord!), description: descricaoFinal })
                });

                if (resposta.ok) {
                    alert("Ordem finalizada com sucesso!");
                    await carregarRelatos();
                } else {
                    alert("Erro ao finalizar a ordem.");
                }

                const respostaDois = await fetch("http://localhost:3000/receber/criarRegistro", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idord: parseInt(idord!), valor: parseInt(valor!), cliente: parseInt(cliente!), pagamento: parseInt(pagamento!) })
                });

                console.log(idord, descricaoFinal);

                if (respostaDois.ok) {
                    alert("Registro de pagamento criado com sucesso!");
                } else {
                    alert("Erro ao criar o registro de pagamento.");
                }

            });
        });

    } else {
        console.error("Erro ao carregar relatos.");
    }
}


