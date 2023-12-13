// COMPONENTE PARA LA PAGINA DE REGISTRO DE COMERCIOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y el hook useState desde 'react'
import React, { useState } from 'react';
// Importamos el componente RegistrationBusiness desde su ruta
import RegistrationBusiness from '../../../../components/RegistrationBusiness.jsx';

// Definimos el componente RegisterBusinessPage
function RegisterBusinessPage() {
    // Creamos un estado para almacenar las credenciales de los comercios
    const [credentials, setCredentials] = useState({ businessName: '', password: '' });
    // Creamos un estado para rastrear si un comercio se ha registrado correctamente
    const [isRegistered, setIsRegistered] = useState(false);

    // Definimos una función para manejar el registro de comercios
    const handleRegister = async (formData) => {
        try {
            // Realizamos una petición POST a la API para registrar el comercio
            const result = await fetch("/api/businesses/businessRegister", {
                method: "POST",
                body: JSON.stringify(formData),
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

            // Verificamos si el mensaje de la respuesta indica un registro exitoso
            if (data.message === "Guardando datos…") {
                // Actualizamos las credenciales con los datos del formulario
                setCredentials({ 
                    businessName: formData.businessName, 
                    password: formData.password,
                });
                
                // Actualizamos el estado para indicar que el registro fue exitoso
                setIsRegistered(true);

                // Notificamos al usuario sobre el éxito del registro
                alert('Registro exitoso del comercio');

                // Establecemos un temporizador para restablecer la información después de un tiempo
                setTimeout(() => {
                    // Restablecemos las credenciales y el estado de registro
                    setCredentials({ businessName: '', password: '' });
                    setIsRegistered(false);
                }, 10000);   // 10 segundos.

            } else {
                // Notificamos al usuario sobre un error en el registro
                alert('Error al registrar el comercio. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Capturamos y manejamos cualquier error durante la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            // Notificamos al usuario sobre el error
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página de registro de comercios
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-10">Dar de alta Comercios</h1>
            {/* Pasamos la función handleRegister como prop al componente RegistrationBusiness */}
            <RegistrationBusiness onRegister={handleRegister}/>

            {/* Renderiza la tarjeta solo si el registro fue exitoso */}
            {isRegistered && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-2">Detalles del Comercio para el Login</h2>
                    <p><strong>Nombre del Comercio:</strong> {credentials.businessName}</p>
                    <p><strong>Contraseña:</strong> {credentials.password}</p>
                </div>
            )}
        </div>  
    );
};

export default RegisterBusinessPage;