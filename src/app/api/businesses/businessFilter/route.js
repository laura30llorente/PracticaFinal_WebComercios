import { readFileSync } from 'fs';

// Definimos una función asíncrona GET para manejar solicitudes GET
export async function GET(request, { params }) {
    // Extraemos los parámetros de búsqueda de la URL de la solicitud
    const { searchParams } = new URL(request.url);

    // Obtenemos los valores de los parámetros de búsqueda si están presentes
    const id = searchParams.get("businessID") || "";
    const ciudad = searchParams.get("city") || "";
    const actividad = searchParams.get("activity") || "";
    const nombre = searchParams.get("businessName") || "";
  
    try {
        // Intentamos leer el archivo businesses.txt y lo parseamos como JSON
        // Este archivo contiene la información de los comercios
        const businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        let filteredBusinesses = 0;

        // Comprobamos si se ha proporcionado un ID
        if (id) {
            // Si se proporciona un ID, filtramos la lista de comercios por ese ID
            filteredBusinesses = businesses.filter(business => business.businessID === id);
        } else {
            // Si no se proporciona un ID, aplicamos otros filtros basados en ciudad, actividad y nombre
            filteredBusinesses = businesses.filter(business =>
                (ciudad === "" || (business.city && business.city.toLowerCase() === ciudad.toLowerCase())) &&
                (actividad === "" || (business.activity && business.activity.toLowerCase() === actividad.toLowerCase())) &&
                (nombre === "" || (business.businessName && business.businessName.toLowerCase().includes(nombre.toLowerCase())))
            );
        }    

        // Devolvemos una respuesta con los comercios filtrados y un estado HTTP 200
        return new Response(JSON.stringify(filteredBusinesses), { status: 200 });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante la lectura del archivo o el procesamiento de la solicitud
        console.error('Error al leer el archivo o procesar la solicitud:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
