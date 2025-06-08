document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const btnEntrar = document.querySelector("button");

    if(form && btnEntrar){

        form.addEventListener("submit", async(event) => {
            event.preventDefault();

            const usernameInput = document.getElementById("username") as HTMLInputElement;
            const passwordInput = document.getElementById("password") as HTMLInputElement;
            const username = usernameInput.value;
            const password = passwordInput.value;

            const response = await fetch("http://localhost:3000/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({usuario: username, senha: password})
            });

            if(response.ok){

                const data = await response.json();
                console.log(data);

                sessionStorage.setItem("user", JSON.stringify(data));

                if(data._funcao === "Gerente"){
                    window.location.href="/Front/HTML/gerente.html";
                }else if(data._funcao === "Suporte"){
                    window.location.href="/Front/HTML/suporte.html";
                }else if(data._funcao === "Tecnico"){
                    window.location.href="/Front/HTML/tecnico.html";
                }else if(data._funcao === "Desenvolvedor"){
                    window.location.href="/Front/HTML/desenvolvedor.html";
                }
                    
            }else{
                alert("Usuário ou senha inválidos");
            }

        })

    }

})