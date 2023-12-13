// COMPONENTE PARA EL REGISTRO DE LOS COMERCIOS

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente RegistrationBusiness que recibe la función onRegister como prop
function RegistrationBusiness ({ onRegister }) {
  // Estado inicial del formulario 
  const initialState = {
    businessName: '',
    password: '',
    cif: '',
    address: '',
    email: '',
    contactPhone: '',
  };
  
  // Creamos el estado formData para manejar los datos del formulario
  const [formData, setFormData] = useState(initialState);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (field, value) => {
    // Actualizamos formData cuando cambian los valores de los campos del formulario
    setFormData({ ...formData, [field]: value });
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
      console.error('Error al registrar comercio:', error);
    }
  };

  // Renderizamos el formulario de registro
  return (
    // Formulario con estilos de Tailwind CSS
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md bg-gradient-to-r from-blue-400 to-blue-600">
      {/* Título del formulario */}
      <h2 className="text-2xl font-semibold mb-4 text-bg-blue-950">Registro de Comercio</h2>

      {/* Campos del formulario para ingresar la información del comercio */}
      <div className="mb-4">

        {/* Campo para el nombre del comercio */}
        <label htmlFor="businessName" className="block text-sm font-medium text-white">
          Nombre del Comercio:
        </label>
        <input
          type="text"
          id="businessName"
          value={formData.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
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

      {/* Campo para el CIF */}
      <div className="mb-4">
        <label htmlFor="cif" className="block text-sm font-medium text-white">
          CIF:
        </label>
        <input
          type="text"
          id="cif"
          value={formData.cif}
          onChange={(e) => handleChange('cif', e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Campo para la dirección */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-white">
          Dirección:
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
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

      {/* Campo para el teléfono de contacto */}
      <div className="mb-4">
        <label htmlFor="contactPhone" className="block text-sm font-medium text-white">
          Teléfono de Contacto:
        </label>
        <input
          type="tel"
          id="contactPhone"
          value={formData.contactPhone}
          onChange={(e) => handleChange('contactPhone', e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Botón para enviar el formulario */}
      <button type="submit" className="bg-blue-950 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
        Registrar Comercio
      </button>
    </form>
  );
};

export default RegistrationBusiness;