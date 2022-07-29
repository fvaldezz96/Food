import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/Landing.css'

export const Landing = () => {
   const history = useHistory();

   function handleChange(e) {
      e.preventDefault(e);
   }

   return (
      <div className="container-fluid" onChange={(e) => handleChange(e)}>
         <div className="row home">
            <div className="col-md-12 splash">
               <div>
                  <div>
                     <h1 className='tituloPagina'>Bienvenido</h1>
                  </div>
                  <a className="btn btn-default CTA" alt="Inicio" onClick={() => { history.push('/home') }}> </a>
                  <div className="sub">
                     <p></p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
