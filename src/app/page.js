// COMPONENTE PARA EL APARTADO DE HOME

// Componente Home que se exportará y usará para mostrar la página de inicio
export default function Home() {
  return (
    // Contenedor principal del componente con estilo Flexbox y un color de fondo
    <div className="flex flex-col min-h-screen bg-slate-300">
      {/* Cabecera del sitio con estilo y color de fondo */}
      <header className="bg-blue-600 text-white p-6">
        {/* Título de la página con estilo de fuente y tamaño */}
        <h1 className="text-3xl font-bold text-center">Upweb</h1>
      </header>

      {/* Contenido principal de la página con espaciado y ajustes responsive */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subtítulo o mensaje de bienvenida con estilo de fuente y tamaño */}
        <h2 className="text-4xl font-bold text-center mb-10">Bienvenido a Upweb</h2>
        
        {/* Contenedor para los paneles de información con diseño de rejilla responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primer panel con su propio estilo y color de fondo */}
          <div className="bg-sky-500 shadow-md rounded-lg p-6">
            {/* Título del primer panel con estilo y tamaño de fuente */}
            <h3 className="font-semibold text-lg mb-2">¿Qué somos?</h3>
            {/* Descripción del primer panel */}
            <p>Aplicación para que cualquier comercio registrado pueda subir su propia Web con contenido.</p>
          </div>
          
          {/* Segundo panel similar al primero, pero con un color de fondo diferente */}
          <div className="bg-sky-600 shadow-md rounded-lg p-6">
            {/* Título del segundo panel con estilo y tamaño de fuente */}
            <h3 className="font-semibold text-lg mb-2">¿Para que servimos?</h3>
            {/* Descripción del segundo panel */}
            <p>Los usuarios pueden buscar y visualizar los comercios de una ciudad y de una actividad concreta.</p>
          </div>

          {/* Tercer panel similar a los anteriores, pero con un color de fondo aún más oscuro  */}
          <div className="bg-sky-700 shadow-md rounded-lg p-6">
            {/* Título del tercer panel con estilo y tamaño de fuente */}
            <h3 className="font-semibold text-lg mb-2">¿Cómo funcionamos?</h3>
            {/* Descripción del tercer panel */}
            <p>Los administradores, los comercios y los usuarios pueden iniciar sesión en sus respectivos apartados,
              disfrutando así de sus posibles funcionalidades.
            </p>
          </div>
        </div>
      </main>

      {/* Pie de página con su propio estilo y color de fondo */}
      <footer className="bg-gray-800 text-white text-center p-4">
        {/* Mensaje de derechos de autor con el año actual */}
        <p>&copy; {new Date().getFullYear()} Upweb. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};