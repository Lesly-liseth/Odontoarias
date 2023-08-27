// Obtener los datos de la API y mostrar los odontólogos
fetch('https://endpointsco-production.up.railway.app/api/landingPage')
  .then(response => response.json())
  .then(data => {
    console.log('Datos obtenidos:', data);

    if (data.Dentists && Array.isArray(data.Dentists)) {
      const teamMembersContainer = document.getElementById('team-members');

      // Generar el HTML para cada odontólogo
      data.Dentists.forEach(odontologo => {
        const memberHTML = `
          <div class="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
            <div class="member d-flex align-items-start">
              <div class="pic" style="width: 100%;"><img src="${odontologo.UrlPicture}" class="img-fluid" alt="${odontologo.Fullname}" style="width: 100%; height: auto;"></div>
              <div class="member-info">
                <h4>${odontologo.FullName}</h4>
                <p>${odontologo.ProfesionalDescription}</p>
              </div>
            </div>
          </div>
        `;
        teamMembersContainer.innerHTML += memberHTML;
      });
    } else {
      console.error('No se encontraron datos de odontólogos en la respuesta de la API.');
    }
  })
  .catch(error => console.error('Error al obtener los datos:', error));
