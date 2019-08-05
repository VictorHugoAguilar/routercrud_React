import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importamos componentes
import Header from './components/Header';
import Footer from './components/Footer';

import Productos from './components/Productos';
import Producto from './components/Productos';
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProductos';


function App() {
  return (
  <Router>
    <Header />
    <main className="container mt-5">
    <Switch>
      <Route exact path="/nuevo-producto" component={AgregarProducto} /> 
      <Route exact path="/productos" component={Productos} />
      <Route exact path="/productos/:id" component={Producto} />
      <Route exact path="/productos/editar/:id" component={EditarProducto} />
    </Switch>
    </main>
    <Footer />
  </Router>
  );
}

export default App;
