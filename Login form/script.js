document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.getElementById('togglePassword');

  if (passwordInput && toggleButton) {
    toggleButton.addEventListener('click', function() {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      toggleButton.textContent = isPassword ? 'Hide' : 'Show';
      toggleButton.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email')?.value.trim();
      const password = document.getElementById('password')?.value.trim();

      if (!email || !password) {
        alert('Please fill in both email and password.');
      } else {
        alert(`Demo login attempt with email: ${email}\n(No data is transmitted)`);
      }
    });
  }
});