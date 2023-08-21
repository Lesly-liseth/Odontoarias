@extends('topics.topic')

@section('contenido')
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{{ asset('assets/css/services.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/manners.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/load.css') }}">
  <script src="https://kit.fontawesome.com/f8445650d3.js" crossorigin="anonymous"></script>
  <title>Servicios</title>
</head>

<body>
    <div class="overlay" id="overlay"></div>
    <span>
      <div class="loader" id="cargando"></div>
    </span>
  <!-- ENCABEZADO -->
  <header>
    <h1 class="title">Registrar Servicios</h1>
  </header>

  <!-- MAIN -->
  <main class="main-content">
    <div class="crud-container">
      <h1 class="crud-title">Servicios</h1>
      <div class="crud-header">
        <button class="button is-success" id="openRegisterModal">
          <i class="fa-solid fa-plus"></i>
          <span>Nuevo Servicio</span>
        </button>
      </div>
      <table class="table" id="tablaServicios">
        <thead>
          <tr>
            <th>#</th>
            <th>Servicio</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody id="listaServicios">
        </tbody>
      </table>
    </div>


  </main>
  <!-- Agregar Nuevo Servicio -->
  <div class="modal" id="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Registrar Nuevo Servicio</p>
        <button class="delete" aria-label="close" id="cerrarRegisterModal"></button>
      </header>
      <section class="modal-card-body">
        <!-- Contenido del Formulario ... -->
        <form id="register-form">
        <input type="hidden" name="_token" id="_token" value="<?php echo csrf_token();?>">
          <div class="field">
            <label class="label">Servicio: </label>
            <div class="control">
              <input class="input" type="text" id="service" placeholder="Ingreseel servicio" required>
              <span id="service_error" class="error-message" style="display: none;"></span>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
                <button type="submit" class="button is-link button" id="register-button">Registrar</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>

  <!-- Modal de Edición -->
  <div id="editModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar servicio</p>
        <button class="delete" aria-label="close" id="cerrarEditModal"></button>
      </header>
      <section class="modal-card-body">
        <form id="edit-form">
          <div class="field">
            <label class="label">Servicio:</label>
            <div class="control">
              <input class="input" type="text" id="edit-service" required>
              <span id="edit-service-error" class="error-message" style="display: none;"></span>
            </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" id="guardarCambios">Guardar Cambios</button>
        <button class="button is-link is-light" id="cancelarEditModal">Cancelar</button>
      </footer>
    </div>
  </div>

  <!-- Modal de Confirmación -->
  <div class="modal" id="confirmation-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirmación</p>
        <button class="delete" aria-label="close" id="cerrarModaledit"></button>
      </header>
      <section class="modal-card-body">
        <p id="confirmation-message"></p>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" id="confirm-yes">Sí</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" id="confirm-no">No</button>
          </div>
        </div>
      </section>
    </div>
  </div>


    <!-- Modal de exito -->
    <div class="modal" id="confirmation">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="box">
        <h3 class="title is-4 has-text-success">Éxito</h3>
        <p id="success-message" style="display: none;"></p>
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <!-- Modal de advertencia -->
    @include('components.modalWarning')

  <script src="{{ asset('assets/js/services.js') }}"></script>
  <script src="{{ asset('assets/js/tokenContext.js') }}"></script>
</body>
</html>

@endsection
