<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />

        <title>Dashboard</title>

        <link href="assets/css/stylesAdm.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        <link href="assets/css/main.css" rel="stylesheet" />
        <script src="assets/js/main-min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
        <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.4/index.global.min.js'></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.4/axios.min.js" integrity="sha512-LUKzDoJKOLqnxGWWIBM4lzRBlxcva2ZTztO8bTcWPmDSpkErWx0bSP4pdsjNH8kiHAUPaT06UXcb+vOEZH+HpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="assets/js/logout.js"></script>

        <link rel="stylesheet" type="text/css" href="assets/css/manners.css">
    </head>
    <body class="sb-nav-fixed">
        <nav class="sb-topnav navbar navbar-expand navbar-dark" style="background-color:  #000000;">
            <!-- Navbar Brand-->
            <a class="navbar-brand ps-3">OdontoArias</a>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="AddPatients">Pagina Principal</a></li>
                        <li><a class="dropdown-item" href="profile">Perfil</a></li>
                        <li><hr class="dropdown-divider"  /></li>
                        <li><a class="dropdown-item" href="#" id="logout-link">Cerrar sesión</a></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <!-- Menu larteral -->
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" style="background-color: #000000;">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Modulos</div>
                            <a class="nav-link" href="dashboard" id="m_dashboard" style="display: none">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-calendar-days"></i></div>
                                Citas Medicas
                            </a>
                            <a class="nav-link" href="ListPatients" id="m_ListPatients" style="display: none">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-calendar-minus"></i></div>
                                Historias Clínicas
                            </a>
                            <a class="nav-link" href="clinic-history" id="m_clinicHistory" style="display: none">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-calendar-minus"></i></div>
                                Historia Clínica
                            </a>
                            <a class="nav-link" href="AddPatients" id="registerPatientsLink" style="display: none">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-user-plus"></i></div>
                                Registrar Pacientes
                            </a>
                            <a class="nav-link" id="registerDoctorsLink" style="display: none">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-user-plus"></i></div>
                                Registrar Odontólogos
                            </a>
                            <a class="nav-link" href="Services" id="registerServicesLink" style="display: none">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-briefcase-medical"></i></div>
                                Registrar Servicios
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <!-- contenido -->
                        @yield('contenido')
                    </div>
                </main>
            </div>
        </div>


    <!-- Modal de advertencia -->
    @include('components.modalWarning')

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="assets/js/tokenContext.js"></script>
        <script src="assets/js/scriptsPanel.js"></script>
    </body>
</html>
