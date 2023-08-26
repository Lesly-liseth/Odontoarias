<!DOCTYPE html>
<html>
<head>
  <title>Página de Inicio</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/auth.css') }}?v=<?php echo(rand()); ?>">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/manners.css') }}?v=<?php echo(rand()); ?>">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/eye.css') }}?v=<?php echo(rand()); ?>">
</head>
<body>

  <div class="container">
    <div class="left-section">
      <img src="{{ asset('assets/img/auth/logo.jpg') }}" alt="Imagen Izquierda">
    </div>
    <div class="right-section">
      <div class="rectangle">
        <img src="{{ asset('assets/img/auth/usuario.png') }}" alt="Imagen de Usuario" class="user-image">
        <h1>{{ Auth::user() }}</h1>
        <form id="login-form" method="POST" action="/ingresar">
          @csrf
        <div class="form-group">

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Ingrese su email" required>
            <br><br>
            <label for="password">Contraseña:</label>
            <div class="input-group mb-3">
            <input type="password" id="password" name="password" class="form-control" placeholder="Ingrese su contraseña" required>
            <div class="input-group-append">
                <button type="button" id="toggle-password" class="btn btn-outline-secondary eye-btn">
                <i class="fas fa-eye" id="eye-icon"></i>
                </button>
            </div>
            </div>
            <a href="{{ route('recovery') }}" class="forgot-password">¿Has olvidado la contraseña?</a>
            <br>
            <a href="{{ route('registro') }}" class="register">Registrarse</a>
          </div>
          <br>
          <button type="submit" id='login-btn' class="btn-ingresar">Ingresar</button>
          <button type="button" id="cancel-btn" class="btn-cancelar">Regresar</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="{{ asset('assets/js/login.js') }}?v=<?php echo(rand()); ?>"></script>
  <script src="{{ asset('assets/js/tokenContext.js') }}?v=<?php echo(rand()); ?>"></script>
</body>
</html>
