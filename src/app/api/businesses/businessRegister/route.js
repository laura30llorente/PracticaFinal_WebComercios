import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request) {
    // Obtenemos los datos enviados en la solicitud
    let data = await request.json();

    try {
        // Leemos el archivo businesses.txt y lo convertimos a un objeto JSON
        const businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        // Inicializamos la variable nextId, que determinará el ID del nuevo comercio
        let nextId = 1;
        
        // Si ya hay comercios, calculamos el siguiente ID basándonos en el último comercio
        if (businesses.length > 0) {
            const lastBusinessId = parseInt(businesses[businesses.length - 1].businessID);
            nextId = lastBusinessId + 1;
        }

        // Convertimos nextId a un string para mantener la consistencia en los tipos de datos
        let nextIdStr = nextId.toString();

        // Creamos un nuevo objeto para el comercio, asegurándonos de que tenga el formato correcto
        const newBusiness = {
            businessName: data.businessName,    // Establecemos primero el nombre del comercio
            businessID: nextIdStr,             // Luego asignamos el ID del comercio
            ...data                            // Incluimos el resto de las propiedades de data
        };

        // Escribimos en el archivo businesses.txt, agregando el nuevo comercio
        writeFileSync("jsonFiles/businesses.txt", JSON.stringify([...businesses, newBusiness]));

        // Devolvemos una respuesta JSON indicando que los datos están siendo guardados
        return NextResponse.json({
            message: "Guardando datos…",
            lastBusinessId: nextIdStr,   // Incluimos el ID del nuevo comercio en la respuesta
        });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error(error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error del servidor" }), { status: 500 });
    }
}