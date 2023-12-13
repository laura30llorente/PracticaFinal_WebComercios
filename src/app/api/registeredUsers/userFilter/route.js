import { readFileSync } from 'fs';

// Definimos una función GET para manejar solicitudes GET
export async function GET(request, { params }) {
    // Extraemos los parámetros de la URL de la solicitud
    const { searchParams } = new URL(request.url);

    // Obtenemos el valor del parámetro "userID" o dejamos una cadena vacía si no se proporciona
    const id = searchParams.get("userID") || "";
  
    try {
        // Leemos el archivo users.txt y lo convertimos a un objeto JSON
        const users = JSON.parse(readFileSync("jsonFiles/users.txt"));

        // Inicializamos la variable para almacenar los usuarios filtrados
        let filteredUsers = 0;

        // Comprobamos si se proporcionó un ID
        if (id) {
            // Filtramos los usuarios por userID igual a 'id'
            filteredUsers = users.filter(user => user.userID === id);
        }  

        // Devolvemos una respuesta JSON con los usuarios filtrados y un estado HTTP 200
        return new Response(JSON.stringify(filteredUsers), { status: 200 });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error('Error al leer el archivo o procesar la solicitud:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}