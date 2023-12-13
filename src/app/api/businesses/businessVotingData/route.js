import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Definimos una función asíncrona PATCH para manejar solicitudes PATCH
export async function PATCH(request) {
    // Obtenemos los datos de votación enviados en la solicitud
    let votingData = await request.json();

    try {
        // Leemos el archivo businesses.txt y lo convertimos a un objeto JSON
        let businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        // Buscamos el índice del comercio a actualizar usando el businessID
        const businessIndex = businesses.findIndex(b => b.businessID === votingData.businessID);
        
        // Comprobamos si encontramos el comercio
        if (businessIndex !== -1) {
            // Obtenemos los datos existentes del comercio
            const existingBusiness = businesses[businessIndex];

            // Actualizamos el campo scoring si existe en los datos de votación
            if ('scoring' in votingData) {
                existingBusiness.scoring = votingData.scoring;

                // Incrementamos numRatings solo si se actualizó el scoring
                if (votingData.isScoringUpdated) {
                    existingBusiness.numRatings += 1;
                }
            }

            // Añadimos a los reviews existentes las nuevas reseñas si existen en los datos de votación
            if ('reviews' in votingData && Array.isArray(votingData.reviews)) {
                existingBusiness.reviews = existingBusiness.reviews.concat(votingData.reviews);
            }

            // Actualizamos el comercio que se ha votado y lo guardamos en el archivo txt
            businesses[businessIndex] = existingBusiness;
            writeFileSync("jsonFiles/businesses.txt", JSON.stringify(businesses));

            // Devolvemos el objeto business actualizado en la respuesta
            return NextResponse.json({ message: "Información del comercio actualizada con éxito", updatedBusiness: existingBusiness });

        } else {
            // Si no encontramos el comercio, devolvemos una respuesta indicando que no se encontró
            return NextResponse.json({ message: "Comercio no encontrado" }, { status: 404 });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error('Error en el servidor:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error del servidor" }), { status: 500 });
    }
}