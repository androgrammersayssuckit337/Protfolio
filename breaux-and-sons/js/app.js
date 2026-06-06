document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (menuBtn && mobileMenu && overlay && closeBtn) {
    const openMenu = () => {
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
  }

  // Highlight active link in Desktop Nav
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === '.' + path || link.getAttribute('href') === path || (path === '/' && link.getAttribute('href') === './index.html')) {
      link.classList.add('text-breaux-accent', 'font-semibold');
      link.classList.remove('text-neutral-400', 'text-slate-600');
    }
  });

  // Page Transition Logic
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      
      // Check if it's an internal link
      if (
        target && 
        !target.startsWith('http') && 
        !target.startsWith('mailto:') && 
        !target.startsWith('tel:') && 
        link.target !== '_blank'
      ) {
        e.preventDefault();
        
        // Add fade-out class to the body
        document.body.classList.add('page-fade-out');
        
        // Navigate after animation completes
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      }
    });
  });
});

// Handle back/forward browser navigation to remove fade out state
window.addEventListener('pageshow', (e) => {
  if (e.persisted || document.body.classList.contains('page-fade-out')) {
    document.body.classList.remove('page-fade-out');
  }
});
