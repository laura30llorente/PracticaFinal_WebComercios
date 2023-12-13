// COMPONENTE PARA QUE EL USUARIO VOTE Y AÑADA UNA RESEÑA EN EL COMERCIO SI LO DESEA

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente BusinessVotingForm que recibe el comercio y la función onVote como props
function BusinessVotingForm({ business, onVote }) {

    // Establecemos el estado inicial para el formulario con un campo para la puntuación y un array para reseñas
    const initialState = {
        scoring: '',
        reviews: []   // Array de reseñas
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
        if (!business || business.length === 0) {
            alert('No hay datos existentes para este comercio.');
            return;
        }

        // Comprobamos si alguna de las propiedades ya está registrada en el negocio
        const isAnyPropertyRegistered = (
            business.scoring !== undefined ||
            business.numRatings !== undefined ||
            (Array.isArray(business.reviews) && business.reviews.length > 0)
        );

        if (!isAnyPropertyRegistered) {  
            // Alertamos si el comercio no tiene la información relevante y limpiamos el formulario
            alert('Este comercio no tiene registrada la información relevante.');
            setFormData(initialState);
            return;
        }

        try {
            // Preparamos los datos para votar, inicialmente vacíos
            const votingData = {};

            // Verificamos si formData.scoring está definido y no es NaN
            if (formData.scoring !== undefined && formData.scoring.trim() !== '' && !isNaN(parseFloat(formData.scoring))) {
                votingData.scoring = parseFloat(formData.scoring);
            }

            // Verificamos si formData.reviews está definido y no está vacío
            if (formData.reviews !== undefined && formData.reviews !== null) {
                // Comprobamos si formData.reviews es una cadena y no está vacía
                if (typeof formData.reviews === 'string' && formData.reviews.trim() !== "") {
                    votingData.reviews = formData.reviews.split(',').map(review => review.trim());
                }
            }

            // Llamamos a la función onVote con los datos procesados si hay al menos un campo válido
            if (Object.keys(votingData).length > 0) {
                await onVote(votingData);
            } else {
                alert('Por favor, introduzca algun campo');
            }

            // Restablecemos el formulario a su estado inicial después de la votación
            setFormData(initialState);
        } catch (error) {
            // Capturamos y registramos cualquier error que ocurra durante el proceso
            console.error('Error al realizar la votacion en el comercio:', error);
        }
    };

    // Renderizamos el formulario
    return (
        // Formulario con estilos de Tailwind CSS
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-red-600 to-red-900">
            {/* Título del formulario */}
            <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Formulario para votar en Comercio</h2>

            {/* Campo para introducir la puntuación */}
            <div className="mb-4">
                <label htmlFor="scoring" className="block text-sm font-medium text-white">Scoring:</label>
                <input type="number" step="0.1" min="0" max="5" id="scoring" placeholder="Califica de 0 a 5" value={formData.scoring} onChange={(e) => handleChange('scoring', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-300" />
            </div>

            {/* Campo para introducir reseñas */}
            <div className="mb-4">
                <label htmlFor="reviews" className="block text-sm font-medium text-white">Reseñas (separadas por comas sin espacio):</label>
                <textarea id="reviews" value={formData.reviews} onChange={(e) => handleChange('reviews', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-300" />
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className="bg-red-950 text-white p-2 rounded-md hover:bg-red-900 focus:outline-none">
                Votar en Comercio
            </button>
        </form>
    );
}

export default BusinessVotingForm;