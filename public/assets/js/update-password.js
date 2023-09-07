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

// Función para mostrar el mensaje de error debajo del campo correspondiente
function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    }
  }

  // Función para ocultar el mensaje de error debajo del campo correspondiente
  function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

// Función para actualizar la contraseña
async function updatePassword(e) {
    e.preventDefault();

    const passwordCurrent = document.getElementById('password_current').value;
    const passwordNew = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('confirm_password').value;

    // Verificar los datos antes de enviar la solicitud
    console.log('Datos que se envían a la API:');
    console.log('password_current:', passwordCurrent);
    console.log('passwordNew:', passwordNew);
    console.log('passwordConfirm:', passwordConfirm);

    // Validar que la contraseña nueva cumple con los requisitos
    if (!validatePassword(passwordNew)) {
      showError('password', 'La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial');
      return;
    } else {
      hideError('password');
    }
    // Validar que la contraseña nueva y la confirmación de contraseña coinciden
    if (passwordNew !== passwordConfirm) {
        showError('confirm_password', 'Las contraseñas no coinciden');
        hideLoader();
        return;
    } else {
        hideError('confirm_password');
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
        // Mostrar un mensaje de error del servidor si está disponible
        const responseData = await response.json();
        if (responseData && responseData.message) {
          showWarningModal(responseData.message);
        } else {
          showWarningModal('Contraseña actual incorrecta. Por favor, verifique la contraseña actual.');
        }
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
    document.getElementById('confirm_password').value = '';
  }
