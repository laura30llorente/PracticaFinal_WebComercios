// BARRA DE NAVEGACION PARA LA PAGINA DE BUSINESS

// Para que no se recargue la pagina cada vez que cambiamos de apartados dentro de la pagina 
// Cambiamos "a" por "Link" en la barra de navegacion
import Link from 'next/link'; 

// Definimos el componente de la barra de navegación para la página de los comercios
function BusinessNavbar({ businessID }) {
    return (
        // Creamos la barra de navegación con una clase de Tailwind para el diseño
        <nav className="bg-slate-700 m-4 p-4 rounded-lg shadow-lg">
            {/* Usamos una lista desordenada para los elementos de navegación */}
            <ul className="flex flex-wrap gap-4 justify-center text-white">
                {/* PRIMER ENLACE - información del comercio que ha iniciado sesion */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href={`/businesses/${businessID}`} className="block">
                        Info Comercio
                    </Link>
                </li>

                {/* SEGUNDO ENLACE - opción de subir contenido del comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href={`/businesses/${businessID}/uploadData`} className="block">
                        Subir Contenido
                    </Link>
                </li>

                {/* TERCER ENLACE - opción de modificar contenido del comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href={`/businesses/${businessID}/updateData`} className="block">
                        Modificar Contenido
                    </Link>
                </li>

                {/* CUARTO ENLACE - opción de subir fotos y textos del comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href={`/businesses/${businessID}/uploadPhotosTexts`} className="block">
                        Subir fotos y textos
                    </Link>
                </li>

                {/* QUINTO ENLACE - opción de buscar usuarios segun unos criterios */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href={`/businesses/${businessID}/seeUsers`} className="block">
                        Buscar Usuarios
                    </Link>
                </li>

                {/* SEXTO ENLACE - opción de eliminar comercio */}
                <li className="hover:bg-slate-600 p-2 rounded">
                    <Link href={`/businesses/${businessID}/deleteData`} className="block">
                        Eliminar Contenido
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BusinessNavbar;