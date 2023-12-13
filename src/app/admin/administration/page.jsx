// COMPONENTE PARA LA PAGINA DE ADMINISTRACION

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client"

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';

// Definimos el componente AdministrationPage
function AdministrationPage() {
    // Creamos un estado para almacenar el ID del administrador
    const [adminID, setAdminID] = useState('');

    // Utilizamos useEffect para cargar el ID del administrador desde el localStorage al montar el componente
    useEffect(() => {
        // Obtenemos el ID del administrador desde el localStorage
        const storedAdminID = localStorage.getItem('adminID');

        // Si existe un ID almacenado, lo establecemos en el estado
        if (storedAdminID) {
            setAdminID(storedAdminID);
        }
    }, []); // El array vacío [] como segundo argumento asegura que esto se ejecute solo una vez al montar el componente

    // Creamos un estado para almacenar los administradores obtenidos de la API
    const [admins, setAdmins] = useState([]);
    
    // Creamos un objeto URLSearchParams para manejar los parámetros de búsqueda en la URL
    const queryParams  = new URLSearchParams();

    // Añadimos el adminID al objeto queryParams si existe
    if (adminID) queryParams.append("adminID", adminID);

    // Utilizamos otro useEffect para cargar datos de la API
    useEffect(() => {
        // Definimos una función asincrónica para obtener datos de la API
        async function fetchData() {
            try {
                // Realizamos una petición GET a la API con los parámetros de consulta en la URL
                const result = await fetch("/api/admin/adminFilter/?" + queryParams.toString(), {
                    method: "GET"
                    // No es necesario incluir el header "Content-Type" para una solicitud GET sin cuerpo
                });
            
                // Verificamos si la respuesta no fue exitosa
                if (!result.ok) {
                    throw new Error("HTTP error! Status: " + result.status);
                }
            
                // Procesamos la respuesta y la convertimos a formato JSON
                const data = await result.json();
            
                // Verificamos si la respuesta es un array y tiene elementos
                if (Array.isArray(data) && data.length > 0) {
                    // Actualizamos el estado de admins con los datos obtenidos
                    setAdmins(data);
                }

            } catch (error) {
                // Capturamos y manejamos cualquier error en la llamada a la API
                console.error('Error al realizar la llamada a la API:', error);
                alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
            }
        }

        // Llamamos a fetchData
        fetchData();
    }, [adminID]); // Este useEffect se ejecuta cada vez que el valor de adminID cambia

    // Renderizamos la página de administración
    return (
        <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">

            <h1 className="text-3xl font-bold text-center mb-10">Página de administración</h1>

            <h3 className="text-2xl font-bold text-center mb-10">Información del administrador</h3>
            
            {/* Verificamos si hay administradores y los mostramos */}
            {admins && (
                <div className="flex flex-col space-y-2">
                    {/* Mapeamos cada administrador a un elemento de la interfaz */}
                    {admins.map((admin, index) => (
                        // Renderizamos la información de cada administrador
                        <div key={index} className="flex flex-col border p-4 rounded-lg shadow-lg space-y-4 w-full bg-sky-300">
                            <div className="flex-1 w-full">

                                {/* Mostramos el nombre y el ID del administrador si están disponibles */}
                                {admin.adminName && <h3 className="text-lg font-semibold">{admin.adminName}</h3>}
                                {admin.adminID && <p className="text-gray-600"> Admin ID: {admin.adminID}</p>}
            
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div> 
    );
};

export default AdministrationPage;