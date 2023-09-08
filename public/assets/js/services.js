// Variables
const serviceForm = document.getElementById('register-form');
const serviceList = document.getElementById('listaServicios');
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
const editButtons = document.querySelectorAll('.btn-edit');

const animacionCargando = document.getElementById('cargando');

// Variable para almacenar los datos de los servicios
let services = [];

// Función para eliminar un servicio de la matriz de servicios locales
function deleteService(serviceId) {
    services = services.filter((service) => service.id !== serviceId);
    showServices(); // Actualizar los servicios mostrados
}

// Token
const token = localStorage.getItem('token');

// Event Listeners
serviceForm.addEventListener('submit', handleRegisterService);
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
confirmYesButton.addEventListener('click', handleDeleteService);
confirmNoButton.addEventListener('click', closeModal);
editForm.addEventListener('submit', saveEditedService);
saveChangesButton.addEventListener('click', saveEditedService);
closeEditModalButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
});
closeDeleteModalButton.addEventListener('click', closeModal);
cancelEditButton.addEventListener('click', showConfirmationModalEdit);

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

    overlay.style.display = 'none'; // Ocultar la superposición
    loader.style.display = 'none'; // Ocultar el loader
}

// Mostrar servicios al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Verificación de permisos
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
            const valorIdRol = responseData.rol_id;
            // Revisa que solo los roles de admin y doctor realicen las acciones para esta sección
            if (valorIdRol == 1 || valorIdRol == 2) {
                services = responseData[0]; // Accedemos al array de servicios dentro del objeto de respuesta
                cargarListaServicios(token);
            } else {
                return window.location.href = '/dashboard';
            }
        } else {
            console.error('Error al obtener los servicios:', permisosRol.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

// Obtener servicios desde la API
async function cargarListaServicios(token) {

    try {
        // Mostrar el cargador y la superposición
          showLoader();

    const response = await fetch(`https://endpointsco-production.up.railway.app/api/getServices`, {
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
            services = responseData[0]; // Accedemos al array de servicios dentro del objeto de respuesta
            showServices();
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

// Función para mostrar los servicios
function showServices() {
    let html = '';
    let i = 1;

    // Verificamos si la respuesta es un array y tiene al menos un servicio
    if (Array.isArray(services) && services.length > 0) {
        services.forEach((service) => {
            const { description, id } = service;

            html += `
            <tr>
                <th>${i++}</th>
                <td>${description}</td>
                <td>
                <button class='btn-edit' data-id="${id}" data-toggle="modal" data-target="#editModal">Editar</button>
                </td>
                <td>
                <button class='btn-delete' data-id="${id}">Eliminar</button>
                </td>
            </tr>
            `;
        });
    } else {
        // Si no hay servicios en la respuesta, mostramos un mensaje o hacemos algo adecuado para tu caso
        html = '<tr><td colspan="8">No se encontraron servicios.</td></tr>';
    }

    // Actualiza el contenido de la tabla de servicios
    const listaServicios = document.getElementById('listaServicios');
    listaServicios.innerHTML = html;

    const editButtons = listaServicios.getElementsByClassName('btn-edit');
    const deleteButtons = listaServicios.getElementsByClassName('btn-delete'); // Get all delete buttons

    Array.from(editButtons).forEach((editButton) => {
        // Eliminar el listener existente antes de agregar uno nuevo
        editButton.removeEventListener('click', handleEditService);
        editButton.addEventListener('click', handleEditService);
    });

    Array.from(deleteButtons).forEach((deleteButton) => {
        // Agregar detector de eventos a cada botón de eliminación
        deleteButton.addEventListener('click', handleDeleteService);
    });
    animacionCargando.style.display = "none";
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

// Función para registrar un nuevo servicio
async function handleRegisterService(e) {
    e.preventDefault();

    // Mostrar el indicador de carga antes de enviar la solicitud
    showLoader();

    const service = document.getElementById('service').value;

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

          //verificacion que los campos ingresados sean validos
    if (!validateService(service)) {
        showError('service', 'Ingrese un servicio válido');
        hideLoader();
      } else {
        hideError('service');
      }

       // Si hay errores en algún campo, detener el proceso de registro
       const errors = document.getElementsByClassName('error-message');
       for (let i = 0; i < errors.length; i++) {
         if (errors[i].style.display === 'block') {
           return;
         }
       }

    const data = {
      description: service
    };

    try {
      const response = await fetch('https://endpointsco-production.up.railway.app/api/createService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        const newService = { description: responseData.description }; // Crear un objeto con el campo description
        services.push(newService); // Agrega el nuevo servicio a la matriz local
        showWarningModal('Registro guardado exitosamente');
        // showServices();
        resetForm();
        closeModal();
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.message;
        showWarningModal(`Error en el registro: ${errorMessage}`);
      }
    } catch (error) {
      showWarningModal('Error en la solicitud');
      console.error(error);
    } finally {
        // Ocultar el indicador de carga después de enviar la solicitud (independientemente de si fue exitosa o no)
        hideLoader();
    }
}

function validateService(service) {
    const serviceRegex = /^[a-zA-ZñÑ\s]{3,}$/;
    return serviceRegex.test(service);
}

//funcion para eliminar
async function handleDeleteService() {
    const serviceId = parseInt(this.dataset.id);
    const service = services.find((service) => service.id === serviceId);

    if (service) {
      confirmationMessage.innerText = `¿Está seguro de eliminar el servicio "${service.description}"?`;
      confirmationModal.classList.add('is-active');

      confirmYesButton.dataset.id = serviceId; // Almacenamos el id del servicio en el botón "Sí"
    }
  }

  // Función para eliminar un servicio y mostrar el modal de confirmación
  async function deleteServiceAndShowConfirmationModal(serviceId) {
    // Mostrar cargador y superposición
    showLoader();

    try {
      // Almacena el serviceId para usarlo en la solicitud de eliminación
      const idToDelete = serviceId;

      const response = await fetch(`https://endpointsco-production.up.railway.app/api/deleteService/${idToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showWarningModal('Servicio eliminado exitosamente');
        closeModal();

        // Eliminar el servicio de la lista local
        deleteService(idToDelete);
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.message;
        showWarningModal(`Error al eliminar el servicio: ${errorMessage}`);
        console.log(response);
        console.log(responseData);
      }
    } catch (error) {
      showWarningModal('Error en la solicitud');
      console.error(error);
    } finally {
      // Ocultar cargador y superposición
      hideLoader();
    }
  }


  // Agregar listener para el botón "Sí" en el modal de confirmación
  confirmYesButton.addEventListener('click', () => {
    const serviceId = parseInt(confirmYesButton.dataset.id);
    deleteServiceAndShowConfirmationModal(serviceId);
  });

  // Agregar listener para el botón "No" en el modal de confirmación
  confirmNoButton.addEventListener('click', () => {
    closeModal();
  });

// Función para abrir el modal de registro
function openModal() {
  resetForm();
  document.getElementById('modal').classList.add('is-active');
}

// Función para cerrar el modal de registro
function closeModal() {
 document.getElementById('modal').classList.remove('is-active');
}

// Función para abrir el modal de edición con los datos del servicio seleccionado
function handleEditService() {
  console.log('Edit button clicked');

  showLoader();
  const serviceId = parseInt(this.dataset.id);
  const service = services.find((service) => service.id === serviceId);

  if (service) {
    const editService = document.getElementById('edit-service');

    editService.value = service.description;

    saveChangesButton.dataset.id = serviceId;

    editModal.classList.add('is-active');
  }
  hideLoader();
}

// Función para actualizar la información del servicio
async function updateService(service) {
    try {
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/updateService/${service.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(service) // Enviar los datos del servicio actualizado
      });

      if (response.ok) {
        showWarningModal('Actualización exitosa');
        showServices();
        closeModal();
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.message;
        showWarningModal(`Error en la actualización: ${errorMessage}`);
        console.log(response);
        console.log(responseData);
      }
    } catch (error) {
      showWarningModal('Error en la solicitud');
      console.error(error);
    }
  }

// Función para guardar los datos de servicio editados
async function saveEditedService(e) {
    e.preventDefault();

    const serviceId = parseInt(saveChangesButton.dataset.id);
    const service = services.find((service) => service.id === serviceId);

    if (service) {
      const editService = document.getElementById('edit-service').value;

      // Mostrar cargador y superposición
      showLoader();

      try {
        // Actualizar los datos del servicio
        service.description = editService;

        // Llamar a la función para actualizar el servicio
        await updateService(service);

        // Cerrar el modal después de actualizar exitosamente
        closeModal();
      } catch (error) {
        showWarningModal('Error en la solicitud');
        console.error(error);
      } finally {
        // Ocultar cargador y superposición
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
  serviceForm.reset();
}

// Limpia los modales abiertos en caso de recargar la página
window.addEventListener('beforeunload', () => {
  closeModal();
});
