// Controlo do Modo Escuro na Página de Contactos
const btnTemaContacto = document.getElementById('btn-tema');
const temaGuardadoContacto = localStorage.getItem('tema') || 'light';
document.documentElement.setAttribute('data-theme', temaGuardadoContacto);
if (btnTemaContacto) btnTemaContacto.innerText = temaGuardadoContacto === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';

if (btnTemaContacto) {
    btnTemaContacto.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', novoTema);
        localStorage.setItem('tema', novoTema);
        btnTemaContacto.innerText = novoTema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    });
}

// Submissão do Formulário Formspree
const formContacto = document.getElementById('formulario-contacto');
if (formContacto) {
    formContacto.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeUtilizador = document.getElementById('nome').value.trim();
        const emailUtilizador = document.getElementById('email').value.trim();
        const mensagemUtilizador = document.getElementById('mensagem').value.trim();
        const resposta = document.getElementById('resposta-formulario');

        if (mensagemUtilizador.length < 10) {
            resposta.innerText = '❌ Erro: A sua mensagem deve ter pelo menos 10 caracteres.';
            resposta.style.color = '#e74c3c';
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(emailUtilizador)) {
            resposta.innerText = '❌ Erro: Por favor, introduza um e-mail válido.';
            resposta.style.color = '#e74c3c';
            return;
        }

        resposta.innerText = 'A enviar mensagem... por favor aguarde.';
        resposta.style.color = '#f39c12';

        const formData = new FormData(formContacto);
        const urlEnvio = formContacto.action || 'https://formspree.io';

        fetch(urlEnvio, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                resposta.innerText = `Obrigado, ${nomeUtilizador}! Mensagem enviada com sucesso para o Yahoo!`;
                resposta.style.color = '#27ae60';
                formContacto.reset();
            } else {
                return response.json().then(dadosErro => {
                    resposta.innerText = `❌ Erro do Formspree: ${dadosErro.error || 'Verifique a configuração.'}`;
                    resposta.style.color = '#e74c3c';
                });
            }
        })
        .catch(error => {
            resposta.innerText = '❌ Falha na ligação. Desative o AdBlock/extensões ou verifique a internet.';
            resposta.style.color = '#e74c3c';
            console.error(error);
        });
    });
}
