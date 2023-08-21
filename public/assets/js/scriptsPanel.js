const btnm_dashboard = document.getElementById('m_dashboard');
const btnm_ListPatients = document.getElementById('m_ListPatients');
const btnm_clinichistory = document.getElementById('m_clinicHistory');
const btnm_registerPatientsLink = document.getElementById('registerPatientsLink');
const btnm_registerDoctorsLink = document.getElementById('registerDoctorsLink');
const btnm_registerServicesLink =  document.getElementById('registerServicesLink');
var perfil_usuario2 = sessionStorage.getItem('idRol');


$(document).ready(function() {
    // Manejador de clic para el enlace "Registrar Odontólogos"
    $("#registerDoctorsLink").click(function(event) {
      event.preventDefault(); // Evitar comportamiento predeterminado del enlace
      window.location.href = "AddDoctors"; // Redirigir a la página "addDoctors.html"
    });
  });

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


window.addEventListener('DOMContentLoaded', event => {
  const token = localStorage.getItem('token');
  //verifica el token de sesion
  if (token != null || token != undefined) {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
    showItemsByRolId();

  }else{
    return window.location.href = 'ingresar';
  }

});


//muestra los item dependiendo el rol de cada usuario
async function showItemsByRolId(){
  try {
    //verificacion de premisos de usuario
    const token = localStorage.getItem('token');

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
      const valorIdRol = responseData.rol_id
      //revisa que solo los roles realicen las aciones para esta seccion
      if (valorIdRol === 1 ) { //rol admin
        patients = responseData[0]; // Accedemos al array de pacientes dentro del objeto de respuesta
        disableMenuOptions();
        btnm_ListPatients.style.display = 'inline-flex'; // Histotia clinica
        btnm_registerPatientsLink.style.display = 'inline-flex'; // Registro de pacientes
        btnm_registerDoctorsLink.style.display = 'inline-flex'; // registro de odontologos
        btnm_registerServicesLink.style.display = 'inline-flex'; // registro de servicios

      } else if(valorIdRol === 2){ // odontologo
        disableMenuOptions();
        btnm_dashboard.style.display = 'inline-flex'; // Agenda citas medicas
        btnm_ListPatients.style.display = 'inline-flex'; // Histotia clinica
        //btnm_registerDoctorsLink.style.display = 'block';
      }else if(valorIdRol === 3){ // paciente
        disableMenuOptions();
        btnm_dashboard.style.display = 'inline-flex'; // Agenda citas medicas
        btnm_clinichistory.style.display = 'inline-flex'; // Histotia clinica
      } else {
        console.error("NO Tiene permisos suficientes ");
        //animacionCargando.style.display = "none";
        disableMenuOptions();
      }
    } else {
      console.error('Error en la solicitud de los items de menu', permisosRol.statusText);
      disableMenuOptions();
      //alert("Error al obtener los pacientes");
    }

  } catch (error) {
    showWarningModal("Error en la solicitud de los items de menu....");
    console.error('Error en la solicitud:', error);
  }
}

function disableMenuOptions(){
  btnm_dashboard.style.display = 'none';
  btnm_ListPatients.style.display = 'none';
  btnm_clinichistory.style.display = 'none';
  btnm_registerPatientsLink.style.display = 'none';
  btnm_registerDoctorsLink.style.display = 'none';
  btnm_registerServicesLink.style.display = 'none';
}
function menuHistoria(){
    console.log('menuHistoria....');
if(perfil_usuario2==3){
    iduser=sessionStorage.getItem('identity_card_user');
    window.location.href = 'clinic-history?obj='+iduser;
    //window.location.href = `clinic-history?obj=${patientId}`;
}else{
    window.location.href = 'clinic-history';
}

}

