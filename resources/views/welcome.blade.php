
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Arsha Bootstrap Template - Index</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="{{asset('assets/img/favicon.png') }}" rel="icon">
  <link href="{{asset('assets/img/apple-touch-icon.png') }}" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="{{asset('assets/vendor/aos/aos.css') }}"  rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
  <link href="{{asset('assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
  <link href="{{asset('assets/vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet">
  <link href="{{asset('assets/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet">
  <link href="{{asset('assets/vendor/remixicon/remixicon.css') }}" rel="stylesheet">
  <link href="{{asset('assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{asset('assets/css/style.css') }}" rel="stylesheet">

  <!-- =======================================================
  * Template Name: Arsha
  * Updated: Mar 10 2023 with Bootstrap v5.2.3
  * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top ">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto"><a href="index.html">OdontoArias</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li><a class="nav-link scrollto active" href="#hero">Inicio</a></li>
          <li><a class="nav-link scrollto" href="#cta">Horario de Atencion</a></li>
          <li><a class="nav-link scrollto" href="#team">Odontologos</a></li>
          </li>
          <li><a class="nav-link scrollto" href="#contact">Contáctanos</a></li>
          <li><a class="getstarted scrollto" href="{{ route('login') }}">Ingresar</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h1>Cuida De Tus Dientes Somos Expertos En Sonrisas</h1>
          <h2>Somos un equipo de Odontológos buscamos mejorar tu salud oral.</h2>
          <div class="d-flex justify-content-center justify-content-lg-start">
            <a href="{{ route('login') }}" class="btn-get-started scrollto">Ingresar</a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
          <img src="assets/img/principal.jpg" class="img-fluid animated" alt="">
        </div>
      </div>
    </div>

  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= Cta Section ======= -->

    <section id="cta" class="cta">
        <div class="container d-flex align-items-center justify-content-center" data-aos="zoom-in">
          <div class="row">
            <div class="col-lg-9 d-flex flex-column align-items-center text-center">
              <h3 class="mb-4 d-inline-block">Horario de atención</h3><br>
              <p class="mb-0">Lunes a viernes 9:00 a.m - 7:30 p.m</p>
              <p class="mb-0">Sábado 9:00 a.m - 7:00 p.m</p>
              <p class="mb-0">Domingo 10:00 a.m - 2:00 p.m</p>
            </div>
          </div>
        </div>
      </section>
      <!-- End Cta Section -->



      <!-- ======= Team Section ======= -->
      <section id="team" class="team section-bg">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Odontológos</h2>
            <p>¡Sonríe con confianza! Nuestros odontólogos altamente capacitados ofrecen atención personalizada, utilizando las últimas técnicas y tecnologías para brindarte una sonrisa saludable y radiante. Descubre el confort y la excelencia en cada visita, junto con un enfoque cálido y amigable hacia tu bienestar bucal.</p>
          </div>
          <div class="row" id="team-members">
            <!-- Aquí se llenarán los odontólogos dinámicamente -->
          </div>
        </div>
      </section>
      <!-- End Team Section -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Contáctanos</h2>
          <p>¡Contáctanos para una atención personalizada y soluciones de cuidado bucal excepcionales! Estamos aquí para responder a tus preguntas, agendar citas y ayudarte en tus necesidades dentales. No dudes en comunicarte con nosotros y dar el primer paso hacia una sonrisa saludable y radiante. Tu bienestar bucodental es nuestra prioridad. </p>
        </div>
        <div class="row">
          <div class="col-lg-7">
            <div class="info">
              <div class="address">
                <i class="bi bi-geo-alt"></i>
                <h4>Ubicación:</h4>
                <p>Villaflora. Juan de Arguello Oe1-133 y Pedro Alfaro</p>
              </div>
              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>lichi1492@hotmail.es</p>
              </div>
              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>Teléfono:</h4>
                <p>098 416 4124</p>
              </div>
            </div>
        </div>

        <div class="col-lg-5">
          <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.358123731577!2d-78.521857!3d-0.243688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59909ec52dd65%3A0x134c59da84ea8bae!2sOdonto%20Arias!5e0!3m2!1sen!2sus!4v1630207261707!5m2!1sen!2sus" frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </section><!-- End Contact Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">

    <div class="container footer-bottom clearfix">
      <div class="copyright">
        &copy; Copyright <strong><span>Arsha</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/ -->
        Desarrollado por Lesly Herrera</a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
  <script src="assets/js/team.js'"></script>


</body>

</html>
