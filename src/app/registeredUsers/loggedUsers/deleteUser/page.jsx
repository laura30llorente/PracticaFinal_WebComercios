// COMPONENTE PARA LA ELIMINAR EL USUARIO

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos el componente UserInfo desde su ruta
import UserInfo from '../../../../components/UserInfo.jsx';
// Importamos useRouter de next/navigation para manejar la navegación
import { useRouter } from 'next/navigation';

// Definimos el componente DeleteUserPage
function DeleteUserPage() {
    // Utilizamos el hook useRouter para obtener la instancia del router
    const router = useRouter();

    // Creamos un estado para almacenar el mensaje de éxito al eliminar un usuario
    const [successMessage, setSuccessMessage] = useState('');

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

    // Creamos un estado para almacenar los usuarios obtenidos de la API
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

    // Definimos una función para eliminar un usuario
    const deleteUser = async (id) => {
        try {
            // Realizamos una petición DELETE a la API para eliminar el usuario especificado con el ID
            const result = await fetch(`/api/registeredUsers/userDelete/${id}/`, { 
                method: "DELETE",
            });
    
            // Verificamos si la respuesta no fue exitosa
            if (!result.ok) {
                throw new Error("HTTP error! Status: " + result.status);
            }
    
            // Convertimos la respuesta en JSON
            const response = await result.json();

            // Notificamos al usuario sobre el resultado de la operación
            alert(response.message);

            // Verificamos si el mensaje de la respuesta indica una eliminación exitosa
            if (response.message === "Usuario eliminado con éxito") {

                // Mostramos el mensaje de éxito
                setSuccessMessage(response.message);

                // Actualizamos la lista de usuarios, eliminando el usuario borrado
                setUsers(prevUsers => prevUsers.filter(user => user.userID !== id));

                // Redirigimos al usuario a /registeredUsers después de eliminar, ya que ahora no existe
                setTimeout(() => {
                    router.push('/registeredUsers');
                }, 5000);   // Redirigir después de 5 segundos
            } else {
                // Notificamos al usuario si hubo un error al borrar el usuario
                alert('Error al borrar el contenido del usuario. Inténtalo de nuevo.');
            }
            
        } catch (error) {
            // Capturamos y manejamos cualquier error durante la eliminación del usuario
            console.error('Error al realizar la solicitud:', error);
            alert('Error al eliminar el usuario. Consulta la consola para más detalles.');
        }
    };
    
    // Renderizamos la página para eliminar usuarios
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Eliminar Usuario</h1>
            
            {/* Verificamos si hay usuarios y mostramos su información */}
            {users && (
                <div className="bg-teal-800 border p-4 rounded-lg shadow-lg w-full flex flex-col"> {/* flex flex-col aquí asegura la distribución vertical */}
                    {/* Mostramos información del usuario a eliminar */}
                    <h2 className="text-xl text-center font-bold mb-2"> Información del Usuario a eliminar </h2>

                    <UserInfo users={users} />

                    {/* Botón para eliminar el usuario, pasando a la funcion deleteUser el ID del usuario */}
                    <button
                        onClick={() => deleteUser(users[0].userID)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full mt-4"
                    >
                        Eliminar Usuario
                    </button>
                </div>
            )}

            {/* Mostramos el mensaje de éxito si la eliminación fue exitosa */}
            {successMessage && (
                <div className="bg-green-400 text-white p-2 mt-4 rounded-lg shadow-md">
                    {successMessage}
                </div>
            )}
        </div>  
    );
};

export default DeleteUserPage;