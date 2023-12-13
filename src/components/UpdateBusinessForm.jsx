// COMPONENTE PARA EL FORMULARIO DE MODIFICACION DE CONTENIDO DEL COMERCIO

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente UpdateBusinessForm que recibe los datos del comercio, el ID y una función onUpdate como props
function UpdateBusinessForm({ existingBusinessData, businessID, onUpdate }) {
    
    // Estado inicial del formulario, utilizando los datos existentes del comercio si existen
    const initialState = {
        city: existingBusinessData.city || '',
        activity: existingBusinessData.activity || '',
        title: existingBusinessData.title || '',
        summary: existingBusinessData.summary || '',
        texts: existingBusinessData.texts ? existingBusinessData.texts.join(',') : '',    // Convertimos el array de textos a una cadena
        photos: existingBusinessData.photos ? existingBusinessData.photos.join(',') : ''   // Convertimos el array de fotos a una cadena
    };

    // Creamos el estado formData para manejar los datos del formulario
    const [formData, setFormData] = useState(initialState);

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (field, value) => {
        // Evitamos actualizar campos vacíos si ya tenían un valor
        if (value === '' && existingBusinessData[field]) {
            return;
        }
        // Actualizamos formData cuando cambian los valores de los campos del formulario
        setFormData({ ...formData, [field]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();   // Prevenimos el comportamiento predeterminado del formulario

        // Comprobamos si hay datos existentes antes de continuar
        if (!existingBusinessData || existingBusinessData.length === 0) {
            alert('No hay datos existentes para este comercio.');
            return;
        }

        try {
            // Creamos un nuevo objeto con los datos actualizados
            const updatedData = { ...formData };

            // Convertimos las cadenas de textos y fotos de nuevo a arrays
            if (updatedData.texts) {
                updatedData.texts = updatedData.texts.split(',');
            }
            if (updatedData.photos) {
                updatedData.photos = updatedData.photos.split(',');
            }

            // Añadimos el businessID al objeto de datos actualizados
            updatedData.businessID = businessID;

            // Llamamos a la función onUpdate con los datos actualizados
            onUpdate(updatedData);

            // Restablecemos el formulario a su estado inicial
            setFormData(initialState);
        } catch (error) {
            // Capturamos y mostramos cualquier error que ocurra durante la actualización
            console.error('Error al actualizar información del comercio:', error);
        }
    };

    // Renderizamos el formulario de actualización del negocio
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-teal-400 to-teal-700">
            <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Formulario de modificación del Comercio</h2>

            {/* Campo para la ciudad */}
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-white">Ciudad:</label>
                <input type="text" id="city" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para la actividad del comercio */}
            <div className="mb-4">
                <label htmlFor="activity" className="block text-sm font-medium text-white">Actividad:</label>
                <input type="text" id="activity" value={formData.activity} onChange={(e) => handleChange('activity', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para el título */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-white">Título:</label>
                <input type="text" id="title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para el resumen */}
            <div className="mb-4">
                <label htmlFor="summary" className="block text-sm font-medium text-white">Resumen:</label>
                <textarea id="summary" value={formData.summary} onChange={(e) => handleChange('summary', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para los textos */}
            <div className="mb-4">
                <label htmlFor="texts" className="block text-sm font-medium text-white">Textos (separados por comas sin espacio):</label>
                <input type="text" id="texts" value={formData.texts} onChange={(e) => handleChange('texts', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para las fotos */}
            <div className="mb-4">
                <label htmlFor="photos" className="block text-sm font-medium text-white">Fotos (nombres de archivo separados por comas sin espacio):</label>
                <input type="text" id="photos" value={formData.photos} onChange={(e) => handleChange('photos', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className="bg-teal-950 text-white p-2 rounded-md hover:bg-teal-700 focus:outline-none">
                Actualizar Información
            </button>
        </form>
    );
};

export default UpdateBusinessForm;