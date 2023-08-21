//1 administrador
//2 odontologo
//3 paciente
const closeModalButton = document.getElementById('cerrarModal');

closeModalButton.addEventListener('click', confirmCloseModal); // Change the event listener

let citas = [];
const token = localStorage.getItem('token');
let cedulaPaciente;

// Function to show a confirmation message before closing the modal
function confirmCloseModal() {
    closeModal();

}

// Function to close the modal
function closeModal() {
  $('#availabilityModal').modal('hide');
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

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    let selectedEvent = null; // Variable para almacenar el evento seleccionado

    //const today = moment().startOf('day'); //tener fecha actual
    const urlParams = new URLSearchParams(window.location.search);
    cedulaPaciente = urlParams.get('obj');
//    console.log(cedulaPaciente);

    const today = moment();

    $('#calendar').fullCalendar({
      defaultView: 'agendaWeek',
      header: {
        left: '',
        center: 'title',
        right: 'prev,next'
      },
      slotDuration: '01:00:00',
      scrollTime: '08:00:00',
      minTime: '08:00:00',
      maxTime: '21:00:00',
      allDaySlot: false,
      editable: false, //desactivar la edición de eventos
      nowIndicator: true,
      events: [],
      selectable: true,
      validRange: {
        start: today //establecer la fecha mínima como el día actual
      },

      select: function(start, end) {
        const selectedDate = moment(start).format('YYYY-MM-DD');
        const selectedTime = moment(start).format('HH:mm');
        updateModalFields(selectedDate, selectedTime,'Nuevo'); // actualizar los campos del modal con la fecha y hora seleccionadas
        $('#availabilityTime').prop('disabled', 'disabled');
        if (perfil_usuario==2){//odontologo
            $('#saveAvailabilityBtn').show();
            $('#ReagendarBtn').hide();
            $('#AgendarBtn').hide();
            $('#LiberarBtn').hide();
            $('#availabilityModal').modal('show');
        }
      },
      eventClick: function(calEvent, jsEvent, view) {
        selectedEvent = calEvent; // almacenar el evento seleccionado
        const selectedDate = moment(calEvent.start).format('YYYY-MM-DD');
        const selectedTime = moment(calEvent.start).format('HH:mm');
        updateModalFields(selectedDate, selectedTime,calEvent.title); // actualizar los campos del modal con la fecha y hora del evento seleccionado
        //console.log(calEvent.title);
        $('#saveAvailabilityBtn').hide();
        $('#AgendarBtn').hide();
        $('#LiberarBtn').hide();

        $('#availabilityTime').prop('disabled', 'disabled');


        if(calEvent.title=='Disponible'){
          $('#AgendarBtn').show();
          $('#LiberarBtn').hide();
          $('#saveAvailabilityBtn').hide();
          $('#ReagendarBtn').hide();
          console.log('entra.........');
          console.log('perfil_usuario');
          if (perfil_usuario==2){//odontologo
            $('#saveAvailabilityBtn').hide();
            $('#LiberarBtn').hide();
            $('#AgendarBtn').hide();
            $('#ReagendarBtn').show();
            $('#availabilityTime').prop('disabled', false);
          }else if (perfil_usuario==1){
            $('#modOdontologo').prop('disabled', 'disabled');
            $('#AgendarBtn').hide();
            $('#modOdontologo').hide();
            if(cedulaPaciente!==null){
              $('#spanPaciente').show();
              $('#AgendarBtn').show();
            }
          }
        }else if(calEvent.title.includes('Agendada')){
          if (perfil_usuario==1){
            $('#LiberarBtn').hide();
            $('#ReagendarBtn').show();
            $('#modOdontologo').prop('disabled', false);
            if(cedulaPaciente!==null){
              $('#spanPaciente').hide();
            }
            /*if (idDoctorSeleccionado=='-'){
              $('#ReagendarBtn').hide();
            } */
           }else if (perfil_usuario==2){  //odontologo
            $('#LiberarBtn').hide();
            $('#ReagendarBtn').show();
            $('#availabilityTime').prop('disabled', false);

          }else{
            $('#LiberarBtn').show();
            $('#ReagendarBtn').hide();
          }
          $('#saveAvailabilityBtn').hide();
          $('#AgendarBtn').hide();
        }else{
          $('#AgendarBtn').hide();
          $('#ReagendarBtn').hide();
        }
        $('#availabilityModal').modal('show');
      }
    });

    $('.fc-prev-button').html('<i class="fas fa-chevron-left"></i>');
    $('.fc-next-button').html('<i class="fas fa-chevron-right"></i>');

     //accion de boton cancelar
     $('#cancelAvailabilityBtn').click(function() {
        $('#availabilityModal').modal('hide');
     });

    //accion de boton agendar
     $('#AgendarBtn').click(function() {
      if (selectedEvent) {
        // Actualizar el evento existente
        console.log(selectedEvent.id);
        selectedEvent.title = 'Agendada';
        selectedEvent.classNames = 'agendado-event';
        selectedEvent.backgroundColor= 'blue';
        $('#calendar').fullCalendar('updateEvent', selectedEvent);
        agendar(selectedEvent.id,'agendar',selectedEvent.title,selectedEvent);

        selectedEvent = null; // Restablecer la variable para permitir la creación de un nuevo evento después de la actualización
      } else {
        showWarningModal("No puede ingresar una nueva");
      }
        $('#availabilityModal').modal('hide');
     });



    //accion de boton liberar
    $('#LiberarBtn').click(function() {
      if (selectedEvent) {
        // Actualizar el evento existente
        console.log(selectedEvent.id);
        agendar(selectedEvent.id,'liberar',selectedEvent.title,selectedEvent);

        selectedEvent.title = 'Disponible';
        selectedEvent.classNames = 'disponible-event';
        selectedEvent.backgroundColor= 'green';
        $('#calendar').fullCalendar('updateEvent', selectedEvent);
        selectedEvent = null; // Restablecer la variable para permitir la creación de un nuevo evento después de la actualización
      } else {
        showWarningModal("No puede liberar una nueva");
      }
        $('#availabilityModal').modal('hide');
     });

     //accion de boton reagendar
    $('#ReagendarBtn').click(function() {
      if (selectedEvent) {
        // Actualizar el evento existente
        console.log(selectedEvent.id);
        reagendar(selectedEvent);
        $('#calendar').fullCalendar('updateEvent', selectedEvent);
        selectedEvent = null; // Restablecer la variable para permitir la creación de un nuevo evento después de la actualización
      } else {
        showWarningModal("No puede liberar una nueva");
      }
        $('#availabilityModal').modal('hide');
     });

    // Función para cerrar el modal de registro
    function closeModal() {
    document.getElementById('modal').classList.remove('is-active');
    }


    //accion de boton guardar disponibilidad
    $('#saveAvailabilityBtn').click(function() {
      const selectedDate = $('#availabilityDate').val(); // obtener el valor actualizado del campo de entrada de texto
      const selectedTime = $('#availabilityTime').val(); // obtener el valor actualizado del campo de entrada de texto

      if (selectedEvent) {
        // Actualizar el evento existente
        console.log(perfil_usuario);
        selectedEvent.start = selectedDate + 'T' + selectedTime;
        selectedEvent.end = moment(selectedDate + 'T' + selectedTime).add(1, 'hour');
        $('#calendar').fullCalendar('updateEvent', selectedEvent);

        selectedEvent = null; // Restablecer la variable para permitir la creación de un nuevo evento después de la actualización
      } else {
        // Crear un nuevo evento
        const newEvent = {
          title: 'Disponible',
          start: selectedDate + 'T' + selectedTime,
          end: moment(selectedDate + 'T' + selectedTime).add(1, 'hour'), //Establecer el fin del evento 1 hora después del inicio
          classNames: 'disponible-event',
          backgroundColor: 'green', // Establecer el color del evento a verde
          borderColor: 'green' // Establecer el color del borde del evento a verde
        };

        $('#calendar').fullCalendar('renderEvent', newEvent, true);

      }

      $('#availabilityModal').modal('hide');
    });

    // Restablecer la variable selectedEvent cuando el modal se cierra
    $('#availabilityModal').on('hidden.bs.modal', function() {
      selectedEvent = null;
    });

    //Función para cambiar los colores de los eventos al actualizarse
    $('#calendar').on('eventAfterRender', function(event, element, view) {
      element.find('.fc-content').addClass('disponible-event');
      element.find('.fc-content').css('background-color', 'green'); // Cambiar el color de fondo del evento a verde
      element.find('.fc-content').css('border-color', 'green'); // Cambiar el color del borde del evento a verde
    });

    // Función para actualizar los campos del modal con la fecha y hora seleccionadas
    function updateModalFields(date, time,titulo) {
      var selectedTime = moment(time, 'HH:mm');
      selectedTime.minutes(0); // Establecer los minutos en cero
      var formattedTime = selectedTime.format('HH:00'); // Establecer los minutos en 00
      $('#availabilityModalLabel').html(titulo);
      $('#availabilityDate').val(date);
      $('#availabilityTime').val(formattedTime);

      // Validar la entrada para permitir solo horas exactas
      $('#availabilityTime').on('change', function() {
        var inputTime = $(this).val();
        var regex = /^(0[0-9]|1[0-9]|2[0-3]):00$/; // Expresión regular para validar el formato de hora exacta (HH:00)

        if (!regex.test(inputTime)) {
          $(this).val(formattedTime);
        }
      });
    }
//crea disponibilidad del doctor
    $('#saveAvailabilityBtn').click(async function grabarFechasAdmin(){
    const selectedDate = $('#availabilityDate').val();
    const selectedTime = $('#availabilityTime').val();
    const selectedAvailability= $('#availabilitySelect').val();

    console.log(`datos a guardar ${selectedDate}, ${selectedTime}, ${selectedAvailability}`);

    const fechaok=selectedDate.replaceAll('-','/');
    const horafin=moment(selectedDate + 'T' + selectedTime).add(1, 'hour').format('HH:00');
    //.format('YYYY/MM/DD');
    console.log(fechaok);
        const data = {
          date: fechaok,
          start_time: selectedTime,
          end_time: horafin,
        };

    console.log(data);

    try {
      //Crea citas y valida que no conste una cita del mismo odontólogo, mismo día y hora de inicio antes al nuevo registro

        const response =  await fetch('https://endpointsco-production.up.railway.app/api/createAppointDentist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });
      //console.log(response);
      if (response.ok) {
        showWarningModal('Disponibilidad guardado exitosamente');
        //resetForm();
        //closeModal();
        //showPatients();
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.error;
        showWarningModal(`Error en el registro: ${errorMessage}`);
        //console.log(response);
        console.log(responseData);
      }
    } catch (error) {
        showWarningModal('Error en la solicitud');
      console.error(error);
    }

    })
    cargarCitas_usuario(token);
  });

  async function cargarCitas_usuario(token){
    //console.log('crgando citas-.......................');
    url=`https://endpointsco-production.up.railway.app/api/getAppointmentsUser`;
   // url=`https://endpointsco-production.up.railway.app/api/getAppointmentsByDentist/`;
   // const response = await fetch(`https://endpointsco-production.up.railway.app/api/getAppointmentsUser`, {
    const response = await fetch(url, {
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
          citas = responseData[0]; // Accedemos al array de citas
          //console.log(citas);
          showCitas();
        } else {
          console.error('No se encontraron citas en la respuesta.');
        }
      } else {
        console.error('Error al obtener las citas:', response.statusText);
      };
  }

// Función para mostrar citas
function showCitas() {
  $('#calendar').fullCalendar('removeEvents');
  vclassNames ='';
  vcolor ='';
  titulo =''

  // Verificamos si la respuesta es un array y tiene al menos un paciente
  if (Array.isArray(citas) && citas.length > 0) {
    citas.forEach((cita) => {
      const { id, id_status, identity_card_user,id_patient, start_time, end_time, date } = cita;

    if(id_status==1){
      vclassNames = 'disponible-event';
      vcolor = 'green';
      titulo ='Disponible';
    }else if(id_status==2){
      vclassNames = 'agendado-event';
      vcolor = 'blue';
      titulo ='Agendada';
    }

    // Crear evento
    const newEvent = {
      title: titulo,
      start: date + 'T' + start_time,
      end: date  + 'T' + end_time,
      classNames: vclassNames,
      backgroundColor: vcolor,
      borderColor: vcolor,
      id:id,
      extendedProps: {
        id_patient: id_patient,
        identity_card_user:identity_card_user
      }
    };

    if(perfil_usuario==3 && id_status==2){
        if(videntity_card_user===identity_card_user){
          $('#calendar').fullCalendar('renderEvent', newEvent, true);
        }
      }else{
        $('#calendar').fullCalendar('renderEvent', newEvent, true);
      }

      });
    } else {
      // Si no hay pacientes en la respuesta, mostramos un mensaje o hacemos algo adecuado para tu caso
    }
  }


async function agendar(idCita,evento,idpaciente,event){

  idp=idpaciente.replaceAll('Agendado ','');
//  console.log(event.extendedProps);

  const {identity_card_user,id_patient } = event.extendedProps;

  try {
      url='';
    if (evento=='agendar'){
      //paciente
      if (perfil_usuario==3){
        url='https://endpointsco-production.up.railway.app/api/scheduleAppointment/'+idCita;//Actualiza una cita a no disponible.
      }else if(perfil_usuario==1){
         data = {
          identity_card_user: cedulaPaciente
        };
        url='https://endpointsco-production.up.railway.app/api/scheduleAppointment/patient/'+idCita;//Actualiza una cita a no disponible desde el admin, con la cédula del paciente.
      }
    }else if (evento=='liberar'){
        //admin
      if (perfil_usuario==1){
           data = {
            identity_card_user: idp
          };
          url='https://endpointsco-production.up.railway.app/api/scheduleAppointment/patient/'+idCita;//Actualiza una cita a no disponible desde el admin, con la cédula del paciente.
      }else{
        //paciente
        if (perfil_usuario==3){
          url='https://endpointsco-production.up.railway.app/api/cancelAppointment/'+idCita;// a disponible
        }
      }
    }

    if (perfil_usuario==1){
//      console.log(data);
//      console.log(url);
          const response =  await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify(data)
        });
          //console.log(response);
          if (response.ok) {
            if (evento=='agendar'){
                showWarningModal('Agendado exitosamente');
            }else if (evento=='liberar'){
                showWarningModal('Liberado exitosamente');
            }
          } else {
            const responseData = await response.json();
            const errorMessage = responseData.error;
            showWarningModal(`Error en el registro: ${errorMessage}`);
            //console.log(response);
            console.log(responseData);
          }
  }else{
    const response =  await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
       //console.log(response);
       if (response.ok) {
        if (evento=='agendar'){
            showWarningModal('Agendado exitosamente');
        }else if (evento=='liberar'){
            showWarningModal('Liberado exitosamente');
        }
      } else {
        const responseData = await response.json();
        const errorMessage = responseData.error;
        showWarningModal(`Error en el registro: ${errorMessage}`);
        //console.log(response);
        console.log(responseData);
      }
  }

  } catch (error) {
    showWarningModal('Error en la solicitud');
    console.error(error);
  }
}


async function reagendar(citaModificada){

  const {identity_card_user,id_patient } = citaModificada.extendedProps;

  idp=id_patient;

  const selectedDate = $('#availabilityDate').val();
  const selectedTime = $('#availabilityTime').val();
  const selectedAvailability= $('#availabilitySelect').val();

  console.log(`datos a guardar ${selectedDate}, ${selectedTime}, ${selectedAvailability}`);

  const fechaok=selectedDate.replaceAll('-','/');
  const horafin=moment(selectedDate + 'T' + selectedTime).add(1, 'hour').format('HH:00');
  //.format('YYYY/MM/DD');

  console.log(fechaok);
  if (perfil_usuario==1){
      data = {
        date: fechaok,
        start_time: selectedTime,
        end_time: horafin,
        identity_card_user:idDoctorSeleccionado
      };
  }else{//odontologo
      data = {
        date: fechaok,
        start_time: selectedTime,
        end_time: horafin
      };
  }

      //idDoctorSeleccionado;
      //1314253678
console.log(data);
  try {
      url='https://endpointsco-production.up.railway.app/api/updateAppointment/'+citaModificada.id;
          const response =  await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify(data)
        });
          //console.log(response);
          if (response.ok) {
              showWarningModal('Reagendado exitosamente');
              if (perfil_usuario==1){
                $('#listOdontologo').val(idDoctorSeleccionado);
                cargarCitas(idDoctorSeleccionado);
              }else{//doctor
                cargarCitas_usuario(token);
              }
          } else {
            const responseData = await response.json();
            const errorMessage = responseData.error;
            showWarningModal(`Error en el registro: ${errorMessage}`);
            console.log(responseData);
          }
  } catch (error) {
    showWarningModal('Error en la solicitud');
    console.error(error);
  }
}
