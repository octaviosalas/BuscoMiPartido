import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import axios from "axios";

interface ShiftState {
  available: boolean;
  complex: number;
  createdAt: string;
  date: Date;
  end: string;
  id: number;
  start: string;
  updatedAt: string;
  user: null | number; 
  userData: null 
}

const Calendar = () => {

  const [events, setEvents] = useState([]);


  const getShifts = async () => { 
      try {
       const {data, status} = await axios.get("http://localhost:4000/complex/complexShifts/1")
       console.log(data)
       console.log(status)
       const transformData = data.map((data : ShiftState) => { 
           const newData = { 
              id: data.id,
              title: data.available === true ? "Libre" : "Ocupado",
              start: data.start,
              end: data.end,
              backgroundColor: data.available === true ? "blue" : "red", // Asigna el color basado en la disponibilidad
           }
           return newData
       })
       setEvents(transformData)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(() => { 
    getShifts()
  }, [])

  const renderEventContent = (eventInfo : any) => {
    return eventInfo.event.backgroundColor === "red" ? (
      <>
        <button onClick={() => alert(`Haz clic en ${eventInfo.event.title}`)}>Detalles</button>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event.title}</div>
      </>
    ) : (
      <>
        <div>{eventInfo.timeText}</div>
        <div>{eventInfo.event.title}</div>
      </>
    );
  };

  return (
    <div className="border border-red-600 w-screen">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev, next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={events}
        eventContent={renderEventContent} 
        views={{
          dayGridMonth: { minTime: '08:00am', maxTime: '18:00pm' },
          timeGridWeek: { minTime: '08:00am', maxTime: '18:00pm' },
          timeGridDay: { minTime: '08:00am', maxTime: '18:00pm' }
        }}
      />
    </div>
  );
};

export default Calendar;



/* 
 {
        "id": "1",
        "title": "Evento Ejemplo",
        "start": "2024-08-13T13:00:00",
        "end": "2024-08-13T15:00:00",
      }
*/