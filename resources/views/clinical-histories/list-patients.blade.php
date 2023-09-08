@extends('topics.topic')
@section('contenido')
<link rel="stylesheet" href="assets/css/listPatients.css">
{{--  <link rel="stylesheet" type="text/css" href="assets/css/load.css">  --}}

<body>
    <div class="overlay" id="overlay"></div>
    <span>
      <div class="loader" id="cargando"></div>
    </span>
  <!-- ENCABEZADO -->
<header>
    <h1 class="title">Pacientes</h1>
  </header>

<div class="container">

  <!-- Barra de búsqueda -->
  <div class="search-bar">
    <input type="text" id="search-input" placeholder="Buscar por cédula">
    <button id="search-button">Buscar</button>
  </div>

  <!-- Tabla de pacientes -->
  <table class="table">
    <thead>
      <tr>
        <th>Cédula</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="patients-table-body"></tbody>
  </table>
</div>

<script src="assets/js/listPatients.js"></script>
</body>
@endsection
