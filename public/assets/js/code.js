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

  document.getElementById("submit-button").addEventListener("click", async function() {
    const code = document.getElementById("code").value;

    // Objeto de datos a enviar en la solicitud POST
    const data = {
      code: code
    };

    try {
      // Enviar la solicitud POST a la API para verificar el código
      const response = await fetch("https://endpointsco-production.up.railway.app/api/check-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        localStorage.setItem('code', code);
        console.log('codigo', code);

        // Mostrar mensaje de éxito en el modal
        showWarningModal("El código ingresado es correcto");

        // Redirigir a la página de contraseña nueva si el código es válido después de 2 segundos
        setTimeout(() => {
          window.location.href = '/New-Password';
        }, 2000);
      } else {
        // Mostrar mensaje de error en el modal
        showWarningModal("El código ingresado no es válido. Por favor, verifique.");
        console.log(response);
      }
    } catch (error) {
      // Mostrar mensaje de error en el modal o manejar cualquier otro error
      showWarningModal("/ingresar:" + error);
      console.error("/ingresar:", error);
    }
  });

  document.getElementById("cancel-button").addEventListener("click", function() {
    // Redirigir a la página de inicio de sesión
    window.location.href = 'login.blade.php';
  });
