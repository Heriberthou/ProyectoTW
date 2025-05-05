const tabs = document.querySelectorAll('.tab');
const rows = document.querySelectorAll('.table-row:not(.header-row)');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    rows.forEach(row => {
      if (filter === 'todos' || row.dataset.status === filter) {
        row.style.display = 'flex';
      } else {
        row.style.display = 'none';
      }
    });
  });
});
