// Variables
const searchButton = document.getElementById('search-button');
const doctorList = document.getElementById('patients-table-body');
const animacionCargando = document.getElementById('cargando');

// Event Listeners
searchButton.addEventListener('click', searchPatients)
let pacientes = [];

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
// Función para mostrar la lista de pacientes en la tabla
function displayPatients(patientsData) {
    const patientsTableBody = document.getElementById('patients-table-body');
    patientsTableBody.innerHTML = '';

    patientsData.forEach((patient) => {
      const { identity_card_user, names, surnames } = patient; // Obtener solo los campos necesarios
      const row = document.createElement('tr');
      //console.log(patient);
      row.innerHTML = `
        <td>${identity_card_user}</td>
        <td>${names}</td>
        <td>${surnames}</td>
        <td>
          <button class="btn-history" data-patient-id="${patient.identity_card_user}">Historia Clínica</button>
        </td>
      `;

      patientsTableBody.appendChild(row);
    });
  }

  // Event Listener para abrir la historia clínica del paciente
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-history')) {
      const patientId = event.target.getAttribute('data-patient-id');
      window.location.href = `clinic-history?obj=${patientId}`;
    }
  });


  // Mostrar pacientes al cargar la página
  showPatients();

  async function showPatients() {
    try {
    // Show the loader before making the API request
    showLoader();

      const id_rol = 3;
      const token = localStorage.getItem('token');
    //   console.log(token);
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
          const patientsData = responseData[0]; // Accedemos al array de usuarios dentro del objeto de respuesta
          pacientes = responseData[0];
          console.log('Show Patients API Response:', patientsData);
          displayPatients(patientsData);
        } else {
          console.error('No se encontraron pacientes en la respuesta.');
        }
      } else {
        console.error('Error al obtener los pacientes:', response.statusText);
      }
    } catch (error) {
        console.error('Error en la solicitud:', error);
  } finally {
    // Add a delay of 500 milliseconds before hiding the loader
    setTimeout(() => {
      hideLoader();
    }, 500);
  }
}

// Función para buscar odontólogos por numero de cedula
function searchPatients(e) {
  e.preventDefault();
  console.warn(document.getElementById('search-input').value);
  //const searchTerm = searchForm.value.toLowerCase();
  const searchTerm = (document.getElementById('search-input').value);
  if (searchTerm.length <= 10) {
    const filteredPatiens = pacientes.filter((patient) => {
      return patient.identity_card_user.toLowerCase().slice(0, 10).search(searchTerm) != -1;
    });

    if (filteredPatiens.length === 0) {
      // Mostrar mensaje de "No existe"
      doctorList.innerHTML = `<tr><td colspan="9">No existe ningún Odontólogo con ese número de identificación.</td></tr>`;
    } else {
      showFilteredPatients(filteredPatiens);
    }
  } else {
    showWarningModal(`Para la busqueda ingrese solo 10 caracteres`);
  }
}

// Función para mostrar los odontologos filtrados
function showFilteredPatients(filteredPatiens) {
  let html = '';
  let i = 1;
  filteredPatiens.forEach((patient) => {

    html += `
      <tr>
        <td>${patient.identity_card_user}</td>
        <td>${patient.names}</td>
        <td>${patient.surnames}</td>
        <td>
          <button class="btn-history" data-patient-id="${patient.id}">Historia Clínica</button>
        </td>
      </tr>
    `;
  });

  doctorList.innerHTML = html;
}
