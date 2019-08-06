import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ProductoLista({ producto,  setRecargar }) {
    const eliminarProducto = id => {
        // console.log('Eliminar ' + id);

        // Preguntamos al usuario si esta seguro de eliminar el producto
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta seguro de eliminar el producto!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then(async result => {
            if (result.value) {
                try {
                    const url = `http://localhost:4000/restaurant/${id}`;

                    const resultado = await axios.delete(url);

                    if (resultado.status === 200) {
                        Swal.fire(
                            "Eliminado!",
                            "Has eliminado el producto.",
                            "success"
                        );
                        //Consultar la api
                        setRecargar(true);
                    }
                } catch (error) {
                    // console.error(error);
                    Swal.fire({
                        type: "error",
                        title: "Error",
                        text: "Un error en la eliminación!"
                    });
                }
            }
        });
    };

    return (
        <li
            className="list-group-item d-flex justify-content-between align-items-center"
            data-categoria={producto.categoria}
        >
            <p>
                {producto.nombrePlatillo}{" "}
                <span className="font-weight-bold">
                    $ {producto.precioPlatillo}
                </span>
            </p>
            <div>
                <Link
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-success mr-2"
                >
                    Editar
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(producto.id)}
                >
                    Eliminar &times;
                </button>
            </div>
        </li>
    );
}

export default ProductoLista;
