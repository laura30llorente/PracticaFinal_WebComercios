// COMPONENTE PARA LA PAGINA DE VOTAR EN UNA PAGINA Y PONER RESEÑA

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos el componente BusinessInfo desde su Rruta
import BusinessInfo from "../../../../components/BusinessInfo.jsx";
// Importamos el componente BusinessVotingForm desde su ruta
import BusinessVotingForm from "../../../../components/BusinessVotingForm.jsx";

// Definimos el componente VoteInBusinessPage
function VoteInBusinessPage() {
    // Creamos un estado para almacenar el negocio seleccionado
    const [business, setBusiness] = useState(null);
    // Creamos un estado para rastrear si la votación fue exitosa
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Creamos un estado para almacenar los parámetros de búsqueda
    const [searchParams, setSearchParams] = useState({
        businessID: ''
    });

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
        
        // Reiniciamos los resultados a un array vacío antes de realizar la nueva búsqueda
        setBusiness([]);
        
        // Solo continuamos si el parámetro de búsqueda está presente
        if (!searchParams.businessID) {
            alert('Por favor, ingrese un ID de comercio para buscar.');
            return;
        }

        // Creamos un objeto URLSearchParams para gestionar los parámetros de la URL
        const queryParams  = new URLSearchParams();

        // Añadimos el businessID al objeto queryParams si existe
        if (searchParams.businessID) queryParams.append("businessID", searchParams.businessID);
    
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
            
            // Establecemos el negocio en función de la respuesta
            if (Array.isArray(data) && data.length > 0) {
                // Si data es un array, tomamos el primer elemento como el objeto business 
                setBusiness(data[0]);
            } else if (!Array.isArray(data)) {
                // Si data no es un array, asignamos data directamente a business
                setBusiness(data);
            } else {
                // Si data es un array vacío, configuramos business como null 
                setBusiness(null);

                // Mostramos un alert indicando que no se encontró ningún comercio con el ID proporcionado
                alert('No se encontró ningún comercio con el ID proporcionado.');

                // Borramos los valores de búsqueda después de completar la búsqueda
                setSearchParams({
                    businessID: ''
                });

                return;
            }

            // Borrar los valores de búsqueda después de completar la búsqueda
            setSearchParams({
                businessID: ''
            });
        } catch (error) {
            // Capturamos y manejamos cualquier error en la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Definimos una función para manejar la votación y actualización de datos del negocio
    const handleVote = async (votingFormData) => {
        
        // Tenemos el scoring actual y el número actual de calificaciones
        const currentScoring = parseFloat(business.scoring); 
        const currentNumRatings = parseInt(business.numRatings);

        let newScoring = currentScoring;
        let newNumRatings = currentNumRatings;

        // Si se ha introducido scoring en el formulario
        if (!isNaN(votingFormData.scoring) && votingFormData.scoring !== '') {
            // Calculamos el nuevo promedio de puntuación y actualizamos el número de votaciones
            newScoring = ((currentScoring * currentNumRatings) + parseFloat(votingFormData.scoring)) / (currentNumRatings + 1);
        }

        // Aseguramos de que newScoring tenga exactamente dos decimales
        const formattedScoring = newScoring.toFixed(2);
        
        // Preparamos los datos actualizados para la solicitud
        const requestData = {
            ...votingFormData,
            scoring: formattedScoring,
            numRatings: newNumRatings,
            isScoringUpdated: !isNaN(votingFormData.scoring) && votingFormData.scoring !== '',   // Para saber si se ha introducido o no scoring en el formulario
            businessID: business.businessID
        };
        
        try {
            // Realizamos una petición PATCH a la API para actualizar los datos del comercio
            const result = await fetch("/api/businesses/businessVotingData", {
                method: "PATCH",
                body: JSON.stringify(requestData),
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
           
            // Verificamos si la actualización fue exitosa
            if (result.ok && data.message === "Información del comercio actualizada con éxito") {
                // Actualizamos el estado con el objeto business actualizado
                setBusiness(data.updatedBusiness);

                // Indicamos que la actualización fue exitosa
                setUpdateSuccess(true);           
                
                // Mostramos un mensaje para avisar de que la actualización fue exitosa
                alert('Actualización de votaciones y reseñas del comercio exitosa');

                // Ocultamos la información actualizada después de 10 segundos
                setTimeout(() => {
                    setUpdateSuccess(false);
                }, 10000);
            } 
            
        } catch (error) {
            // Capturamos y manejamos cualquier error en la actualización de datos
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página para votar y añadir reseñas en un comercio
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Votar y añadir Reseña en Comercio</h1>
            
            {/* Formulario para buscar el comercio por su ID */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">

                {/* Campo de entrada para el ID del comercio */}
                <div className="mb-5">
                    <label htmlFor="businessID" className="block text-lg font-medium text-gray-700 mb-2">
                        ID del comercio que desea calificar:
                    </label>
                    <input
                        type="text"
                        id="businessID"
                        name="businessID"
                        value={searchParams.businessID}   // Guardamos el ID introducido en searchParams
                        onChange={handleInputChange}
                        placeholder="Ej: 13"
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
            
            {/* Renderizamos BusinessInfo y BusinessVotingForm si hay un comercio seleccionado */}
            {business && (
                <>
                    {/* Mostramos la información del comercio */}
                    <BusinessInfo businesses={Array.isArray(business) ? business : [business]} />

                    {/* Mostramos el formulario para que puedan votar y añadir reseñas */}
                    <BusinessVotingForm business={business} onVote={handleVote} />
                </>
            )}

            {/* Renderizamos la información actualizada solo si la actualización fue exitosa */}
            {updateSuccess && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-2"> Detalles Actualizados del Comercio tras la votación </h2>
                    
                    {/* Mostramos la valoración y el número de votaciones del comercio */}
                    {business.scoring && <p><strong>Valoración:</strong> {business.scoring}</p>}
                    {business.numRatings && <p><strong>Número de votaciones:</strong> {business.numRatings}</p>}
                    
                    {/* Mostramos las reseñas del negocio si las hay */}
                    {business.reviews && (
                        <div>
                            <strong>Reseñas:</strong>
                            <ul>
                                {business.reviews.map((review, index) => (
                                    <li key={index}>{review}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

        </div>  
    );
};

export default VoteInBusinessPage;