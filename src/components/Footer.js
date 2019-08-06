import React from 'react';

const Footer = () => {

    var fecha = new Date();
    var anio = fecha.getFullYear();
    
    return ( 
        <p className="text-center p-2 mt-4">© Todos los derechos reservados Victor Hugo Aguilar - {anio}</p>
     );
}
 
export default Footer;