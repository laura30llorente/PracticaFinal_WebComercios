import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request, { params }) {
    try {
        // Leemos el archivo users.txt y lo convertimos a un objeto JSON
        const users = JSON.parse(readFileSync("jsonFiles/users.txt"));

        // Obtenemos los datos de usuario y contraseña del cuerpo de la solicitud
        const { user, pass } = await request.json();

        // Filtramos los usuarios que coincidan con el nombre de usuario y contraseña proporcionados
        const matchingUsers = users.filter(u => u.userName === user && u.password === pass);

        // Comprobamos si se encontraron usuarios coincidentes
        if (matchingUsers.length > 0) {
            // Devolvemos una respuesta JSON con un mensaje "OK" y el ID del usuario coincidente
            return NextResponse.json({ message: "OK", userID: matchingUsers[0].userID});
        } else {
            // Si no se encontraron coincidencias, devolvemos una respuesta JSON con un mensaje "NOK"
            return NextResponse.json({ message: "NOK" });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error('Error en el servidor:', error);
    }
}