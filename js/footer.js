async function loadFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  try {
    const response = await fetch('./footer.html');
    if (!response.ok) {
      throw new Error(`Failed to load footer: ${response.status}`);
    }
    placeholder.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadFooter);
