document.addEventListener('DOMContentLoaded', function() {
  const listaDeProblemasItens = document.querySelectorAll('.bullet-list li.hidden-item');
  const linhaColorida = document.querySelector('.timeline-line-fill');
  const secaoDaLinhaDoTempo = document.querySelector('.timeline-wrapper');

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

  function onScrollGlobal() {
    verificarVisibilidadeItens();
    fazerLinhaAndar();
  }

  const sliderTrack = document.querySelector('.slider-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const sliderDotsContainer = document.querySelector('.slider-dots');

  let currentIndex = 0;
  const totalSlides = testimonialSlides.length;

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

  function createDots() {
    sliderDotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      sliderDotsContainer.appendChild(dot);
    }

    updateSlider();
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  createDots();

  window.addEventListener('scroll', onScrollGlobal);
  onScrollGlobal();
});