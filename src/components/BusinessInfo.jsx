// Importamos Image de Next.js para optimizar la carga de imágenes
import Image from "next/image";

// Definimos el componente BusinessInfo que recibe una lista de comercios
function BusinessInfo( { businesses }) {
    // Verificamos si businesses es un array y tiene elementos
    const hasBusinesses = Array.isArray(businesses) && businesses.length > 0;

    return (
        // Contenedor principal con estilos de Tailwind CSS
        <div className="bg-sky-400 border p-3 rounded-lg m-4">

            {/* Mostramos el contenido solo si hay comercios disponibles */}
            {hasBusinesses && (
                <div className="flex flex-col space-y-2">

                    {/* Mapeamos cada comercio a un contenedor */}
                    {businesses.map((business, index) => (
                        // Contenedor para cada comercio con estilos de Tailwind CSS
                        <div key={index} className="flex flex-col border p-4 rounded-lg shadow-lg space-y-4 w-full bg-sky-300">
                            {/* Contenedor para la información del comercio */}
                            <div className="flex-1 w-full">
                                {business.businessName && <h3 className="text-lg font-semibold">{business.businessName}</h3>}
                                {business.businessID && <p className="text-gray-600"> Business ID: {business.businessID}</p>}
                                {business.cif && <p className="text-gray-600"> CIF: {business.cif}</p>}
                                {business.address && <p className="text-gray-600"> Dirección: {business.address}</p>}
                                {business.email && <p className="text-gray-600"> E-mail: {business.email}</p>}
                                {business.contactPhone && <p className="text-gray-600"> Teléfono de contacto: {business.contactPhone}</p>}
                                {business.city && <p className="text-gray-600"> Ciudad: {business.city}</p>}
                                {business.activity && <p className="text-gray-600"> Actividad: {business.activity}</p>}
                                {business.title && <p className="text-gray-600"> Título: {business.title}</p>}
                                {business.summary && <p className="text-gray-600"> Resumen: {business.summary}</p>}
                                {business.scoring && <p className="text-gray-600"> Valoración: {business.scoring}</p>}
                                {business.numRatings && <p className="text-gray-600"> Número de puntuaciones: {business.numRatings}</p>}
                
                                {/* Sección para listar textos si existen */}
                                {business.texts && business.texts.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold">Texts:</h4>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {business.texts.map((text, index) => (
                                                <li key={index}> {text} </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                
                                {/* Sección para mostrar las fotos si existen */}
                                {business.photos && business.photos.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold"> Photos: </h4>
                                        <div className="flex space-x-2">
                                            {business.photos.map((photo, index) => (
                                                <div key={index} className="w-full sm:w-auto">
                                                    <Image
                                                        key={index}
                                                        src={`/images/${photo}`}
                                                        alt={"Foto " + (index + 1)}
                                                        width={96}  
                                                        height={96}  
                                                        style={{ maxWidth: "100%", height: "auto" }}
                                                        className="w-full object-cover rounded-md"
                                                    />
                                                </div>   
                                            ))}
                                        </div>
                                    </div>
                                )}
                
                                {/* Sección para listar reseñas si existen */}
                                {business.reviews && business.reviews.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold">Reviews:</h4>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {business.reviews.map((review, index) => (
                                                <li key={index}> {review} </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>  
    );
}

export default BusinessInfo;