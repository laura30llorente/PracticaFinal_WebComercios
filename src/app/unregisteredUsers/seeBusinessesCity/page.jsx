// COMPONENTE PARA FILTRAR COMERCIOS POR CIUDAD

// Indicamos que este componente debe ejecutarse solo en el lado del cliente.
"use client";

// Importamos React y el hook useState desde 'react'
import React, { useState } from 'react';
// Importamos el componente BusinessInfo desde su ruta
import BusinessInfo from '../../../components/BusinessInfo.jsx';

// Definimos el componente SeeBusinessByCityPage
function SeeBusinessByCityPage() {
    // Creamos un estado para almacenar los parámetros de búsqueda
    const [searchParams, setSearchParams] = useState({
        city: ''
    });
    
    // Creamos un estado para almacenar los resultados de la búsqueda
    const [results, setResults] = useState([]);

    // Definimos una función para manejar los cambios en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };
  
    // Definimos una función para manejar la búsqueda cuando se envía el formulario
    const handleSearch = async (e) => {
        e.preventDefault();
        
        // Reiniciamos los resultados antes de realizar una nueva búsqueda
        setResults([]);
        
        // Verificamos que el parámetro de búsqueda esté presente
        if (!searchParams.city) {
            alert('Por favor, ingrese una ciudad para buscar.');
            return;
        }

        // Creamos un objeto URLSearchParams para gestionar los parámetros de la URL
        const queryParams  = new URLSearchParams();

        // Utilizamos append para añadir parámetros de búsqueda
        if (searchParams.city) queryParams.append("city", searchParams.city);
    
        try {
            // Realizamos una petición GET a la API con los parámetros de búsqueda en la URL
            const result = await fetch("/api/businesses/businessFilter/?" + queryParams.toString(), {
                method: "GET"
                // No es necesario incluir el header "Content-Type" para una solicitud GET sin cuerpo
            });
          
            // Verificamos si la respuesta no fue exitosa
            if (!result.ok) {
                throw new Error("HTTP error! Status: " + result.status);
            }
          
            // Convertimos la respuesta en JSON
            const data = await result.json();
          
            // Establecemos los resultados en función de la respuesta
            if (Array.isArray(data) && data.length > 0) {
                setResults(data);
            } else {
                alert('No se encontraron comercios con los criterios especificados.');
            }

            // Borrar los valores de búsqueda después de completar la búsqueda
            setSearchParams({
                city: ''
            });
        } catch (error) {
            // Capturamos y manejamos cualquier error en la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página para buscar comercios por ciudad
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Buscar Comercios por Ciudad</h1>
            
            {/* Formulario para buscar comercios */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                
                {/* Campo de entrada para la ciudad */}
                <div className="mb-5">
                    <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-2">
                        Ciudad:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={searchParams.city}   // Guardamos la ciudad introducida en searchParams
                        onChange={handleInputChange}
                        placeholder="Ej: Madrid"
                        className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Botón para enviar el formulario de búsqueda */}
                <div className="text-center">
                    <button type="submit" className="inline-block px-6 py-3 my-6 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
                        Buscar Comercio
                    </button>
                </div>
            </form>
            
            {/* Renderizamos BusinessInfo solo si hay resultados para mostrar la informacion de los comercios filtrados */}
            {results.length > 0 && <BusinessInfo businesses={results} />}

        </div>
    );
};

export default SeeBusinessByCityPage;