// BARRA DE NAVEGACION

// Indicamos que este componente debe ejecutarse solo en el lado del cliente
"use client";

// Para que no se recargue la pagina cada vez que cambiamos de apartados dentro de la pagina 
// Cambiamos "a" por "Link" en la barra de navegacion
import Link from 'next/link';
// Importamos React y el hook useState desde 'react'
import { useState } from 'react';

// Definimos el componente Navbar para la barra de navegación
function Navbar() {
    // Utilizamos useState para manejar el estado del menú en dispositivos móviles
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Definimos una función para manejar la apertura y cierre del menú en móviles
    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        // Barra de navegación con estilo de Tailwind CSS
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Enlace a la página principal con el nombre de la empresa */}
                <Link href="/" className="text-white text-2xl font-bold"> UpWeb </Link>

                {/* Botón para dispositivos móviles que muestra u oculta el menú */}
                <div className="lg:hidden">
                    <button
                        className="text-white hover:text-gray-300 focus:outline-none"
                        onClick={handleMobileMenuToggle}
                    >
                        {/* Icono de menú (hamburguesa) para dispositivos móviles */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Lista de elementos de navegación que se muestra u oculta en móviles */}
                <ul className={`lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'} gap-4`}>
                    {/* Cada NavItem es un enlace en la barra de navegación */}
                    <NavItem href="/" text="Home" onClick={() => setMobileMenuOpen(false)} />
                    <NavItem href="/admin" text="Administrador" onClick={() => setMobileMenuOpen(false)} />
                    <NavItem href="/businesses" text="Comercios" onClick={() => setMobileMenuOpen(false)} />
                    <NavItem href="/unregisteredUsers" text="Usuarios no registrados" onClick={() => setMobileMenuOpen(false)} />
                    <NavItem href="/registeredUsers" text="Usuarios registrados" onClick={() => setMobileMenuOpen(false)} />
                </ul>
            </div>
        </nav>
    );
}

// Definimos un componente NavItem para los elementos individuales de la barra de navegación
const NavItem = ({ href, text, onClick }) => (
    // Cada NavItem es un elemento de lista con un enlace
    <li>
        <Link href={href} className="text-white hover:text-gray-300 transition duration-300" onClick={onClick}> {text} </Link>
    </li>
);

export default Navbar;