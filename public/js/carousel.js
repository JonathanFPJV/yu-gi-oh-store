document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    let intervalId;
    const slideInterval = 5000; // 5 segundos
    
    // Función para mover el carrusel
    function goToSlide(index) {
      // Asegurarse que el índice está dentro de los límites
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      
      // Animación con Anime.js
      anime({
        targets: carousel,
        translateX: `${-index * 100}%`,
        duration: 800,
        easing: 'easeInOutQuad'
      });
      
      // Actualizar puntos de navegación
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentIndex = index;
    }
    
    // Función para siguiente slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }
    
    // Función para slide anterior
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }
    
    // Iniciar autoplay
    function startAutoPlay() {
      intervalId = setInterval(nextSlide, slideInterval);
    }
    
    // Detener autoplay
    function stopAutoPlay() {
      clearInterval(intervalId);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        stopAutoPlay();
        startAutoPlay();
      });
    });
    
    // Pausar autoplay al hacer hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Iniciar el carrusel
    startAutoPlay();
    
    // Animación inicial de los elementos del carrusel
    anime({
      targets: '.carousel-caption h3, .carousel-caption p, .carousel-caption .carousel-btn',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo'
    });
  });