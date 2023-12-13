import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

// Definimos una función asíncrona PUT para manejar solicitudes PUT
export async function PUT(request) {
    // Obtenemos los datos de actualización enviados en la solicitud y creamos una lista para almacenar errores
    let updateData = await request.json();
    let errors = [];

    try {
        // Leemos el archivo users.txt y lo convertimos a un objeto JSON
        let users = JSON.parse(readFileSync("jsonFiles/users.txt"));

        // Buscamos el índice del usuario a actualizar usando el userID
        const userIndex = users.findIndex(u => u.userID === updateData.userID);

        // Comprobamos si encontramos al usuario
        if (userIndex !== -1) {
            // Obtenemos los datos existentes del usuario
            const existingUser = users[userIndex];

            // Iteramos sobre las claves de los datos de actualización
            Object.keys(updateData).forEach(key => {
                // Actualizamos solo si el valor proporcionado no es vacío
                if (updateData[key] !== '') {
                    // Verificamos si el usuario tiene la propiedad que se intenta actualizar
                    if (existingUser.hasOwnProperty(key)) {
                        // Actualizamos la propiedad
                        existingUser[key] = updateData[key];
                    } else {
                        // Si la propiedad no existe, agregamos un error a la lista
                        errors.push("Campo no encontrado: " + key);
                    }
                }
            });

            // Comprobamos si no hay errores
            if (errors.length === 0) {
                // Actualizamos el usuario en la lista
                users[userIndex] = existingUser;
                // Escribimos la lista actualizada en el archivo
                writeFileSync("jsonFiles/users.txt", JSON.stringify(users));

                // Devolvemos una respuesta JSON indicando éxito en la actualización
                return NextResponse.json({ message: "Información del usuario actualizada con éxito" });
            } else {
                // Si hay errores, devolvemos una respuesta con los detalles
                return NextResponse.json({ message: "Errores en la actualización", errors: errors });
            }

        } else {
            // Si no encontramos al usuario, devolvemos una respuesta indicando que no se encontró
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error('Error en el servidor:', error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error del servidor" }), { status: 500 });
    }
}