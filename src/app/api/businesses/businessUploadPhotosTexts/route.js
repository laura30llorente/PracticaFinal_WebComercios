import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request) {
    // Obtenemos los datos enviados en la solicitud
    let newData = await request.json();

    try {
        // Leemos el archivo businesses.txt y lo convertimos a un objeto JSON
        let businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));
        
        // Buscamos el índice del comercio a actualizar usando el businessID
        const businessIndex = businesses.findIndex(b => b.businessID === newData.businessID);
        
        // Comprobamos si encontramos el negocio
        if (businessIndex !== -1) {
            // Si el comercio existe, obtenemos sus datos actuales
            const business = businesses[businessIndex];
            
            // Añadimos nuevas fotos o textos a los existentes
            // Comprobamos si el campo 'photos' está presente y es un array
            if (newData.photos && Array.isArray(newData.photos)) {
                // Combinamos las fotos existentes con las nuevas, si hay alguna, o usamos solo las nuevas
                business.photos = business.photos ? business.photos.concat(newData.photos) : newData.photos;
            }
            // Hacemos lo mismo con el campo 'texts'
            if (newData.texts && Array.isArray(newData.texts)) {
                business.texts = business.texts ? business.texts.concat(newData.texts) : newData.texts;
            }

            // Escribimos el array actualizado de comercios de vuelta en el archivo
            writeFileSync("jsonFiles/businesses.txt", JSON.stringify(businesses));

            // Devolvemos una respuesta JSON indicando que la operación fue exitosa
            return NextResponse.json({ message: "Fotos o textos del comercio añadidos con éxito" });
        } else {
            // Si no encontramos el negocio, devolvemos una respuesta indicando que no se encontró
            return NextResponse.json({ message: "Comercio no encontrado" }, { status: 404 });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error('Error en el servidor:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error del servidor" }), { status: 500 });
    }
}