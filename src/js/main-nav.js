// Nav menu toggle
const menuIcon = document.querySelector('.menu-btn');
const menu = document.querySelector('.nav-menu');
const body = document.querySelector('html');

menuIcon.addEventListener('click', () => {
  menu.classList.toggle('active');
  body.classList.toggle('disable-scroll');
});

// Menu button toggle
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});
