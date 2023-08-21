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

document.querySelector('.btn-registro').addEventListener('click', async function (event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const names = document.getElementById('names').value;
    const lastnames = document.getElementById('lastnames').value;
    const ci = document.getElementById('id-number').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Función para mostrar el mensaje de error bajo el campo de entrada
    function showError(fieldId, message) {
      const errorElement = document.getElementById(fieldId + '_error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }

    // Función para ocultar el mensaje de error bajo el campo de entrada
    function hideError(fieldId) {
      const errorElement = document.getElementById(fieldId + '_error');
      errorElement.style.display = 'none';
    }

    // Validar el campo de nombres
    if (!validateNames(names)) {
      showError('names', 'Ingrese un nombre válido');
    } else {
      hideError('names');
    }

    // Validar el campo de apellidos
    if (!validateLastnames(lastnames)) {
      showError('lastnames', 'Ingrese un apellido válido');
    } else {
      hideError('lastnames');
    }

    // Validar el campo de CI
    if (!validateCI(ci)) {
      showError('idnumber', 'Ingrese un CI válido');
    } else {
      hideError('idnumber');
    }

    // Validar el campo de correo electrónico
    if (!validateEmail(email)) {
      showError('email', 'Ingrese un correo electrónico válido');
    } else {
      hideError('email');
    }

    // Validar el campo de teléfono
    if (!validatePhone(phone)) {
      showError('phone', 'Ingrese un número de teléfono válido de 10 digitos');
    } else {
      hideError('phone');
    }

    // Validar el campo de dirección
    if (!validateAddress(address)) {
      showError('address', 'Ingrese una dirección válida');
    } else {
      hideError('address');
    }

    // Validar el campo de contraseña
    if (!validatePassword(password)) {
      showError('password', 'La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial');
    } else {
      hideError('password');
    }

    // Validar que la contraseña y la confirmación de contraseña sean iguales
    if (password !== confirmPassword) {
      showError('confirm_password', 'Las contraseñas no coinciden');
    } else {
      hideError('confirm_password');
    }

    // Si hay errores en algún campo, detener el proceso de registro
    const errors = document.getElementsByClassName('error-message');
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].style.display === 'block') {
        return;
      }
    }

    const data = {
        identity_card_user: ci,
        names: names,
        surnames: lastnames,
        email: email,
        password: password,
        password_confirm: confirmPassword,
        phone: phone,
        address: address
      };

      try {
        const response = await fetch('https://endpointsco-production.up.railway.app/api/register/patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
            showWarningModal('Registro exitoso');
          // Redireccionar al inicio de sesión
          window.location.href = '/ingresar'; // Reemplaza '/login' con la URL de tu página de inicio de sesión
        } else {
          try {
            const responseData = await response.json(); // Obtener los datos de respuesta del backend
            const errorData = responseData.error; // Obtener el objeto con los mensajes de error específicos

            // Mostrar los mensajes de error específicos de cada campo en la alerta
            for (const field in errorData) {
                showWarningModal(`${field}: ${errorData[field][0]}`);
            }

            console.log(response);
            console.log(responseData);
          } catch (error) {
            showWarningModal('Error en la solicitud');
            console.error(error);
          }
        }
      } catch (error) {
        showWarningModal('Error en la solicitud');
        console.error(error);
      }
  });

  function validateNames(names) {
    const namesRegex = /^[a-zA-ZñÑ\s]{3,}$/;
    return namesRegex.test(names);
  }

  function validateLastnames(lastnames) {
    const lastnamesRegex = /^[a-zA-ZñÑ\s]{3,}$/;
    return lastnamesRegex.test(lastnames);
  }

  function validateCI(ci) {
    const ciRegex = /^[0-9]{10}$/;
    return ciRegex.test(ci);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  function validateAddress(address) {
    const addressRegex = /^[a-zA-Z0-9\- ]+$/;
    return addressRegex.test(address);
  }

  function validatePassword(password) {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

