// COMPONENTE PARA ORDENAR LOS COMERCIOS POR SCORING

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos el componente BusinessInfo desde su ruta
import BusinessInfo from '../../../components/BusinessInfo.jsx';
// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';

// Definimos el componente OrderBusinessesPage
function OrderBusinessesPage() {
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
                // Convertimos la respuesta en JSON y procesamos los datos
                const data = await response.json();
                
                // Filtramos los comercios que tienen un scoring definido y los ordenamos por puntuación
                let filteredData = data.filter(business => business.scoring !== undefined && business.scoring !== null);
                
                // Ordenamos los comercios por scoring de mayor a menor
                filteredData.sort((a, b) => b.scoring - a.scoring);

                // Actualizamos el estado con los comercios filtrados y ordenados
                setBusinesses(filteredData);

            } catch (error) {
                // Capturamos y manejamos cualquier error durante la carga de comercios
                console.error('Error al cargar los comercios:', error);
                
            }
        };

        loadBusinesses();
    }, []);

    // Renderizamos la página para ver todos los comercios
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Ver todos los Comercios Ordenados por Puntuación (de mayor a menor)</h1>
            {/* Contenedor para mostrar los comercios en un diseño de cuadrícula */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               
                {/* Mapeamos cada comercio a un componente visual */}
                {businesses.map((business, index) => (
                    // Establecemos una clave única para cada elemento de la lista
                    <div key={index} className="bg-teal-700 border p-4 rounded-lg shadow-lg w-full flex flex-col">
                        {/* Añadimos un encabezado para cada comercio */}
                        <h2 className="text-xl text-center font-bold mb-2">Comercio {index + 1}</h2>
                        
                        {/* Usamos el componente BusinessInfo para mostrar la información de cada comercio */}
                        <BusinessInfo businesses={[business]} /> 
                    </div>
                ))}
            </div>
        </div>  
    );
};

export default OrderBusinessesPage;