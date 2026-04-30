async function fazerLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('mensagem');

    // Limpa a mensagem anterior 
    msg.innerText = "Carregando...";
    msg.style.color = "black";

    try {
        // No GET, passamos os parâmetros direto na URL 
        // Usamos encodeURIComponent para garantir que caracteres especiais não quebrem a URL
        const url = `http://localhost:3000/acesso?usuario=${encodeURIComponent(user)}&senha=${encodeURIComponent(pass)}`;

        const response = await fetch(url,
            {
                method: 'GET', // Mudamos de POST para GET 
                headers: { 'Content-Type': 'application/json' }
            });
        const data = await response.json();

        if (data.success) {
            document.getElementById('tela-login').style.display = 'none';
            document.getElementById('area-logada').style.display = 'block';
        }
        else {
            msg.style.color = "red";
            msg.innerText = "  " + data.message;
        }
    }
    catch (error) {
        console.error(error);
        msg.style.color = "red";
        msg.innerText = "Erro ao conectar com o servidor. Verifique se o Node está rodando.";
    }
}