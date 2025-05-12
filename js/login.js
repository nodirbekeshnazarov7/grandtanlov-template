// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const hemisLoginBtn = document.getElementById('hemisLoginBtn');
  const studentLoginBtn = document.getElementById('studentLoginBtn');
  const hemisLoginForm = document.getElementById('hemisLoginForm');
  const studentLoginForm = document.getElementById('studentLoginForm');
  const loginOptions = document.querySelector('.login-options');
  const backButtons = document.querySelectorAll('.back-to-options-btn');
  const passwordToggleBtns = document.querySelectorAll('.password-toggle-btn');

  // Show Hemis login form
  if (hemisLoginBtn) {
    hemisLoginBtn.addEventListener('click', function() {
      loginOptions.style.display = 'none';
      hemisLoginForm.style.display = 'block';
      
      // Add animation class
      hemisLoginForm.classList.add('animate__animated', 'animate__fadeIn');
    });
  }

  // Show Student login form
  if (studentLoginBtn) {
    studentLoginBtn.addEventListener('click', function() {
      loginOptions.style.display = 'none';
      studentLoginForm.style.display = 'block';
      
      // Add animation class
      studentLoginForm.classList.add('animate__animated', 'animate__fadeIn');
    });
  }

  // Back to login options
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      hemisLoginForm.style.display = 'none';
      studentLoginForm.style.display = 'none';
      loginOptions.style.display = 'block';
    });
  });

  // Toggle password visibility
  passwordToggleBtns.forEach(button => {
    button.addEventListener('click', function() {
      const passwordInput = this.previousElementSibling;
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.add('visible');
      } else {
        passwordInput.type = 'password';
        this.classList.remove('visible');
      }
    });
  });

  // Handle Hemis login form submission
  const hemisLoginForm$ = document.querySelector('#hemisLoginForm form');
  if (hemisLoginForm$) {
    hemisLoginForm$.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const username = document.getElementById('hemisUsername').value;
      const password = document.getElementById('hemisPassword').value;
      
      // Here you would typically validate the credentials with a server
      console.log('Hemis login attempt:', { username, password });
      
      // For demo purposes, simulate a successful login and redirect
      showLoginLoading(this);
      
      setTimeout(() => {
        // In a real application, you would redirect to an admin dashboard
        window.location.href = 'admin-dashboard.html';
      }, 1500);
    });
  }

  // Handle Student login form submission
  const studentLoginForm$ = document.querySelector('#studentLoginForm form');
  if (studentLoginForm$) {
    studentLoginForm$.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const studentId = document.getElementById('studentId').value;
      const password = document.getElementById('studentPassword').value;
      
      // Here you would typically validate the credentials with a server
      console.log('Student login attempt:', { studentId, password });
      
      // For demo purposes, simulate a successful login and redirect
      showLoginLoading(this);
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    });
  }

  // Show loading state on login button
  function showLoginLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...';
    
    // Add a slight opacity to the form to indicate it's processing
    form.style.opacity = '0.7';
  }

  // Visual feedback for buttons
  const loginOptionBtns = document.querySelectorAll('.login-option-btn');
  
  loginOptionBtns.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
});