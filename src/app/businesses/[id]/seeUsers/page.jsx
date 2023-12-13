// COMPONENTE PARA VER LOS USUARIOS DE LA MISMA CIUDAD QUE EL COMERCIO, QUE ACEPTEN OFERTAS Y QUE TENGAN DETERMINADOS INTERESES

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos el componente UserInfo desde su ruta
import UserInfo from '../../../../components/UserInfo.jsx';

// Definimos el componente SeeUsersByInterestsPage, que recibe params
function SeeUsersByInterestsPage({ params }) {
    // Creamos un estado para almacenar la información del comercio
    const [business, setBusiness] = useState(null);

    // Utilizamos useEffect para cargar la información del comercio al montar el componente (params.id)
    useEffect(() => {
        // Definimos una función asíncrona para obtener la información del comercio
        async function fetchBusiness() {
            try {
                // Realizamos una petición GET a la API para obtener la información del comercio
                // Pasamos el businessID con el id obtenido con los params
                const response = await fetch(`http://localhost:3000/api/businesses/businessFilter/?businessID=${params.id}`);
            
                // Verificamos si la respuesta no fue exitosa
                if (!response.ok) {
                    throw new Error(`Error al obtener el comercio. Status: ${response.status}`);
                }
                
                // Convertimos la respuesta en JSON y actualizamos el estado con los datos
                const businessData = await response.json();
                setBusiness(businessData[0]);
            } catch (error) {
                // Capturamos y manejamos cualquier error durante la obtención del comercio
                console.error('Error al obtener el comercio:', error);
                throw new Error('Error al obtener el comercio. Consulta la consola para más detalles.');
            }
        }
        
        // Verificamos si el ID del comercio está presente y llamamos a fetchBusiness
        if (params.id) {
            fetchBusiness();
        }
      }, [params.id]);

    // Creamos un estado para almacenar los parámetros de búsqueda, que seran los intereses de los usuarios
    const [searchParams, setSearchParams] = useState({
        interests: '',
    });
    
    // Creamos un estado para almacenar los resultados de la búsqueda de usuarios
    const [results, setResults] = useState([]);

    // Definimos una función para manejar los cambios en los campos de entrada
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };
  
    // Definimos una función para manejar la búsqueda de usuarios cuando se envía el formulario
    const handleSearch = async (e) => {
        e.preventDefault();
        
        // Reiniciamos los resultados antes de realizar una nueva búsqueda
        setResults([]);
        
        // Verificamos que el parámetro de búsqueda esté presente
        if (!searchParams.interests) {
            alert('Por favor, ingrese intereses de los usuarios para buscar.');
            return;
        }

        // Creamos un objeto URLSearchParams para gestionar los parámetros de la URL
        const queryParams  = new URLSearchParams();

        // Añadimos los parametros de busqueda con append
        if (business.city) queryParams.append("city", business.city);   // Por defecto, porque los usuarios tienen que ser de la misma ciudad que el comercio
        if (searchParams.interests) queryParams.append("interests", searchParams.interests);  // Intereses de los usuarios
    
        try {
            // Realizamos una petición GET a la API con los parámetros de búsqueda en la URL
            const result = await fetch("/api/registeredUsers/userFilterInterests/?" + queryParams.toString(), {
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
                alert('No se encontraron usuarios con los criterios especificados.');
            }

            // Borrar los valores de búsqueda después de completar la búsqueda
            setSearchParams({
                interests: ''
            });
        } catch (error) {
            // Capturamos y manejamos cualquier error en la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Intentamos renderizar la página
    return (
        // Renderizamos la página para buscar usuarios por intereses
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Buscar Usuarios por Intereses</h1>
            {/* Subtítulo explicando el criterio de búsqueda */}
            <h1 className="text-2xl font-bold text-center mb-10">La búsqueda se centra en usuarios de la misma ciudad que el Comercio y que acepten Recibir Ofertas</h1>
            
            {/* Formulario para buscar usuarios */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
                
                {/* Campo de entrada para los intereses */}
                <div className="mb-5">
                    <label htmlFor="interests" className="block text-lg font-medium text-gray-700 mb-2">
                        Intereses:
                    </label>
                    <input
                        type="text"
                        id="interests"
                        name="interests"
                        value={searchParams.interests}    // Guardamos los intereses introducidos en searchParams
                        onChange={handleInputChange}
                        placeholder="Ej: fútbol"
                        className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            
                {/* Botón para enviar el formulario de búsqueda */}
                <div className="text-center">
                    <button type="submit" className="inline-block px-6 py-3 my-6 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
                        Buscar Usuarios
                    </button>
                </div>
            </form>
            
            {/* Renderizamos UserInfo solo si hay resultados, mostrando la informacion de los usuarios filtrados */}
            {results.length > 0 && <UserInfo users={results} />}

        </div>
    );
};

export default SeeUsersByInterestsPage;