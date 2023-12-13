// COMPONENTE PARA LA PAGINA DE USUARIOS QUE HAN HECHO LOGIN

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos el componente UserInfo desde su ruta
import UserInfo from '../../../components/UserInfo.jsx';

// Definimos el componente LoggedUsersPage
function LoggedUsersPage() {
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
    }, []); // El array vacío [] como segundo argumento asegura que esto se ejecute solo una vez al montar el componente

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

    // Renderizamos la página de usuarios que han hecho login
    return (
        <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">

            <h1 className="text-3xl font-bold text-center mb-10">Información del Usuario</h1>
            
            {/* Utilizamos el componente UserInfo para mostrar la información de los usuarios, en concreto del usuario que ha iniciado sesión */}
            <UserInfo users={users} />
        </div> 
    );
};

export default LoggedUsersPage;