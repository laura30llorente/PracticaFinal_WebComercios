// COMPONENTE PARA MOSTRAR LA INFORMACION DE UN USUARIO
import React from 'react';

// Definimos un componente funcional llamado BusinessInfo que recibe una lista de usuarios como prop
function BusinessInfo( { users }) {
    // Comprobamos si 'users' es un array y si tiene al menos un elemento
    const hasUsers = Array.isArray(users) && users.length > 0;

    // Renderizamos el componente
    return (
        // Contenedor principal con estilo de fondo y bordes
        <div className="bg-sky-400 border p-3 rounded-lg m-4">
            {/* Renderizamos el contenido solo si hay usuarios */}
            {hasUsers && (
                // Contenedor para los detalles de los usuarios con espaciado entre elementos
                <div className="flex flex-col space-y-2">
                    {/* Mapeamos sobre el array de usuarios para mostrar cada uno */}
                    {users.map((user, index) => (
                        // Cada usuario se muestra en un contenedor con bordes y sombras
                        <div key={index} className="flex flex-col border p-4 rounded-lg shadow-lg space-y-4 w-full bg-sky-300">
                            {/* Contenedor para los detalles del usuario */}
                            <div className="flex-1 w-full">
                                {/* Mostramos el nombre del usuario si está disponible */}
                                {user.userName && <h3 className="text-lg font-semibold">{user.userName}</h3>}
                                {/* Mostramos el ID del usuario si está disponible */}
                                {user.userID && <p className="text-gray-600"> User ID: {user.userID}</p>}
                                {/* Mostramos el email del usuario si está disponible */}
                                {user.email && <p className="text-gray-600"> E-mail: {user.email}</p>}
                                {/* Mostramos la edad del usuario si está disponible */}
                                {user.age && <p className="text-gray-600"> Edad: {user.age}</p>}
                                {/* Mostramos la ciudad del usuario si está disponible */}
                                {user.city && <p className="text-gray-600"> Ciudad: {user.city}</p>}
                
                                {/* Lista de intereses del usuario */}
                                {user.interests && user.interests.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold">Intereses:</h4>
                                        {/* Listamos los intereses */}
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {user.interests.map((interest, index) => (
                                                <li key={index}> {interest} </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                
                                {/* Mostramos si el usuario permite recibir ofertas */}
                                <p className="text-gray-600"> Permite ofertas: {user.allowsOffers ? 'Sí' : 'No'}</p>

                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>  
    );
}

export default BusinessInfo;