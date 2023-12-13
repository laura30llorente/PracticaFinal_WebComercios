import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request) {
    // Obtenemos los datos enviados en la solicitud 
    let data = await request.json();

    try {
        // Leemos el archivo users.txt y lo convertimos a un objeto JSON
        const users = JSON.parse(readFileSync("jsonFiles/users.txt"));
        let nextId = 1;
        
        // Comprobamos si hay usuarios existentes
        if (users.length > 0) {
            // Obtenemos el último ID de usuario y lo convertimos a entero
            const lastUserId = parseInt(users[users.length - 1].userID);
            // Calculamos el próximo ID sumando 1 al último ID
            nextId = lastUserId + 1;
        }
        
        // Convertimos nextId a cadena de texto (string)
        let nextIdStr = nextId.toString();
        
        // Creamos un nuevo objeto de usuario con las propiedades en el orden deseado
        const newUser = {
            userName: data.userName,   // Primero el userName
            userID: nextIdStr,         // Luego el userID como cadena de texto
            ...data                    // El resto de las propiedades de data
        };

        // Escribimos la lista actualizada de usuarios en el archivo
        writeFileSync("jsonFiles/users.txt", JSON.stringify([...users, newUser]));

        // Devolvemos una respuesta JSON indicando éxito en la operación y el último ID de usuario
        return NextResponse.json({
            message: "Guardando datos…",
            lastUserId: nextIdStr,
        });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error(error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error del servidor" }), { status: 500 });
    }
}