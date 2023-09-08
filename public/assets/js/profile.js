const perfil_usuario = sessionStorage.getItem('idRol');

// Event Listeners
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', updateProfile);

const imageInput = document.getElementById('profile-upload'); // Campo de entrada de archivos para la imagen
imageInput.addEventListener('change', handleImageUpload);

const animacionCargando = document.getElementById('cargando');

// Mostrar cargador y superposición
function showLoader() {
    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('cargando');

    overlay.style.display = 'block'; // Mostrar la superposición
    loader.style.display = 'block'; // Mostrar el loader
  }

  // Ocultar cargador y superposición
  function hideLoader() {
    const overlay = document.getElementById('overlay');
    const loader = document.getElementById('cargando');

    overlay.style.display = 'none'; // Mostrar la superposición
    loader.style.display = 'none'; // Mostrar el loader
  }

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

// Función para manejar la carga de la imagen y mostrarla en el campo de perfil
function handleImageUpload() {
  const image = document.getElementById('profile-image');
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = function () {
      // Mostrar la imagen seleccionada en el campo de perfil
      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  } else {
    // Si no se seleccionó ninguna imagen, mantener la imagen existente
    const existingImageUrl = profileImage.src;
    image.src = existingImageUrl;
  }
}

// Función para obtener los datos del perfil
async function getProfile() {
  try {
    showLoader(); // Mostrar el indicador de carga

    const token = localStorage.getItem('token');
    const response = await fetch('https://endpointsco-production.up.railway.app/api/get-user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    if (response.ok) {
      const profileData = await response.json();
      console.log('API Profile Data:', profileData); // Agrega esta línea
      populateProfileForm(profileData);
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.message;
      showWarningModal(`Error al obtener los datos del perfil: ${errorMessage}`);
    }
  } catch (error) {
    showWarningModal('Error en la solicitud');
    console.error(error);
  } finally {
    hideLoader(); // Ocultar el indicador de carga independientemente del resultado
  }
}

// Función para mostrar el mensaje de error debajo del campo correspondiente
function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
}

// Función para ocultar el mensaje de error debajo del campo correspondiente
function hideError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.style.display = 'none';
}

// Función para actualizar el perfil
async function updateProfile(e) {
    e.preventDefault();

    showLoader(); // Mostrar el indicador de carga

    const names = document.getElementById('names').value;
    const surnames = document.getElementById('lastnames').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const profesional_description = document.getElementById('description').value;

    // Validar los campos antes de enviar la solicitud
    let hasErrors = false;

    if (!validateNames(names)) {
        showError('names', 'Ingrese un nombre válido');
        hideLoader();
        hasErrors = true;
    } else {
        hideError('names');
    }

    if (!validateLastnames(surnames)) {
        showError('lastnames', 'Ingrese un apellido válido');
        hideLoader();
        hasErrors = true;
    } else {
        hideError('lastnames');
    }

    if (!validateEmail(email)) {
        showError('email', 'Ingrese un correo electrónico válido');
        hideLoader();
        hasErrors = true;
    } else {
        hideError('email');
    }

    if (!validatePhone(phone)) {
        showError('phone', 'Ingrese un número de teléfono válido de 10 dígitos');
        hideLoader();
        hasErrors = true;
    } else {
        hideError('phone');
    }

    if (hasErrors) {
        return; // No se actualiza el perfil si hay errores
    }

    const file = imageInput.files[0]; // Obtener el archivo de imagen seleccionado

    // Crear un objeto FormData para enviar los datos del formulario, incluida la imagen
    const formData = new FormData();
    formData.append('names', names);
    formData.append('surnames', surnames);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('profesional_description', profesional_description);
    if (file) {
      formData.append('image', file); // Adjuntar el archivo de imagen
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://endpointsco-production.up.railway.app/api/update-user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        showWarningModal('Perfil actualizado exitosamente');
        const responseData = await response.json();

        // Actualizar la imagen en el formulario si la respuesta contiene la URL de la nueva imagen
        if (responseData.profile_picture_url) {
          const profileImage = document.getElementById('profile-image');
          profileImage.src = responseData.profile_picture_url;
        }
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.message;
        showWarningModal(`Error al actualizar el perfil ${errorMessage}`);
      }
    } catch (error) {
        showWarningModal('Error "El email ingresado ya esta registrado"');
        console.error(error);
      } finally {
        hideLoader(); // Ocultar el indicador de carga independientemente del resultado
      }
  }

// Función para llenar el formulario con los datos del perfil
function populateProfileForm(profileData) {
    document.getElementById('names').value = profileData.names;
    document.getElementById('lastnames').value = profileData.surnames;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;
    document.getElementById('address').value = profileData.address;
    document.getElementById('description').value = profileData.profesional_description;
    document.getElementById('idnumber').value = profileData.identity_card_user;

    // Set the profile image using the 'UrlPicture' field
    const profileImage = document.getElementById('profile-image');
    if (profileData.profile_picture_url) {
      profileImage.src = profileData.profile_picture_url;
    }
  }
// Event Listener para cargar los datos del perfil cuando la página se carga
window.addEventListener('load', () => {
    getProfile();
    const profilePicture = document.querySelector('.profile-picture');
    const descriptionField = document.getElementById('description');
    const descriptionField1 = document.getElementById('description1');
    const rol1Title = document.getElementById('rol1');
    const rol2Title = document.getElementById('rol2');
    const rol3Title = document.getElementById('rol3');

    // Ocultar todos los títulos de rol inicialmente
    rol1Title.style.display = 'none';
    rol2Title.style.display = 'none';
    rol3Title.style.display = 'none';

    if (perfil_usuario == 1) {
      rol1Title.style.display = 'block';
      profilePicture.style.display = 'none';
      descriptionField.style.display = 'none';
      descriptionField1.style.display = 'none';
    } else if (perfil_usuario == 2) {
      rol2Title.style.display = 'block';
      profilePicture.style.display = 'block';
      descriptionField.style.display = 'block';
      descriptionField1.style.display = 'block';
    } else if (perfil_usuario == 3) {
      rol3Title.style.display = 'block';
      profilePicture.style.display = 'none';
      descriptionField.style.display = 'none';
      descriptionField1.style.display = 'none';
    } else {
      // Si el usuario tiene un rol desconocido
      profilePicture.style.display = 'none';
      descriptionField.style.display = 'none';
      descriptionField1.style.display = 'none';
    }
  });


// Funciones de validación
function validateNames(names) {
    const namesRegex = /^[a-zA-Z\s]{3,}$/;
    return namesRegex.test(names);
  }

  function validateLastnames(lastnames) {
    const lastnamesRegex = /^[a-zA-Z\s]{3,}$/;
    return lastnamesRegex.test(lastnames);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }
