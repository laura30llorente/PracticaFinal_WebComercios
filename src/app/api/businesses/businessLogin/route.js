import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request, { params }) {
  try {
    // Leemos el archivo businesses.txt y lo convertimos a un objeto JSON
    // Este archivo contiene la información de los comercios
    const businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

    // Extraemos el nombre del comercio y la contraseña del cuerpo de la solicitud
    const { business, pass } = await request.json();

    // Filtramos la lista de comercios para encontrar coincidencias con el nombre del comercio y la contraseña
    const matchingBusinesses = businesses.filter(b => b.businessName === business && b.password === pass);
    
    // Comprobamos si hay alguna coincidencia
    if (matchingBusinesses.length > 0) {
      // Si hay una coincidencia, devolvemos una respuesta JSON con un mensaje "OK" y el ID del comercio
      return NextResponse.json({ message: "OK", businessID: matchingBusinesses[0].businessID });
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