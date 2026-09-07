document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('mobileMenu');
  const toast = document.getElementById('toast');
  const notify = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2200);
  };
  if (localStorage.getItem('wishAnnClosed') === '1') document.getElementById('announcement')?.remove();
  document.querySelector('[data-close-announcement]')?.addEventListener('click', () => {
    document.getElementById('announcement')?.remove();
    localStorage.setItem('wishAnnClosed', '1');
  });
  document.querySelectorAll('[data-open-menu]').forEach((button) => button.addEventListener('click', () => {
    menu?.classList.add('open'); document.body.classList.add('menu-open');
  }));
  document.querySelectorAll('[data-close-menu]').forEach((button) => button.addEventListener('click', () => {
    menu?.classList.remove('open'); document.body.classList.remove('menu-open');
  }));
  document.querySelector('.search-btn')?.addEventListener('click', () => {
    const query = window.prompt('Search Wish Candle');
    if (query?.trim()) window.location.href = `${wishCandle.shopUrl}?s=${encodeURIComponent(query.trim())}`;
  });
  document.querySelectorAll('[data-newsletter]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault(); form.reset(); notify('Thank you for subscribing');
  }));
});
