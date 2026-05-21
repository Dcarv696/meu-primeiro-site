// Controlo do Modo Escuro na Página Inicial
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

// Lógica do Contador de Cliques
const btnClique = document.getElementById('botao-clique');
const btnReset = document.getElementById('botao-reset');
const elementoContador = document.getElementById('contador');
const mensagem = document.getElementById('mensagem-js');

let cliques = Number(localStorage.getItem('totalCliques')) || 0;

if (elementoContador) {
    elementoContador.innerText = cliques;
}
atualizarMensagem(cliques);

if (btnClique) {
    btnClique.addEventListener('click', () => {
        cliques = cliques + 1;
        localStorage.setItem('totalCliques', cliques);
        if (elementoContador) elementoContador.innerText = cliques;
        atualizarMensagem(cliques);
    });
}

if (btnReset) {
    btnReset.addEventListener('click', () => {
        localStorage.removeItem('totalCliques');
        cliques = 0;
        if (elementoContador) elementoContador.innerText = cliques;
        if (mensagem) {
            mensagem.innerText = 'Dados limpos com sucesso!';
            mensagem.style.color = '#7f8c8d';
        }
    });
}

function atualizarMensagem(valor) {
    if (!mensagem) return;
    if (valor === 0) {
        mensagem.innerText = '';
    } else if (valor === 5) {
        mensagem.innerText = '🏆 Incrível! Alcançou a meta de 5 cliques!';
        mensagem.style.color = '#e67e22';
    } else if (valor === 10) {
        mensagem.innerText = '🚀 Avançado! Já vai em 10 cliques!';
        mensagem.style.color = '#9b59b6';
    } else {
        mensagem.innerText = '🎉 O JavaScript está a funcionar em tempo real!';
        mensagem.style.color = '#27ae60';
    }
}
