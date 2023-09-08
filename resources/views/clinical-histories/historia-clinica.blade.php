@extends('topics.topic')
@section('contenido')


<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Odontograma</title>
  <link rel="stylesheet" href="assets/css/HistoriasClinicas.css">
  <link rel="stylesheet" type="text/css" href="assets/css/load.css">
  <script src="https://kit.fontawesome.com/f8445650d3.js" crossorigin="anonymous"></script>

</head>

<body>
    <div class="overlay" id="overlay"></div>
    <span>
      <div class="loader" id="cargando"></div>
    </span>
  <header>
    <h1 class="title">Historia Clinica</h1>
  </header>

  <div class="container">
    <div class="rectangulo">

      <div id="informacion-paciente" class="information">
        <label for="id">Número de historia clínica:</label>
        <input type="text" id="id" readonly/>

        <label for="id-number">Cedúla:</label>
        <input type="text" id="id-number" name="identity_card_user" readonly/>

        <label for="names">Nombres:</label>
        <input type="text" id="names" readonly/>

        <label for="background">Antecedentes Personales y Familiares:</label>
        <input type="text" id="background" />
        <div class="input-group">
        <button type="button" id="guardarAntecedentes" class="btn-guardar">Guardar</button>
        </div>
      </div>

      {{--  <div class="crud-header">
        <button id="openNewServiceModal">Nuevo Servicio</button>
    </div>  --}}
    <div id="contenedor"></div>

          {{-- odontograma --}}
          <h2>Odontograma</h2>
    <div class="fila">
      <div class="cuadrado" id="19" data-number="19">19</div>
      <div class="cuadrado" id="17" data-number="17">17</div>
      <div class="cuadrado" id="16" data-number="16">16</div>
      <div class="cuadrado" id="15" data-number="15">15</div>
      <div class="cuadrado" id="14" data-number="14">14</div>
      <div class="cuadrado" id="13" data-number="13">13</div>
      <div class="cuadrado" id="12" data-number="12">12</div>
      <div class="cuadrado" id="11" data-number="11">11</div>
      <div class="cuadrado" id="21" data-number="21">21</div>
      <div class="cuadrado" id="22" data-number="22">22</div>
      <div class="cuadrado" id="23" data-number="23">23</div>
      <div class="cuadrado" id="24" data-number="24">24</div>
      <div class="cuadrado" id="25" data-number="25">25</div>
      <div class="cuadrado" id="26" data-number="26">26</div>
      <div class="cuadrado" id="27" data-number="27">27</div>
      <div class="cuadrado" id="28" data-number="28">28</div>
    </div>
    <div class="espacio"></div>
    <div class="fila">
      <div class="cuadrado" id="48" data-number="48">48</div>
      <div class="cuadrado" id="47" data-number="47">47</div>
      <div class="cuadrado" id="46" data-number="46">46</div>
      <div class="cuadrado" id="45" data-number="45">45</div>
      <div class="cuadrado" id="44" data-number="44">44</div>
      <div class="cuadrado" id="43" data-number="43">43</div>
      <div class="cuadrado" id="42" data-number="42">42</div>
      <div class="cuadrado" id="41" data-number="41">41</div>
      <div class="cuadrado" id="31" data-number="31">31</div>
      <div class="cuadrado" id="32" data-number="32">32</div>
      <div class="cuadrado" id="33" data-number="33">33</div>
      <div class="cuadrado" id="34" data-number="34">34</div>
      <div class="cuadrado" id="35" data-number="35">35</div>
      <div class="cuadrado" id="36" data-number="36">36</div>
      <div class="cuadrado" id="37" data-number="37">37</div>
      <div class="cuadrado" id="38" data-number="38">38</div>
    </div>
  <div class="espacio2"></div>
    <div class="fila">
      <div class="cuadrado" data-number="55">55</div>
      <div class="cuadrado" id="54" data-number="54">54</div>
      <div class="cuadrado" id="53" data-number="53">53</div>
      <div class="cuadrado" id="52" data-number="52">52</div>
      <div class="cuadrado" id="51" data-number="51">51</div>
      <div class="cuadrado" id="61" data-number="61">61</div>
      <div class="cuadrado" id="62" data-number="62">62</div>
      <div class="cuadrado" id="63" data-number="63">63</div>
      <div class="cuadrado" id="64" data-number="64">64</div>
      <div class="cuadrado" id="65" data-number="65">65</div>
    </div>
    <div class="espacio"></div>
    <div class="fila">
      <div class="cuadrado" id="85" data-number="85">85</div>
      <div class="cuadrado" id="84" data-number="84">84</div>
      <div class="cuadrado" id="83" data-number="83">83</div>
      <div class="cuadrado" id="82" data-number="82">82</div>
      <div class="cuadrado" id="81" data-number="81">81</div>
      <div class="cuadrado" id="71" data-number="71">71</div>
      <div class="cuadrado" id="72" data-number="72">72</div>
      <div class="cuadrado" id="73" data-number="73">73</div>
      <div class="cuadrado" id="74" data-number="74">74</div>
      <div class="cuadrado" id="75" data-number="75">75</div>
    </div>
    <div class="espacio"></div>
    <div class="fila">
        <div class="cuadrado" id="100" data-number="100" style="background-color: blue; width: 150px;">Nuevo Servicio</div>
    </div>

<table id="tabla-diagnosticos" class="table">
    <thead>
    <tr>
        <th>Fecha</th>
        <th>Pieza</th>
        <th>Servicio</th>
        <th>Diagnostico</th>
    </tr>
    </thead>
    <tbody id="citas">
    </tbody>
</table>

{{--  <!-- Modal para la creacion de una nuevo servicio-->
<div class="modal-servicios" id="nuevoServicioModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Nuevo Servicio</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" onclick="nuevoServicioModal.classList.remove('is-active');"></button>
      </div>
      <div class="modal-body">
        <form id="formulario_historia">
          <div class="mb-3">
            <label for="servicio" class="form-label">Servicio</label>
            <select id="servicioSelect1"></select>
          </div>
          <div class="mb-3">
            <label for="diagnosis1" class="form-label">Diagnotico</label>
            <input type="text" class="diagnosis1" id="diagnosis1">
          </div>
          <button type="button" class="btn btn-primary" id="obtenerDatosNuevaHistoria" onclick="guardarServicio();">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</div>  --}}

  <!-- modal -->
  {{--  <div class="overlay" id="overlay"></div>  --}}
  <div class="modal-dientes" id="modal">
    <div class="modal-background">
      <div class="modal-card">
        <div class="modal-card-head">
      <header>
        <p class="modal-card-title">Detalles</p>
        <button id="cerrarModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </header>
      <section class="modal-card-body">
        <form id="edit-form">
          <div class="modal-item">
            <div class="modal-color" style="background-color: red;"></div>
            <span class="modal-label">Lado superior</span>
          </div>
          <div class="modal-item">
            <div class="modal-color" style="background-color: blue;"></div>
            <span class="modal-label">Lado inferior</span>
          </div>
          <div class="modal-item">
            <div class="modal-color" style="background-color: green;"></div>
            <span class="modal-label">Lado derecho</span>
          </div>
          <div class="modal-item">
            <div class="modal-color" style="background-color: yellow;"></div>
            <span class="modal-label">Lado izquierdo</span>
          </div>
          <div class="modal-item">
            <div class="modal-color" style="background-color: orange;"></div>
            <span class="modal-label">Parte central</span>
          </div>
          <div class="modal-item">
            <div class="modal-color" style="background-color: purple;"></div>
            <span class="modal-label">Completo</span>
          </div>
          <div class="modal-columns">
                <div class="mb-3">
                  <label for="pieza" class="form-label">Pieza</label>
                  <input type="text" id="pieza" disabled>
                </div>
              <div class="mb-3">
                <label for="servicio" class="form-label">Servicio</label>
                <select id="servicioSelect" required></select>
            </div>
              <div class="mb-3">
                <label for="dgn" class="form-label">Diagnostico </label>
                <input class="input" type="text" id="dgn" placeholder="Ingrese el diagnostico" required>
            </div>
          </div>
        </form>
      </section>
          <footer class="modal-card-foot">
            <button class="button is-success" id="aceptarButton">Guardar</button>
          </footer>
    </div>
  </div>

  <!-- <script src="HistoriasClinicas.js"></script> -->
  <script src="assets/js/HistoriasClinicas.js"></script>
</body>

</html>
@endsection
