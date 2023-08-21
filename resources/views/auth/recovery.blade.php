<!DOCTYPE html>
<html>
<head>
  <title>Recuperar Contraseña</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/auth.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/manners.css') }}">
</head>
<body>
  <div class="container">
    <div class="rectangle-Rc">
      <img src="{{ asset('assets/img/auth/usuario.png') }}" alt="Logo" class="logo">
      <p class="message">Ingrese su correo registrado</p>
      <input type="email" id="email" name="email" placeholder="Ingrese su correo">
      <br><br>
      <button id="send-button" class="blue-button">Enviar</button>
      <button id="cancel-button" class="blue-cancelar">Cancelar</button>
    </div>
  </div>


  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="{{ asset('assets/js/recovery.js') }}"></script>
</body>
</html>
