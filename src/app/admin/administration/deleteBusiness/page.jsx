// COMPONENTE PARA ELIMINAR COMERCIOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client"

// Importamos el componente BusinessInfo desde su ruta 
import BusinessInfo from '../../../../components/BusinessInfo.jsx';

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';

// Definimos el componente DeleteBusinessPage
function DeleteBusinessPage() {
    // Creamos un estado para almacenar la lista de comercios
    const [businesses, setBusinesses] = useState([]);

    // Utilizamos useEffect para cargar los comercios al montar el componente
    useEffect(() => {
        // Definimos una función asíncrona para cargar los comercios
        const loadBusinesses = async () => {
            try {
                // Realizamos una petición GET a la API para obtener los comercios
                const response = await fetch('/api/businesses/businessFilter/', { 
                    method: "GET" 
                });
                
                // Verificamos si la respuesta no fue exitosa
                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }

                // Convertimos la respuesta en JSON y actualizamos el estado de businesses
                const data = await response.json();
                setBusinesses(data);
            } catch (error) {
                // Capturamos y manejamos cualquier error durante la carga de comercios
                console.error('Error al cargar los comercios:', error);
                
            }
        };

        // Llamamos a la función loadBusinesses
        loadBusinesses();
    }, []);  // El array vacío [] asegura que esto se ejecute solo una vez al montar el componente

    // Definimos una función asíncrona para eliminar un comercio
    const deleteBusiness = async (id) => {
        try {
            // Realizamos una petición DELETE a la API para eliminar el comercio especificado
            const result = await fetch(`/api/businesses/businessDelete/${id}/`, { 
                method: "DELETE",
            });
    
            // Verificamos si la respuesta no fue exitosa
            if (!result.ok) {
                throw new Error("HTTP error! Status: " + result.status);
            }
    
            // Convertimos la respuesta en JSON
            const response = await result.json();

            // Mostramos un mensaje con el resultado de la operación
            alert(response.message); 

            // Actualizamos la lista de comercios, eliminando el comercio borrado
            setBusinesses(prevBusinesses => prevBusinesses.filter(business => business.businessID !== id));
            
        } catch (error) {
            // Capturamos y manejamos cualquier error durante la eliminación del comercio
            console.error('Error al realizar la solicitud:', error);
            alert('Error al eliminar el comercio. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página para eliminar comercios
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Eliminar Comercios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Mapeamos cada comercio a un componente visual */}
                {businesses.map((business, index) => (
                    <div key={index} className="bg-teal-700 border p-4 rounded-lg shadow-lg w-full flex flex-col"> {/* flex flex-col aquí asegura la distribución vertical */}
                        {/* Usamos BusinessInfo para mostrar la información de cada comercio */}
                        <BusinessInfo businesses={[business]} /> 

                        {/* Botón para eliminar el comercio, que llama a deleteBusiness pasando el ID del comercio que queremos borrar */}
                        <button
                            onClick={() => deleteBusiness(business.businessID)}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full mt-4"
                        >
                            Eliminar comercio
                        </button>
                    </div>
                ))}
            </div>
        </div>  
    );
};

export default DeleteBusinessPage;