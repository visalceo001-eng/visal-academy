async function loadHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('./header.html');
    if (!response.ok) {
      throw new Error(`Failed to load header: ${response.status}`);
    }

    placeholder.innerHTML = await response.text();

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = placeholder.querySelectorAll('.site-nav a');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadHeader);
