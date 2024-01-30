import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
/* index.css or App.css */
import 'bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <div style={{zIndex:1}} className="d-flex align-items-center gap-3 p-3 bg-light position-fixed top-0 end-0 w-100 z-index-1">
      <img src="/car-inventory.png" className="d-none d-md-block" style={{ width: '350px', height: '100px' }} alt="Car Inventory" />
      <h2 className="text-4xl w-100 font-weight-bold text-center">Car Inventory</h2>
    </div>

    <App />
  </React.StrictMode>,
  rootElement
);
