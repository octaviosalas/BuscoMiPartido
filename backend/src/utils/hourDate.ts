export function getCurrentDate() {
    const today = new Date();
    console.log("fecha", today.toISOString())
    return today.toISOString(); // Ejemplo: "2024-08-16T21:50:58.174Z"
}

// Función para obtener una hora específica en el día actual (por ejemplo, las 20:00:00)
export function getCurrentTimeAdjusted() {
    const now = new Date();
    
    // Ajustar la hora actual a la hora completa sin minutos ni segundos
    now.setUTCHours(now.getUTCHours(), 0, 0, 0); // Ajusta los minutos, segundos, y milisegundos a 0
     console.log("hora", now.toISOString())
    return now.toISOString(); // Devuelve en formato ISO 8601
}