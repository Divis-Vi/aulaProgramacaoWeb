// script.js - melhorias: menu mobile, animações, validação acessível

document.addEventListener('DOMContentLoaded', () => {
  // mobile menu toggle (works across pages)
  const btnMenu = document.querySelectorAll('#btnMenu');
  btnMenu.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.getElementById('navMenu');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  });

  // IntersectionObserver for scroll animations
  const elements = document.querySelectorAll('section, form, .projetos-lista, .hero');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animado');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.18});

  elements.forEach(el => {
    el.classList.add('invisivel');
    observer.observe(el);
  });

  // tactile click effect
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', (e) => {
      el.classList.add('clicado');
      setTimeout(()=> el.classList.remove('clicado'), 140);
    });
  });

  // Accessible form validation for #formCadastro
  const form = document.getElementById('formCadastro');
  if (form) {
    const status = document.getElementById('formStatus');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const errors = [];

      const nome = data.get('nome')?.trim();
      const email = data.get('email')?.trim();
      const telefone = data.get('telefone')?.trim();
      const interesse = data.get('interesse')?.trim();

      if (!nome) errors.push('Por favor, informe seu nome.');
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Informe um email válido.');
      if (!telefone || telefone.length < 8) errors.push('Informe um telefone válido.');
      if (!interesse) errors.push('Escolha a área de interesse.');

      if (errors.length) {
        // mostra erros de forma acessível
        status.textContent = errors.join(' ');
        status.classList.remove('visually-hidden');
        status.focus();
        return;
      }

      // Simula envio e mostra confirmação (substituir por fetch para backend real)
      status.textContent = 'Obrigado pelo cadastro! Em breve entraremos em contato.';
      status.classList.remove('visually-hidden');
      status.focus();
      form.reset();
    });
  }

  // keyboard accessibility: close mobile menu with Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('#navMenu').forEach(nav => nav.classList.remove('open'));
      document.querySelectorAll('#btnMenu').forEach(b => b.setAttribute('aria-expanded','false'));
    }
  });
});
