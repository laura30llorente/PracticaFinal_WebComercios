// COMPONENTE PARA LA PAGINA DE REGISTRO DE USUARIOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y el hook useState desde 'react'
import React, { useState } from 'react';
// Importamos el componente RegistrationUser desde su ruta
import RegistrationUser from '../../../components/RegistrationUser.jsx';

// Definimos el componente RegisterUserPage
function RegisterUserPage() {
    // Creamos un estado para almacenar las credenciales del usuario
    const [credentials, setCredentials] = useState({ userName: '', password: '' });
    // Creamos un estado para rastrear si un usuario se ha registrado correctamente
    const [isRegistered, setIsRegistered] = useState(false);

    // Definimos una función para manejar el registro de usuarios
    const handleRegister = async (formData) => {
        try {
            // Realizamos una petición POST a la API para registrar el usuario
            const result = await fetch("/api/unregisteredUsers/userRegister/", {
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
                    userName: formData.userName, 
                    password: formData.password,
                });
                
                // Actualizamos el estado para indicar que el registro fue exitoso
                setIsRegistered(true);

                // Notificamos al usuario sobre el éxito del registro
                alert('Registro exitoso');

                // Establecemos un temporizador para restablecer la información después de un tiempo
                setTimeout(() => {
                    setCredentials({ userName: '', password: '' });
                    setIsRegistered(false);
                }, 10000);   // 10 segundos

            } else {
                // Notificamos al usuario sobre un error en el registro
                alert('Error al registrar el usuario. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Capturamos y manejamos cualquier error durante la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);
            
            // Notificamos al usuario sobre el error
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página de registro de usuarios
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Registrar Usuarios</h1>
            {/* Pasamos la función handleRegister como prop al componente RegistrationUser */}
            <RegistrationUser onRegister={handleRegister}/>

            {/* Renderizamos los detalles del usuario registrado si el registro fue exitoso */}
            {isRegistered && (
                <div className="mt-5 p-4 border rounded-md shadow-lg bg-teal-600 max-w-sm mx-auto">
                    <h2 className="text-xl font-bold mb-2">Detalles del Usuario para el Login</h2>
                    <p><strong>Nombre del Usuario:</strong> {credentials.userName}</p>
                    <p><strong>Contraseña:</strong> {credentials.password}</p>
                </div>
            )}
        </div>  
    );
};

export default RegisterUserPage;