import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
            <div className="flex items-center gap-10 p-3 bg-[#e5e5e5] fixed right-0 w-full z-[1]"><img src="/car-inventory.png" className="hidden md:block w-[350px] h-[100px]" /><span className="text-4xl w-[100%] font-bold text-center ">Car Inventory</span></div>

    <App />
  </React.StrictMode>,
  rootElement
);
