// COMPONENTE PARA LA PAGINA DE MODIFICAR DATOS DEL USUARIO

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos el componente UpdateUserForm desde su ruta
import UpdateUserForm from "../../../../components/UpdateUserForm.jsx";

// Definimos el componente UpdateUserPage
function UpdateUserPage() {
    // Creamos un estado para rastrear si la actualización fue exitosa
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Creamos un estado para almacenar la información actualizada del usuario
    const [updatedInfo, setUpdatedInfo] = useState(null);

    // Creamos un estado para almacenar el ID del usuario
    const [userID, setUserID] = useState('');

    // Utilizamos useEffect para cargar el ID del usuario desde el localStorage al montar el componente
    useEffect(() => {
        // Obtenemos el ID del usuario desde el localStorage
        const storedUserID = localStorage.getItem('userID');

        // Si existe, lo establecemos como userID con setUserID
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);  // El array vacío [] como segundo argumento asegura que esto se ejecute solo una vez al montar el componente

    // Creamos un estado para almacenar los usuarios obtenidos de la API.
    const [users, setUsers] = useState([]);
    
    // Creamos un objeto URLSearchParams para manejar los parámetros de búsqueda en la URL
    const queryParams  = new URLSearchParams();

    // Añadimos el userID al objeto queryParams si existe
    if (userID) queryParams.append("userID", userID);

    // Utilizamos otro useEffect para cargar datos de la API
    useEffect(() => {
        async function fetchUser() {
            try {
                // Realizamos una petición GET a la API con los parámetros de búsqueda en la URL
                const result = await fetch("/api/registeredUsers/userFilter/?" + queryParams.toString(), {
                    method: "GET"
                    // No es necesario incluir el header "Content-Type" para una solicitud GET sin cuerpo
                });
            
                // Verificamos si la respuesta no fue exitosa
                if (!result.ok) {
                    throw new Error("HTTP error! Status: " + result.status);
                }
            
                // Convertimos la respuesta en JSON
                const data = await result.json();
            
                // Verificamos si la respuesta es un array con elementos
                if (Array.isArray(data) && data.length > 0) {
                    // Actualizamos el estado de users con los datos obtenidos
                    setUsers(data);
                }

            } catch (error) {
                // Capturamos y manejamos cualquier error en la llamada a la API
                console.error('Error al realizar la llamada a la API:', error);
                alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
            }
        }

        // Llamamos a fetchUser
        fetchUser();
    }, [userID]);   // Este useEffect se ejecuta cada vez que el valor de userID cambia

    // Definimos una función para manejar la actualización de los datos del usuario
    const handleUpdate = async (updateFormData) => {
        try {
            // Realizamos una petición PUT a la API para actualizar los datos del usuario
            const result = await fetch("/api/registeredUsers/userUpdateData", {
                method: "PUT",
                body: JSON.stringify(updateFormData),
                headers: {
                    "Content-type": "application/json",
                },
            });
    
            // Verificamos si la respuesta no fue exitosa
            if (!result.ok) {
                throw new Error("HTTP error! Status: " + result.status);
            }
    
            // Convertimos la respuesta en JSON
            const data = await result.json();

            // Verificamos si el mensaje de la respuesta indica una actualización exitosa
            if (result.ok && data.message === "Información del usuario actualizada con éxito") {
                // Almacenamos la información actualizada en el estado
                setUpdatedInfo(updateFormData);
                // Indicamos que la actualización fue exitosa
                setUpdateSuccess(true);
                
                // Notificamos al usuario sobre el éxito de la actualización
                alert('Actualización de información exitosa');

                // Ocultamos la información actualizada después de 10 segundos
                setTimeout(() => {
                    setUpdatedInfo(null);
                    setUpdateSuccess(false);
                }, 10000);
            } else {
                // Notificamos al usuario sobre errores en la actualización si los hay
                if (data.errors && data.errors.length > 0) {
                    alert("Errores en la actualización - " + data.errors.join(", "));
                } else {
                    alert('Error al actualizar la información del usuario. Inténtalo de nuevo.');
                }
            }
            
        } catch (error) {
            // Capturamos y manejamos cualquier error en la actualización de datos
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página para actualizar los datos del usuario
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10"> Actualizar información del usuario </h1>

            {/* Añadimos el componente de formulario de actualización con los datos existentes, el ID del usuario y la función de actualización */}
            {users && (
                <UpdateUserForm
                    existingUserData={users}
                    userID={userID} 
                    onUpdate={handleUpdate}
                />
            )}

            {/* Renderizamos la información actualizada solo si la actualización fue exitosa */}
            {updateSuccess && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                <h2 className="text-xl font-bold mb-2"> Detalles Actualizados del Usuario </h2>
                
                {/* Mostramos los campos actualizados del usuario */}
                {updatedInfo.userName && <p><strong>Nombre de usuario:</strong> {updatedInfo.userName}</p>}
                {updatedInfo.email && <p><strong>E-mail:</strong> {updatedInfo.email}</p>}
                {updatedInfo.age && <p><strong>Edad:</strong> {updatedInfo.age}</p>}
                {updatedInfo.city && <p><strong>Ciudad:</strong> {updatedInfo.city}</p>}
                 
                {/* Mostramos los intereses del usuario si los hay */}
                {updatedInfo.interests && (
                    <div>
                        <strong>Intereses:</strong>
                        <ul>
                            {/* Listamos cada interés */}
                            {updatedInfo.interests.map((interest, index) => (
                                <li key={index}>{interest}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Mostramos si el usuario permite recibir ofertas o no */}
                {updatedInfo.allowsOffers !== undefined && (
                    <p>
                        <strong>Permite ofertas:</strong>{" "}
                        {updatedInfo.allowsOffers ? "Sí" : "No"}
                    </p>
                )}
                
            </div>
            )}
        </div>  
    );
};

export default UpdateUserPage;