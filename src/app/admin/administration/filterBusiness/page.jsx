// COMPONENTE PARA FILTRAR COMERCIOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client"

// Importamos React y el hook useState desde 'react'
import React, { useState } from 'react';
// Importamos el componente BusinessInfo desde su ruta
import BusinessInfo from '../../../../components/BusinessInfo.jsx';

// Definimos el componente FilterBusinessPage
function FilterBusinessPage() {
    // Creamos un estado para almacenar los parámetros de búsqueda
    const [searchParams, setSearchParams] = useState({
        businessName: '',
        city: ''
    });
    
    // Creamos un estado para almacenar los resultados de la búsqueda
    const [results, setResults] = useState([]);

    // Definimos una función para manejar los cambios en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Actualizamos los parámetros de búsqueda en el estado
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };
  
    // Definimos una función para manejar la búsqueda cuando se envía el formulario
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario
        
        // Reiniciamos los resultados antes de realizar una nueva búsqueda
        setResults([]);
        
        // Verificamos que al menos uno de los parámetros de búsqueda esté presente
        if (!searchParams.businessName && !searchParams.city) {
            alert('Por favor, ingrese un nombre de comercio o una ciudad para buscar.');
            return;
        }

        // Creamos un objeto URLSearchParams para gestionar los parámetros de la URL
        const queryParams  = new URLSearchParams();

        // Añadimos los parámetros de búsqueda al objeto queryParams
        if (searchParams.businessName) queryParams.append("businessName", searchParams.businessName);
        if (searchParams.city) queryParams.append("city", searchParams.city);
    
        try {
            // Realizamos una petición GET a la API con los parámetros de búsqueda
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
          
            // Verificamos si la respuesta es un array con elementos
            if (Array.isArray(data) && data.length > 0) {
                // Actualizamos el estado de results con los datos obtenidos
                setResults(data);
            } else {
                // Notificamos al usuario si no se encontraron comercios
                alert('No se encontraron comercios con los criterios especificados.');
            }

            // Reiniciamos los parámetros de búsqueda
            setSearchParams({
                businessName: '',
                city: ''
            });
        } catch (error) {
            // Capturamos y manejamos cualquier error en la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos el formulario para buscar comercios y los resultados
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Buscar Comercios</h1>

            {/* Formulario que llama a la funcion handleSearch, que realiza el filtrado con los datos recogidos del formulario */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">

                {/* Campo de entrada para el nombre del comercio */}
                <div className="mb-5">
                    <label htmlFor="businessName" className="block text-lg font-medium text-gray-700 mb-2">
                        Nombre del comercio:
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={searchParams.businessName}   // Guardamos en searchParams el nombre del comercio
                        onChange={handleInputChange}
                        placeholder="Ej: Tech Gadgets Galore"
                        className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Campo de entrada para la ciudad */}
                <div className="mb-5">
                    <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-2">
                        Ciudad:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={searchParams.city}  // Guardamos en searchParams la ciudad del comercio
                        onChange={handleInputChange}
                        placeholder="Ej: City G"
                        className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Botón para enviar el formulario de búsqueda */}
                <div className="text-center">
                    <button type="submit" className="inline-block px-6 py-3 my-6 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
                        Buscar
                    </button>
                </div>
            </form>
            
            {/* Renderizamos los resultados de la búsqueda usando BusinessInfo si hay resultados */}
            {results.length > 0 && <BusinessInfo businesses={results} />}

        </div>
    );
};

export default FilterBusinessPage;