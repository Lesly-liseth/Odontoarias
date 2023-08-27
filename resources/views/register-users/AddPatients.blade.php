@extends('topics.topic')

@section('contenido')
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="assets/css/AddDoctors.css">
  <link rel="stylesheet" type="text/css" href="assets/css/load.css">
  <link rel="stylesheet" type="text/css" href="assets/css/eye.css">
  <link rel="stylesheet" type="text/css" href="assets/css/manners.css">
  <script src="https://kit.fontawesome.com/f8445650d3.js" crossorigin="anonymous"></script>
  <title>Registrar Pacientes</title>
</head>

<body>
    <div class="overlay" id="overlay"></div>
    <span>
      <div class="loader" id="cargando"></div>
    </span>
  <!-- ENCABEZADO -->
  <header>
    <h1 class="title">Registrar Pacientes</h1>
  </header>

  <!-- MAIN -->
  <main class="main-content">
    <div class="crud-container">
      <h1 class="crud-title">Pacientes Registrados</h1>
      <div class="search-bar">
        <input type="text" id="formulario" class="form-control my-2">
        <button class="btn btn-info mb-2 buscar-button" id="boton">Buscar</button>
      </div>
      <div class="crud-header">
        <button class="button is-success" id="openRegisterModal">
          <i class="fa-solid fa-plus"></i>
          <span>Nuevo Paciente</span>
        </button>
      </div>
      <table class="table" id="tablaUsuarios">
        <thead>
          <tr>
            <th>#</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody id="listaUsuarios">
        </tbody>
      </table>
    </div>

  </main>
  <!-- Agregar Nuevo paciente -->
  <div class="modal" id="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Registrar Nuevo Paciente</p>
        <button class="delete" aria-label="close" id="cerrarRegisterModal"></button>
      </header>
      <section class="modal-card-body">
        <!-- Contenido del Formulario ... -->

        <form id="register-form">
            <input type="hidden" name="_token" id="_token" value="<?php echo csrf_token();?>">

          <div class="field">
            <label class="label">Nombres: </label>
            <div class="control">
              <input class="input" type="text" id="names" name="names" placeholder="Ingrese sus nombres" required>
              <span id="names_error" class="error-message" style="display: none;"></span>
            </div>
          </div>

          <div class="field">
            <label class="label">Apellidos: </label>
            <div class="control">
              <input class="input" type="text" id="lastnames" name="surnames" placeholder="Ingrese sus apellidos" required>
              <span id="lastnames_error" class="error-message" style="display: none;"></span>
            </div>
          </div>

          <div class="field">
            <label class="label">Cédula: </label>
            <div class="control">
              <input class="input" type="text" id="idnumber" name="identity_card_user" placeholder="Ingrese su número de cédula" required>
              <span id="idnumber_error" class="error-message" style="display: none;"></span>
            </div>
          </div>

          <div class="field">
            <label class="label">Email: </label>
            <div class="control">
              <input class="input" type="text" id="email" name="email" placeholder="Ingrese su email" required>
              <span id="email_error" class="error-message" style="display: none;"></span>
            </div>
          </div>

          <div class="field">
            <label class="label">Teléfono: </label>
            <div class="control">
              <input class="input" type="text" id="phone" name="phone" placeholder="Ingrese su número de teléfono" >
              <span id="phone_error" class="error-message" style="display: none;"></span>
            </div>
          </div>

          <div class="field">
            <label class="label">Dirección: </label>
            <div class="control">
              <input class="input" type="text" id="address" name="address" placeholder="Ingrese su dirección">
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña: </label>
            <div class="control">
              <input class="input" type="password" id="password" name="password" placeholder="Ingrese su contraseña" required>
              <div class="input-group-append">
                <button type="button" class="eye-btn" id="toggle-password">
                  <i class="far fa-eye" id="eye-icon"></i>
                </button>
              </div>
            </div>
            <span id="password_error" class="error-message"></span>
          </div>

          <div class="field">
            <label class="label" for="confirm_password">Confirmar Contraseña: </label>
            <div class="control">
              <input type="password" id="confirm_password" name="confirm_password" class="input" placeholder="Ingrese su contraseña" required>
              <div class="input-group-append">
                <button type="button" class="eye-btn" id="toggle-confirm-password">
                  <i class="far fa-eye" id="confirm-eye-icon"></i>
                </button>
              </div>
            </div>
            <span id="confirm_password_error" class="error-message"></span>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button type="submit" class="button is-link" id="register-button">Registrar</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>

    <!-- Modal de Edición -->
    <div id="editModal" class="modal" style="height: auto;">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar Paciente</p>
        <button class="delete" aria-label="close" id="cerrarEditModal"></button>
      </header>
      <section class="modal-card-body">
        <form id="edit-form">
          <div class="field">
            <label class="label">Nombre:</label>
            <div class="control">
              <input class="input" type="text" id="edit-names" required>
              <span id="edit-names_error" class="error-message" style="display: none;"></span>
            </div>
          </div>
          <div class="field">
            <label class="label">Apellido:</label>
            <div class="control">
              <input class="input" type="text" id="edit-lastnames" required>
              <span id="edit-lastnames_error" class="error-message" style="display: none;"></span>
            </div>
          </div>
          <div class="field">
            <label class="label">Email:</label>
            <div class="control">
              <input class="input" type="email" id="edit-email" required>
              <span id="edit-email_error" class="error-message" style="display: none;"></span>
            </div>
          </div>
          <div class="field">
            <label class="label">Teléfono:</label>
            <div class="control">
              <input class="input" type="text" id="edit-phone" required>
              <span id="edit-phone_error" class="error-message" style="display: none;"></span>
            </div>
          </div>
          <div class="field">
            <label class="label">Dirección:</label>
            <div class="control">
              <input class="input" type="text" id="edit-address" required>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" id="guardarCambios">Guardar Cambios</button>
        <button class="button is-link is-light" id="cancelarEditModal">Cancelar</button>
      </footer>
    </div>
  </div>

  <!-- Modal de confirmacion -->
  @include('components.ModalConfirmation')

  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="assets/js/AddPatients.js"></script>
  <script src="assets/js/eye.js"></script>
  <script src="assets/js/tokenContext.js"></script>
</body>
</html>

@endsection
