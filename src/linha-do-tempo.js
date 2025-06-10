// --- Linha do Tempo e Animação de Itens ---
const listaDeProblemasItens = document.querySelectorAll('.bullet-list li.hidden-item');
const linhaColorida = document.querySelector('.timeline-line-fill');
const secaoDaLinhaDoTempo = document.querySelector('.timeline-wrapper');

// Função para verificar visibilidade dos itens e aplicar classes
function verificarVisibilidadeItens() {
  listaDeProblemasItens.forEach(item => {
    const itemRect = item.getBoundingClientRect();
    const isVisible = (itemRect.top < window.innerHeight - 50) && (itemRect.bottom > 0);

    if (isVisible && item.classList.contains('hidden-item')) {
      item.classList.remove('hidden-item');
      item.classList.add('visible-item');

    } else if (!isVisible && item.classList.contains('visible-item')) {
      item.classList.remove('visible-item');
      item.classList.add('hidden-item');
    }
  });
}

// Função para animar a linha de preenchimento
function fazerLinhaAndar() {
  const infoDaSecao = secaoDaLinhaDoTempo.getBoundingClientRect();
  const pontoDeReferencia = window.innerHeight / 2;
  const distanciaPercorrida = pontoDeReferencia - infoDaSecao.top;
  const progresso = Math.max(0, Math.min(1, distanciaPercorrida / infoDaSecao.height));
  const alturaFinalLinha = progresso * infoDaSecao.height;
  if (linhaColorida) {
    linhaColorida.style.height = `${alturaFinalLinha}px`;
  } else {
    console.warn("Elemento .timeline-line-fill não encontrado para a função fazerLinhaAndar.");
  }
}

// Otimização com requestAnimationFrame para scroll
function onScrollGlobal() {
  verificarVisibilidadeItens();
  fazerLinhaAndar();
}

// --- Inicialização da Linha do Tempo ---
window.addEventListener('scroll', onScrollGlobal);
onScrollGlobal();