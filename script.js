document.addEventListener("DOMContentLoaded", function() {
  let currentSlide = 0;
  let autoSlideInterval; // Variável para armazenar o intervalo da troca automática de slides
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const buttons = document.querySelectorAll('.manual-btn');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    // Se o slide atual for o último e for um vídeo, reproduza-o
    if (index === totalSlides - 1 && slides[index].querySelector('video')) {
      const video = slides[index].querySelector('video');
      video.play();
      // Defina um temporizador para pausar o vídeo após 30 segundos
      setTimeout(function() {
        video.pause();
        nextSlide(); // Avança para o próximo slide após 30 segundos
      }, 30000); // Tempo em milissegundos (30 segundos)
    }
    // Adiciona a classe 'active' ao botão correspondente
    buttons.forEach((btn, i) => {
      btn.classList.remove('active');
      if (i === index) {
        btn.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Mostra a primeira imagem
  showSlide(currentSlide);

  // Intervalo para trocar de slide a cada 5 segundos (5000ms)
  autoSlideInterval = setInterval(nextSlide, 5000);

  // Pausar a troca automática de slides enquanto o vídeo estiver sendo reproduzido
  document.querySelectorAll('.slide video').forEach(video => {
    video.addEventListener('play', function() {
      clearInterval(autoSlideInterval);
    });
    video.addEventListener('pause', function() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    });
  });

  // Adicionando funcionalidade de troca manual
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Adicionando funcionalidade de troca manual anterior
  document.querySelector('#prevSlide').addEventListener('click', function() {
    prevSlide();
  });
});
