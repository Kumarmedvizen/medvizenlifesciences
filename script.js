document.addEventListener('DOMContentLoaded', () => {
  // ---------- AOS ----------
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      delay: 0,
      easing: 'ease-in-out-quad'
    });
    AOS.refresh();
  }

  // ---------- Mobile menu ----------
  const menuButton = document.querySelector('.menu');
  const navLinks   = document.querySelector('.navlinks');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      menuButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Contact form ----------
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]')?.value.trim()         || '';
    const email   = form.querySelector('[name="email"]')?.value.trim()        || '';
    const btn     = form.querySelector('button[type="submit"]');
    const original = btn ? btn.textContent : '';

    // Client-side validation
    if (!name)  return alert('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email.');

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    try {
      const res  = await fetch(form.action || 'send-mail.php', {
        method: 'POST',
        body: new FormData(form)
      });
      const text = await res.text();
      alert(text);
      if (res.ok) form.reset();
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again or email medvizen.lifesciences@gmail.com directly.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = original;
      }
    }
  });
});
