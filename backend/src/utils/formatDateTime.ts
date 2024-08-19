export function formatDateTime(dateTimeString : string | undefined) {
    console.log("Me llego", dateTimeString)
    const dateObj = new Date(dateTimeString);

    // Obtener día, mes y año
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-11
    const year = dateObj.getFullYear();

    // Formatear la fecha como "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;

    // Obtener horas y minutos
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    // Formatear la hora como "hh:mm"
    const formattedTime = `${hours}:${minutes}`;

    return {
        fecha: formattedDate,
        hora: formattedTime
    };
}