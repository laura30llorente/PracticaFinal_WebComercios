import { readFileSync } from 'fs';

// Definimos una función GET para manejar solicitudes GET
export async function GET(request, { params }) {
    // Extraemos los parámetros de la URL de la solicitud
    const { searchParams } = new URL(request.url);

    // Obtenemos el valor del parámetro "city" o dejamos una cadena vacía si no se proporciona
    const city = searchParams.get("city") || "";

    // Obtenemos el valor del parámetro "interests" o dejamos una cadena vacía si no se proporciona
    const interests = searchParams.get("interests") || "";
    
    try {
        // Leemos el archivo users.txt y lo convertimos a un objeto JSON
        const users = JSON.parse(readFileSync("jsonFiles/users.txt"));

        // Inicializamos la variable para almacenar los usuarios filtrados que permiten recibir ofertas
        let filteredUsers = users.filter(user => user.allowsOffers === true);

        // Comprobamos si se proporcionó un valor para el parámetro "city"
        if (city) {
            // Filtramos los usuarios por la propiedad "city" igual a 'city'
            filteredUsers = filteredUsers.filter(user => user.city && user.city === city);
        }
        
        // Comprobamos si se proporcionó un valor para el parámetro "interests"
        if (interests) {
            // Dividimos los intereses en un array utilizando la coma como separador
            const interestsArray = interests.split(",");
            
            // Filtramos los usuarios por intereses que coincidan con alguno de los proporcionados
            filteredUsers = filteredUsers.filter(user =>
                user.interests && interestsArray.some(interest => user.interests.includes(interest))
            );
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