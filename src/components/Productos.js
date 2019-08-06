import React, { Fragment } from "react";
import ProductoLista from "./ProductoLista";

function Productos(props) {

    const { productos, setRecargar } = props;

    //console.log("desde productos");
    //console.log(productos);

    return (
        <Fragment>
            <h1 className="text-center">Productos</h1>
            <ul className="list-group mt-5">
                {productos.map(producto => (
                    <ProductoLista
                        key={producto.id}
                        producto={producto}
                        setRecargar={setRecargar}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Productos;
