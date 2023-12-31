@extends('topics.topic')

@section('contenido')
<!DOCTYPE html>
<html>
<head>
  <title>Mi Perfil</title>
  <link rel="stylesheet" type="text/css" href="assets/css/profile.css">
  <link rel="stylesheet" type="text/css" href="assets/css/load.css">
  <link rel="stylesheet" type="text/css" href="assets/css/eye.css">
  <link rel="stylesheet" type="text/css" href="assets/css/manners.css">
</head>
<body-profile>
<div class="overlay" id="overlay"></div>
<span>
<div class="loader" id="cargando"></div>
</span>
  <div class="container">
    <div class="profile-section">
      <h1>Mi Perfil</h1>
      <h2 id="rol1">Administrador</h2>
      <h2 id="rol2">Odontólogo</h2>
      <h2 id="rol3">Paciente</h2>

      <form id="profile-form">
        <div class="profile-picture">
            <img src="assets/img/auth/usuario.png" alt="Foto de Perfil" id="profile-image">
            <input type="file" accept="image/*" id="profile-upload">
            <br><br>
            <button id="subir-imagen-button" class="subir-imagen-button">Subir imagen</button>
        </div>
        <div class="form-group">
          <label for="names">Nombres:</label>
          <input type="text" id="names" placeholder="Ingrese su nombre">
          <span class="error-message" id="names-error" style="display: none;"></span>
        </div>
        <div class="form-group">
          <label for="lastnames">Apellidos:</label>
          <input type="text" id="lastnames" placeholder="Ingrese su apellido">
          <span class="error-message" id="lastnames-error" style="display: none;"></span>
        </div>
        <div class="form-group">
          <label for="idnumber">Número de Cédula:</label>
          <input type="text" id="idnumber" disabled>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Ingrese su correo electrónico">
          <span class="error-message" id="email-error" style="display: none;"></span>
        </div>
        <div class="form-group">
          <label for="phone">Número de Teléfono:</label>
          <input type="text" id="phone" placeholder="Ingrese su número de celular">
          <span class="error-message" id="phone-error" style="display: none;"></span>
        </div>
        <div class="form-group">
          <label for="address">Dirección:</label>
          <input type="text" id="address" placeholder="Ingrese su dirección">
          <span class="error-message" id="address-error" style="display: none;"></span>
        </div>
        <div class="form-group">
          <label for="description1" id="description1">Descripción:</label>
          <div class="control">
            <textarea class="textarea-description" id="description" placeholder="Ingrese su descripción"></textarea>
          </div>
        </div>

        <button id="guardar-button">Guardar</button>
      </form>
    </div>

    <!-- Nuevo contenedor con los campos de contraseña -->
    <div class="password-section">
      <h2>Actualizar contraseña</h2>
      <form id="password-form">
        <div class="form-group">
          <label for="password_current">Contraseña actual:</label>
          <div class="input-group mb-3">
            <input type="password" id="password_current" placeholder="Ingrese su contraseña actual">
            <div class="input-group-append">
              <button type="button" class="eye-btn" id="toggle-password-current">
                <i class="far fa-eye" id="eye-icon"></i>
              </button>
            </div>
          </div>
          <span class="error-message" id="password_current-error" style="display: none;"></span>
        </div>

        <div class="form-group">
          <label for="password">Contraseña nueva:</label>
          <div class="input-group mb-3">
            <input type="password" id="password" placeholder="Ingrese su contraseña nueva">
            <div class="input-group-append">
              <button type="button" class="eye-btn" id="toggle-password">
                <i class="far fa-eye" id="eye-icon"></i>
              </button>
            </div>
          </div>
          <span class="error-message" id="password-error" style="display: none;"></span>
        </div>
        <div class="form-group">
          <label for="confirm_password">Confirmar contraseña:</label>
          <div class="input-group mb-3">
            <input type="password" id="confirm_password" placeholder="Confirme su contraseña">
            <div class="input-group-append">
              <button type="button" class="eye-btn" id="toggle-confirm-password">
                <i class="far fa-eye" id="confirm-eye-icon"></i>
              </button>
            </div>
          </div>
          <span class="error-message" id="confirm_password-error" style="display: none;"></span>
        </div>

        <button id="guardar-contraseña">Guardar</button>
      </form>
    </div>

  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="assets/js/profile.js"></script>
  <script src="assets/js/update-password.js"></script>
  <script src="assets/js/eye.js"></script>
  <script src="assets/js/tokenContext.js"></script>
</body-profile>
</html>
@endsection
