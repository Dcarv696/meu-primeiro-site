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

function mostrarResposta(elemento, texto, tipo) {
    elemento.className = tipo;
    elemento.innerText = texto;
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
        const btnEnviar = formContacto.querySelector('.btn-enviar');

        if (mensagemUtilizador.length < 10) {
            mostrarResposta(resposta, '❌ Erro: A sua mensagem deve ter pelo menos 10 caracteres.', 'erro');
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(emailUtilizador)) {
            mostrarResposta(resposta, '❌ Erro: Por favor, introduza um e-mail válido.', 'erro');
            return;
        }

        btnEnviar.disabled = true;
        mostrarResposta(resposta, 'A enviar mensagem... por favor aguarde.', 'aguardar');

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
                mostrarResposta(resposta, `Obrigado, ${nomeUtilizador}! Mensagem enviada com sucesso.`, 'sucesso');
                formContacto.reset();
            } else {
                return response.json().then(dadosErro => {
                    mostrarResposta(resposta, `❌ Erro do Formspree: ${dadosErro.error || 'Verifique a configuração.'}`, 'erro');
                });
            }
        })
        .catch(error => {
            mostrarResposta(resposta, '❌ Falha na ligação. Desative o AdBlock/extensões ou verifique a internet.', 'erro');
            console.error(error);
        })
        .finally(() => {
            btnEnviar.disabled = false;
        });
    });
}
