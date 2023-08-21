@extends('topics.topic')
@section('contenido')

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Calendario</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/load.css') }}">
  <link rel="stylesheet" href="{{ asset('assets/css/calendar.css') }}">
  {{-- <link rel="stylesheet" href="{{ asset('assets/css/AddDoctors.css') }}"> --}}
</head>
  <!-- Lista de medicos -->
  <div class="main-content">

    <div class="crud-container">
      <h1 class="crud-title">Odontólogos</h1>
      {{-- <div class="search-bar"> --}}
        {{-- <input type="text" id="formulario" class="form-control my-2"> --}}
        <button class="btn btn-info mb-2 buscar-button" id="boton" style="display: none;">Buscar</button>
      {{-- </div> --}}

      {{-- <table class="table" id="tablaUsuarios">
        <thead>
          <tr>
            <th>#</th>
            <th>Odontólogo</th>
          </tr>
        </thead>
        <tbody id="listaUsuarios">
        </tbody>
      </table> --}}
      <div id="contenedor"></div>

    </div>
  </div>


  <div id="calendar-container" >
    <div id="calendar"></div>
  </div>


  <div id="editModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">

    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="availabilityModal" tabindex="-1" role="dialog" aria-labelledby="availabilityModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="availabilityModalLabel">Disponibilidad</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cerrarModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="availabilityDate">Fecha:</label>
              <input type="date" class="form-control" id="availabilityDate">
            </div>
            <div class="form-group">
              <label for="availabilityTime">Hora:</label>
              <select name="availabilityTime" id="availabilityTime" class="form-control">
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
            <div class="form-group">
              <div id="contenedorOdontologos"></div>
            </div>
            {{-- <div class="form-group">
              <label for="availabilitySelect">Disponibilidad:</label>
              <select class="form-control" id="availabilitySelect" onchange="updateModalColor()">
                <option value="disponible" selected>Disponible</option>
              </select>
            </div>--}}
            <div id="availabilityStatus"></div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success button" id="saveAvailabilityBtn">Guardar</button>
          <button type="button" class="btn btn-success button" id="AgendarBtn">Agendar</button>
          <button type="button" class="btn btn-success button" id="LiberarBtn">Cancelar cita</button>
          <button type="button" class="btn btn-success button" id="ReagendarBtn">Reagendar</button>
          <button type="button" class="btn btn-danger button" id="cancelAvailabilityBtn">Cancelar</button>
  </div>


  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>
  <script src="{{ asset('assets/js/calendar.js') }}"></script>
  <script src="{{ asset('assets/js/DoctorsList.js') }}"></script>
</body>
</html>
@endsection
