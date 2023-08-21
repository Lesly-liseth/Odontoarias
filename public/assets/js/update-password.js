// Event Listeners
const passwordForm = document.getElementById('password-form');
passwordForm.addEventListener('submit', updatePassword);

    // Función para mostrar el modal de advertencia con un mensaje específico
    function showWarningModal(message) {
        const warningModal = document.getElementById("warning");
        const warningMessage = document.getElementById("warning-message");
        warningMessage.textContent = message;
        warningModal.style.display = "block";

        // Configurar un temporizador para cerrar el modal después de 2 segundos
        setTimeout(() => {
        hideWarningModal();
        }, 2000);
    }

    // Función para ocultar el modal de advertencia
    function hideWarningModal() {
        const warningModal = document.getElementById("warning");
        warningModal.style.display = "none";
    }

// Función para validar la contraseña
function validatePassword(password) {
  // Expresión regular para validar la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Función para mostrar el mensaje de error bajo el campo de entrada
function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + '-error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Función para ocultar el mensaje de error bajo el campo de entrada
function hideError(fieldId) {
  const errorElement = document.getElementById(fieldId + '-error');
  errorElement.style.display = 'none';
}

// Función para actualizar la contraseña
async function updatePassword(e) {
  e.preventDefault();

  const passwordCurrent = document.getElementById('password_current').value;
  const passwordNew = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password_confirm').value;

  // Validar que la contraseña nueva y la confirmación de contraseña coinciden
  if (passwordNew !== passwordConfirm) {
    showError('password_confirm', 'La contraseña nueva y la confirmación de contraseña no coinciden');
    return;
  } else {
    hideError('password_confirm');
  }

  // Validar que la contraseña nueva cumple con los requisitos
  if (!validatePassword(passwordNew)) {
    showError('password', 'La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial');
    return;
  } else {
    hideError('password');
  }

  const token = localStorage.getItem('token');
  const data = {
    password_current: passwordCurrent,
    password: passwordNew,
    password_confirm: passwordConfirm
  };

  try {
    const response = await fetch('https://endpointsco-production.up.railway.app/api/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
        showWarningModal('Contraseña actualizada exitosamente');
      resetPasswordForm();
    } else {
        showWarningModal('Contraseña actual incorrecta. Por favor, verifique la contraseña actual.');
    }
  } catch (error) {
    showWarningModal('Error en la solicitud');
    console.error(error);
  }
}

// Función para reiniciar los campos de contraseña
function resetPasswordForm() {
  document.getElementById('password_current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password_confirm').value = '';
}
