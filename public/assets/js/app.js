import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [
      // Aquí puedes agregar los eventos del calendario
      // Ejemplo:
      {
        title: 'Evento 1',
        start: '2023-06-01'
      },
      {
        title: 'Evento 2',
        start: '2023-06-05',
        end: '2023-06-07'
      }
    ]
  });

  calendar.render();
});
