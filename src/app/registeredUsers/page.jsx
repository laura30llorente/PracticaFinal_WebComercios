// COMPONENTE PARA EL APARTADO DE USUARIOS REGISTRADOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React 
import React from 'react';
// Importamos el componente Login desde su ruta
import Login from '../../components/Login.jsx'; 
// Importamos useRouter de next/navigation para manejar la navegación
import { useRouter } from 'next/navigation';

// Definimos el componente RegisteredUsersPage
function RegisteredUsersPage() {
    // Utilizamos el hook useRouter para obtener la instancia del router
    const router = useRouter();

    // Definimos la función handleLogin para manejar el inicio de sesión
    const handleLogin = async (user, pass) => {
        try {
            // Realizamos una petición POST a la API para el inicio de sesión
            const result = await fetch("/api/registeredUsers/userLogin/", {
                method: "POST",
                body: JSON.stringify({ user, pass }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            // Verificamos si la respuesta no fue exitosa
            if (!result.ok) {
                throw new Error("HTTP error! Status: " + result.status);
            }

            // Convertimos la respuesta en JSON
            const data = await result.json();

            // Verificamos si el mensaje de la respuesta es 'OK'
            if (data.message === "OK") {
                // Notificamos al usuario sobre el éxito del inicio de sesión
                alert('Inicio de sesión exitoso del usuario');

                // Guardamos el ID del usuario en el almacenamiento local
                localStorage.setItem('userID', data.userID);
                
                // Redirigimos al usuario a la página de usuarios que han hecho login
                router.push("/registeredUsers/loggedUsers");   

            } else {
                // Notificamos al usuario si las credenciales son incorrectas
                alert('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        } catch (error) {
            // Capturamos y manejamos cualquier error durante la llamada a la API
            console.error('Error al realizar la llamada a la API:', error);

            // Notificamos al usuario sobre el error
            alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
        }
    };

    // Renderizamos la página de usuarios registrados
    return (
        <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">

            <h1 className="text-3xl font-bold text-center mb-10">Usuarios registrados</h1>
            
            {/* Mostramos información relevante para los usuarios registrados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
                <div className="bg-cyan-700 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Qué puedes hacer?</h3>
                    <p>Podrás modificar todos tus datos y decidir si quieres o no recibir ofertas.</p>
                </div>
                <div className="bg-cyan-500 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Me puedo dar de baja?</h3>
                    <p>¡Por supuesto! Puedes darte de baja en el apartado correspondiente cuando lo desees.</p>
                </div>
                <div className="bg-cyan-300 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Puedo votar en los comercios?</h3>
                    <p>Sí, puedes votar en la página de los comercios existentes, así como dejar una reseña opcionalmente.</p>
                </div>
            </div>

            {/* Incluimos el componente Login con la función handleLogin como prop */}
            <div className="mt-12"> 
                <Login onLogin={handleLogin} />
            </div>
        </div> 
    );
};

export default RegisteredUsersPage;