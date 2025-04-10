document.addEventListener('DOMContentLoaded', function() {
    // Animación del logo al cargar
    anime({
      targets: '.logo img',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutElastic'
    });
  
    // Animación de los enlaces de navegación
    anime({
      targets: 'nav ul li',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 300}),
      duration: 800,
      easing: 'easeOutExpo'
    });
  
    // Animación del hero
    anime({
      targets: '.hero-content h1',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  
    anime({
      targets: '.hero-content p',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 300,
      duration: 800,
      easing: 'easeOutExpo'
    });
  
    anime({
      targets: '.hero-content .btn',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 500,
      duration: 800,
      easing: 'easeOutExpo'
    });
  
    // Efecto scroll para el header
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.querySelector('.fixed-header').classList.add('scrolled');
      } else {
        document.querySelector('.fixed-header').classList.remove('scrolled');
      }
    });
  
    // Animación de las tarjetas de producto
    anime({
      targets: '.product-card',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 200}),
      duration: 800,
      easing: 'easeOutExpo'
    });
  
    // Efecto hover en productos
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        anime({
          targets: this,
          scale: 1.03,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        anime({
          targets: this.querySelector('.product-image img'),
          scale: 1.1,
          duration: 500,
          easing: 'easeOutQuad'
        });
      });
      
      card.addEventListener('mouseleave', function() {
        anime({
          targets: this,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        anime({
          targets: this.querySelector('.product-image img'),
          scale: 1,
          duration: 500,
          easing: 'easeOutQuad'
        });
      });
    });
  
    // Animación del título de sección
    anime({
      targets: '.section-title',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });
  
    anime({
      targets: '.section-title::after',
      scaleX: [0, 1],
      duration: 800,
      delay: 300,
      easing: 'easeOutExpo'
    });
  });