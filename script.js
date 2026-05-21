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

// 1. MAPEAMENTO DOS ELEMENTOS DO HTML
const btnClique = document.getElementById('botao-clique');
const btnReset = document.getElementById('botao-reset');
const elementoContador = document.getElementById('contador');
const mensagem = document.getElementById('mensagem-js');

// 2. INICIALIZAÇÃO DA VARIÁVEL (Recupera o valor guardado ou começa em 0)
// O localStorage guarda texto, por isso usamos o `Number()` para converter para número
let cliques = Number(localStorage.getItem('totalCliques')) || 0;

// 3. ATUALIZAÇÃO INICIAL DA INTERFACE
// Garante que o site mostra os cliques antigos assim que a página abre
if (elementoContador) {
    elementoContador.innerText = cliques;
}
atualizarMensagem(cliques);

// 4. LÓGICA DO BOTÃO "CLIQUE AQUI"
if (btnClique) {
    btnClique.addEventListener('click', () => {
        cliques = cliques + 1;
        localStorage.setItem('totalCliques', cliques);

        if (elementoContador) elementoContador.innerText = cliques;
        atualizarMensagem(cliques);
    });
}

// 5. LÓGICA DO BOTÃO "REINICIAR"
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

// 6. FUNÇÃO DE ATUALIZAÇÃO DE MENSAGENS
function atualizarMensagem(valor) {
    if (!mensagem) return; // Se não encontrar o elemento, sai da função

    if (valor === 0) {
        mensagem.innerText = ''; // Fica vazio se for zero
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
