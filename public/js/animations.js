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

  document.addEventListener('DOMContentLoaded', function() {
    // Animación inicial del carrito
    anime({
      targets: '#cartIcon',
      scale: [0.8, 1],
      rotate: [15, 0],
      opacity: [0, 1],
      duration: 800,
      delay: 1000,
      easing: 'easeOutElastic'
    });
  
    // Efecto hover mejorado
    document.getElementById('cartIcon').addEventListener('mouseenter', function() {
      anime({
        targets: this,
        scale: 1.1,
        rotate: -10,
        duration: 300,
        easing: 'easeOutBack'
      });
      
      anime({
        targets: '#cartCount',
        scale: 1.3,
        duration: 300
      });
    });
  
    document.getElementById('cartIcon').addEventListener('mouseleave', function() {
      anime({
        targets: this,
        scale: 1,
        rotate: 0,
        duration: 300
      });
      
      anime({
        targets: '#cartCount',
        scale: 1,
        duration: 300
      });
    });
  });
  
  // Función para animar cuando se añade un producto
  function animateCartUpdate(newCount) {
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    
    // Actualizar contador
    cartCount.textContent = newCount;
    
    // Añadir clases de animación
    cartIcon.classList.add('cart-animate');
    cartCount.classList.add('cart-notify');
    
    // Remover clases después de la animación
    setTimeout(() => {
      cartIcon.classList.remove('cart-animate');
    }, 500);
    
    setTimeout(() => {
      cartCount.classList.remove('cart-notify');
    }, 3000);
  }


  // Simulación de añadir al carrito (para pruebas)
  document.addEventListener('DOMContentLoaded', function() {
    // Animación para las filas de la tabla
    anime({
      targets: '.order-row',
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 300}),
      duration: 800,
      easing: 'easeOutExpo'
    });

    // Animación para el hero section
    anime({
      targets: '.orders-hero .hero-title',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.orders-hero .hero-subtitle',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 300,
      duration: 800,
      easing: 'easeOutExpo'
    });

    // Efecto hover para las filas
    document.querySelectorAll('.order-row').forEach(row => {
      row.addEventListener('mouseenter', function() {
        anime({
          targets: this,
          scale: 1.02,
          backgroundColor: 'rgba(255, 190, 11, 0.05)',
          duration: 300
        });
      });
      
      row.addEventListener('mouseleave', function() {
        anime({
          targets: this,
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          duration: 300
        });
      });
    });
  });