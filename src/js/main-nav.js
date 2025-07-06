const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.nav-menu');
const body = document.querySelector('html');

let isMenuOpen = false;

function toggleMenu() {
  // Toggle menu visibility
  menu.classList.toggle('active');
  body.classList.toggle('disable-scroll');

  // Toggle button animation
  menuBtn.classList.toggle('open');

  // Update state and aria-label
  isMenuOpen = !isMenuOpen;
  menuBtn.setAttribute('aria-label', isMenuOpen ? 'Zavřít menu' : 'Otevřít menu');
}

// Handle both click and keyboard events
menuBtn.addEventListener('click', toggleMenu);

menuBtn.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleMenu();
  }
});

// Set initial aria-label
menuBtn.setAttribute('aria-label', 'Otevřít menu');

// Handle dropdown functionality
var menuItems = document.querySelectorAll('.has-submenu');
Array.prototype.forEach.call(menuItems, function (el, i) {
  var existingBtn = el.querySelector('.dropdown-toggle');

  // Function to open submenu
  function openSubmenu() {
    el.className = 'has-submenu nav-menu_item open';
    el.querySelector('.nav-menu_link').setAttribute('aria-expanded', 'true');
    existingBtn.setAttribute('aria-expanded', 'true');
  }

  // Function to close submenu
  function closeSubmenu() {
    el.className = 'has-submenu nav-menu_item';
    el.querySelector('.nav-menu_link').setAttribute('aria-expanded', 'false');
    existingBtn.setAttribute('aria-expanded', 'false');
  }

  // Click event (toggle functionality)
  existingBtn.addEventListener('click', function (event) {
    if (this.closest('.has-submenu').className == 'has-submenu nav-menu_item') {
      openSubmenu();
    } else {
      closeSubmenu();
    }
    event.preventDefault();
  });

  // Hover events
  el.addEventListener('mouseenter', function () {
    openSubmenu();
  });

  el.addEventListener('mouseleave', function () {
    closeSubmenu();
  });
});

// Global focus handler for closing submenus when navigating away
document.addEventListener('focusin', function (event) {
  // Find all currently open submenus
  var openSubmenus = document.querySelectorAll('.has-submenu.open');

  openSubmenus.forEach(function (openSubmenu) {
    // Check if the focused element is NOT inside this submenu
    if (!openSubmenu.contains(event.target)) {
      // Close this submenu
      openSubmenu.className = 'has-submenu nav-menu_item';
      openSubmenu.querySelector('.nav-menu_link').setAttribute('aria-expanded', 'false');
      openSubmenu.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    }
  });
});
