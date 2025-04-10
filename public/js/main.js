// Funcionalidades adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil (si se implementa)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');
    
    if(mobileMenuButton && navMenu) {
      mobileMenuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        anime({
          targets: navMenu,
          opacity: [0, 1],
          height: ['0px', 'auto'],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    }
    
    // Efecto de carga para imágenes
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            
            anime({
              targets: img,
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutQuad'
            });
            
            observer.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  });