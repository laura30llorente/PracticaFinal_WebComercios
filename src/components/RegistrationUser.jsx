// COMPONENTE PARA REGISTRAR USUARIO

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente RegistrationUser que recibe una función onRegister como prop
function RegistrationUser({ onRegister }) {
    // Estado inicial del formulario 
    const initialState = {
        userName: '',
        password: '',
        email: '',
        age: '',
        city: '',
        interests: [],
        allowsOffers: false,
    };

    // Creamos el estado formData para manejar los datos del formulario
    const [formData, setFormData] = useState(initialState);

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (field, value) => {
        // Actualizamos formData cuando cambian los valores de los campos del formulario
        setFormData({ ...formData, [field]: value });
    };

    // Función específica para manejar los cambios en el campo de intereses
    const handleInterestChange = (value) => {
        // Convertimos la cadena de intereses separada por comas en un array
        const interestsArray = value.split(',').map((interest) => interest.trim());
        // Actualizamos el estado de formData con los intereses
        setFormData({ ...formData, interests: interestsArray });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        // Prevenimos el comportamiento predeterminado del formulario
        e.preventDefault();

        try {
            // Llamamos a la función onRegister con los datos del formulario
            await onRegister(formData);

            // Limpiamos el formulario restableciendo el estado del formulario al estado inicial
            setFormData(initialState);
        } catch (error) {
            // Capturamos y mostramos cualquier error que ocurra durante el registro
            console.error('Error al registrar el usuario:', error);
        }
    };

    // Renderizamos el formulario de registro de usuario
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-blue-400 to-blue-600">
        <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Formulario para el Registro de Usuario</h2>

        {/* Campo para el nombre de usuario */}
        <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-white">
                Nombre de Usuario:
            </label>
            <input
                type="text"
                id="userName"
                value={formData.userName}
                onChange={(e) => handleChange('userName', e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        {/* Campo para la contraseña */}
        <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
                Contraseña:
            </label>
            <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        {/* Campo para el email */}
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
                E-mail:
            </label>
            <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        {/* Campo para la edad */}
        <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-white">
                Edad:
            </label>
            <input
                type="number"
                id="age"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        {/* Campo para la ciudad */}
        <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-white">
                Ciudad:
            </label>
            <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        {/* Campo para los intereses */}
        <div className="mb-4">
            <label htmlFor="interests" className="block text-sm font-medium text-white">
                Intereses (separados por comas sin espacio):
            </label>
            <input
                type="text"
                id="interests"
                value={formData.interests}
                onChange={(e) => handleInterestChange(e.target.value)} // Llama a la nueva función de manejo
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        {/* Opciones para permitir recibir ofertas */}
        <div className="mb-4">
            <label htmlFor="allowsOffers" className="block text-sm font-medium text-white">
                ¿Permite Recibir Ofertas?:
            </label>
            <div className="mt-1">
            <input
                type="radio"
                id="allowsOffersYes"
                value={true}
                checked={formData.allowsOffers === true}
                onChange={() => handleChange('allowsOffers', true)}
                className="mr-2"
            />
            <label htmlFor="allowsOffersYes" className="text-white">Sí</label>
            <input
                type="radio"
                id="allowsOffersNo"
                value={false}
                checked={formData.allowsOffers === false}
                onChange={() => handleChange('allowsOffers', false)}
                className="ml-4 mr-2"
            />
            <label htmlFor="allowsOffersNo" className="text-white">No</label>
            </div>
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="bg-blue-950 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
            Registrar Usuario
        </button>
        </form>
    );
}

export default RegistrationUser;