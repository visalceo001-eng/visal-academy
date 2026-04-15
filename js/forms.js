const FORM_ENDPOINT = 'https://your-vercel-domain.vercel.app/api/submit';

// Contact page form handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Home page form handler
const homeForm = document.querySelector('.contact-home-form');
if (homeForm) {
  homeForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Collect form data
  const data = {
    name: formData.get('name') || document.getElementById('name')?.value,
    guardian: formData.get('guardian') || document.querySelector('input[placeholder="Jane Doe"]')?.value,
    email: formData.get('email') || document.getElementById('email')?.value,
    phone: formData.get('phone') || document.querySelector('input[type="tel"]')?.value,
    program: formData.get('program') || document.getElementById('program')?.value,
    message: formData.get('message') || document.querySelector('textarea')?.value
  };

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Show success message with contact details
      showSuccessModal(result.message, result.contact);
      form.reset();
    } else {
      showErrorModal(result.error || 'Submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showErrorModal(
      'Failed to submit form. Please try again or contact us directly at +91 78069 08543'
    );
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

function showSuccessModal(message, contact) {
  const modal = document.createElement('div');
  modal.className = 'form-modal success-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <h2>✓ Success!</h2>
      <p>${message}</p>
      <div class="contact-details">
        <p><strong>Phone:</strong> <a href="tel:+917806908543">${contact.phone}</a></p>
        <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
      </div>
      <button class="btn btn-primary" onclick="this.closest('.form-modal').remove()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function showErrorModal(message) {
  const modal = document.createElement('div');
  modal.className = 'form-modal error-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <h2>✗ Error</h2>
      <p>${message}</p>
      <button class="btn btn-primary" onclick="this.closest('.form-modal').remove()">Close</button>
    </div>
  `;
  document.body.appendChild(modal);
}
