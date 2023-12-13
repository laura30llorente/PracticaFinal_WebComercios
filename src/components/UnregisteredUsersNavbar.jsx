// BARRA DE NAVEGACION PARA LA PAGINA DE USUARIOS NO REGISTRADOS

// Para que no se recargue la pagina cada vez que cambiamos de apartados dentro de la pagina 
// Cambiamos "a" por "Link" en la barra de navegacion
import Link from 'next/link'; 

// Definimos el componente de la barra de navegación para la página de los usuarios no registrados
function UnregisteredUsersNavbar() {
    return (
        // Creamos la barra de navegación con una clase de Tailwind para el diseño
        <nav className="bg-slate-700 m-4 p-4 rounded-lg shadow-lg">
            {/* Usamos una lista desordenada para los elementos de navegación */}
            <ul className="flex flex-wrap gap-4 justify-center text-white">
                {/* PRIMER ENLACE - información general de los usuarios no registrados */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/unregisteredUsers/" className="block">
                        Información
                    </Link>
                </li>

                {/* SEGUNDO ENLACE - opción de registrar un usuario */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/unregisteredUsers/registerUser/" className="block">
                        Registrar usuario
                    </Link>
                </li>

                {/* TERCER ENLACE - opción de ordenar comercios por valoraciones */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/unregisteredUsers/orderBusinesses/" className="block">
                        Ordenar comercios
                    </Link>
                </li>

                {/* CUARTO ENLACE - opción de mostrar todos los comercios */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/unregisteredUsers/seeBusinesses/" className="block">
                        Todos los comercios
                    </Link>
                </li>

                {/* QUINTO ENLACE - opción de mostrar comercios fiktrados por cuidad */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/unregisteredUsers/seeBusinessesCity/" className="block">
                        Comercios Ciudad
                    </Link>
                </li>

                {/* SEXTO ENLACE - opción de mostrar comercios fiktrados por cuidad y actividad */}
                <li className="hover:bg-slate-600 p-2 rounded" >
                    <Link href="/unregisteredUsers/seeBusinessesActivity/" className="block">
                        Comercios Actividad
                    </Link>
                </li>

                {/* SEPTIMO ENLACE - opción de mostrar comercios fiktrados por ID */}
                <li className="hover:bg-slate-600 p-2 rounded" >
                    <Link href="/unregisteredUsers/seeBusinessID/" className="block">
                        Comercios ID
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default UnregisteredUsersNavbar;