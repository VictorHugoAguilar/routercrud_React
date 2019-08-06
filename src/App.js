import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Importamos componentes
import Header from "./components/Header";
import Footer from "./components/Footer";

import Productos from "./components/Productos";
import Producto from "./components/Productos";
import AgregarProducto from "./components/AgregarProducto";
import EditarProducto from "./components/EditarProductos";

function App() {
    const [productos, setProductos] = useState([]);
    const [recargar, setRecargar] = useState(true);

    useEffect(() => {
        if (recargar) {
            const consulatApi = async () => {
                // consultar la api de json-server
                const url = "http://localhost:4000/restaurant";
                const resultado = await axios.get(url);
                // guardamos en el state
                setProductos(resultado.data);
            };
            consulatApi();
            // cambiar a false la recarga de los productos
            setRecargar(false);
        }
    }, [recargar]);

    return (
        <Router>
            <Header />
            <main className="container mt-5">
                <Switch>
                    <Route
                        exact
                        path="/productos"
                        render={() => <Productos productos={productos} />}
                    />
                    <Route
                        exact
                        path="/nuevo-producto"
                        render={
                          ()=> <AgregarProducto setRecargar={setRecargar}/>
                        }                        
                    />
                    <Route exact path="/productos/:id" component={Producto} />
                    <Route
                        exact
                        path="/productos/editar/:id"
                        component={EditarProducto}
                    />
                </Switch>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
