// Common JavaScript for all pages

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Navbar scroll effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        siteHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        siteHeader.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      } else {
        siteHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        siteHeader.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
      }
    });
  }

  // Form validation
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false);
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it and show success message
      console.log('Form submitted:', formData);
      
      // Show success message
      contactForm.innerHTML = `
        <div class="alert alert-success">
          <h4 class="alert-heading">Message Sent!</h4>
          <p>Thank you for contacting us. We will respond to your inquiry as soon as possible.</p>
        </div>
      `;
    });
  }

  // Handle newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      // Here you would typically send the email to a server
      console.log('Newsletter subscription:', email);
      
      // Show success message
      const inputGroup = this.querySelector('.input-group');
      inputGroup.innerHTML = `
        <div class="alert alert-success mb-0 w-100">
          <p class="mb-0">Thank you for subscribing!</p>
        </div>
      `;
    });
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.feature-card, .grant-card, .testimonial-card');
  
  if (animateElements.length > 0) {
    const animateOnScroll = function() {
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial state
    animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
  }
});