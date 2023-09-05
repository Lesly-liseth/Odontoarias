document.getElementById('cancel-btn').addEventListener('click', function () {
    // Redireccionar a la página '/'
    window.location.href = '/';
  });

  //funcion para mostrar y ocultar contraseña
  document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    let showPassword = false;

    togglePasswordBtn.addEventListener('click', function () {
      showPassword = !showPassword;

      if (showPassword) {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
      }
    });
  });

      // Función para mostrar el modal de advertencia con un mensaje específico
      function showWarningModal(message) {
        const warningModal = document.getElementById("warning");
        const warningMessage = document.getElementById("warning-message");
        warningMessage.textContent = message;
        warningModal.style.display = "block";

        // Configurar un temporizador para cerrar el modal después de 2 segundos
        setTimeout(() => {
        hideWarningModal();
        }, 2000);
    }

    // Función para ocultar el modal de advertencia
    function hideWarningModal() {
        const warningModal = document.getElementById("warning");
        warningModal.style.display = "none";
    }

  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const warningModal = document.getElementById('warning');
    const warningMessage = document.getElementById('warning-message');

    //verifica si existe un token para redirigir a la ventana de del dashboard
    const token = localStorage.getItem('token');
    if (token!=null) {
      return window.location.href = '/dashboard';
    }
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const data = {
        email: email,
        password: password
      };

      let response;

      try {
        response = await fetch('https://endpointsco-production.up.railway.app/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        console.log(response);

        if (response.ok) {

          const responseData = await response.json(); // Obtener el contenido JSON de la respuesta
          const token = await responseData.token;
          console.log('Inicio de sesión exitoso');
          localStorage.setItem('token', token);
          sessionStorage.setItem('token', token);
          //console.warn(sessionStorage);
        //   console.log("token", token );

        //obtner perfil usuario

      try {
        //verificacion de premisos de usuario
        const permisosRol =  await fetch(`https://endpointsco-production.up.railway.app/api/get-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        });

        if (permisosRol.ok) {
        const responseData = await permisosRol.json();
        const valorIdRol = responseData.rol_id

        localStorage.setItem('idRol', valorIdRol);
        sessionStorage.setItem('idRol', valorIdRol);

        localStorage.setItem('identity_card_user', responseData.identity_card_user);
        sessionStorage.setItem('identity_card_user', responseData.identity_card_user);
        } else {
            showWarningModal("Error al obtener el rol");
        }
        } catch (error) {
            showWarningModal("Error en la solicitud");
        console.error('Error en la solicitud:', error);
        }

          // Mostrar el modal de advertencia con el mensaje de éxito
          warningMessage.textContent = 'Inicio de sesión exitoso.';
          warningModal.style.display = 'block';

          // Cerrar el modal después de dos segundos
          setTimeout(function() {
            warningModal.style.display = 'none';
          }, 2000);

          // Redireccionar al dashboard después de mostrar el mensaje
          setTimeout(function() {
            window.location.href = '/profile';
          }, 2000);


        } else {
          const responseData = await response.json();
          const errorMessage = responseData.message;

          console.log(`Error en el login: ${errorMessage}`);

          // Mostrar el modal de advertencia con el mensaje de error
          warningMessage.textContent = 'Contraseña o correo electrónico incorrectos. Por favor, verifique sus credenciales.';
          warningModal.style.display = 'block';

          // Cerrar el modal después de dos segundos
          setTimeout(function() {
            warningModal.style.display = 'none';
          }, 2000); //2 segundos

          console.log(response);
          console.log(responseData);
        }
      } catch (error) {
        console.log('Error en la solicitud');
        console.error(error);

        // Mostrar el modal de advertencia con el mensaje de error en la solicitud
        warningMessage.textContent = 'Error en la solicitud. Por favor, inténtelo de nuevo más tarde.';
        warningModal.style.display = 'block';

        // Cerrar el modal después de dos segundos
        setTimeout(function() {
          warningModal.style.display = 'none';
        }, 2000); //2 segundos

        console.log(response);
      }
    });
  });
