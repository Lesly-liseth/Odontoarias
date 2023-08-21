<!DOCTYPE html>
<html>
<head>
  <title>Recuperar Contraseña - Código</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/auth.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/manners.css') }}">

</head>
<body>
  <div class="container">
    <div class="rectangle-Rc">
      <img src="{{ asset('assets/img/auth/usuario.png') }}" alt="Logo" class="logo">
      <p class="message">Ingresa el codigo enviado al correo electrónico.</p>
      <input type="text" id="code" placeholder="Ingrese el código">
      <a href="/recovery" class="resend-link">¿No has recibido el código?</a>
      <button id="submit-button" class="blue-button">Enviar</button>
      <button id="cancel-button" class="blue-cancelar">Cancelar</button>
    </div>
  </div>

  <!-- Modal de advertencia -->
  @include('components.modalWarning')

  <script src="{{ asset('assets/js/code.js') }}"></script>
</body>
</html>
