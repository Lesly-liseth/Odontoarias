<!DOCTYPE html>
<html>
<head>
  <title>Registro de Usuario</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  <link rel="stylesheet" type="text/css" href="assets/css/auth.css">
  <link rel="stylesheet" type="text/css" href="assets/css/eye.css">
  <link rel="stylesheet" type="text/css" href="assets/css/manners.css">
  <meta name="csrf-token" content="<?php echo csrf_token();?>">
</head>
<body>

  <div class="containerRegistro">
    <div class="registration-section">
      <div class="registration-rectangle">
        <h2>Registro de Usuario</h2>
        <form id="registration-form" method="POST">
        <input type="hidden" name="_token" id="_token" value="<?php echo csrf_token();?>">

          <div class="form-group">
            <label for="names">Nombres:</label>
            <input type="text" id="names" name="names" placeholder="Ingrese sus nombres" required>
            <span id="names_error" class="error-message" style="display: none;"></span>
          </div>
          <div class="form-group">
            <label for="lastnames">Apellidos:</label>
            <input type="text" id="lastnames" name="lastnames" placeholder="Ingrese sus apellidos" required>
            <span id="lastnames_error" class="error-message" style="display: none;"></span>
          </div>
          <div class="form-group">
            <label for="id-number">Número de Cédula:</label>
            <input type="text" id="id-number" name="id-number" placeholder="Ingrese su número de cédula" required>
            <span id="idnumber_error" class="error-message" style="display: none;"></span>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Ingrese su email" required>
            <span id="email_error" class="error-message" style="display: none;"></span>
          </div>
          <div class="form-group">
            <label for="phone">Número de Teléfono:</label>
            <input type="tel" id="phone" name="phone" placeholder="Ingrese su número de teléfono" required>
            <span id="phone_error" class="error-message" style="display: none;"></span>
          </div>
          <div class="form-group">
            <label for="address">Dirección:</label>
            <input type="text" id="address" name="address" placeholder="Ingrese su dirección" required>
            <span id="address_error" class="error-message" style="display: none;"></span>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <div class="input-group mb-3">
              <input type="password" id="password" name="password" class="form-control" placeholder="Ingrese su contraseña" required>
              <div class="input-group-append">
                <button type="button" class="eye-btn" id="toggle-password">
                  <i class="far fa-eye" id="eye-icon"></i>
                </button>
              </div>
            </div>
            <span id="password_error" class="error-message"></span>
          </div>

          <div class="form-group">
            <label for="confirm-password">Confirmar Contraseña:</label>
            <div class="input-group mb-3">
              <input type="password" id="confirm_password" name="confirm-password" class="form-control" placeholder="Ingrese su contraseña" required>
              <div class="input-group-append">
                <button type="button" class="eye-btn" id="toggle-confirm-password">
                  <i class="far fa-eye" id="confirm-eye-icon"></i>
                </button>
              </div>
            </div>
            <span id="confirm_password_error" class="error-message"></span>
            <br>
            <a href="{{ route('login') }}" class="login">¿Ya estás registrado?</a>
            <br>
          </div>
          <button id="register-btn" type="submit" class="btn-registro">Guardar</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="assets/js/registro.js"></script>
  <script src="assets/js/eye.js"></script>
</body>
</html>
