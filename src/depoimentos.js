// Criando o slide de depoimentos
const sliderTrack = document.querySelector('.slider-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.prev-slide');
const nextButton = document.querySelector('.next-slide');
const sliderDotsContainer = document.querySelector('.slider-dots');

let currentIndex = 0;
const totalSlides = testimonialSlides.length;

// Variáveis para Rolagem Automática
const autoSlideInterval = 8000; // 8 segundos
const pauseAfterInteraction = 20000; // 20 segundos de pausa após interação
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