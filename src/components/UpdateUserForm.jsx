// COMPONENTE PARA EL FORMULARIO DE MODIFICACION DE CONTENIDO DEL USUARIO

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente UpdateUserForm que recibe los datos existentes del usuario, el ID y una función onUpdate como props
function UpdateUserForm({ existingUserData, userID, onUpdate }) {
    
    // Estado inicial del formulario, utilizando los datos existentes del usuario si los tiene
    const initialState = {
        userName: existingUserData.userName || '',
        email: existingUserData.email || '',
        age: existingUserData.age || '',
        city: existingUserData.city || '',
        interests: existingUserData.interests ? existingUserData.interests.join(',') : '',   // Convertimos el array de intereses a una cadena
        allowsOffers: existingUserData.allowsOffers || false,   // Establecemos en false si no hay datos existentes
    };

    // Creamos el estado formData para manejar los datos del formulario
    const [formData, setFormData] = useState(initialState);

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (field, value) => {
        // Evitamos actualizar campos vacíos si ya tenían un valor
        if (value === '' && existingUserData[field]) {
            return;
        }
        // Actualizamos formData cuando cambian los valores de los campos del formulario
        setFormData({ ...formData, [field]: value });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();   // Prevenimos el comportamiento predeterminado del formulario

        // Comprobamos si hay datos existentes antes de continuar
        if (!existingUserData || existingUserData.length === 0) {
            alert('No hay datos existentes para este usuario.');
            return;
        }

        try {
            // Creamos un nuevo objeto con los datos actualizados
            const updatedData = { ...formData };

            // Convertimos las cadenas de intereses de nuevo a arrays
            if (updatedData.interests) {
                updatedData.interests = updatedData.interests.split(',');
            }

            // Añadimos el userID al objeto de datos actualizados
            updatedData.userID = userID;

            // Llamamos a la función onUpdate con los datos actualizados
            onUpdate(updatedData);

            // Restablecemos el formulario a su estado inicial
            setFormData(initialState);
        } catch (error) {
            // Capturamos y mostramos cualquier error que ocurra durante la actualización
            console.error('Error al actualizar información del usuario:', error);
        }
    };

    // Renderizamos el formulario de actualización del usuario
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-teal-400 to-teal-700">
            <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Formulario de modificación del Usuario</h2>

            {/* Campo para el nombre de usuario */}
            <div className="mb-4">
                <label htmlFor="userName" className="block text-sm font-medium text-white">Nombre de usuario:</label>
                <input type="text" id="userName" value={formData.userName} onChange={(e) => handleChange('userName', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para el email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">E-mail:</label>
                <input type="email" id="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para la edad */}
            <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-white">Edad:</label>
                <input type="number" id="age" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para la ciudad */}
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-white">Ciudad:</label>
                <input type="text" id="city" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Campo para los intereses */}
            <div className="mb-4">
                <label htmlFor="interests" className="block text-sm font-medium text-white">Intereses (separados por comas sin espacio):</label>
                <input type="text" id="interests" value={formData.interests} onChange={(e) => handleChange('interests', e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Opciones para permitir recibir ofertas */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Permite ofertas:</label>
                <div className="mt-2 space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="true"
                            checked={formData.allowsOffers === true}
                            onChange={() => handleChange('allowsOffers', true)}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-white">Sí</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="false"
                            checked={formData.allowsOffers === false}
                            onChange={() => handleChange('allowsOffers', false)}
                            className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-white">No</span>
                    </label>
                </div>
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit" className="bg-teal-950 text-white p-2 rounded-md hover:bg-teal-700 focus:outline-none">
                Actualizar Información
            </button>
        </form>
    );
};

export default UpdateUserForm;