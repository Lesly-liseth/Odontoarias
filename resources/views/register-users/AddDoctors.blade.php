@extends('topics.topic')

@section('contenido')
<html lang="us">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="assets/css/AddDoctors.css">
  <link rel="stylesheet" type="text/css" href="assets/css/load.css">
  <link rel="stylesheet" type="text/css" href="assets/css/eye.css">
  <link rel="stylesheet" type="text/css" href="assets/css/manners.css">
  <script src="https://kit.fontawesome.com/f8445650d3.js" crossorigin="anonymous"></script>
  <title>Registrar Odontologos</title>
</head>

<body>
    <div class="overlay" id="overlay"></div>
    <span>
      <div class="loader" id="cargando"></div>
    </span>
      <!-- ENCABEZADO -->
  <header>
    <h1 class="title">Registrar Odontólogos</h1>
  </header>

  <!-- MAIN -->
  <input type="hidden" name="_token" id="_token" value="<?php echo csrf_token();?>">
  <main class="main-content">
    <div class="crud-container">
      <h1 class="crud-title">Odontólogos Registrados</h1>
      <div class="search-bar">

        <input type="text" id="formulario" class="form-control my-2">
        <button class="btn btn-info mb-2 buscar-button" id="boton">Buscar</button>
      </div>
      <div class="crud-header">
        <button class="button is-success" id="openRegisterModal">
          <i class="fa-solid fa-plus"></i>
          <span>Nuevo Odontólogo</span>
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
            <th>Descripción</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody id="listaUsuarios">
        </tbody>
      </table>
    </div>

  </main>
  <!-- Agregar Nuevo odontologo -->
  <div class="modal" id="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Registrar Nuevo Odontólogo</p>
        <button class="delete" aria-label="close" id="cerrarRegisterModal"></button>
      </header>
      <section class="modal-card-body">
        <!-- Contenido del Formulario ... -->

        <form id="register-form">

            @csrf
            <div class="profile has-text-centered">
                <img src="assets/img/auth/user1.png" alt="Foto de Perfil" id="profile-image">
                <input type="file" name="image" accept="image/*" required>
                <br><br>
                <button id="subir-imagen-button" class="subir-imagen-button">Subir imagen</button>
            </div>

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
            <label class="label">Número de Cédula: </label>
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
            <label class="label">Número de Teléfono: </label>
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
            <label class="label">Descripción:</label>
            <div class="control">
              <textarea class="textarea-description" id="description" name="profesional_description" placeholder="Ingrese su descripción"></textarea>
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
            <label class="label">Confirmar Contraseña: </label>
            <div class="control">
              <input class="input" type="password" id="confirm_password" name="password_confirm" placeholder="Confirme su contraseña" required>
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
  <div id="editModal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar Odontólogo</p>
        <button class="delete" aria-label="close" id="cerrarEditModal"></button>
      </header>
      <section class="modal-card-body">
        <form id="edit-form">

          <div class="field">
            <label class="label">Nombres:</label>
            <div class="control">
              <input class="input" type="text" id="edit-names" required>
              <span id="edit-names_error" class="error-message" style="display: none;"></span>
            </div>
          </div>
          <div class="field">
            <label class="label">Apellidos:</label>
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
            <label class="label">Número de Teléfono:</label>
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

   <!-- Modal de Confirmación -->
   @include('components.ModalConfirmation')

   <!-- Modal de advertencia -->
   @include('components.modalWarning')

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

  <script src="assets/js/AddDoctors.js"></script>
  <script src="assets/js/eye.js"></script>
  <script src="assets/js/tokenContext.js"></script>

</body>
</html>
@endsection
