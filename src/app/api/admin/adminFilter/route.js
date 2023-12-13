import { readFileSync } from 'fs';

// Definimos una función asíncrona GET para manejar solicitudes GET
export async function GET(request, { params }) {
    // Extraemos los parámetros de búsqueda de la URL de la solicitud
    const { searchParams } = new URL(request.url);

    // Obtenemos el ID del administrador de los parámetros de búsqueda, si está presente
    const id = searchParams.get("adminID") || "";
  
    try {
        // Intentamos leer el archivo admins.txt y parsearlo como JSON
        // Este archivo contiene la información de los administradores
        const admins = JSON.parse(readFileSync("jsonFiles/admins.txt"));

        // Inicializamos una variable para almacenar los resultados filtrados
        let filteredAdmins = 0;

        if (id) {
            // Si se proporciona un ID, filtramos la lista de administradores por ese ID
            filteredAdmins = admins.filter(admin => admin.adminID === id);
        }  

        // Devolvemos una respuesta con los administradores filtrados y un estado HTTP 200
        return new Response(JSON.stringify(filteredAdmins), { status: 200 });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante la lectura del archivo o el procesamiento de la solicitud
        console.error('Error al leer el archivo o procesar la solicitud:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}