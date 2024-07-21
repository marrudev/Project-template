// Active row toggler
const table = document.querySelector('table');

if (table) {
  const rows = table.querySelectorAll('tr');

  rows.forEach((row, index) => {
    if (row.classList.contains('active')) {
      const previousRow = rows[index - 1];
      if (previousRow) {
        previousRow.classList.add('active');
      }
    }
  });
}

// Clickable rows
document.addEventListener('DOMContentLoaded', function () {
  const rows = document.querySelectorAll('.row-clickable');

  rows.forEach(function (row) {
    const handleRedirect = function () {
      const href = this.dataset.href;
      if (href) {
        window.location = href;
      }
    };

    row.addEventListener('click', handleRedirect);

    row.addEventListener('touchstart', handleRedirect);
  });
});
