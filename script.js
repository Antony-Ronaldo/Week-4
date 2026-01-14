document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', link.getAttribute('href'));
      }
    });
  });

  const navLinks = Array.from(document.querySelectorAll('nav a'));
  const sections = Array.from(document.querySelectorAll('main section'));

  const setActive = id => {
    navLinks.forEach(a => {
      if (a.getAttribute('href') === `#${id}`) {
        a.classList.add('active');
        a.style.color = '#ffd700';
        a.style.fontWeight = '700';
      } else {
        a.classList.remove('active');
        a.style.color = '';
        a.style.fontWeight = '';
      }
    });
  };

  const obsOptions = { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, obsOptions);

  sections.forEach(section => sectionObserver.observe(section));

  sections.forEach(s => {
    s.style.opacity = 0;
    s.style.transform = 'translateY(16px)';
    s.style.transition = 'opacity 600ms ease, transform 600ms ease';
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
      }
    });
  }, { root: null, threshold: 0.12 });

  sections.forEach(s => revealObserver.observe(s));

  const skillMap = {
    'HTML5 & Accessibility': 95,
    'CSS3 & Responsive Design': 90,
    'JavaScript & React': 88,
    'Backend & APIs': 75,
    'Databases': 72,
    'Tools & Testing': 80
  };

  document.querySelectorAll('.skill').forEach(skillEl => {
    const nameEl = skillEl.querySelector('.skill-name');
    if (!nameEl) return;
    const name = nameEl.textContent.trim();
    const pct = skillMap[name] ?? 70;

    if (!skillEl.querySelector('.skill-level')) {
      const badge = document.createElement('span');
      badge.className = 'skill-level';
      badge.textContent = `${pct}%`;
      nameEl.insertAdjacentElement('afterend', badge);
    }
  });

  const form = document.querySelector('#contact form');
  if (form) {
    const status = document.createElement('div');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.style.marginTop = '0.5rem';
    form.appendChild(status);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        status.textContent = 'Please complete all fields.';
        status.style.color = 'crimson';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      status.textContent = '';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
        status.textContent = "Thanks — I've received your message and will get back to you soon!";
        status.style.color = 'green';
        form.reset();
      }, 1000);
    });
  }

  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.title = 'Back to top';
  topBtn.ariaLabel = 'Back to top';
  topBtn.innerHTML = '↑';
  Object.assign(topBtn.style, {
    position: 'fixed',
    right: '18px',
    bottom: '18px',
    padding: '10px 12px',
    borderRadius: '6px',
    border: 'none',
    background: '#333',
    color: '#fff',
    cursor: 'pointer',
    display: 'none',
    zIndex: 9999
  });
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) topBtn.style.display = 'block';
    else topBtn.style.display = 'none';
  });

  const themeBtn = document.createElement('button');
  themeBtn.type = 'button';
  themeBtn.title = 'Toggle dark mode';
  themeBtn.innerHTML = '🌙';
  Object.assign(themeBtn.style, {
    marginLeft: '1rem',
    padding: '6px 8px',
    borderRadius: '6px',
    border: 'none',
    background: '#444',
    color: '#fff',
    cursor: 'pointer'
  });

  const header = document.querySelector('header .container h1');
  if (header) header.insertAdjacentElement('afterend', themeBtn);

  const applyTheme = mode => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#eaeaea';
      document.querySelectorAll('header, footer').forEach(el => el.style.background = '#111');
      themeBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.querySelectorAll('header, footer').forEach(el => el.style.background = '');
      themeBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  };

  themeBtn.addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  if (localStorage.getItem('theme') === 'dark') applyTheme('dark');

});
