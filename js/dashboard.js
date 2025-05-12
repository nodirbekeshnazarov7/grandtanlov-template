// Dashboard Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Sidebar toggle for mobile
  const sidebarToggleBtn = document.querySelector('.sidebar-toggle-btn');
  const sidebarCloseBtn = document.querySelector('.sidebar-close-btn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', function() {
      sidebar.classList.add('show');
    });
  }
  
  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', function() {
      sidebar.classList.remove('show');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggleBtn = sidebarToggleBtn.contains(event.target);
    
    if (window.innerWidth < 992 && !isClickInsideSidebar && !isClickOnToggleBtn && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
    }
  });

  // Tooltip initialization for action buttons
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Main Grant Application button
  const mainGrantBtn = document.querySelector('.main-grant-btn');
  if (mainGrantBtn) {
    mainGrantBtn.addEventListener('click', function() {
      const mainGrantModal = new bootstrap.Modal(document.getElementById('mainGrantModal'));
      mainGrantModal.show();
    });
  }

  // Additional Grant Application button
  const additionalGrantBtn = document.querySelector('.additional-grant-btn');
  if (additionalGrantBtn) {
    additionalGrantBtn.addEventListener('click', function() {
      const additionalGrantModal = new bootstrap.Modal(document.getElementById('additionalGrantModal'));
      additionalGrantModal.show();
    });
  }

  // Save draft functionality
  const saveDraftBtns = document.querySelectorAll('.save-draft-btn');
  saveDraftBtns.forEach(button => {
    button.addEventListener('click', function() {
      // Get the parent modal
      const modal = this.closest('.modal');
      const formId = modal.querySelector('form').id;
      
      // Here you would typically save the form data to local storage or a server
      // For demo purposes, we'll just show a success message
      showToast('Draft saved successfully!', 'success');
      
      console.log(`Saved draft for form: ${formId}`);
    });
  });

  // Submit application functionality
  const submitApplicationBtns = document.querySelectorAll('.submit-application-btn');
  submitApplicationBtns.forEach(button => {
    button.addEventListener('click', function() {
      // Get the parent modal
      const modal = this.closest('.modal');
      const form = modal.querySelector('form');
      const formId = form.id;
      
      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });
      
      if (!isValid) {
        showToast('Please fill in all required fields.', 'danger');
        return;
      }
      
      // Here you would typically submit the form data to a server
      // For demo purposes, we'll just show a success message and hide the modal
      button.disabled = true;
      button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
      
      setTimeout(() => {
        // Hide the modal
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
        
        // Show success message
        showToast('Application submitted successfully!', 'success');
        
        // Reset the button
        button.disabled = false;
        button.textContent = 'Submit Application';
        
        console.log(`Submitted application for form: ${formId}`);
        
        // Update the status table (in a real application, this would come from the server)
        if (formId === 'mainGrantForm') {
          updateApplicationStatus('MG-2025-1023', 'Main Grant', 'Under Review');
        } else if (formId === 'additionalGrantForm') {
          updateApplicationStatus('AG-2025-' + Math.floor(1000 + Math.random() * 9000), 'Additional Grant', 'Under Review');
        }
      }, 2000);
    });
  });

  // Helper function to update the application status table
  function updateApplicationStatus(id, type, status) {
    const statusTable = document.querySelector('.status-table tbody');
    if (!statusTable) return;
    
    // Create a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>
        <span class="application-id">${id}</span>
      </td>
      <td>
        <span class="grant-type">${type}</span>
      </td>
      <td>
        <span class="submission-date">${getCurrentDate()}</span>
      </td>
      <td>
        <span class="status-badge pending">${status}</span>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn action-btn view-btn" data-bs-toggle="tooltip" title="View Details"></button>
          <button class="btn action-btn edit-btn" data-bs-toggle="tooltip" title="Edit Application"></button>
        </div>
      </td>
    `;
    
    // Add the new row at the top
    if (statusTable.firstChild) {
      statusTable.insertBefore(newRow, statusTable.firstChild);
    } else {
      statusTable.appendChild(newRow);
    }
    
    // Reinitialize tooltips
    const newTooltips = [].slice.call(newRow.querySelectorAll('[data-bs-toggle="tooltip"]'));
    newTooltips.forEach(el => {
      new bootstrap.Tooltip(el);
    });
    
    // Update stat cards
    updateStatCard('Applications', 1);
    updateStatCard('Pending', 1);
  }

  // Helper function to update stat cards
  function updateStatCard(type, increment) {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
      const title = card.querySelector('.stat-card-title').textContent;
      
      if (title.includes(type)) {
        const valueElement = card.querySelector('.stat-card-value');
        const currentValue = parseInt(valueElement.textContent);
        valueElement.textContent = (currentValue + increment).toString();
      }
    });
  }

  // Helper function to get current date in a formatted string
  function getCurrentDate() {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  // Helper function to show toast notifications
  function showToast(message, type = 'primary') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.className = `toast bg-${type} text-white`;
    toast.id = toastId;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
      <div class="toast-header bg-${type} text-white">
        <strong class="me-auto">Notification</strong>
        <small>Just now</small>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;
    
    // Add the toast to the container
    toastContainer.appendChild(toast);
    
    // Initialize and show the toast
    const bsToast = new bootstrap.Toast(toast, {
      autohide: true,
      delay: 5000
    });
    
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
      this.remove();
    });
  }

  // Handle view button clicks in the status table
  const viewButtons = document.querySelectorAll('.action-btn.view-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const id = row.querySelector('.application-id').textContent;
      const type = row.querySelector('.grant-type').textContent;
      
      // Here you would typically fetch the application details from a server
      // For demo purposes, we'll just show a message
      showToast(`Viewing application ${id} (${type})`, 'info');
      
      // In a real application, you might show a modal with the application details
      console.log(`View application: ${id} (${type})`);
    });
  });

  // Handle edit button clicks in the status table
  const editButtons = document.querySelectorAll('.action-btn.edit-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const id = row.querySelector('.application-id').textContent;
      const type = row.querySelector('.grant-type').textContent;
      
      // Here you would typically fetch the application details and open the form for editing
      // For demo purposes, we'll just show a message and open the appropriate modal
      showToast(`Editing application ${id} (${type})`, 'warning');
      
      if (type === 'Main Grant') {
        const mainGrantModal = new bootstrap.Modal(document.getElementById('mainGrantModal'));
        mainGrantModal.show();
      } else if (type === 'Additional Grant') {
        const additionalGrantModal = new bootstrap.Modal(document.getElementById('additionalGrantModal'));
        additionalGrantModal.show();
      }
      
      console.log(`Edit application: ${id} (${type})`);
    });
  });

  // Handle download button clicks in the status table
  const downloadButtons = document.querySelectorAll('.action-btn.download-btn');
  downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const id = row.querySelector('.application-id').textContent;
      
      // Here you would typically generate and download a certificate or approval document
      // For demo purposes, we'll just show a message
      showToast(`Downloading certificate for application ${id}`, 'info');
      
      console.log(`Download certificate for application: ${id}`);
    });
  });
});