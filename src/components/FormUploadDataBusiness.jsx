// COMPONENTE PARA LA PAGINA EN LA QUE EL COMERCIO SUBE SU CONTENIDO

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente FormUploadDataBusiness que recibe funciones y datos como props
function FormUploadDataBusiness({ onUpload, businessID, existingBusinessData }) {

    // Establecemos el estado inicial para el formulario con el contenido del comercio
    const initialState = {
        city: '',
        activity: '',
        title: '',
        summary: '',
        texts: [],    // Array de textos
        photos: [],   // Array de nombres de fotos
        scoring: '',
        numRatings: '',
        reviews: []    // Array de reseñas
    };

    // Creamos el estado formData para manejar los datos del formulario
    const [formData, setFormData] = useState(initialState);

    // Definimos una función para manejar los cambios en los campos del formulario
    const handleChange = (field, value) => {
        // Actualizamos formData cuando cambian los valores de los campos del formulario
        setFormData({ ...formData, [field]: value });
    };
    
    // Definimos una función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        // Prevenimos el comportamiento predeterminado del formulario
        e.preventDefault();
   
        // Comprobamos si hay datos existentes para este comercio antes de continuar
        if (!existingBusinessData || existingBusinessData.length === 0) {
            alert('No hay datos existentes para este comercio.');
            return;
        }

        // Accedemos a la información del comercio usando existingBusinessData[0]
        const businessInfo = existingBusinessData[0];

        // Comprobamos si alguna de las propiedades ya está registrada en el ncomercioegocio
        const isAnyPropertyRegistered = (
            businessInfo.city ||
            businessInfo.activity ||
            businessInfo.title ||
            businessInfo.summary ||
            (Array.isArray(businessInfo.texts) && businessInfo.texts.length > 0) ||
            (Array.isArray(businessInfo.photos) && businessInfo.photos.length > 0) ||
            businessInfo.scoring !== undefined ||
            businessInfo.numRatings !== undefined ||
            (Array.isArray(businessInfo.reviews) && businessInfo.reviews.length > 0)
        );

        if (isAnyPropertyRegistered) {
            alert('Este comercio tiene registrada la información relevante.');

            // Limpia el formulario restableciendo el estado del formulario al estado inicial
            setFormData(initialState);

            return;   // Salimos de la función si se encuentra información existente
        }

        try {
            // Preparamos los datos para subir, incluyendo el ID del comercio
            const uploadedData = {
                ...formData,
                texts: formData.texts.split(','),
                photos: formData.photos.split(','),
                reviews: formData.reviews.split(','),
                scoring: parseFloat(formData.scoring),
                numRatings: parseInt(formData.numRatings, 10),
                businessID
            };

            // Llamamos a la función onUpload con los datos procesados
            await onUpload(uploadedData);

            // Limpiamos el formulario restableciendo el estado del formulario al estado inicial
            setFormData(initialState);
        } catch (error) {
            // Capturamos y registramos cualquier error que ocurra durante el proceso
            console.error('Error al subir información del comercio:', error);
        }
    };

    // Renderizamos el formulario
    return (
        // Formulario con estilos de Tailwind CSS
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-blue-400 to-blue-600">
            {/* Título del formulario */}
            <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Formulario de Información del Comercio</h2>

            {/* Campo para introducir la ciudad */}
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-white">Ciudad:</label>
                <input type="text" id="city" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} required className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir la actividad del comercio */}
            <div className="mb-4">
                <label htmlFor="activity" className="block text-sm font-medium text-white">Actividad:</label>
                <input type="text" id="activity" value={formData.activity} onChange={(e) => handleChange('activity', e.target.value)} required className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir el título del comercio */}
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-white">Título:</label>
                <input type="text" id="title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} required className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir un resumen del comercio */}
            <div className="mb-4">
                <label htmlFor="summary" className="block text-sm font-medium text-white">Resumen:</label>
                <textarea id="summary" value={formData.summary} onChange={(e) => handleChange('summary', e.target.value)} required className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir textos relacionados con el comercio */}
            <div className="mb-4">
                <label htmlFor="texts" className="block text-sm font-medium text-white">Textos (separados por comas sin espacio):</label>
                <input type="text" id="texts" value={formData.texts} onChange={(e) => handleChange('texts', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir nombres de fotos relacionadas con el comercio */}
            <div className="mb-4">
                <label htmlFor="photos" className="block text-sm font-medium text-white">Fotos (nombres de archivo separados por comas sin espacio):</label>
                <input type="text" id="photos" value={formData.photos} onChange={(e) => handleChange('photos', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir la puntuación del comercio */}
            <div className="mb-4">
                <label htmlFor="scoring" className="block text-sm font-medium text-white">Scoring:</label>
                <input type="number" step="0.1" min="0" max="5" id="scoring" value={formData.scoring} onChange={(e) => handleChange('scoring', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir el número de puntuaciones del comercio */}
            <div className="mb-4">
                <label htmlFor="numRatings" className="block text-sm font-medium text-white">Número de puntuaciones:</label>
                <input type="number" min="0" id="numRatings" value={formData.numRatings} onChange={(e) => handleChange('numRatings', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir reseñas del comercio */}
            <div className="mb-4">
                <label htmlFor="reviews" className="block text-sm font-medium text-white">Reseñas (separadas por comas sin espacio):</label>
                <textarea id="reviews" value={formData.reviews} onChange={(e) => handleChange('reviews', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Boton para subir la informacion introducida */}
            <button type="submit" className="bg-blue-950 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
                Subir Información
            </button>
        </form>
    );
}

export default FormUploadDataBusiness;