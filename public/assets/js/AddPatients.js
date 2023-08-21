// Variables
const patientForm = document.getElementById('register-form');
const patientList = document.getElementById('listaUsuarios');
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

// Variable para almacenar los datos de los pacientes
let patients = [];

// Event Listeners
patientForm.addEventListener('submit', handleRegisterPatient);
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
confirmNoButton.addEventListener('click', closeModal);
editForm.addEventListener('submit', saveEditedPatient);
saveChangesButton.addEventListener('click', saveEditedPatient);
closeEditModalButtons.forEach((button) => {
  button.addEventListener('click', closeModal);
});
closeDeleteModalButton.addEventListener('click', closeModal);
cancelEditButton.addEventListener('click', showConfirmationModalEdit);
searchButton.addEventListener('click', searchPatients);

  // Token
  const token = localStorage.getItem('token');
//   console.log("token de localstorage", token);

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

// Mostrar pacientes al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const token = localStorage.getItem('token');

    //verificacion de permisos
    const permisosRol = await fetch(`https://endpointsco-production.up.railway.app/api/get-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (permisosRol.ok) {
      const responseData = await permisosRol.json();
      console.log(responseData.rol_id);
      const valorIdRol = responseData.rol_id
      //revisa que solo los roles de admin y doctor realicen las aciones para esta seccion
      if (valorIdRol == 1 || valorIdRol == 2) {
        patients = responseData[0]; // Accedemos al array de pacientes dentro del objeto de respuesta
        console.warn("Tiene permisos suficientes");
        //carga lista de pacientes
        cargarListaPacientes(token, 3);
      } else {
        console.error("NOOO Tiene permisos suficionetes");

        return window.location.href = '/dashboard';

      }
    } else {
      console.error('Error al obtener los pacientes:', permisosRol.statusText);
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
});

//obtener pacientes desde la api
async function cargarListaPacientes(token,id_rol){

    try {
    // Mostrar el cargador y la superposición
    showLoader();
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/get-users/${id_rol}`, {
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
        patients = responseData[0]; // Accedemos al array de pacientes dentro del objeto de respuesta
        showPatients();
      } else {
        console.error('No se encontraron pacientes en la respuesta.');
      }
    } else {
      console.error('Error al obtener los pacientes:', response.statusText);
    }
} catch (error) {
    console.error('Error en la solicitud:', error);
  } finally {
    // Ocultar el cargador y la superposición
    hideLoader();
  }
}

// Función para mostrar los pacientes
function showPatients() {
  let html = '';
  let i = 1;

  // Verificamos si la respuesta es un array y tiene al menos un paciente
  if (Array.isArray(patients) && patients.length > 0) {
    patients.forEach((patient) => {
      const { identity_card_user, names, surnames, email, phone, address } = patient;

      html += `
        <tr>
          <th>${i++}</th>
          <td>${identity_card_user}</td>
          <td>${names}</td>
          <td>${surnames}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${address}</td>
          <td>
            <button class='btn-edit' data-id="${patient.id}" data-toggle="modal" data-target="#editModal">Editar</button>
          </td>
          <td>
          <button class='btn-agendar' onclick='agendarCita(${identity_card_user});' data-id="${identity_card_user}">Agendar Cita</button>
          </td>
        </tr>
      `;
    });
  } else {
    // Si no hay pacientes en la respuesta, mostramos un mensaje o hacemos algo adecuado para tu caso
    html = '<tr><td colspan="8">No se encontraron pacientes.</td></tr>';
  }

  // Actualiza el contenido de la tabla de pacientes
  const listaUsuarios = document.getElementById('listaUsuarios');
  listaUsuarios.innerHTML = html;

  const editButtons = listaUsuarios.getElementsByClassName('btn-edit');
  Array.from(editButtons).forEach((editButton) => {
    // Eliminar el listener existente antes de agregar uno nuevo
    editButton.removeEventListener('click', handleEditPatient);
    editButton.addEventListener('click', handleEditPatient);
  });
  animacionCargando.style.display = "none";
}

// Función para buscar pacientes por numero de cedula
function searchPatients(e) {
    e.preventDefault();
    console.warn(document.getElementById('formulario').value);

    const searchTerm = (document.getElementById('formulario').value);
    if (searchTerm.length <= 10) {
        console.log(patients);
        const filteredPatients = patients.filter((patient) => {
          return patient.identity_card_user.toLowerCase().slice(0,10).search(searchTerm) != -1;
      });

      if (filteredPatients.length === 0) {
        // Mostrar mensaje de "No existe"
        patientList.innerHTML = `<tr><td colspan="9">No existe ningún paciente con ese número de identificación.</td></tr>`;
      } else {
        showFilteredPatients(filteredPatients);
      }
    } else {
        showWarningModal(`Para la búsqueda ingrese solo 10 caracteres`);
    }
  }

// Función para mostrar los pacientes filtrados
function showFilteredPatients(filteredPatients) {
    let html = '';
    let i = 1;
    filteredPatients.forEach((patient) => {
      html += `
        <tr>
          <th>${i++}</th>
          <td>${patient.identity_card_user}</td>
          <td>${patient.names}</td>
          <td>${patient.surnames}</td>
          <td>${patient.email}</td>
          <td>${patient.phone}</td>
          <td>${patient.address}</td>
          <td>
            <button class='btn-edit' data-id="${patient.id}" data-toggle="modal" data-target="#editModal">Editar</button>
          </td>
          <td>
          <button class='btn-agendar' onclick='agendarCita("${patient.identity_card_user}")' data-id="${patient.identity_card_user}">Agendar Cita</button>
          </td>
        </tr>
      `;
    });

    patientList.innerHTML = html;

    const editButtons = patientList.getElementsByClassName('btn-edit');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', handleEditPatient);
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

  // funcion para agregar pacientes
  async function handleRegisterPatient(e) {
    e.preventDefault();

  // Mostrar el indicador de carga antes de enviar la solicitud
  showLoader();

    const names = document.getElementById('names').value;
    const lastnames = document.getElementById('lastnames').value;
    const idnumber = document.getElementById('idnumber').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

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
      hideLoader();
    } else {
      hideError('names');
    }

    if (!validateLastnames(lastnames)) {
      showError('lastnames', 'Ingrese un apellido válido');
      hideLoader();
    } else {
      hideError('lastnames');
    }

    if (!validateCI(idnumber)) {
      showError('idnumber', 'Ingrese un CI válido');
      hideLoader();
    } else {
      hideError('idnumber');
    }

    if (!validateEmail(email)) {
      showError('email', 'Ingrese un correo electrónico válido');
      hideLoader();
    } else {
      hideError('email');
    }

    if (!validatePhone(phone)) {
      showError('phone', 'Ingrese un número de teléfono válido de 10 dígitos');
      hideLoader();
    } else {
      hideError('phone');
    }

    if (!validatePassword(password)) {
      showError('password', 'La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial');
      hideLoader();
    } else {
      hideError('password');
    }

    if (password !== confirm_password) {
      showError('confirm_password', 'Las contraseñas no coinciden');
      hideLoader();
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
      identity_card_user: idnumber,
      names: names,
      surnames: lastnames,
      email: email,
      password: password,
      password_confirm: confirm_password,
      phone: phone,
      address: address
    };

    try {
        // Asegúrate de que el token tenga el valor correcto antes de hacer la solicitud
        const token = localStorage.getItem('token');
        const response = await fetch('https://endpointsco-production.up.railway.app/api/register/patient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          showWarningModal('Registro guardado exitosamente');
          resetForm();
          closeModal();
          showPatients();
        } else {
          try {
            const responseData = await response.json();
            const errorData = responseData.error;

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
      } finally {
        // Asegurarse de ocultar el indicador de carga en caso de cualquier resultado (éxito o error)
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

// Función para mostrar el mensaje de error debajo del campo de entrada
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

// Función para abrir el modal de edición con los datos del paciente seleccionado
function handleEditPatient() {
    showLoader();

    const patientId = parseInt(this.dataset.id);
    const patient = patients.find((patient) => patient.id === patientId);

    if (patient) {
      const editNames = document.getElementById('edit-names');
      const editLastnames = document.getElementById('edit-lastnames');
      const editEmail = document.getElementById('edit-email');
      const editPhone = document.getElementById('edit-phone');
      const editAddress = document.getElementById('edit-address');

      editNames.value = patient.names;
      editLastnames.value = patient.surnames;
      editEmail.value = patient.email;
      editPhone.value = patient.phone;
      editAddress.value = patient.address;

      saveChangesButton.dataset.id = patientId;

      editModal.classList.add('is-active');
    }
    hideLoader();
  }

// Función para actualizar los datos de un paciente
async function updatePatient(patient) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/update-user/${patient.identity_card_user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(patient) // Enviamos los nuevos datos del paciente
      });

      if (response.ok) {
        showWarningModal('Actualización exitosa');
        showPatients();
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

  async function saveEditedPatient(e) {
    e.preventDefault();

    showLoader();

    const patientId = parseInt(this.dataset.id);
    const patient = patients.find((patient) => patient.id === patientId);

    if (patient) {
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

      patient.names = editNames;
      patient.lastnames = editLastnames;
      patient.email = editEmail;
      patient.phone = editPhone;
      patient.address = editAddress;

      try {
        // Asegurarse de llamar a la función correcta para actualizar el paciente
        await updatePatient(patient);
        showPatients();
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
  patientForm.reset();
}

// Limpia los modales abiertos en caso de recargar la página
window.addEventListener('beforeunload', () => {
  closeModal();
});

function agendarCita(idPaciente){
    console.log(idPaciente);
    return window.location.href = '/dashboard?obj='+idPaciente;
  }
