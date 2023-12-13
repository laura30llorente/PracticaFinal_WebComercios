import { readFileSync, writeFileSync } from 'fs';

// Definimos una función asíncrona DELETE para manejar solicitudes DELETE
export async function DELETE(request, { params }) {

    try {
        // Intentamos leer el archivo businesses.txt y lo parseamos como JSON
        // Este archivo contiene la información de los comercios
        const businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        // Extraemos la propiedad 'id' del objeto params, proporcionado en la solicitud
        const { id }  = params;

        // Filtramos la lista de comercios para excluir el negocio con el ID proporcionado
        const updatedBusinesses = businesses.filter(business => business.businessID !== id);

        // Escribimos el array actualizado de comercios de vuelta en el archivo
        writeFileSync("jsonFiles/businesses.txt", JSON.stringify(updatedBusinesses));

        // Devolvemos una respuesta JSON indicando que el comercio fue eliminado con éxito
        return new Response(JSON.stringify({ message: "Comercio eliminado con éxito" }), { status: 200 });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error(error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error al eliminar el comercio" }), { status: 500 });
    }
}