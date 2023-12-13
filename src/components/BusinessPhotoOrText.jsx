// COMPONENTE PARA SUBIR FOTOS Y TEXTOS AL COMERCIO

// Importamos useState de React para gestionar el estado del componente
import React, { useState } from 'react';

// Definimos el componente BusinessPhotoOrText que recibe el comercio y la función onUpload como props
function BusinessPhotoOrText({ business, onUpload }) {

    // Establecemos el estado inicial para el formulario con arrays vacíos para textos y fotos
    const initialState = {
        texts: [],
        photos: [] 
    };

    // Creamos el estado formData para gestionar los datos del formulario
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
        if (!business || business.length === 0) {
            alert('No hay datos existentes para este comercio.');
            return;
        }

        // Comprobamos si los campos de textos y fotos están registrados en el negocio
        const isPropertyRegistered = (
            Array.isArray(business.texts) && Array.isArray(business.photos)
        );
        
        if (!isPropertyRegistered) {  
            // Alertamos si el comercio no tiene los campos necesarios y limpiamos el formulario
            alert('Este comercio no tiene registrados los campos de textos o fotos.');
            setFormData(initialState);
            return;
        }

        try {

            // Preparamos los datos para subir, inicialmente vacíos
            const uploadingData = {};

            // Verificamos si formData.texts está definido y no está vacío
            if (formData.texts !== undefined && formData.texts !== null) {
                
                // Comprobamos si formData.texts es una cadena y no está vacía
                if (typeof formData.texts === 'string' && formData.texts.trim() !== "") {
                    uploadingData.texts = formData.texts.split(',').map(review => review.trim());
                } 
            }

            // Verificamos si formData.photos está definido y no está vacío
            if (formData.photos !== undefined && formData.photos !== null) {

                // Comprobamos si formData.photos es una cadena y no está vacía
                if (typeof formData.photos === 'string' && formData.photos.trim() !== "") {
                    uploadingData.photos = formData.photos.split(',').map(review => review.trim());
                } 
            }

            // Llamamos a la función onUpload con los datos procesados si hay al menos un campo válido
            if (Object.keys(uploadingData).length > 0) {
                await onUpload(uploadingData);
            } else {
                alert('Por favor, al menos introduzca o textos o fotos');
            }

            // Restablecemos el formulario a su estado inicial después de la subida
            setFormData(initialState);
        } catch (error) {
            // Capturamos y registramos cualquier error que ocurra durante el proceso
            console.error('Error al realizar la subida de textos o fotos:', error);
        }
    };

    // Renderizamos el formulario
    return (
        // Formulario con estilos de Tailwind CSS
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-cyan-500 to-cyan-900">
            {/* Título del formulario */}
            <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Formulario para subir fotos o textos</h2>

            {/* Campo para introducir textos */}
            <div className="mb-4">
                <label htmlFor="texts" className="block text-sm font-medium text-white">Textos (separados por comas sin espacio):</label>
                <input type="text" id="texts" value={formData.texts} onChange={(e) => handleChange('texts', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para introducir fotos */}
            <div className="mb-4">
                <label htmlFor="photos" className="block text-sm font-medium text-white">Fotos (nombres de archivo separados por comas sin espacio):</label>
                <input type="text" id="photos" value={formData.photos} onChange={(e) => handleChange('photos', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className="bg-cyan-950 text-white p-2 rounded-md hover:bg-cyan-900 focus:outline-none">
                Subir fotos o texto
            </button>
        </form>
    );
}

export default BusinessPhotoOrText;