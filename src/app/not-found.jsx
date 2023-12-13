// COMPONENTE DE ERROR SI LA PAGINA NO EXISTE

import React from 'react';

function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl text-center text-gray-800">¡Ups... la página no existe!</h1>
        </div>
    );
};

export default NotFound;