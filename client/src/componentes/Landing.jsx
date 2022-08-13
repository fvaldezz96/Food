import { useHistory } from 'react-router-dom';
import '../style/Landing.css';
import video from '../assets/videoFoodCortado.mp4';

export const Landing = () => {
   const history = useHistory();

   const handleChange = (e) => {
      e.preventDefault(e);
   }
console.log(process.env.PUBLIC_URL + '/video.mp4');
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
         <video autoPlay loop muted id="background-video">
            <source src={video}
               type='video/mp4' />
         </video>
      </div>
   )
}
