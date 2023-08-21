// Variables
const doctorForm = document.getElementById('register-form');
const doctorList = document.getElementById('listaUsuarios');
const openModalButton = document.getElementById('openRegisterModal');
const closeModalButton = document.getElementById('cerrarRegisterModal');
const confirmationModal = document.getElementById('confirmation-modal');
const confirmationMessage = document.getElementById('confirmation-message');
const confirmYesButton = document.getElementById('confirm-yes');
const confirmNoButton = document.getElementById('confirm-no');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('edit-form');
const closeDeleteModalButton = document.getElementById('cerrarModaledit');
const saveChangesButton = document.getElementById('guardarCambios');
const closeEditModalButtons = document.querySelectorAll('#cerrarEditModal');
const cancelEditButton = document.getElementById('cancelarEditModal');
const registerButton = document.getElementById('register-button');
const searchForm = document.getElementById('formulario');
const searchButton = document.getElementById('boton');

const animacionCargando = document.getElementById('cargando');

// Variable para almacenar los datos de los odontologos
let doctors = [];

  // Token
  const token = localStorage.getItem('token');
//   console.log("token de localstorage", token);

// Event Listeners
doctorForm.addEventListener('submit', handleRegisterDoctor);
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
confirmYesButton.addEventListener('click', confirmStatusChange);
confirmNoButton.addEventListener('click', closeModal);
editForm.addEventListener('submit', saveEditedDoctor);
closeEditModalButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});
closeDeleteModalButton.addEventListener('click', closeModal);
cancelEditButton.addEventListener('click', showConfirmationModalEdit);
searchForm.addEventListener('submit', searchDoctors);
searchButton.addEventListener('click', searchDoctors);
saveChangesButton.addEventListener('click', () => saveEditedDoctor(imageUpdateInput));
saveChangesButton.addEventListener('click', saveEditedDoctor);

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

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Verificación de permisos de usuario
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token en el almacenamiento local');
        return; // Detener el proceso si no hay token
      }

      const permisosRol = await fetch(`https://endpointsco-production.up.railway.app/api/get-user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!permisosRol.ok) {
        console.error('Error al obtener los permisos del usuario:', permisosRol.statusText);
        showWarningModal('Error al obtener los permisos del usuario');
        return;
      }

      const responseData = await permisosRol.json();
      const valorIdRol = responseData.rol_id;

      if (valorIdRol === 1) {
        console.warn('Tiene permisos suficientes');
        cargarListaDoctores(token, 2); // Cargar la lista de doctores
      } else {
        console.error('NO Tiene permisos suficientes');
        window.location.href = '/profile';
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      showWarningModal('Error en la solicitud');
    }
  });

async function cargarListaDoctores(token, id_rol) {
    const id_rol_odontologo = 2;

    try {
    // Mostrar el cargador y la superposición
      showLoader();

      const response = await fetch(`https://endpointsco-production.up.railway.app/api/get-users/${id_rol_odontologo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (Array.isArray(responseData) && responseData.length > 0) {
          doctors = responseData[0];
          showDoctors();
        } else {
          console.error('No se encontraron odontólogos en la respuesta.');
        }
      } else {
        console.error('Error al obtener los odontólogos:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      // Ocultar el cargador y la superposición
      hideLoader();
    }
  }

// Función para mostrar los odontólogos
function showDoctors() {
    let html = '';
    let i = 1;

    if (Array.isArray(doctors) && doctors.length > 0) {
      doctors.forEach((doctor) => {
        const { identity_card_user, names, surnames, email, phone, address, profesional_description, user_state } = doctor;
        const statusButtonClass = user_state === 1 ? 'btn-status activo' : 'btn-status inactivo';
        const statusButtonText = user_state === 1 ? 'Desactivar' : 'Activar';

        html += `
          <tr>
            <th>${i++}</th>
            <td>${identity_card_user}</td>
            <td>${names}</td>
            <td>${surnames}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${address}</td>
            <td>${profesional_description}</td>
            <td>
              <button class='btn-edit' data-id="${doctor.id}" data-toggle="modal" data-target="#editModal">Editar</button>
            </td>
            <td>
              <button class='${statusButtonClass}' data-id="${doctor.id}" data-status="${statusButtonText}">${statusButtonText}</button>
            </td>
          </tr>
        `;
      });
    } else {
      html = '<tr><td colspan="9">No se encontraron odontólogos.</td></tr>';
    }

    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = html;

    const statusButtons = listaUsuarios.getElementsByClassName('btn-status');
    Array.from(statusButtons).forEach((statusButton) => {
      statusButton.addEventListener('click', handleStatusDoctor);
    });

    const editButtons = listaUsuarios.getElementsByClassName('btn-edit');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', handleEditDoctor);
    });
    animacionCargando.style.display = "none";
  }

// Función para buscar odontólogos por numero de cedula
function searchDoctors(e) {
  e.preventDefault();
  console.warn(document.getElementById('formulario').value);

  const searchTerm = (document.getElementById('formulario').value);
  if(searchTerm.length <= 10){
    console.log(doctors);
    const filteredDoctors = doctors.filter((doctor) => {
      return doctor.identity_card_user.toLowerCase().slice(0,10).search(searchTerm) != -1;
    });

    if (filteredDoctors.length === 0) {
      doctorList.innerHTML = `<tr><td colspan="9">No existe ningún Odontólogo con ese número de identificación.</td></tr>`;
    } else {
      showFilteredDoctors(filteredDoctors);
    }
  }else{
    showWarningModal(`Para la busqueda ingrese solo 10 caracteres`);
  }
}

// Función para mostrar los odontologos filtrados
function showFilteredDoctors(filteredDoctors) {
    let html = '';
    let i = 1;
    filteredDoctors.forEach((doctor) => {
      const { identity_card_user, names, surnames, email, phone, address, profesional_description, user_state } = doctor;
      const statusButtonClass = user_state === 1 ? 'btn-status activo' : 'btn-status inactivo';
      const statusButtonText = user_state === 1 ? 'Desactivar' : 'Activar';

      html += `
        <tr>
          <th>${i++}</th>
          <td>${identity_card_user}</td>
          <td>${names}</td>
          <td>${surnames}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${address}</td>
          <td>${profesional_description}</td>
          <td>
            <button class='btn-edit' data-id="${doctor.id}" data-toggle="modal" data-target="#editModal">Editar</button>
          </td>
          <td>
            <button class='${statusButtonClass}' data-id="${doctor.id}" data-status="${statusButtonText}">${statusButtonText}</button>
          </td>
        </tr>
      `;
    });

    doctorList.innerHTML = html;
    const statusButtons = doctorList.getElementsByClassName('btn-status');
    Array.from(statusButtons).forEach((statusButton) => {
      statusButton.addEventListener('click', handleStatusDoctor);
    });

    const editButtons = doctorList.getElementsByClassName('btn-edit');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', handleEditDoctor);
    });
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

// Agregar evento para abrir el modal
function openRegisterModal() {
  resetImageInput(); // Limpiar el campo de entrada de archivos antes de abrir el modal
  // Mostrar la imagen predeterminada en el campo de perfil
  const image = document.getElementById('profile-image');
  image.src = defaultImage;
  // Aquí coloca el código que abre el modal, por ejemplo, si estás usando Bootstrap:
  $('#registerModal').modal('show');
}

// Agregar evento de escucha al campo de entrada de archivos
const imageInput = document.querySelector('input[name="image"]');
imageInput.addEventListener('change', handleImageUpload);

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
    // Si no se seleccionó ninguna imagen, mostrar la imagen predeterminada
    image.src = defaultImage;
  }
}

// Función para resetear solo el campo de entrada de archivos
function resetImageInput() {
  imageInput.value = ''; // Limpiar el campo de entrada de archivos
  imageUpdateInput.value = '';
}

// Agregar evento para detectar el cierre del modal
$('#registerModal').on('hidden.bs.modal', function (e) {
  // Restablecer el campo de imagen y mostrar la imagen predeterminada en el campo de perfil al cerrar el modal
  resetImageInput();
  const image = document.getElementById('profile-image');
  image.src = defaultImage;
});

// Función para registrar un nuevo odontólogo
async function handleRegisterDoctor(e) {
    e.preventDefault();

    // Mostrar el indicador de carga antes de enviar la solicitud
    showLoader();

    const names = document.getElementById('names').value;
    const lastnames = document.getElementById('lastnames').value;
    const idnumber = document.getElementById('idnumber').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const description = document.getElementById('description').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    // Obtener el archivo seleccionado por el usuario
    const imageInput = document.querySelector('input[name="image"]');
    const file = imageInput.files[0];

    // Crear un objeto FormData para enviar los datos del formulario, incluida la imagen
    const formData = new FormData();
    formData.append('identity_card_user', idnumber);
    formData.append('names', names);
    formData.append('surnames', lastnames);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirm', confirm_password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('profesional_description', description);
    formData.append('image', file); // Adjuntar el archivo sin convertirlo a base64

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

    // Validaciones
    if (!validateNames(names)) {
        showError('names', 'Ingrese un nombre válido');
        hideLoader(); // Ocultar el indicador de carga en caso de error
        return;
    } else {
        hideError('names');
    }

    if (!validateLastnames(lastnames)) {
        showError('lastnames', 'Ingrese un apellido válido');
        hideLoader();
        return;
    } else {
        hideError('lastnames');
    }

    if (!validateCI(idnumber)) {
        showError('idnumber', 'Ingrese un CI válido');
        hideLoader();
        return;
    } else {
        hideError('idnumber');
    }

    if (!validateEmail(email)) {
        showError('email', 'Ingrese un correo electrónico válido');
        hideLoader();
        return;
    } else {
        hideError('email');
    }

    if (!validatePhone(phone)) {
        showError('phone', 'Ingrese un número de teléfono válido de 10 dígitos');
        hideLoader();
        return;
    } else {
        hideError('phone');
    }

    if (!validatePassword(password)) {
        showError('password', 'La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial');
        hideLoader();
        return;
    } else {
        hideError('password');
    }

    if (password !== confirm_password) {
        showError('confirm_password', 'Las contraseñas no coinciden');
        hideLoader();
        return;
    } else {
        hideError('confirm_password');
    }

    try {
        // Asegúrate de que el token tenga el valor correcto antes de hacer la solicitud
        const response = await fetch('https://endpointsco-production.up.railway.app/api/register/dentist', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json', // Indicamos que esperamos una respuesta JSON
            },
            body: formData,
        });

        if (response.ok) {
            showWarningModal('Registro guardado exitosamente');
            resetForm();
            closeModal();
            showDoctors();
        } else {
            const responseData = await response.json();
            const errorMessage = responseData.message ;
            showWarningModal(`Error en el registro: ${errorMessage}`);
            console.log("1", response);
            console.log("2", responseData);

            // Mostramos los mensajes de error de la API como alertas en la pantalla
            if (responseData.error) {
                for (const errorField in responseData.error) {
                    showWarningModal(`${errorField}: ${responseData.error[errorField][0]}`);
                }
            }
        }
    } catch (error) {
        showWarningModal('Error en la solicitud');
    } finally {
        // Ocultar el indicador de carga después de enviar la solicitud (independientemente de si fue exitosa o no)
        hideLoader();
    }
}
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

    function validatePassword(password) {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
    }

// Función para abrir el modal de registro
function openModal() {
    resetForm();
    document.getElementById('modal').classList.add('is-active');
  }

  // Función para cerrar el modal de registro
  function closeModal() {
    document.getElementById('modal').classList.remove('is-active');
  }

// Función para cambiar el estado de un odontólogo
async function handleStatusDoctor() {
    showLoader(); // Mostrar el cargador y la superposición

    try {
      doctorIdConfirmation = parseInt(this.dataset.id);
      const doctor = doctors.find((doc) => doc.id === doctorIdConfirmation);

      if (doctor) {
        const newStatus = doctor.user_state === 1 ? 0 : 1;
        const statusAction = newStatus === 1 ? 'activar' : 'desactivar';
        confirmationMessage.textContent = `¿Está seguro de ${statusAction} al odontólogo?`;
        confirmationModal.classList.add('is-active');
        confirmYesButton.dataset.status = newStatus;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      hideLoader(); // Ocultar el cargador y la superposición
    }
  }

  // Función para confirmar el cambio de estado
  async function confirmStatusChange() {
    showLoader();

    try {
      if (doctorIdConfirmation !== null) {
        const newStatus = parseInt(confirmYesButton.dataset.status);
        const doctor = doctors.find((doc) => doc.id === doctorIdConfirmation);

        if (doctor) {
          if (newStatus === 1) {
            await serviceEnableDoctor(doctor.identity_card_user);
            doctor.user_state = 1;
            console.log('Doctor Activated:', doctor);
          } else if (newStatus === 0) {
            await serviceDisableDoctor(doctor.identity_card_user);
            doctor.user_state = 0;
            console.log('Doctor Deactivated:', doctor);
          }
          showDoctors();
        }
      }
      doctorIdConfirmation = null;
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      hideLoader();
    }
  }

// Función para deshabilitar al odontólogo utilizando la API
async function serviceDisableDoctor(identityCard) {
    try {
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/disable-user/${identityCard}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        // Mostrar alerta de éxito
        showWarningModal('Odontólogo deshabilitado exitosamente');
      } else {
        console.error('Error al deshabilitar al odontólogo');
      }
    } catch (error) {
      console.error('Error de conexión', error);
    }
  }

  // Función para habilitar al odontólogo utilizando la API
  async function serviceEnableDoctor(identityCard) {
    try {
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/enable-user/${identityCard}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      if (response.ok) {
        // Mostrar alerta de éxito
        showWarningModal('Odontólogo habilitado exitosamente');
      } else {
        console.error('Error al habilitar al odontólogo');
      }
    } catch (error) {
      console.error('Error de conexión', error);
    }
  }

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '_error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

// Función para ocultar el mensaje de error debajo del campo de entrada
  function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + '_error');
    errorElement.style.display = 'none';
  }

// Función para abrir el modal de edición con los datos del doctor seleccionado
function handleEditDoctor() {
    showLoader();

    const doctorId = parseInt(this.dataset.id);
    const doctor = doctors.find((doc) => doc.id === doctorId);

    if (doctor) {
      const editNames = document.getElementById('edit-names');
      const editLastnames = document.getElementById('edit-lastnames');
      const editEmail = document.getElementById('edit-email');
      const editPhone = document.getElementById('edit-phone');
      const editAddress = document.getElementById('edit-address');

      editNames.value = doctor.names;
      editLastnames.value = doctor.surnames;
      editEmail.value = doctor.email;
      editPhone.value = doctor.phone;
      editAddress.value = doctor.address;

      saveChangesButton.dataset.id = doctorId;

      editModal.classList.add('is-active');
    }

    hideLoader();
  }

  //funcion llama al servicio de actualizacion de doctor
  async function serviceUpdateDoctor(doctor) {
    try {
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/update-user/${doctor.identity_card_user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(doctor)
      });

      if (response.ok) {
        showWarningModal('Actualización exitosa');
        showDoctors();
        closeModal();
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.message;
        showWarningModal(`Error en la actualización "El correo ya existe ingrese otro"`);
        console.log(response);
        console.log(responseData);
      }
    } catch (error) {
      showWarningModal('Error en la solicitud');
      console.error(error);
    }
  }

// Función para guardar los cambios realizados en la edición de un odontólogo
async function saveEditedDoctor(e) {
    e.preventDefault();

    showLoader();

    const doctorId = parseInt(this.dataset.id);
    const doctor = doctors.find((doc) => doc.id === doctorId);

    if (doctor) {
      const editNames = document.getElementById('edit-names').value;
      const editLastnames = document.getElementById('edit-lastnames').value;
      const editEmail = document.getElementById('edit-email').value;
      const editPhone = document.getElementById('edit-phone').value;
      const editAddress = document.getElementById('edit-address').value;

      // Validar y mostrar mensajes de error
      if (!validateNames(editNames)) {
        showError('edit-names', 'Ingrese un nombre válido');
        hideLoader();
        return;
      } else {
        hideError('edit-names');
      }

      if (!validateLastnames(editLastnames)) {
        showError('edit-lastnames', 'Ingrese un apellido válido');
        hideLoader();
        return;
      } else {
        hideError('edit-lastnames');
      }

      if (!validateEmail(editEmail)) {
        showError('edit-email', 'Ingrese un correo electrónico válido');
        hideLoader();
        return;
      } else {
        hideError('edit-email');
      }

      if (!validatePhone(editPhone)) {
        showError('edit-phone', 'Ingrese un número de teléfono válido de 10 dígitos');
        hideLoader();
        return;
      } else {
        hideError('edit-phone');
      }

      doctor.names = editNames;
      doctor.lastnames = editLastnames;
      doctor.email = editEmail;
      doctor.phone = editPhone;
      doctor.address = editAddress;

      console.log('Updated doctor:', doctor); // registrar el objeto médico actualizado

      try {
        await serviceUpdateDoctor(doctor); // Llamar a la función correcta para actualizar el doctor
        showDoctors();
      } catch (error) {
        console.error(error);
        // Puede elegir mostrar un mensaje de error aquí si es necesario
      } finally {
        hideLoader();
      }
    }
  }

// Función para mostrar el modal de confirmación de cancelación en la edición
function showConfirmationModalEdit() {
    confirmationMessage.innerText = '¿Está seguro de no guardar los cambios?';
    confirmationModal.classList.add('is-active');

    confirmYesButton.addEventListener('click', closeModal);
    confirmNoButton.addEventListener('click', () => {
      confirmationModal.classList.remove('is-active');
      editModal.classList.add('is-active');
    });
  }

// Función para cerrar los modales
function closeModal() {
  const modals = document.getElementsByClassName('modal');
  Array.from(modals).forEach((modal) => {
    modal.classList.remove('is-active');
  });
}

// Función para resetear el formulario de registro
function resetForm() {
  doctorForm.reset();
}

// Limpia los modales abiertos en caso de recargar la página
window.addEventListener('beforeunload', () => {
  closeModal();
});

