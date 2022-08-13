import React from 'react';
import { useHistory } from 'react-router-dom';
import '../style/Landing.css';

export const Landing = () => {
   const history = useHistory();

   const handleChange = (e) => {
      e.preventDefault(e);
   }

   return (
      <div className="container-fluid" onChange={(e) => handleChange(e)}>
         <div className="row home">
            <div className="col-md-12 splash">
               <div>
                  <div>
                     <h1 className='tituloPagina'>Una experiencia gustativa unica</h1>
                  </div>
                  <button href='/home/' className="btn btn-default CTA" onClick={() => { history.push('/home') }}>Menu</button>
               </div>
            </div>
         </div>
         <video muted autoplay loop>
            <source src="../img/videoFoodCortado.mp4"
               type='videoFoodCortado/mp4' />
         </video>
      </div>
   )
}
