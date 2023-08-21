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
    // Escuchar el evento de clic en el enlace de "Cerrar sesión"
    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', cerrarSesion);

    async function cerrarSesion(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

        try {
            // Asegúrate de que el token tenga el valor correcto antes de hacer la solicitud
            const token = localStorage.getItem('token');
            const response = await fetch('https://endpointsco-production.up.railway.app/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Eliminar el token de localStorage al cerrar sesión
                localStorage.removeItem('token');
                showWarningModal('Sesión cerrada exitosamente');
                // Redirigir a la página de inicio de sesión u otra página relevante después de cerrar sesión
                window.location.href = '/';
            } else {
                const responseData = await response.json();
                const errorMessage = responseData.message;
                showWarningModal(`Error al cerrar sesión: ${errorMessage}`);
                console.log(response);
                console.log(responseData);
            }
        } catch (error) {
            showWarningModal('Error al cerrar sesión');
            console.error(error);
        }
    }
});
