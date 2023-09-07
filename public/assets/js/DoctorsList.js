const doctorList = document.getElementById('listaUsuarios');

const searchButton = document.getElementById('boton');
//recuperar el valor almacenado en la variable de sesion idRol asignando a la variable
const perfil_usuario = sessionStorage.getItem('idRol');
const videntity_card_user = sessionStorage.getItem('identity_card_user');

console.log(videntity_card_user);
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

console.log(videntity_card_user);

let doctors = [];
let idDoctorSeleccionado='-';
const token2 = localStorage.getItem('token');
//event listeners
searchButton.addEventListener('click', searchDoctors)

// Función para buscar odontólogos por numero de cedula
function searchDoctors(e) {
  e.preventDefault();
  console.warn(document.getElementById('formulario').value);
  //const searchTerm = searchForm.value.toLowerCase();
  const searchTerm = (document.getElementById('formulario').value);
  if(searchTerm.length <= 100){
    console.log(doctors);
    const filteredDoctors = doctors.filter((doctor) => {
      return doctor.surnames.toLowerCase().slice(0,100).search(searchTerm.toLowerCase()) != -1;
    });

    if (filteredDoctors.length === 0) {
      // Mostrar mensaje de "No existe"
      doctorList.innerHTML = `<tr><td colspan="9">No existen registros.</td></tr>`;
    } else {
      showFilteredDoctors(filteredDoctors);
    }
  }else{
    showWarningModal(`Para la busqueda ingrese solo 10 caracteres`);
  }
}

// Funsión para mostrar los odontologos filtrados
function showFilteredDoctors(filteredDoctors) {
  let html = '';
  let i = 1;
  filteredDoctors.forEach((doctor) => {

    html += `
      <tr>
        <th>${i++}</th>
        <td>${doctor.names} ${doctor.surnames}</td>
        <td>
          <button class='btn-edit' data-id="${doctor.id}" data-toggle="modal" data-target="#editModal">Consultar Agenda</button>
          </td>
      </tr>
    `;
  });

  /* doctorList.innerHTML = html;
  const statusButtons = doctorList.getElementsByClassName('btn-status');
  Array.from(statusButtons).forEach((statusButton) => {
    statusButton.addEventListener('click', handleStatusDoctor);
  });

  const editButtons = doctorList.getElementsByClassName('btn-edit');
  Array.from(editButtons).forEach((editButton) => {
    editButton.addEventListener('click', handleEditDoctor);
  }); */
}

//consulta los odontologos
// Token
document.addEventListener('DOMContentLoaded', async () => {
  if(perfil_usuario!=2){


        window.addEventListener('DOMContentLoaded', async () => {
          try {
            const id_rol = 2;
            //const token = localStorage.getItem('token');
            //console.log('doctores...................');
            const response = await fetch(`https://endpointsco-production.up.railway.app/api/get-users/${id_rol}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token2}`,
                'Accept': 'application/json',
              },
            });
    //console.log(response);
            if (response.ok) {
              try{
                  const responseData = await response.json();
                  //console.log("token de response", responseData);
                  if (Array.isArray(responseData) && responseData.length > 0){
                      doctors = responseData[0];
                      //console.warn(doctors);
                      //showDoctors();
                      loadDoctors();
                  } else {
                      console.error('No se encontraron odontólogos en la respuesta.');
                  }
              }catch(error){
                console.error('No existen odontólogos disponibles...');
              }
            } else {
              console.error('Error al obtener los odontólogos:', response.statusText);
            }
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
        });
  }/*else{
    console.log('doctor.......');
    console.log(token2);
    cargarCitas_usuario(token2);
  }*/
  });

// Función para mostrar los odontólogos
function showDoctors() {
    let html = '';
    let i = 1;
    let opcion =[];
    opcion.push("Medico")
    console.warn(doctors.length);
    for (let index = 0; index < doctors.length; index++) {
      opcion.push(`${doctors[index].names} ${doctors[index].surnames}`)
      //console.log(`${opcion}`);
    }

    // Verificamos si la respuesta es un array y tiene al menos un odontólogo
    if (Array.isArray(doctors) && doctors.length > 0) {
     var select = document.createElement("select");

     // Crear opciones y agregarlas al select
     var opciones = [];
     opciones = opcion;
     opciones.forEach(function(opcionTexto) {
         var opcion = document.createElement("option");
         opcion.text = opcionTexto;
         opcion.value=
         select.appendChild(opcion);
     });

     // Agregar el select al contenedor en el DOM
     var contenedor = document.getElementById("contenedor");
     contenedor.appendChild(select);

    } else {
      // Si no hay odontólogos en la respuesta, mostramos un mensaje o hacemos algo adecuado para tu caso
      //html = '<tr><td colspan="9">No se encontraron odontólogos.</td></tr>';
    }

    // Actualiza el contenido de la tabla de odontólogos
    /* const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = html; */
  }


  function loadDoctors() {

    //console.warn(doctors.length);
    //listas despegablas
    var select = document.createElement("select");
    select.id="listOdontologo";
    var select2 = document.createElement("select");
    select2.id="modOdontologo";
    //seleccionar un doctor
    var item = document.createElement("option");
      item.text = 'Seleccione un doctor';
      item.value= '-';
      select.appendChild(item);


      var item2= document.createElement("option");
      item2.text = 'Seleccione un doctor';
      item2.value= '-';
      select2.appendChild(item2);


    for (let index = 0; index < doctors.length; index++) {
        //en cada iteracion del bucle crea un nuevo elemento option con el nombre del O.
      item = document.createElement("option");
      item.text = doctors[index].names +' '+doctors[index].surnames;
      item.value= doctors[index].identity_card_user;
      select.appendChild(item);

      item2 = document.createElement("option");
      item2.text = doctors[index].names +' '+doctors[index].surnames;
      item2.value= doctors[index].identity_card_user;
      select2.appendChild(item2);
    }


    //detectar un cambio en la seccion de odontologosy activar la funcion cargar citas
    select.addEventListener('change', ()=>{
      idDoctorSeleccionado=select.value;
      cargarCitas(select.value);
    }
    );
    //asigna el valor seleccionado a la varible idDoctorSeleccionado
    select2.addEventListener('change', ()=>{
      idDoctorSeleccionado=select2.value;
    } );

      // Agregar el select al contenedor en el DOM
    var contenedor = document.getElementById("contenedor");
    contenedor.appendChild(select);
    //console.log(select);
    //console.log(select2);
    //console.log(cedulaPaciente);
    if(perfil_usuario==1 && cedulaPaciente===null){
        var contenedor2 = document.getElementById("contenedorOdontologos");
        contenedor2.appendChild(select2);
    }

    if(perfil_usuario==1 && cedulaPaciente!==null){

      var span= document.createElement("SPAN");
      span.id="spanPaciente";
      var txt= document.createTextNode("Paciente :"+cedulaPaciente);
      span.appendChild(txt);


      var contenedor3 = document.getElementById("contenedorOdontologos");
        contenedor3.appendChild(span);
    }
  }
//mostras las citas
  async function cargarCitas(identificacion){
    //limpiar el calendario antes de caragr nuevas citas
    $('#calendar').fullCalendar('removeEvents');
    //const token = localStorage.getItem('token');
    //obtener citas
    url=`https://endpointsco-production.up.railway.app/api/getAppointmentsByDentist/`+idDoctorSeleccionado;
    if (idDoctorSeleccionado=='-'){
      if (perfil_usuario==1){
        //obtener citas sin seleccionar odontologo.
        url=`https://endpointsco-production.up.railway.app/api/getAllAppointments`;
      }else{
        return;
      }
    }

    //console.log(idDoctorSeleccionado);
    //console.log(perfil_usuario);
    //console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token2}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        try{
            const responseData = await response.json();
            //verificar si la respuesta es una rray y si tiene elementos
            if (Array.isArray(responseData) && responseData.length > 0) {
              citas = responseData[0];
              console.log(citas);
              showCitas();
            } else {
              console.error('No se encontraron citas en la respuesta.');
            }
        }catch(error){
            showWarningModal('No existen citas');
          //console.error('No se encontraron citas en la respuesta.');
        }
      } else {
        console.error('Error al obtener las citas:', response.statusText);
      };
  }
