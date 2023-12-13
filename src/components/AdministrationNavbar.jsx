// BARRA DE NAVEGACION PARA LA PAGINA DE ADMINISTRACION

// Para que no se recargue la pagina cada vez que cambiamos de apartados dentro de la pagina 
// Cambiamos "a" por "Link" en la barra de navegacion
import Link from 'next/link'; 

// Definimos el componente de la barra de navegación para la página de administración
function AdministrationNavbar() {
    return (
        // Creamos la barra de navegación con una clase de Tailwind para el diseño
        <nav className="bg-slate-700 m-4 p-4 rounded-lg shadow-lg">
            {/* Usamos una lista desordenada para los elementos de navegación */}
            <ul className="flex flex-wrap gap-4 justify-center text-white">
                {/* PRIMER ENLACE - información del admin que ha iniciado sesion */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/admin/administration/" className="block">
                        Info Admin
                    </Link>
                </li>

                {/* SEGUNDO ENLACE - opción de registrar comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/admin/administration/registerBusiness" className="block">
                        Registrar Comercio
                    </Link>
                </li>

                {/* TERCER ENLACE - opción de filtrar comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href="/admin/administration/filterBusiness" className="block">
                        Filtrar Comercio
                    </Link>
                </li>

                {/* CUARTO ENLACE - opción de eliminar comercio */}
                <li className="hover:bg-slate-600 p-2 rounded" >
                    <Link href="/admin/administration/deleteBusiness" className="block">
                        Eliminar Comercio
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdministrationNavbar;