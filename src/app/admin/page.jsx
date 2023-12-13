// COMPONENTE PARA EL APARTADO ADMIN

// Establecemos que este archivo debe ejecutarse en el lado del cliente
"use client" 

// Importamos React
import React from 'react';

// Importamos el componente Login desde la ruta especificada
import Login from '../../components/Login.jsx'; 

// Importamos useRouter de next/navigation para manejar la navegación
import { useRouter } from 'next/navigation';

// Definimos el componente AdminPage
function AdminPage() {

  // Usamos el hook useRouter para obtener la instancia del router
  const router = useRouter();

  // Definimos la función asincrónica handleLogin para gestionar el inicio de sesión
  const handleLogin = async (user, pass) => {
    try {
      // Realizamos una solicitud POST a la API para el inicio de sesión.
      const result = await fetch("/api/admin/adminLogin", {
        method: "POST",
        body: JSON.stringify({ user, pass }),
        headers: {
          "Content-type": "application/json"
        }
      });

      // Verificamos si la respuesta de la API no es satisfactoria
      if (!result.ok) {
        throw new Error("HTTP error! Status: " + result.status);
      }

      // Convertimos la respuesta a formato JSON
      const data = await result.json();
      
      // Comprobamos si el mensaje de la respuesta es 'OK'
      if (data.message === "OK") {
        alert('Inicio de sesión exitoso del admin');
        
        // Guardamos el ID del administrador en el almacenamiento local
        localStorage.setItem('adminID', data.adminID);

        // Redireccionamos al usuario a la página de administración.
        router.push("/admin/administration");  

      } else {
        // Alertamos al usuario si las credenciales son incorrectas
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      // Capturamos y manejamos cualquier error durante la llamada a la API
      console.error('Error al realizar la llamada a la API:', error);
      alert('Error al realizar la llamada a la API. Consulta la consola para más detalles.');
    }
  };

  // Renderizamos la página de administración con el componente Login y otras secciones
  return (
    <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">

      <h1 className="text-3xl font-bold text-center mb-10">Página de administración</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
        {/* Sección para registrar comercios */}
        <div className="bg-blue-400 shadow-md rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">Registrar un comercio</h3>
          <p>Podrás registrar un comercio con la siguiente información:</p>
          <ul>
              <li> - Nombre del comercio</li>
              <li> - Contraseña</li>
              <li> - CIF</li>
              <li> - Dirección</li>
              <li> - E-mail</li>
              <li> - Teléfono de contacto</li>
          </ul>

        </div>

        {/* Sección para filtrar comercios */}
        <div className="bg-blue-600 shadow-md rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Filtrar comercios</h3>
            <p>Podrás filtar comercios por nombre y/o ciudad del comercio.</p>
        </div>

        {/* Sección para borrar comercios */}
        <div className="bg-blue-800 shadow-md rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">Borrar comercio</h3>
            <p>Se mostrarán todos los comercios existentes y podrás eliminar el que desees.</p>
        </div>
      </div>

      {/* Componente de Login con la función handleLogin como prop */}
      <div className="mt-12"> 
          <Login onLogin={handleLogin} />
      </div>
    </div> 
  );
};

export default AdminPage;