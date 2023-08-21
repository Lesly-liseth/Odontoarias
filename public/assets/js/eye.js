document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');

    const togglePasswordBtn = document.getElementById('toggle-password');
    const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');

    let showPassword = false;
    let showConfirmPassword = false;

    togglePasswordBtn.addEventListener('click', function () {
      showPassword = !showPassword;
      passwordInput.type = showPassword ? 'text' : 'password';
      togglePasswordBtn.innerHTML = showPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
    });

    toggleConfirmPasswordBtn.addEventListener('click', function () {
      showConfirmPassword = !showConfirmPassword;
      confirmPasswordInput.type = showConfirmPassword ? 'text' : 'password';
      toggleConfirmPasswordBtn.innerHTML = showConfirmPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
    });
  });



document.addEventListener('DOMContentLoaded', function () {
  const newPasswordInput = document.getElementById('new-password');
  const confirmNewPasswordInput = document.getElementById('confirm-password');

  const toggleNewPasswordBtn = document.getElementById('toggle-new-password');
  const toggleConfirmNewPasswordBtn = document.getElementById('toggle-confirm-password');

  let showNewPassword = false;
  let showConfirmNewPassword = false;

  toggleNewPasswordBtn.addEventListener('click', function () {
    showNewPassword = !showNewPassword;
    newPasswordInput.type = showNewPassword ? 'text' : 'password';
    toggleNewPasswordBtn.innerHTML = showNewPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
  });

  toggleConfirmNewPasswordBtn.addEventListener('click', function () {
    showConfirmNewPassword = !showConfirmNewPassword;
    confirmNewPasswordInput.type = showConfirmNewPassword ? 'text' : 'password';
    toggleConfirmNewPasswordBtn.innerHTML = showConfirmNewPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password_current');
    const togglePasswordBtn = document.getElementById('toggle-password-current');

    let showPassword = false;

    togglePasswordBtn.addEventListener('click', function () {
        showPassword = !showPassword;
        passwordInput.type = showPassword ? 'text' : 'password';
        togglePasswordBtn.innerHTML = showPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
    });
});
