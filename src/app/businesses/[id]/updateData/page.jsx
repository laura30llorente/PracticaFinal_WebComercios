// COMPONENTE PARA LA PAGINA DE MODIFICAR CONTENIDO

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client"

// Utilizamos el hook de React y useState para manejar el estado
import React, { useState, useEffect } from 'react';
// Importamos el componente del formulario de actualización de comercios
import UpdateBusinessForm from "../../../../components/UpdateBusinessForm.jsx";
// Importamos Image para poder mostrar imagenes
import Image from "next/image";

// Definimos el componente UpdateDataPage, que recibe params
function UpdateDataPage({ params }) {
    // Creamos estados para almacenar los datos del comercio, el éxito de la actualización y la información actualizada
    const [business, setBusiness] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState(null);

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
                    throw new Error("Error al obtener el comercio. Status: " + response.status);
                }
                
                // Obtenemos los datos del comercio y los almacenamos en el estado
                const businessData = await response.json();
                setBusiness(businessData);
            
            } catch (error) {
                // Capturamos y registramos cualquier error que ocurra durante la obtención de los datos del comercio
                console.error('Error al obtener el comercio:', error);
            }
        }
        
        // Llamamos a la función para obtener los datos del negocio si tenemos un ID de comercio
        if (params.id) {
            fetchBusiness();
        }
    }, [params.id]);   // Dependencias del useEffect

    // Definimos la función para manejar la actualización del comercio
    const handleUpdate = async (updateFormData) => {
        try {
            // Realizamos una llamada a la API usando PUT para actualizar los datos del comercio
            const result = await fetch("/api/businesses/businessUpdateData", {
                method: "PUT",
                body: JSON.stringify(updateFormData),
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

            // Verificamos si la actualización fue exitosa
            if (result.ok && data.message === "Información del comercio actualizada con éxito") {
                // Almacenamos la información actualizada 
                setUpdatedInfo(updateFormData);   

                // Marcamos la actualización como exitosa
                setUpdateSuccess(true);           
                
                // Mostramos una alerta de éxito
                alert('Actualización de contenido exitosa');

                // Ocultamos la información actualizada después de 10 segundos
                setTimeout(() => {
                    setUpdatedInfo(null);
                    setUpdateSuccess(false);
                }, 10000);
            } else {
                // Manejamos los errores en la actualización
                if (data.errors && data.errors.length > 0) {
                    alert("Errores en la actualización - " + data.errors.join(", "));
                } else {
                    alert('Error al actualizar el contenido del comercio. Inténtalo de nuevo.');
                }
            }
            
        } catch (error) {
            // Capturamos y registramos cualquier error que ocurra durante la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos el componente de la página de actualización de datos del comercio
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10"> Actualizar contenido del comercio </h1>

            {/* Renderizamos el formulario de actualización si tenemos los datos del comercio */}
            {business && (
                <UpdateBusinessForm
                    existingBusinessData={business}
                    businessID={params.id} 
                    onUpdate={handleUpdate}
                />
            )}

            {/* Renderizamos la información actualizada del comercio si la actualización fue exitosa */}
            {updateSuccess && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-2"> Detalles Actualizados del Comercio </h2>
                    {updatedInfo.city && <p><strong>Ciudad:</strong> {updatedInfo.city}</p>}
                    {updatedInfo.activity && <p><strong>Actividad:</strong> {updatedInfo.activity}</p>}
                    {updatedInfo.title && <p><strong>Título:</strong> {updatedInfo.title}</p>}
                    {updatedInfo.summary && <p><strong>Resumen:</strong> {updatedInfo.summary}</p>}
                    
                    {/* Listamos los textos del comercio si están presentes */}
                    {updatedInfo.texts && (
                        <div>
                            <strong>Textos:</strong>
                            <ul>
                                {updatedInfo.texts.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Mostramos las fotos del comercio si están presentes */}
                    {updatedInfo.photos && (
                        <div>
                            <strong>Fotos:</strong>
                            <div className="flex space-x-2">
                                {updatedInfo.photos.map((photo, index) => (
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

export default UpdateDataPage;