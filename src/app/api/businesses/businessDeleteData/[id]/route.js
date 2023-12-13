import { readFileSync, writeFileSync } from 'fs';

// Definimos una función asíncrona DELETE para manejar solicitudes DELETE
export async function DELETE(request, { params }) {
    try {
        // Leemos el archivo businesses.txt y lo convertimos a un objeto JSON
        const businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        // Extraemos el ID del comercio de los parámetros de la solicitud
        const { id } = params;   

        // Actualizamos la lista de comercios, eliminando ciertos campos del comercio con el ID especificado
        const updatedBusinesses = businesses.map(business => {
            // Comprobamos si el ID del comercio actual coincide con el ID proporcionado
            if (business.businessID === id) {
                // Eliminamos los campos especificados del comercio si existen, que son los de su contenido
                if (business.hasOwnProperty('city')) {
                    delete business.city;
                }
                if (business.hasOwnProperty('activity')) {
                    delete business.activity;
                }
                if (business.hasOwnProperty('title')) {
                    delete business.title;
                }
                if (business.hasOwnProperty('summary')) {
                    delete business.summary;
                }
                if (business.hasOwnProperty('texts')) {
                    delete business.texts;
                }
                if (business.hasOwnProperty('photos')) {
                    delete business.photos;
                }
                if (business.hasOwnProperty('unmodifiableData')) {
                    delete business.unmodifiableData;
                }
                if (business.hasOwnProperty('scoring')) {
                    delete business.scoring;
                }
                if (business.hasOwnProperty('numRatings')) {
                    delete business.numRatings;
                }
                if (business.hasOwnProperty('reviews')) {
                    delete business.reviews;
                }
            }
            // Devolvemos el comercio actualizado (o no modificado si no coincide el ID)
            return business;
        });

        // Escribimos la lista actualizada de comercios de vuelta en el archivo
        writeFileSync("jsonFiles/businesses.txt", JSON.stringify(updatedBusinesses));

        // Devolvemos una respuesta JSON indicando que la operación fue exitosa
        return new Response(JSON.stringify({ message: "Contenido del comercio eliminado con éxito" }), { status: 200 });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error(error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error al eliminar el contenido del comercio" }), { status: 500 });
    }
}