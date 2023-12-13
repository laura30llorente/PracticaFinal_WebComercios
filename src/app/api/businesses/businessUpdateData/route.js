import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Definimos una función asíncrona PUT para manejar solicitudes PUT
export async function PUT(request) {
    // Obtenemos los datos de actualización enviados en la solicitud
    let updateData = await request.json();

    // Creamos una lista para almacenar posibles errores
    let errors = [];

    try {
        // Leemos el archivo businesses.txt y lo convertimos a un objeto JSON
        let businesses = JSON.parse(readFileSync("jsonFiles/businesses.txt"));

        // Buscamos el índice del comercio a actualizar usando el businessID
        const businessIndex = businesses.findIndex(b => b.businessID === updateData.businessID);

        // Comprobamos si encontramos el comercio
        if (businessIndex !== -1) {
            // Obtenemos los datos existentes del comercio
            const existingBusiness = businesses[businessIndex];

            // Iteramos sobre las claves de los datos de actualización
            Object.keys(updateData).forEach(key => {
                // Actualizamos solo si el valor proporcionado no es vacío
                if (updateData[key] !== '') {
                    // Verificamos si el comercio tiene la propiedad que se intenta actualizar
                    if (existingBusiness.hasOwnProperty(key)) {
                        // Actualizamos la propiedad
                        existingBusiness[key] = updateData[key];
                    } else {
                        // Si la propiedad no existe, agregamos un error a la lista
                        errors.push("Campo no encontrado: " + key);
                    }
                }
            });

            // Comprobamos si no hay errores
            if (errors.length === 0) {
                // Actualizamos el comercio en la lista
                businesses[businessIndex] = existingBusiness;
                // Escribimos la lista actualizada en el archivo
                writeFileSync("jsonFiles/businesses.txt", JSON.stringify(businesses));

                // Devolvemos una respuesta JSON indicando éxito en la actualización
                return NextResponse.json({ message: "Información del comercio actualizada con éxito" });
            } else {
                // Si hay errores, devolvemos una respuesta con los detalles
                return NextResponse.json({ message: "Errores en la actualización", errors: errors });
            }

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