function toggleSenha(inputId, btn) {
    const input = document.getElementById(inputId);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';

    btn.innerHTML = isHidden
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
               <circle cx="12" cy="12" r="3"/>
           </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
               <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
               <line x1="1" y1="1" x2="23" y2="23"/>
           </svg>`;
}

async function salvarUsuario() {
    const nome = document.getElementById('nomeUsuario').value.trim();
    const login = document.getElementById('nomeLogin').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmarSenha').value;
    const ativado = document.getElementById('ativado').checked ? 1 : 0;
    const msg = document.getElementById('mensagem');

    msg.style.color = 'black';
    msg.innerText = '';

    if (!nome || !login || !senha || !confirmar) {
        msg.style.color = 'red';
        msg.innerText = 'Preencha todos os campos obrigatórios.';
        return;
    }

    if (senha !== confirmar) {
        msg.style.color = 'red';
        msg.innerText = 'As senhas não coincidem.';
        return;
    }

    msg.innerText = 'Salvando...';

    try {
        const response = await fetch('http://localhost:3000/inserirusuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, login, senha, ativado })
        });

        const data = await response.json();

        if (data.success) {
            msg.style.color = 'green';
            msg.innerText = 'Usuário cadastrado com sucesso!';
            limparFormulario();
        } else {
            msg.style.color = 'red';
            msg.innerText = data.message || 'Erro ao cadastrar usuário.';
        }
    } catch (error) {
        console.error(error);
        msg.style.color = 'red';
        msg.innerText = 'Erro ao conectar com o servidor. Verifique se o Node está rodando.';
    }
}

function limparFormulario() {
    document.getElementById('nomeUsuario').value = '';
    document.getElementById('nomeLogin').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('confirmarSenha').value = '';
    document.getElementById('ativado').checked = true;
}

function cancelar() {
    limparFormulario();
    document.getElementById('mensagem').innerText = '';
}
