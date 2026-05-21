// Controlo do Modo Escuro na página de contactos
const btnTema = document.getElementById('btn-tema');
const temaGuardado = localStorage.getItem('tema') || 'light';
document.documentElement.setAttribute('data-theme', temaGuardado);
if (btnTema) btnTema.innerText = temaGuardado === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';

if (btnTema) {
    btnTema.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', novoTema);
        localStorage.setItem('tema', novoTema);
        btnTema.innerText = novoTema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    });
}

// VALIDAÇÃO E ENVIO REAL PARA O FORMSPREE
document.getElementById('formulario-contacto').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeUtilizador = document.getElementById('nome').value.trim();
    const emailUtilizador = document.getElementById('email').value.trim();
    const mensagemUtilizador = document.getElementById('mensagem').value.trim();
    const resposta = document.getElementById('resposta-formulario');

    // 1. Validação do tamanho da mensagem
    if (mensagemUtilizador.length < 10) {
        resposta.innerText = '❌ Erro: A sua mensagem deve ter pelo menos 10 caracteres.';
        resposta.style.color = '#e74c3c';
        return;
    }

    // 2. Validação profissional de e-mail usando Expressão Regular (Regex)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailUtilizador)) {
        resposta.innerText = '❌ Erro: Por favor, introduza um e-mail válido (ex: nome@dominio.com).';
        resposta.style.color = '#e74c3c';
        return;
    }

    resposta.innerText = 'A enviar mensagem... por favor aguarde.';
    resposta.style.color = '#f39c12';

    // Captura os dados reais do formulário
    const formData = new FormData(document.getElementById('formulario-contacto'));

    // Envio para o endpoint do Formspree com o seu ID real
    fetch('https://formspree.io', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            resposta.innerText = `Thank you, ${nomeUtilizador}! Mensagem enviada com sucesso para o Yahoo!`;
            resposta.style.color = '#27ae60';
            document.getElementById('formulario-contacto').reset();
        } else {
            resposta.innerText = '❌ Ocorreu um erro ao enviar. Tente novamente.';
            resposta.style.color = '#e74c3c';
        }
    })
    .catch(error => {
        resposta.innerText = '❌ Erro de ligação. Verifique a sua internet.';
        resposta.style.color = '#e74c3c';
    });
});
