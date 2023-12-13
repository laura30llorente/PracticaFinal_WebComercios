// COMPONENTE PARA EL APARTADO DE USUARIOS NO REGISTRADOS

// Definimos el componente UnregisteredUsersPage
function UnregisteredUsersPage() {
    return (
        // Usamos una división con clases de Tailwind CSS para dar estilo a la página
        <div className="flex flex-col min-h-screen px-4 py-8 bg-slate-300">

            {/* Título de la página con estilo de fuente grande y en negrita */}
            <h1 className="text-3xl font-bold text-center mb-10">Usuarios no registrados</h1>
            
            {/* Contenedor de las tarjetas de información con un diseño de cuadrícula */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
                {/* Primera tarjeta con información sobre lo que pueden hacer los usuarios no registrados */}
                <div className="bg-cyan-300 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Qué puedes hacer?</h3>
                    <p>Podrás consultar información de comercios en general o de comercios de una ciudad y una actividad en concreto.</p>
                </div>

                {/* Segunda tarjeta con información sobre las limitaciones de los usuarios no registrados */}
                <div className="bg-cyan-500 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Qué no puedes hacer?</h3>
                    <p>Votar en una página de un comercio.</p>
                </div>

                {/* Tercera tarjeta animando a los usuarios a registrarse */}
                <div className="bg-cyan-700 shadow-md rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-2">¿Qué te recomendamos?</h3>
                    <p>Por supuesto, ¡que te registres!</p>
                </div>
            </div>
        </div> 
    );
};

export default UnregisteredUsersPage;