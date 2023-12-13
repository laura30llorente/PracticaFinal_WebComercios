// COMPONENTE PARA EL APARTADO BUSINESSES

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React para usarlo en nuestro componente
import React from 'react';
// Importamos el componente Login desde su ruta
import Login from '../../components/Login.jsx'; 
// Importamos useRouter de 'next/navigation' para manejar la navegación dentro de nuestra aplicación
import { useRouter } from 'next/navigation';

// Definimos el componente BusinessesPage
function BusinessesPage() {
    // Utilizamos el hook useRouter para obtener la instancia del router
    const router = useRouter();

    // Definimos la función handleLogin para manejar el inicio de sesión de los comercios
    const handleLogin = async (business, pass) => {
        try {
            // Realizamos una petición POST a la API para el inicio de sesión del comercio
            const result = await fetch("/api/businesses/businessLogin", {
                method: "POST",
                body: JSON.stringify({ business, pass }),
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
                // Notificamos al comercio sobre el éxito del inicio de sesión
                alert('Inicio de sesión exitoso del comercio');

                // Redirigimos al comercio a su página específica con su ID
                router.push(`/businesses/${data.businessID}/`);   
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

    // Renderizamos la página de comercios
    return (
        <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">
            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Comercios</h1>
            
            {/* Contenedor de las tarjetas de información con un diseño de cuadrícula */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
                {/* Primera tarjeta con información sobre lo que pueden hacer los comercios */}
                <div className="bg-sky-500 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Qué puedes hacer?</h3>
                    <p> Podrás subir contenido, modificar alguno de tus datos y 
                        consultar los intereses de los usuarios de tu ciudad para enviarles un correo.
                    </p>
                </div>

                {/* Segunda tarjeta con información sobre las limitaciones de los comercios */}
                <div className="bg-sky-600 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Qué no puedes hacer?</h3>
                    <p>No podrás modificar el scoring, la cantidad de votaciones ni las reseñas.</p>
                </div>

                {/* Tercera tarjeta informando a los comercios de que pueden darse de baja si lo desean */}
                <div className="bg-sky-700 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Me puedo dar de baja?</h3>
                    <p>¡Por supuesto! Puedes darte de baja en el apartado correspondiente cuando lo desees.</p>
                </div>
            </div>

            {/* Incluimos el componente Login con la función handleLogin como prop */}
            <div className="mt-12"> 
                <Login onLogin={handleLogin} />
            </div>
        </div> 
    );
};

export default BusinessesPage;