// Adiciona também o controlo do modo escuro nesta página para funcionar aqui
const btnTema = document.getElementById('btn-tema');
const temaGuardado = localStorage.getItem('tema') || 'light';
document.documentElement.setAttribute('data-theme', temaGuardado);
btnTema.innerText = temaGuardado === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
btnTema.addEventListener('click', () => {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', novoTema);
    localStorage.setItem('tema', novoTema);
    btnTema.innerText = novoTema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
});

// VALIDAÇÃO AVANÇADA DO FORMULÁRIO
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
        return; // Para a execução do código aqui
    }

    // 2. Validação profissional de e-mail usando Expressão Regular (Regex)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(emailUtilizador)) {
        resposta.innerText = '❌ Erro: Por favor, introduza um e-mail válido (ex: nome@dominio.com).';
        resposta.style.color = '#e74c3c';
        return;
    }

    // Se passar todas as validações, envia com sucesso!
    resposta.innerText = `Thank you, ${nomeUtilizador}! Mensagem enviada com sucesso.`;
    resposta.style.color = '#27ae60';

    document.getElementById('formulario-contacto').reset();
});
