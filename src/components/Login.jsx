// LOGIN 

// Importamos useState de React para manejar el estado del componente
import React, { useState } from 'react';

// Definimos el componente Login
function Login(props) {
  // Creamos estados para el nombre de usuario y la contraseña
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Definimos una función para manejar el proceso de inicio de sesión
  const handleLogin = async (event) => {
    try {
      // Evitamos la recarga de la página al enviar el formulario
      event.preventDefault();

      // Llamamos a la función onLogin proporcionada en las props para manejar la autenticación
      await props.onLogin(username, password);
    } catch (error) {
      // Capturamos y mostramos cualquier error que ocurra durante el proceso de inicio de sesión
      console.error('Error al intentar iniciar sesión:', error);
    }
  };

  // Renderizamos el formulario de inicio de sesión
  return (
    // Contenedor principal del formulario con estilos de Tailwind CSS
    <div className="min-w-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
      {/* Contenedor del formulario con un ancho máximo */}
      <div className="max-w-md w-full space-y-8 mb-10">
        <div>
          {/* Título del formulario */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
        </div>

        {/* Formulario de inicio de sesión */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Input oculto, útil para manejar la funcionalidad de recordar usuario */}
          <input type="hidden" name="remember" defaultValue="true" />
          {/* Contenedores para los campos de nombre de usuario y contraseña */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>

              {/* Campo de entrada para el nombre de usuario */}
              <label htmlFor="username" className="sr-only">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>

              {/* Campo de entrada para la contraseña */}
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Botón de envío del formulario */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;