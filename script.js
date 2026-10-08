const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const root = document.documentElement;
const revealElements = document.querySelectorAll('[data-reveal]');
root.classList.add('js');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((element) => revealObserver.observe(element));
  window.setTimeout(() => revealElements.forEach((element) => element.classList.add('in')), 2000);
} else {
  revealElements.forEach((element) => element.classList.add('in'));
}

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const siteHeader = document.querySelector('.site-header');
const updateHeader = () => {
  if (siteHeader) siteHeader.classList.toggle('scrolled', window.scrollY > 8);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.case[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    projectCards.forEach((card) => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const navigationLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const navigationSections = document.querySelectorAll('[data-nav-section]');

if ('IntersectionObserver' in window && navigationSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -65% 0px' });

  navigationSections.forEach((section) => sectionObserver.observe(section));
}
