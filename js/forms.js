// Determine endpoint based on environment
const getFormEndpoint = () => {
  const currentHost = window.location.hostname;
  if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
    return 'http://localhost:3000/api/submit'; // Local development
  }
  // For production - Visal Academy API (deployed on Vercel)
  return 'https://backend-pi-three-36.vercel.app/api/submit';
};

const FORM_ENDPOINT = getFormEndpoint();

// Log endpoint on page load (for debugging)
console.log('✓ Forms.js loaded');
console.log('Form endpoint:', FORM_ENDPOINT);
console.log('Current hostname:', window.location.hostname);

// Contact page form handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  console.log('✓ Found contact form');
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Home page form handler
const homeForm = document.querySelector('.contact-home-form');
if (homeForm) {
  console.log('✓ Found home form');
  homeForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  console.log('📝 Form submit triggered');

  const form = e.target;
  const formData = new FormData(form);

  // Collect form data with proper name attributes
  const data = {
    name: formData.get('name') || '',
    guardian: formData.get('guardian') || '',
    email: formData.get('email') || '',
    phone: formData.get('phone') || '',
    program: formData.get('program') || '',
    message: formData.get('message') || ''
  };

  console.log('📋 Form data collected:', data);

  // Validate required fields
  if (!data.name || !data.guardian || !data.email || !data.program || !data.message) {
    const missing = [];
    if (!data.name) missing.push('Name');
    if (!data.guardian) missing.push('Guardian');
    if (!data.email) missing.push('Email');
    if (!data.program) missing.push('Program');
    if (!data.message) missing.push('Message');
    
    const errorMsg = `Please fill in all required fields: ${missing.join(', ')}`;
    console.error('❌ Validation failed:', errorMsg);
    showErrorModal(errorMsg);
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  try {
    console.log('📤 Sending request to:', FORM_ENDPOINT);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit'
    });

    clearTimeout(timeoutId);
    console.log('📥 Response received, status:', response.status);
    
    let result;
    try {
      const responseText = await response.text();
      console.log('📄 Response text:', responseText);
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Failed to parse JSON response:', parseError);
      throw new Error(`Invalid server response (HTTP ${response.status})`);
    }
    
    console.log('✓ Parsed response:', result);

    if (response.ok && result.success) {
      console.log('✅ Form submitted successfully');
      // Show success message with contact details
      showSuccessModal(result.message, result.contact);
      form.reset();
    } else {
      const errorMsg = result.error || `Server error (HTTP ${response.status})`;
      console.error('❌ Submission failed:', errorMsg);
      showErrorModal(errorMsg);
    }
  } catch (error) {
    console.error('❌ Form submission error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    let errorMsg = 'Connection error: ';
    if (error.name === 'AbortError') {
      errorMsg += 'Request timeout (took longer than 20 seconds). ';
    } else {
      errorMsg += 'Failed to reach server. ';
    }
    errorMsg += 'Please try again or contact: +91 78069 08543';
    
    console.error('🔴 Final error message:', errorMsg);
    showErrorModal(errorMsg);
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
