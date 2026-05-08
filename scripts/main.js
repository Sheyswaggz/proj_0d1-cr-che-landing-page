/**
 * Little Stars Crèche - Main JavaScript
 * Navigation functionality with smooth scrolling, mobile menu, and active section highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================================================
  // Smooth Scroll for Anchor Links
  // ========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        closeMobileMenu();
      }
    });
  });

  // ========================================================================
  // Mobile Hamburger Menu Toggle
  // ========================================================================
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__links');

  function closeMobileMenu() {
    if (mobileMenu && hamburger) {
      mobileMenu.classList.remove('nav__links--active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('nav__links--active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });
  }

  // ========================================================================
  // Scroll-based Navigation Background Change
  // ========================================================================
  const nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ========================================================================
  // Active Section Highlighting with Intersection Observer
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length > 0 && navLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const targetId = '#' + entry.target.id;
            link.classList.toggle('nav__link--active', linkHref === targetId);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // ========================================================================
  // Close Mobile Menu on Outside Click
  // ========================================================================
  document.addEventListener('click', (e) => {
    if (mobileMenu && hamburger) {
      if (!e.target.closest('.nav') && mobileMenu.classList.contains('nav__links--active')) {
        closeMobileMenu();
      }
    }
  });
});
