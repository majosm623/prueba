// Modal functionality
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const confirmationModal = document.getElementById('confirmationModal');
const closeButtons = document.querySelectorAll('.close-modal');
const logoutBtn = document.getElementById('logoutBtn');
const dashboard = document.getElementById('dashboard');
const mainContent = document.querySelector('header, section, footer');
const heroAppointmentBtn = document.getElementById('heroAppointmentBtn');
const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');

// Show modals
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
});

registerBtn.addEventListener('click', () => {
  registerModal.style.display = 'flex';
});

// Botón "Agendar una cita" en el hero
heroAppointmentBtn.addEventListener('click', () => {
  document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
});

// Close modals
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    confirmationModal.style.display = 'none';
  });
});

// Close confirmation modal
closeConfirmationBtn.addEventListener('click', () => {
  confirmationModal.style.display = 'none';
});

// Close when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (e.target === registerModal) {
    registerModal.style.display = 'none';
  }
  if (e.target === confirmationModal) {
    confirmationModal.style.display = 'none';
  }
});

// Form submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate login
  const email = document.getElementById('loginEmail').value;
  document.getElementById('userEmail').textContent = email;
  
  // Hide main content and show dashboard
  mainContent.style.display = 'none';
  dashboard.style.display = 'block';
  loginModal.style.display = 'none';
  
  // Reset form
  e.target.reset();
  
  // Load sample appointments
  loadSampleAppointments();
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate registration
  const email = document.getElementById('registerEmail').value;
  document.getElementById('userEmail').textContent = email;
  
  // Hide main content and show dashboard
  mainContent.style.display = 'none';
  dashboard.style.display = 'block';
  registerModal.style.display = 'none';
  
  // Reset form
  e.target.reset();
  
  // Load sample appointments
  loadSampleAppointments();
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  // Show main content and hide dashboard
  mainContent.style.display = 'block';
  dashboard.style.display = 'none';
});

// New appointment button
document.getElementById('newAppointmentBtn').addEventListener('click', () => {
  // Scroll to appointment section
  document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
  
  // Show main content and hide dashboard
  mainContent.style.display = 'block';
  dashboard.style.display = 'none';
});

// Appointment form submission - FUNCIONALIDAD CORREGIDA
document.getElementById('appointmentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Obtener los valores del formulario
  const doctor = document.getElementById('doctor').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value;
  
  // Validar que todos los campos estén completos
  if (!doctor || !date || !time) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }
  
  // Mostrar los detalles en el modal de confirmación
  document.getElementById('confDoctor').textContent = 
    document.getElementById('doctor').options[document.getElementById('doctor').selectedIndex].text;
  
  // Formatear la fecha para mostrarla mejor
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  document.getElementById('confDate').textContent = formattedDate;
  document.getElementById('confTime').textContent = time;
  
  // Mostrar el modal de confirmación
  confirmationModal.style.display = 'flex';
  
  // Si el usuario está logueado, agregar la cita al dashboard
  if (dashboard.style.display === 'block') {
    addAppointmentToDashboard(
      document.getElementById('doctor').options[document.getElementById('doctor').selectedIndex].text,
      document.getElementById('specialty').options[document.getElementById('specialty').selectedIndex].text,
      date,
      time
    );
  }
  
  // Resetear el formulario
  e.target.reset();
});

// Función para agregar citas al dashboard
function addAppointmentToDashboard(doctorName, specialty, date, time) {
  const appointmentsList = document.getElementById('appointmentsList');
  
  // Crear elemento de lista para la nueva cita
  const appointmentItem = document.createElement('li');
  appointmentItem.className = 'appointment-item';
  
  // Formatear la fecha para mostrarla mejor
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  // Crear el HTML para la nueva cita
  appointmentItem.innerHTML = `
    <div>
      <strong>${doctorName}</strong>
      <p>${specialty}</p>
    </div>
    <div>${formattedDate}</div>
    <div>${time}</div>
    <div>
      <span class="badge badge-success">Confirmada</span>
      <button class="btn btn-danger btn-sm cancel-appointment">Cancelar</button>
    </div>
  `;
  
  // Agregar la nueva cita al inicio de la lista
  appointmentsList.insertBefore(appointmentItem, appointmentsList.firstChild);
  
  // Agregar evento al botón de cancelar
  appointmentItem.querySelector('.cancel-appointment').addEventListener('click', function() {
    if (confirm('¿Estás seguro que deseas cancelar esta cita?')) {
      appointmentsList.removeChild(appointmentItem);
      alert('Cita cancelada exitosamente');
    }
  });
}

// Función para cargar citas de ejemplo
function loadSampleAppointments() {
  const appointmentsList = document.getElementById('appointmentsList');
  appointmentsList.innerHTML = ''; // Limpiar lista existente
  
  // Agregar citas de ejemplo
  addAppointmentToDashboard(
    'Dra. Ana Torres',
    'Medicina General',
    '2025-06-15',
    '10:00'
  );
  
  addAppointmentToDashboard(
    'Dr. Juan Pérez',
    'Pediatría',
    '2025-06-20',
    '14:30'
  );
}