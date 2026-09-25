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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Grab fields by order: 0=Name, 1=Organization, 2=Email, 3=Phone, 4=Message
    const inputs = form.querySelectorAll('input, textarea');
    const name         = inputs[0]?.value.trim() || '';
    const organization = inputs[1]?.value.trim() || '';
    const email        = inputs[2]?.value.trim() || '';
    const phone        = inputs[3]?.value.trim() || '';
    const message      = inputs[4]?.value.trim() || '';

    // Basic client-side validation
    if (!name)  return alert('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email.');

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    try {
      const body = new URLSearchParams({ name, organization, email, phone, message });
      const res  = await fetch('send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      const text = await res.text();
      alert(text);
      if (res.ok) form.reset();
    } catch {
      alert('Network error. Please try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
});
