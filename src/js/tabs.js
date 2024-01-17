const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector('.tabs-list');
const tabButtons = tabsList.querySelectorAll('.tab-button');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

tabsList.setAttribute('role', 'tablist');

for (const listitem of tabsList.querySelectorAll('li')) {
  listitem.setAttribute('role', 'presentation');
}

tabButtons.forEach((tab, index) => {
  tab.setAttribute('role', 'tab');
  tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
  tabPanels[index].setAttribute('role', 'tabpanel');
  tabPanels[index].setAttribute('tabindex', '0');
  tabPanels[index].setAttribute('hidden', 'true');

  if (index === 0) {
    tab.setAttribute('aria-selected', 'true');
    tabPanels[index].removeAttribute('hidden');
  }
});

tabsContainer.addEventListener('click', e => {
  const clickedTab = e.target.closest('.tab-button');
  if (!clickedTab) return;
  e.preventDefault();
  switchTab(clickedTab);
});

tabsContainer.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      move(-1);
      break;
    case 'ArrowRight':
      move(1);
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

function move(direction) {
  const currentTab = document.activeElement;
  const currentIndex = Array.from(tabButtons).indexOf(currentTab);
  const newIndex = (currentIndex + direction + tabButtons.length) % tabButtons.length;
  switchTab(tabButtons[newIndex]);
}

function switchTab(newTab) {
  const activePanelId = newTab.getAttribute('href');
  const activePanel = tabsContainer.querySelector(activePanelId);

  tabButtons.forEach(button => {
    button.setAttribute('aria-selected', 'false');
    button.setAttribute('tabindex', '-1');
  });

  tabPanels.forEach(panel => {
    panel.setAttribute('hidden', 'true');
  });

  activePanel.removeAttribute('hidden');
  newTab.setAttribute('aria-selected', 'true');
  newTab.setAttribute('tabindex', '0');
  newTab.focus();
}

// Function to set the active tab based on the "tab" URL parameter
function activateTabFromURLParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');

  if (tabParam) {
    const tabIndex = parseInt(tabParam) - 1; // Convert tabParam to zero-based index
    if (tabIndex >= 0 && tabIndex < tabButtons.length) {
      switchTab(tabButtons[tabIndex]); // Activate the specified tab
    }
  }
}

// Call the function to activate the tab based on the URL parameter when the page loads
window.addEventListener('load', activateTabFromURLParam);
