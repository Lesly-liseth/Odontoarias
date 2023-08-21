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

      // Función para validar la contraseña
      function validatePassword(password) {
        // Expresión regular para validar la contraseña
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
      }

      // Evento click del botón "save-button"
      document.getElementById("save-button").addEventListener("click", async function() {
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const code = localStorage.getItem('code');
        console.log('code', code);

        if (newPassword !== confirmPassword) {
          // Mostrar mensaje de error en el modal
          showWarningModal("Las contraseñas no coinciden. Por favor, inténtalo nuevamente.");
          return;
        }

        // Validar la contraseña utilizando la función validatePassword
        if (!validatePassword(newPassword)) {
          // Mostrar mensaje de error en el modal si la contraseña no cumple con los requisitos
          showWarningModal("La contraseña debe contener al menos una mayúscula, una minúscula, un número, un carácter especial y tener al menos 8 caracteres.");
          return;
        }

        // Objeto de datos a enviar en la solicitud POST
        const data = {
          code: code,
          password: newPassword,
          password_confirm: confirmPassword
        };

        try {
          // Enviar la solicitud POST a la API para restablecer la contraseña
          const response = await fetch("https://endpointsco-production.up.railway.app/api/reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            // Mostrar mensaje de éxito en el modal
            showWarningModal("Contraseña restablecida con éxito. Por favor, inicia sesión con tu nueva contraseña.");
            // Redirigir al usuario a la página de inicio de sesión si la contraseña se restableció correctamente después de 2 segundos
            setTimeout(() => {
              window.location.href = '/ingresar';
            }, 2000);
          } else {
            // Mostrar mensaje de error en el modal
            showWarningModal("Hubo un error al restablecer la contraseña. Por favor, inténtalo nuevamente.");
            console.log(response);
          }
        } catch (error) {
          // Mostrar mensaje de error en el modal o manejar cualquier otro error
          showWarningModal("Error al restablecer la contraseña: " + error.toString());
          console.error("Error al restablecer la contraseña:", error);
        }
      });

      document.getElementById("cancel-button").addEventListener("click", function() {
        // Redirigir a la página de inicio de sesión
        window.location.href = 'login.blade.php';
      });
