const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector('.tabs-list');
const tabButtons = tabsList.querySelectorAll('.tab-button');
const tabPanels = tabsContainer.querySelectorAll('.tabs_panels > div');

// Set roles and attributes
tabsList.setAttribute('role', 'tablist');
tabsList.querySelectorAll('li').forEach(li => li.setAttribute('role', 'presentation'));

tabButtons.forEach((tab, index) => {
  const targetId = tab.getAttribute('data-target');
  const panel = tabsContainer.querySelector(targetId);

  tab.setAttribute('role', 'tab');
  tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
  tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');

  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');
  panel.setAttribute('aria-labelledby', tab.id);

  if (index !== 0) {
    panel.setAttribute('hidden', 'true');
  }
});

// Handle tab switching on click
tabsContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.tab-button');
  if (!clickedTab) return;
  e.preventDefault();
  switchTab(clickedTab);
});

// Handle keyboard navigation
tabsContainer.addEventListener('keydown', e => {
  const currentTab = document.activeElement;
  const currentIndex = Array.from(tabButtons).indexOf(currentTab);

  switch (e.key) {
    case 'ArrowLeft':
      moveTo(currentIndex - 1);
      break;
    case 'ArrowRight':
      moveTo(currentIndex + 1);
      break;
    case 'Home':
      e.preventDefault();
      switchTab(tabButtons[0]);
      break;
    case 'End':
      e.preventDefault();
      switchTab(tabButtons[tabButtons.length - 1]);
      break;
  }
});

function moveTo(index) {
  const newIndex = (index + tabButtons.length) % tabButtons.length;
  switchTab(tabButtons[newIndex]);
}

function switchTab(newTab) {
  const targetId = newTab.getAttribute('data-target');
  const newPanel = tabsContainer.querySelector(targetId);

  tabButtons.forEach(tab => {
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
  });

  tabPanels.forEach(panel => {
    panel.setAttribute('hidden', 'true');
  });

  newTab.setAttribute('aria-selected', 'true');
  newTab.setAttribute('tabindex', '0');
  newTab.focus();
  newPanel.removeAttribute('hidden');
}

// Activate tab from ?tab=2 parameter
function activateTabFromURLParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam) {
    const tabIndex = parseInt(tabParam, 10) - 1;
    if (tabIndex >= 0 && tabIndex < tabButtons.length) {
      switchTab(tabButtons[tabIndex]);
    }
  }
}

window.addEventListener('load', activateTabFromURLParam);
