// COMPONENTE PARA LA PAGINA DE SUBIR CONTENIDO

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client"

// Importamos los hooks de React para manejar el estado y los efectos
import React, { useState, useEffect } from 'react';
// Importamos el componente para el formulario de subida de datos de comercios
import FormUploadDataBusiness from '../../../../components/FormUploadDataBusiness.jsx';
// Importamos Image para poder mostrar imagenes
import Image from "next/image";

// Definimos el componente UploadDataPage, que recibe params
function UploadDataPage({ params }) {
    // Creamos estados para almacenar los datos del comercio, la información añadida, y estados de control de subida
    const [business, setBusiness] = useState(null);
    const [addedInfo, setAddedInfo] = useState(null);   // Estado para almacenar la información añadida
    const [isAdded, setIsAdded] = useState(false);   // Estado para rastrear si se ha añadido información
    const [isInfoUploaded, setIsInfoUploaded] = useState(false);   // Estado para rastrear si la información se ha subido

    // Utilizamos useEffect para cargar los datos del negocio cuando el componente se monta o cuando cambia el ID del negocio
    useEffect(() => {
        // Definimos una función asíncrona para obtener la información del comercio
        async function fetchBusiness() {
            try {
                // Realizamos una petición GET a la API para obtener la información del comercio
                // Pasamos el businessID con el id obtenido con los params
                const response = await fetch(`http://localhost:3000/api/businesses/businessFilter/?businessID=${params.id}`);
            
                // Lanzamos un error si la respuesta de la API no es satisfactoria
                if (!response.ok) {     
                    throw new Error(`Error al obtener el comercio. Status: ${response.status}`);
                }
                
                // Obtenemos los datos del comercio y los almacenamos en el estado
                const businessData = await response.json();
                setBusiness(businessData);
            
            } catch (error) {
                // Capturamos y registramos cualquier error que ocurra durante la obtención de los datos del comercio
                console.error('Error al obtener el comercio:', error);
            }
        }
        
        // Llamamos a la función para obtener los datos del comercio si tenemos un ID de comercio
        if (params.id) {
            fetchBusiness();
        }
    }, [params.id]);   // Dependencias del useEffect    

    // Definimos la función para manejar la subida de datos del comercio
    const handleUpload = async (formData) => {
        // Verificamos si la información ya se ha subido para evitar subidas duplicadas
        if (isInfoUploaded) {
            alert('La información ya se ha subido para este comercio.');
            return;
        }

        try {
            // Realizamos una llamada a la API usando POST para añadir los datos del comercio
            const result = await fetch("/api/businesses/businessAddData", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-type": "application/json",
                },
            });

            // Lanzamos un error si la respuesta de la API no es satisfactoria
            if (!result.ok) {  
                throw new Error("HTTP error! Status: " + result.status);
            }

            // Obtenemos la respuesta de la API y la procesamos
            const data = await result.json();

            // Verificamos si la adición fue exitosa
            if (data.message === "Información del comercio añadida con éxito") {
                // Establecemos la información añadida y actualizamos los estados de control a true para indicar éxito
                setAddedInfo(formData);   
                setIsAdded(true); 
                setIsInfoUploaded(true); 

                // Mostramos una alerta de éxito
                alert('Subida de contenido exitosa');

                // Ocultamos la información añadida después de 10 segundos
                setTimeout(() => {
                    setAddedInfo(null);
                    setIsAdded(false);
                }, 10000);

            } else {
                // Manejamos los errores en la subida
                alert('Error al subir el contenido del comercio. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Capturamos y registramos cualquier error que ocurra durante la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos el componente de la página de subida de datos del comercio
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10"> Subir contenido del comercio </h1>
        
            {/* Renderizamos el formulario de subida de datos, pasando la funcion handleUpload, el id del comercio y el comercio */}
            <FormUploadDataBusiness 
                onUpload={handleUpload} 
                businessID={params.id} 
                existingBusinessData={business}
            />

            {/* Renderizamos la tarjeta con los datos añadidos si la subida fue exitosa */}
            {isAdded && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-2">Detalles de los datos añadidos del comercio</h2>
                    {addedInfo.city && <p><strong>Ciudad:</strong> {addedInfo.city}</p>}
                    {addedInfo.activity && <p><strong>Actividad:</strong> {addedInfo.activity}</p>}
                    {addedInfo.title && <p><strong>Título:</strong> {addedInfo.title}</p>}
                    {addedInfo.summary && <p><strong>Resumen:</strong> {addedInfo.summary}</p>}

                    {/* Listamos los textos añadidos del comercio si están presentes */}
                    {addedInfo.texts && (
                        <div>
                            <strong>Textos:</strong>
                            <ul>
                                {addedInfo.texts.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Mostramos las fotos añadidas del comercio si están presentes */}
                    {addedInfo.photos && (
                        <div>
                            <strong>Fotos:</strong>
                            <div className="flex space-x-2">
                                {addedInfo.photos.map((photo, index) => (
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

                    {/* Mostramos la puntuacion y el número de votaciones añadidos del comercio si están presentes */}
                    {addedInfo.scoring && <p><strong>Valoración:</strong> {addedInfo.scoring}</p>}
                    {addedInfo.numRatings && <p><strong>Número de puntuaciones:</strong> {addedInfo.numRatings}</p>}

                    {/* Mostramos las reseñas añadidas del comercio si están presentes */}
                    {addedInfo.reviews && (
                        <div>
                            <strong>Reseñas:</strong>
                            <ul>
                                {addedInfo.reviews.map((review, index) => (
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

export default UploadDataPage;