document.addEventListener('DOMContentLoaded', function() {
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

  // Criando o slide de depoimentos
  const sliderTrack = document.querySelector('.slider-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const sliderDotsContainer = document.querySelector('.slider-dots');

  let currentIndex = 0;
  const totalSlides = testimonialSlides.length;

  // Variáveis para Rolagem Automática
  const autoSlideInterval = 10000; // 10 segundos
  const pauseAfterInteraction = 30000; // 30 segundos de pausa após interação
  let slideTimer;
  let interactionTimer;

  function updateSlider() {
    const offset = -currentIndex * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.dot').forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // --- Funções para Rolagem Automática ---
  function startAutoSlide() {
    stopAutoSlide();
    slideTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, autoSlideInterval);
  }

  function stopAutoSlide() {
    clearInterval(slideTimer);
    clearTimeout(interactionTimer);
  }

  function resetAutoSlideTimer() {
    stopAutoSlide();
    interactionTimer = setTimeout(() => {
      startAutoSlide();
    }, pauseAfterInteraction);
  }
  // --- Fim das Funções de Rolagem Automática ---


  function createDots() {
    sliderDotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        resetAutoSlideTimer(); // Reinicia o timer ao clicar nos dots
      });
      sliderDotsContainer.appendChild(dot);
    }
    updateSlider(); // Garante que o dot inicial esteja ativo
  }

  // Event Listeners para os botões de navegação
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
    resetAutoSlideTimer(); // Reinicia o timer ao clicar nos botões
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlideTimer(); // Reinicia o timer ao clicar nos botões
  });

  // --- Inicialização ---
  createDots(); // Cria os dots e define o slide inicial
  startAutoSlide(); // Inicia a rolagem automática quando o script é carregado


  const main = new Splide('#main-slider', {
    type: 'fade',
    pagination: false,
    arrows: false,
  });

  const thumbnails = new Splide('#thumbnail-slider', {
    rewind: true,
    fixedWidth: 104,
    fixedHeight: 104,
    isNavigation: true,
    gap: 10,
    focus: 'center',
    pagination: false,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
  });

  main.sync(thumbnails);
  main.mount();
  thumbnails.mount();


  document.querySelectorAll('.accordion .trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const accordion = trigger.parentElement;
      const isOpen = accordion.classList.contains('open');

      if (isOpen) {
        accordion.classList.remove('open');
      } else {
        document.querySelectorAll('.accordion').forEach(accordion => {
          accordion.classList.remove('open');
        });

        accordion.classList.add('open');
      }
    });
  });
});