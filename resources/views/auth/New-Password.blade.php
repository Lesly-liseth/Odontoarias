<!DOCTYPE html>
<html>
<head>
  <title>Recuperar Contraseña - Nueva Contraseña</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/auth.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/manners.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/eye.css') }}">
</head>
<body>
  <div class="container">
    <div class="rectangle-Rc">
      <img src="{{ asset('assets/img/auth/usuario.png') }}" alt="Logo" class="logo">
      <p class="message">Ingresa tu nueva contraseña:</p>
      <div class="input-group">
        <input type="password" id="new-password" placeholder="Nueva Contraseña" required>
        <div class="input-group-append">
          <button type="button" class="eye-btn" id="toggle-new-password">
            <i class="far fa-eye" id="eye-icon"></i>
          </button>
        </div>
      </div>
      <p class="message">Confirmar contraseña:</p>
      <div class="input-group">
        <input type="password" id="confirm-password" placeholder="Confirmar Contraseña" required>
        <div class="input-group-append">
          <button type="button" class="eye-btn" id="toggle-confirm-password">
            <i class="far fa-eye" id="confirm-eye-icon"></i>
          </button>
        </div>
      </div>
      <button id="save-button" class="NC-button">Guardar</button>
    </div>
  </div>

  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="{{ asset('assets/js/new-Password.js') }}"></script>
  <script src="{{ asset('assets/js/eye.js') }}"></script>
</body>
</html>
