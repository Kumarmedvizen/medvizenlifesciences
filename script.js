document.addEventListener('DOMContentLoaded', () => {
  console.log('AOS available:', !!window.AOS);
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      delay: 0,
      easing: 'ease-in-out-quad'
    });
    console.log('AOS initialized');
    AOS.refresh();
  } else {
    console.warn('AOS library did not load');
  }

  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thank you. Please connect this form to your official email/CRM before launch.');
      form.reset();
    });
  }

  const menuButton = document.querySelector('.menu');
  const navLinks = document.querySelector('.navlinks');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});
