// Basic interactivity: menu toggle, theme toggle, year injection
document.addEventListener('DOMContentLoaded', function(){
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');

  // show year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile menu
  if(menuToggle){
    menuToggle.addEventListener('click', function(){
      if(nav.style.display === 'block') nav.style.display = '';
      else nav.style.display = 'block';
    });
  }

  // theme (simple persist)
  const root = document.documentElement;
  const saved = localStorage.getItem('site-theme');
  if(saved) root.setAttribute('data-theme', saved);

  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? '' : 'dark';
      if(next) root.setAttribute('data-theme', next);
      else root.removeAttribute('data-theme');
      localStorage.setItem('site-theme', next);
    });
  }

  // contact form: simple client-side validation / fallback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      // let browser handle mailto; we prevent double submission
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name || !email || !message){
        alert('Please complete all fields before sending.');
        return;
      }
      // fallback: open mail client using mailto
      const subject = encodeURIComponent('Contact from portfolio: ' + name);
      const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:you@example.com?subject=' + subject + '&body=' + body;
    });
  }
});
