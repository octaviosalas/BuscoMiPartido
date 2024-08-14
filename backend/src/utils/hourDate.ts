export function obtenerFechaActual() {
    const fechaActual = new Date();
    console.log(fechaActual)
    return fechaActual.toLocaleDateString(); // Formato: "dd/mm/yyyy"
}

// Función que retorna un horario correspondiente a las 17:00 horas
export function obtenerHorario17() {
    const horario17 = new Date();
    horario17.setHours(17, 0, 0, 0); // Establece la hora a las 17:00:00
    console.log(horario17)
    return horario17.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formato: "17:00"
}

// Función que retorna un horario correspondiente a las 18:00 horas
export function obtenerHorario18() {
    const horario18 = new Date();
    horario18.setHours(18, 0, 0, 0); // Establece la hora a las 18:00:00
    console.log(horario18)
    return horario18.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formato: "18:00"
}