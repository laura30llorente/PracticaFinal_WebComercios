// COMPONENTE PARA EL APARTADO DE ID DE COMERCIOS

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Importamos React y los hooks useState y useEffect desde 'react'
import React, { useState, useEffect } from 'react';
// Importamos el componente BusinessInfo desde su ruta
import BusinessInfo from '../../../components/BusinessInfo.jsx';

// Definimos el componente BusinessIDPage, que recibe params
function BusinessIDPage({ params }) {
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
          throw new Error("Error al obtener el comercio. Status: " + response.status);
        }
        
        // Convertimos la respuesta en JSON y actualizamos el estado con los datos
        const businessData = await response.json();
        setBusiness(businessData);
      
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

  // Intentamos renderizar la página
  try {
    return (
      // Renderizamos la página de información del comercio
      <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">
          {/* Título de la página con estilo de fuente grande y en negrita */}
          <h1 className="text-3xl font-bold text-center mb-10">Información del comercio</h1>

          {/* Utilizamos el componente BusinessInfo para mostrar la información del comercio que ha iniciado sesión */}
          <BusinessInfo businesses={business} />
      </div>
    );
  } catch (error) {
    // Capturamos y manejamos cualquier error durante la renderización de la página
    console.error('Error en la página de ID de comercio:', error);
   
    // Renderizamos un mensaje de error si hay un problema
    return <div>Error en la página de ID de comercio. Consulta la consola para más detalles.</div>;
  }
};

export default BusinessIDPage;