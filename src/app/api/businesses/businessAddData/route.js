import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Definimos una función asíncrona POST para manejar solicitudes POST
export async function POST(request) {
    // Obtenemos los datos nuevos enviados en la solicitud
    let newData = await request.json();

    try {
        // Leemos el archivo de negocios y lo convertimos a un objeto 
        let businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        // Buscamos el índice del negocio en el array utilizando el businessID
        const businessIndex = businesses.findIndex(b => b.businessID === newData.businessID);

        // Comprobamos si el negocio existe en nuestro archivo
        if (businessIndex !== -1) {
            // Si el negocio existe, actualizamos su información
            const business = businesses[businessIndex];
            
            // Iteramos sobre las claves de newData para actualizar la información
            Object.keys(newData).forEach(key => {
                // Si la clave no existe en el negocio, o es un array vacío, la añadimos/actualizamos
                if (!business[key] || (Array.isArray(business[key]) && business[key].length === 0)) {
                    business[key] = newData[key];
                }
            });

            // Escribimos el array actualizado de nuevo en el archivo
            writeFileSync("jsonFiles/businesses.txt", JSON.stringify(businesses));

            // Devolvemos una respuesta JSON indicando que la operación fue exitosa
            return NextResponse.json({ message: "Información del comercio añadida con éxito" });
        } else {
            // Si el negocio no se encuentra, devolvemos un mensaje de error
            return NextResponse.json({ message: "Comercio no encontrado" }, { status: 404 });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error('Error en el servidor:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error del servidor" }), { status: 500 });
    }
}