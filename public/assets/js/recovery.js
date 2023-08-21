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

  // Función para validar el formato de correo electrónico
  function validateEmail(email) {
    // Expresión regular para validar el formato de correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  document.getElementById("send-button").addEventListener("click", async function() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value;

    // Validar el campo de correo electrónico
    if (!validateEmail(email)) {
      showWarningModal("Por favor, ingrese un correo electrónico válido.");
      emailInput.focus();
      return;
    }

    // Objeto de datos a enviar en la solicitud POST
    const data = {
      email: email
    };

    try {
      // Enviar la solicitud POST a la API utilizando fetch
      const response = await fetch("https://endpointsco-production.up.railway.app/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        // Mostrar mensaje de éxito o manejar cualquier otra respuesta
        showWarningModal("Revise su correo, le hemos enviado un código de recuperación.");

        // Redirigir a la página de código después de 2 segundos
        setTimeout(() => {
          window.location.href = '/code';
        }, 2000);
      } else {
        // Mostrar mensaje de error o manejar cualquier otro error
        const errorMessage = responseData.message || "El correo no está registrado";
        showWarningModal(`Error: ${errorMessage}`);
        console.log(response);
        console.log(responseData);
      }
    } catch (error) {
      // Mostrar mensaje de error o manejar cualquier otro error
      console.error("Error al enviar el correo:", error);
    }
  });

  document.getElementById("cancel-button").addEventListener("click", function() {
    // Redirigir a la página de inicio de sesión
    window.location.href = "/ingresar";
  });
