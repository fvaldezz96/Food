import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Landing.css';

export const Landing = () => {
   return (
      <div>
         <h1>Bienvenido</h1>
         <Link to={'/home'}>
            <button>INICIO</button>
         </Link>
      </div>
   )
}
