// COMPONENTE PARA LA ELIMINAR EL CONTENIDO DEL COMERCIO

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos Image para poder mostrar imagenes
import Image from "next/image";

// Definimos el componente DeleteBusinessDataPage, que recibe params
function DeleteBusinessDataPage({ params }) {
    // Creamos un estado para almacenar la información del comercio
    const [business, setBusiness] = useState(null);
    // Creamos un estado para almacenar el mensaje de éxito
    const [successMessage, setSuccessMessage] = useState('');

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

    // Definimos una función para manejar la eliminación de datos del comercio dependiendo del id
    const deleteBusinessData = async (id) => {
        try {
            // Realizamos una petición DELETE a la API para eliminar los datos del comercio, con el id del comercio
            const result = await fetch(`/api/businesses/businessDeleteData/${id}/`, { 
                method: "DELETE",
            });
    
            // Verificamos si la respuesta no fue exitosa
            if (!result.ok) {
                throw new Error("HTTP error! Status: " + result.status);
            }
    
            // Convertimos la respuesta en JSON y procesamos el mensaje
            const response = await result.json();

            // Notificamos al usuario sobre el resultado de la eliminación
            alert(response.message); 
            
            // Verificamos si la eliminación fue exitosa
            if (response.message === "Contenido del comercio eliminado con éxito") {
                // Actualizamos el estado para reflejar que la información del comercio ha sido eliminada
                // Eliminamos los campos específicos que hay que eliminar: se eliminan los campos que introduce el comercio, no los que introduce el admin
                if (business) {
                    delete business.city;
                    delete business.activity;
                    delete business.title;
                    delete business.summary;
                    delete business.texts;
                    delete business.photos;
                    delete business.scoring;
                    delete business.numRatings;
                    delete business.reviews;
                }

                // Mostramos el mensaje de éxito
                setSuccessMessage(response.message);

            } else {
                // Notificamos al usuario si hubo un error en la eliminación
                alert('Error al borrar el contenido del comercio. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Capturamos y manejamos cualquier error durante la eliminación de datos
            console.error('Error al realizar la solicitud:', error);
            alert('Error al eliminar campos del comercio. Consulta la consola para más detalles.');
        }
    };
    
    // Intentamos renderizar la página de eliminacion del contenido del comercio
    return (
        // Renderizamos la página para eliminar el contenido del comercio
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Eliminar contenido del comercio</h1>
            
            {/* Verificamos si la información del comercio está disponible y la mostramos */}
            {business && (
                <div className="bg-sky-300 border p-4 rounded-lg shadow-lg w-full flex flex-col"> {/* flex flex-col aquí asegura la distribución vertical */}
                    {/* Mostramos la información del comercio */}
                    <div>
                        <h2 className="text-xl font-bold mb-2"> Contenido del Comercio a eliminar </h2>

                        {/* Mostramos cada campo relevante del comercio */}
                        {business.city && <p><strong>Ciudad:</strong> {business.city}</p>}
                        {business.activity && <p><strong>Actividad:</strong> {business.activity}</p>}
                        {business.title && <p><strong>Título:</strong> {business.title}</p>}
                        {business.summary && <p><strong>Resumen:</strong> {business.summary}</p>}
                        
                        {/* Listamos los textos del comercio si están presentes */}
                        {business.texts && (
                            <div>
                                <strong>Textos:</strong>
                                <ul>
                                    {business.texts.map((text, index) => (
                                        <li key={index}>{text}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Mostramos las fotos del comercio si están presentes */}
                        {business.photos && (
                            <div>
                                <strong>Fotos:</strong>
                                <div className="flex space-x-2">
                                    {business.photos.map((photo, index) => (
                                        <div key={index} className="w-full sm:w-auto">
                                            <Image
                                                key={index}
                                                src={`/images/${photo}`}
                                                alt={"Foto " + (index + 1)}
                                                width={96}  
                                                height={96}  
                                                style={{ maxWidth: "100%", height: "auto" }}
                                                className="w-full object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botón para eliminar el contenido del comercio, llamando a la funcion deleteBusinessData con el id del comercio*/}
                    <button
                        onClick={() => deleteBusinessData(business.businessID)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full mt-4"
                    >
                        Eliminar Contenido
                    </button>
                </div>
            )}

            {/* Mostramos el mensaje de éxito si está presente */}
            {successMessage && (
                <div className="bg-green-400 text-white p-2 mt-4 rounded-lg shadow-md">
                    {successMessage}
                </div>
            )}
        </div>  
    );
};

export default DeleteBusinessDataPage;