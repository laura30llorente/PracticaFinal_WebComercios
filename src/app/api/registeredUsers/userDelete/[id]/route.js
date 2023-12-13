import { readFileSync, writeFileSync } from 'fs';

// Definimos una función asíncrona DELETE para manejar solicitudes DELETE
export async function DELETE(request, { params }) {
    try {
        // Leemos el archivo users.txt y lo convertimos a un objeto JSON
        const users = JSON.parse(readFileSync("jsonFiles/users.txt"));

        // Extraemos la propiedad 'id' del objeto params
        const { id }  = params;

        // Filtramos los usuarios para eliminar aquellos con un userID igual a 'id'
        const updatedUsers = users.filter(user => user.userID !== id);

        // Escribimos la lista actualizada de usuarios en el archivo txt
        writeFileSync("jsonFiles/users.txt", JSON.stringify(updatedUsers));

        // Devolvemos una respuesta JSON indicando éxito en la eliminación
        return new Response(JSON.stringify({ message: "Usuario eliminado con éxito" }), { status: 200 });
    } catch (error) {
        // Capturamos y mostramos cualquier error que ocurra durante el procesamiento
        console.error(error);
        // Devolvemos una respuesta de error con un mensaje y un estado HTTP 500
        return new Response(JSON.stringify({ message: "Error al eliminar el usuario" }), { status: 500 });
    }
}