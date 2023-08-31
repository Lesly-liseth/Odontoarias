//variables
var ServicioGlobal = [];
var diagnosisGlobal = [];
// Obtener todos los cuadrados del odontograma
const cuadrados = document.querySelectorAll('.cuadrado');
// Obtener el modal y los elementos relacionados
const modalItems = document.querySelectorAll('.modal-item');
const aceptarButton = document.getElementById('aceptarButton');
const cerrarModalButton = document.getElementById('cerrarModal');
const piezaInput = document.getElementById('pieza');
const diagnosisInput = document.getElementById('dgn');
const tablaBody = document.querySelector('#tabla-diagnosticos tbody');
const openModalButton = document.getElementById('openRegisterModal');
const serviceForm = document.getElementById('register-form');
const perfil_usuario = sessionStorage.getItem('idRol');
var doctors = [];

// const overlay1 = document.getElementById('overlay');

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

// Función para abrir el modal y guardar el cuadrado seleccionado
function abrirModal(event) {
    // Restablecer los campos del modal
    diagnosisInput.value = '';
    servicioSelect.value = '';

    // console.log("Abriendo el modal...");
    const cuadrado = event.target;
    const cuadradoNumber = cuadrado.dataset.number;
    cuadradoSeleccionado = cuadrado;
    // console.log("Cuadrado seleccionado:", cuadradoNumber);
    modal.classList.add('is-active');

    cuadrados.forEach(cuadrado => {
      const cuadradoNumber = cuadrado.dataset.number;
      estilosCuadrados[cuadradoNumber] = cuadrado.style.backgroundColor;
    });
    console.log("Estilos de cuadrados guardados:", estilosCuadrados);
    // Establecer el número de cuadro seleccionado en el campo "Pieza"
    piezaInput.value = cuadradoNumber;
  }

// Función para cerrar el modal despintando los cuadrados
function cerrarModalSinDespintar() {
    modal.classList.remove('is-active');
    cuadradoSeleccionado = null; // Corrección: Debe ser "null" en lugar de "nulo"

    cuadrados.forEach(cuadrado => {
      const cuadradoNumber = cuadrado.dataset.number;

      if (estilosCuadrados[cuadradoNumber]) {
        cuadrado.style.backgroundColor = estilosCuadrados[cuadradoNumber];
        // Restaurar el color original del cuadro
      }
    });
  }

// Variable para almacenar el cuadrado seleccionado
let cuadradoSeleccionado = null;
let colorSeleccionado = null;
let estilosCuadrados = {}; // Almacenar los estilos de fondo de los cuadrados

// Agregar el evento click a cada cuadrado del odontograma
cuadrados.forEach(cuadrado => {
    console.log(perfil_usuario);
    if(perfil_usuario==2){
        cuadrado.addEventListener('click', abrirModal);
    }
  });

// Agregar el evento click al botón Aceptar del modal
aceptarButton.addEventListener('click', aplicarColor);

// Función para aplicar el color seleccionado al cuadrado del odontograma
async function aplicarColor(event) {
    event.preventDefault(); // Prevenir que la página se recargue

    cuadradoSeleccionado.style.backgroundColor = colorSeleccionado;

    // Cerrar el modal y agregar la fila solo si el modal se cierra correctamente
    if (cerrarModal()) {
      // Agregar la fila a la tabla de diagnósticos con los valores correctos
      agregarFila(pieza, servicio, diagnosis);
    }
  }

// Agregar el evento click al botón de cerrar el modal
cerrarModalButton.addEventListener('click', cerrarModalSinDespintar);

// Agregar el evento click a cada item del modal
modalItems.forEach(item => {
  const modalColor = item.querySelector('.modal-color');
  const modalLabel = item.querySelector('.modal-label');

  item.addEventListener('click', function() {
    colorSeleccionado = modalColor.style.backgroundColor;
    modalItems.forEach(item => item.classList.remove('selected'));
    item.classList.add('selected');
  });
});

// Función para cerrar el modal y restablecer los estilos de fondo de los cuadrados
function cerrarModal() {
    const hasAlerts = document.querySelectorAll(".alert").length > 0;

    if (!hasAlerts) {
      const dgn = diagnosisInput.value;

      if (!dgn) {
        // Mostrar mensaje de error o alerta al usuario indicando que el campo es requerido
        showWarningModal("El campo de diagnóstico es requerido. Por favor, llénelo antes de cerrar el modal.");
        return; // Evitar que el modal se cierre si el campo de diagnóstico está vacío
      }
      modal.classList.remove('is-active');
      cuadradoSeleccionado.style.backgroundColor = colorSeleccionado;
      const pieza = piezaInput.value;
      const servicioSelect = document.getElementById('servicioSelect');
      const servicio = servicioSelect.value;

      // Llamar a la función agregarFila
      agregarFila(pieza, servicio, dgn);
      dgn.value = '';
    }
  }

  let filaAgregada = false;

// Función para agregar una nueva fila a la tabla
function agregarFila(pieza, servicio, diagnosis) {
    if (!filaAgregada) {
      filaAgregada = true;    const tablaBody = document.querySelector('#tabla-diagnosticos tbody');

    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${fechaFormateada}</td>
      <td>${pieza}</td>
      <td>${servicio}</td>
      <td>${diagnosis}</td>
    `;
    tablaBody.appendChild(row);
  }
}

window.addEventListener('DOMContentLoaded', event => {
   const urlParams = new URLSearchParams(window.location.search);
   const cedula = urlParams.get('obj');
   console.log(cedula);
   if(perfil_usuario==3){
    obtenerHistoriaClinica();
   }else{
     if (cedula !== '') {
       GetHistoriasClinicas(cedula);
   }
}

   $('#guardarAntecedentes').hide();
   $('#openNewServiceModal').hide();
   if(perfil_usuario==2){
    $('#guardarAntecedentes').show();
    $('#openNewServiceModal').show();
    $('#openNewServiceModal').click(function() {
        console.log('openNewServiceModal...................');
        showServices();
        nuevoServicioModal.classList.add('is-active');
     });;
   }
   });

//funcionn para obtener los historias clinicas
async function GetHistoriasClinicas(identificacion){
  console.log('load...');
    try {
    // Show the loader before making the API request
    showLoader();

    const token = localStorage.getItem('token');
    // console.log(token);
    const data = await fetch(`https://endpointsco-production.up.railway.app/api/getMedicalRecordUser/${identificacion}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  if (data.ok) {
    const responseData = await data.json();
    //llenar datos en el formulario
    document.getElementById('names').value;
    llenarDatosFormulario(responseData[0]);
    //console.warn(responseData);
    detalleHistoria(responseData[0].DetailsRecord)

    // Hide the loader after the clinical history data is loaded and displayed
    hideLoader();
  }
  } catch (error) {
    console.log(error);
  }
}

// Agregar el evento click al botón "Guardar Antecedentes"
const guardarAntecedentesButton = document.getElementById("guardarAntecedentes");
guardarAntecedentesButton.addEventListener("click", guardarAntecedentesEnAPI);

// Obtén una referencia al campo de entrada
const backgroundInput = document.getElementById("background");

// Función para guardar antecedentes en la API
async function guardarAntecedentesEnAPI() {
    const idCard = document.getElementById("id-number").value; // Obtener el valor del campo ID de la tarjeta
    const background = backgroundInput.value;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://endpointsco-production.up.railway.app/api/updateMedicalRecord/${idCard}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ background }), // Enviar los antecedentes en el cuerpo de la solicitud
      });

      if (response.ok) {
        console.log("Antecedentes guardados exitosamente");
        guardarAntecedentesButton.disabled = true; // Deshabilitar el botón
        backgroundInput.disabled = true; // Deshabilitar el campo de entrada
        localStorage.setItem('antecedentesGuardados', 'true'); // Guardar el estado en el almacenamiento local
      } else {
        console.error("Error al guardar antecedentes:", response.status, response.statusText);
        const errorResponse = await response.text();
        console.error("Detalles del error:", errorResponse);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }

// Comprobar el estado guardado en el almacenamiento local al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const antecedentesGuardados = localStorage.getItem('antecedentesGuardados');
    if (antecedentesGuardados === 'true') {
        guardarAntecedentesButton.disabled = true;
        backgroundInput.disabled = true;
    }
});

function llenarDatosFormulario(data){
    console.log(data.DetailsRecord);
    for(i=0;i<data.DetailsRecord.length;i++){
        obj=data.DetailsRecord[i];
        //console.log(obj.id);
        vodo=JSON.parse(obj.odontogram);
        vid='#'+vodo.pieza;

        console.log(vodo);
        console.log(vodo.color);

            $(vid).css('background-color', vodo.color);

    }
  document.getElementById('id').value=data.IdMedicalRecord;
  document.getElementById('id-number').value=data.IdCardUser;
  document.getElementById('names').value=data.FullName;
  document.getElementById('background').value=data.background;
}

function detalleHistoria(data) {
    const patientsTableBody = document.getElementById('citas');
    patientsTableBody.innerHTML = '';

    data.forEach((patient) => {
      const { created_at, reason, id, id_record } = patient; // Obtener solo los campos necesarios
      const row = document.createElement('tr');

      // Formatear la fecha
      const formattedDate = new Date(created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      // Analizar el campo odontogram en formato JSON
      const odontogramaData = JSON.parse(patient.odontogram);
      // Obtener los valores de pieza y servicio del odontogramaData
      const pieza = odontogramaData.pieza || '';
      const servicio = odontogramaData.servicio || '';

      row.innerHTML = `
        <td>${formattedDate}</td>
        <td>${pieza}</td>
        <td>${servicio}</td>
        <td>${reason}</td>
      `;
      patientsTableBody.appendChild(row);
    });
  }

// Función para mostrar los servicios en el select
function showServices() {
    console.log(doctors);
    const servicioSelect = document.getElementById("servicioSelect");
    servicioSelect.innerHTML = '<option value="Servicio">Servicio</option>';

    for (const doctor of doctors) {
      const opcionElement = document.createElement("option");
      opcionElement.text = doctor.description;

      servicioSelect.appendChild(opcionElement);
    }
  }

// Obtener el botón "Aceptar" del modal
aceptarButton.addEventListener("click", enviarDatosAPI);

// Función para enviar los datos a la API
async function enviarDatosAPI() {
  // Obtener el diagnóstico (motivo)
  const diagnostico = document.getElementById('dgn').value;

    // Obtener el servicio del campo de selección correspondiente
    const servicioSelect = document.getElementById('servicioSelect');
    const servicio = servicioSelect.value;

  // Obtener el ID de la tarjeta (ajusta el selector según tu HTML)
  const idCard = document.getElementById("id-number").value;

  try {
    const token = localStorage.getItem('token');

    // Validar campos
    if (!diagnostico) {
      console.log("El diagnóstico no puede estar vacío");
      return;
    }

    // Obtener los datos del odontograma
    const odontogramaData = obtenerDatosOdontograma(servicio);
    const dataToSend = {
      idCard: idCard,
      odontogram: JSON.stringify(odontogramaData),
      reason: diagnostico,
      servicio: servicio
    };

    console.log("Data being sent to the API:", dataToSend);

    // Show the loader before making the API request
    showLoader();

    const response = await fetch(`https://endpointsco-production.up.railway.app/api/createRecordDetail/${idCard}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      showWarningModal("Datos guardados exitosamente");
      cerrarModal(); // Cerrar el modal solo si la respuesta es verdadera
    } else {
      const responseData = await response.json();

      if (responseData.error) {
        for (const field in responseData.error) {
          showWarningModal(`${field}: ${responseData.error[field][0]}`);
        }
      } else {
        showWarningModal('Error en la solicitud');
      }
      console.error(responseData);
    }
  } catch (error) {
    showWarningModal('Error en la solicitud');
    console.error(error);
    } finally {
    // Hide the loader after the API request is complete
    hideLoader();
  }
}

// Función para obtener los datos del odontograma
function obtenerDatosOdontograma(servicio) {
  const pieza = document.getElementById("pieza").value;
  const color = cuadradoSeleccionado.style.backgroundColor;
  const diagnostico = document.getElementById("dgn").value;
  const fecha = new Date().toISOString();

  const odontogramaData = {
    color: color,
    pieza: pieza,
    servicio: servicio, // Utilizar el valor del servicio proporcionado
    diagnostico: diagnostico,
    fecha: fecha,
  };
  return odontogramaData;
}

// Evento para mostrar los servicios al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const token = localStorage.getItem('token');
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
            console.log('cargando servicios....');

          doctors = responseData[0];
          console.log(doctors);
          showServices(); // Mostrar los servicios en el select
        } else {
          console.error('No se encontraron servicios en la respuesta.');
        }
      } else {
        console.error('Error al obtener los servicios:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  });

  // Función para mostrar los servicios
  function showServices() {
    const servicioSelect = document.getElementById("servicioSelect");
    servicioSelect.innerHTML = ''; // Limpia las opciones anteriores

    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // Valor vacío
    defaultOption.textContent = "Seleccione un servicio";
    servicioSelect.appendChild(defaultOption);

    for (let index = 0; index < doctors.length; index++) {
      const opcionElement = document.createElement("option");
      opcionElement.value = doctors[index].description; // Usar la descripción como valor
      opcionElement.textContent = doctors[index].description;
      servicioSelect.appendChild(opcionElement);

    }
  }

  //visualizar historia clinica de usuario logeado
  async function obtenerHistoriaClinica() {
    try {
    // Show the loader before making the API request
    showLoader();

      const token = localStorage.getItem('token');
      const response = await fetch('https://endpointsco-production.up.railway.app/api/getOwnMedicalRecord', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        document.getElementById('names').value;
        llenarDatosFormulario(responseData[0]);
        //console.warn(responseData);
        detalleHistoria(responseData[0].DetailsRecord)
      } else {
        throw new Error('Error al obtener la historia clínica');
      }
    } catch (error) {
      console.error(error);
    } finally {
        // Hide the loader after the API request is complete
        hideLoader();
      }
    }
