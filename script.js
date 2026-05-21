// ==========================================
// 1. CONTROLO DO MODO ESCURO (Global)
// ==========================================
const btnTema = document.getElementById('btn-tema');
const temaGuardado = localStorage.getItem('tema') || 'light';

// Aplica o tema guardado logo ao abrir a página
document.documentElement.setAttribute('data-theme', temaGuardado);
atualizarBotaoTema(temaGuardado);

if (btnTema) {
    btnTema.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', novoTema);
        localStorage.setItem('tema', novoTema);
        atualizarBotaoTema(novoTema);
    });
}

function atualizarBotaoTema(tema) {
    if (btnTema) {
        btnTema.innerText = tema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    }
}

// ==========================================
// 2. CONTROLO DO CONTADOR E REINICIAR (Página Inicial)
// ==========================================
// Carrega o número guardado ou começa em 0
let cliques = parseInt(localStorage.getItem('totalCliques')) || 0;

// Atualiza o ecrã com o valor guardado assim que a página abre
const elementoContador = document.getElementById('contador');
if (elementoContador) {
    elementoContador.innerText = cliques;
    atualizarMensagem(cliques);
}

// Lógica do botão "Clique Aqui"
const btnClique = document.getElementById('botao-clique');
if (btnClique) {
    btnClique.addEventListener('click', () => {
        cliques = cliques + 1;
        localStorage.setItem('totalCliques', cliques);

        if (elementoContador) elementoContador.innerText = cliques;
        atualizarMensagem(cliques);
    });
}

// Lógica do botão "Reiniciar"
const btnReset = document.getElementById('botao-reset');
if (btnReset) {
    btnReset.addEventListener('click', () => {
        localStorage.removeItem('totalCliques');
        cliques = 0;

        if (elementoContador) elementoContador.innerText = cliques;

        const mensagem = document.getElementById('mensagem-js');
        if (mensagem) {
            mensagem.innerText = 'Dados limpos com sucesso!';
            mensagem.style.color = '#7f8c8d';
        }
    });
}

// Função isolada para cuidar das mensagens de meta
function atualizarMensagem(valor) {
    const mensagem = document.getElementById('mensagem-js');
    if (!mensagem) return; // Se não encontrar o elemento, sai da função

    if (valor === 5) {
        mensagem.innerText = '🏆 Incrível! Alcançou a meta de 5 cliques!';
        mensagem.style.color = '#e67e22';
    } else if (valor === 10) {
        mensagem.innerText = '🚀 Avançado! Já vai em 10 cliques!';
        mensagem.style.color = '#9b59b6';
    } else if (valor > 0) {
        mensagem.innerText = '🎉 O JavaScript está a funcionar em tempo real!';
        mensagem.style.color = '#27ae60';
    } else {
        mensagem.innerText = ''; // Limpa se for 0
    }
}
