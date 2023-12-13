import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request, { params }) {
  try {
    // Intentamos leer el archivo admins.txt y parsearlo como JSON
    // Este archivo contiene la información de los administradores
    const admins = JSON.parse(readFileSync("jsonFiles/admins.txt"));

    // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud
    const { user, pass } = await request.json();

    // Filtramos la lista de administradores para encontrar coincidencias con el nombre de usuario y la contraseña
    const matchingAdmins = admins.filter((admin) => admin.adminName === user && admin.password === pass);
    
    // Comprobamos si hay alguna coincidencia
    if (matchingAdmins.length > 0) {
      // Si hay una coincidencia, devolvemos una respuesta JSON con un mensaje "OK" y el ID del administrador
      return NextResponse.json({ message: "OK", adminID: matchingAdmins[0].adminID });
    } else {
      // Si no hay coincidencias, devolvemos una respuesta JSON con un mensaje "NOK"
      return NextResponse.json({ message: "NOK" });
    }

  } catch (error) {
    // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
    console.error('Error en el servidor:', error);
    // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
    return NextResponse.error(new Error('Error interno en el servidor'), { status: 500 });
  }
}