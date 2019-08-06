import React, { useState, useRef } from "react";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

function EditarProducto(props) {
    // destructuring de props
    const { producto, setRecargar, history } = props;

    // state
    const [error, setError] = useState(false);
    const [categoria, setCategoria] = useState("");

    // Generar ref es una forma de acceder a un elemento del dom
    const nombrePlatilloRef = useRef("");
    const precioPlatilloRef = useRef("");

    const editarProducto = async e => {
        e.preventDefault();

        // Validacion antes de editar
        const nuevoPrecio = precioPlatilloRef.current.value,
            nuevoNombre = nombrePlatilloRef.current.value;

        if (nuevoPrecio === "" || nuevoNombre === "" || categoria === "") {
            setError(true);
            return;
        }

        setError(false);

        // revisar si cambio la categoria de lo contrario asignar el mismo valor
        let categoriaPlatillo =
            categoria === "" ? producto.categoria : categoria;

        // Obtener los valores del formulario
        const editarPlatillo = {
            nombrePlatillo: nuevoNombre,
            precioPlatillo: nuevoPrecio,
            categoria: categoriaPlatillo
        };

        //console.log(editarPlatillo);

        // enviar el request
        const url = `http://localhost:4000/restaurant/${producto.id}`;

        try {
            const resultado = await axios.put(url, editarPlatillo);

            //console.log(resultado);

            if (resultado.status === 200) {
                Swal.fire(
                    "Producto Modificado!",
                    "El producto se modificó correctamente!",
                    "success"
                );
                setRecargar(true);
            }
        } catch (error) {
            //console.log(error);
            Swal.fire({
                type: "error",
                title: "Error",
                text: "Un error en la modificación!"
            });
        }

        // Redirigir a productos al usuario
        history.push("/productos");
    };

    const leerValorRadio = e => {
        setCategoria(e.target.value);
    };

    //console.log("producto");
    //console.log(producto);

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Nuevo Producto</h1>
            {error ? (
                <Error mensaje="Se debe rellenar todos los campos" />
            ) : null}
            <form className="mt-5" onSubmit={editarProducto}>
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        ref={nombrePlatilloRef}
                        defaultValue={producto.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        ref={precioPlatilloRef}
                        defaultValue={producto.precioPlatillo}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            onChange={leerValorRadio}
                            defaultChecked={producto.categoria === "postre"}
                        />
                        <label className="form-check-label">Postre</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            onChange={leerValorRadio}
                            defaultChecked={producto.categoria === "bebida"}
                        />
                        <label className="form-check-label">Bebida</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            onChange={leerValorRadio}
                            defaultChecked={producto.categoria === "cortes"}
                        />
                        <label className="form-check-label">Cortes</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            onChange={leerValorRadio}
                            defaultChecked={producto.categoria === "ensalada"}
                        />
                        <label className="form-check-label">Ensalada</label>
                    </div>
                </div>

                <input
                    type="submit"
                    className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                    value="Editar Producto"
                />
            </form>
        </div>
    );
}

export default withRouter(EditarProducto);
