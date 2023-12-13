// COMPONENTE PARA QUE EL COMERCIO SUBA FOTOS O TEXTOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client"

// Importamos el componente para el formulario de subida de fotos o textos de comercios
import BusinessPhotoOrText from '../../../../components/BusinessPhotoOrText.jsx';
// Importamos los hooks de React para manejar el estado y los efectos
import React, { useState, useEffect } from 'react';
// Importamos Image para poder mostrar imagenes
import Image from "next/image";

// Definimos el componente UploadPhotoPage, que recibe params
function UploadPhotoPage({ params }) {
    // Creamos estados para almacenar los datos del comercio, la información añadida y si se ha añadido correctamente
    const [business, setBusiness] = useState(null);
    const [addedInfo, setAddedInfo] = useState(null);   // Estado para almacenar la información añadida
    const [isAdded, setIsAdded] = useState(false);    // Estado para controlar si se ha añadido la información

    // Utilizamos useEffect para cargar los datos del comercio cuando el componente se monta o cuando cambia el ID del negocio
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
                
                // Manejamos la respuesta en función de si es un array o un objeto
                if (Array.isArray(businessData) && businessData.length > 0) {
                    // Si businessData es un array, tomamos el primer elemento y lo configuramos en business
                    setBusiness(businessData[0]);
                } else if (!Array.isArray(businessData)) {
                    // Si businessData no es un array, asignamos directamente a business
                    setBusiness(businessData);
                } else {
                    // Si businessData es un array vacío, configuramos business como null 
                    setBusiness(null);
    
                    // Alerta indicando que no se encontró el comercio
                    alert('No se encontró ningún comercio con el ID proporcionado.');
    
                    return;
                }
            
            } catch (error) {
                // Capturamos y registramos cualquier error durante la obtención de los datos del comercio
                console.error('Error al obtener el comercio:', error);
            }
        }
        
        // Llamamos a la función para obtener los datos del comercio si tenemos un ID de comercio
        if (params.id) {
            fetchBusiness();
        }
    }, [params.id]);   // Dependencias del useEffect    

    // Definimos la función para manejar la subida de fotos y textos
    const handleUpload = async (formData) => {
        
        // Preparamos los datos para la solicitud API, con los datos recibidos en formData y el ID del comercio
        const requestData = {
            ...formData,
            businessID: business.businessID
        };

        try {
            // Realizamos una llamada a la API usando POST para subir las fotos y/o textos
            const result = await fetch("/api/businesses/businessUploadPhotosTexts", {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: {
                    "Content-type": "application/json",
                },
            });

            // Lanzamos un error si la respuesta de la API no es satisfactoria
            if (!result.ok) {   
                throw new Error("HTTP error! Status: " + result.status);
            }

            // Obtenemos y procesamos la respuesta de la API
            const data = await result.json();

            // Verificamos si la subida fue exitosa
            if (data.message === "Fotos o textos del comercio añadidos con éxito") {
                // Establecemos la información añadida y actualizamos el estado de control
                setAddedInfo(formData);   
                setIsAdded(true);   // Indicamos que la subida fue exitosa

                // Mostramos una alerta de éxito
                alert('Subida de contenido exitosa');

                // Ocultamos la información añadida después de 10 segundos
                setTimeout(() => {
                    setAddedInfo(null);
                    setIsAdded(false);
                }, 10000);

            } else {
                // Manejamos los errores en la subida
                alert('Error al subir las fotos o el texto del comercio. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Capturamos y registramos cualquier error durante la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos el componente de la página de subida de fotos o textos del comercio
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10"> Subir fotos o textos del comercio </h1>
        
            {/* Renderizamos el componente para subir fotos o textos, pasando el comercio y la funcion handleUpload */}
            <BusinessPhotoOrText 
                business={business} 
                onUpload={handleUpload} 
            />

            {/* Renderizamos la tarjeta con los datos añadidos si la subida fue exitosa */}
            {isAdded && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-2">Detalles de los datos añadidos del comercio</h2>
                   
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
                            <div>
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
                </div>
            )}
        </div>  
    );
};

export default UploadPhotoPage;