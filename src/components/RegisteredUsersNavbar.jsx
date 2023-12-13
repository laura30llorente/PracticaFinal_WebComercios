// BARRA DE NAVEGACION PARA LA PAGINA DE USUARIOS REGISTRADOS

// Para que no se recargue la pagina cada vez que cambiamos de apartados dentro de la pagina 
// Cambiamos "a" por "Link" en la barra de navegacion
import Link from 'next/link'; 

// Definimos el componente de la barra de navegación para la página de los usuarios registrados
function RegisteredUsersNavbar() {
    return (
        // Creamos la barra de navegación con una clase de Tailwind para el diseño
        <nav className="bg-slate-700 m-4 p-4 rounded-lg shadow-lg">
            {/* Usamos una lista desordenada para los elementos de navegación */}
            <ul className="flex flex-wrap gap-4 justify-center text-white">
                {/* PRIMER ENLACE - información del usuario que ha iniciado sesion */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/registeredUsers/loggedUsers/" className="block">
                        Info Usuario
                    </Link>
                </li>

                {/* SEGUNDO ENLACE - opción de actualizar datos del usuario */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/registeredUsers/loggedUsers/updateData/" className="block">
                        Actualizar datos
                    </Link>
                </li>

                {/* TERCER ENLACE - opción de votar y añadir reseñas en un comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/registeredUsers/loggedUsers/voteBusiness/" className="block">
                        Votar comercio
                    </Link>
                </li>

                {/* CUARTO ENLACE - opción de buscar comercios */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/registeredUsers/loggedUsers/filterBusiness/" className="block">
                        Buscar comercios
                    </Link>
                </li>

                {/* QUINTO ENLACE - opción de darse de baja y eliminar el usuario */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/registeredUsers/loggedUsers/deleteUser/" className="block">
                        Darse de baja
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default RegisteredUsersNavbar;