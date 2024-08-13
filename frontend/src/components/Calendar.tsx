import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import axios from "axios";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
        "id": "1",
        "title": "Evento Ejemplo",
        "start": "2024-08-13T13:00:00",
        "end": "2024-08-13T15:00:00",
      }
  ]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev, next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events} // Asigna el estado de eventos a la propiedad events de FullCalendar
      />
    </div>
  );
};

export default Calendar;

