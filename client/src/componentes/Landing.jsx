import { Link } from "react-router-dom";
import "../style/Landing.css";
import video from "../assets/videoFoodCortado.mp4";

export const Landing = () => {
   return (
      <div className='contenedor'>
         <div className="tituloLanding">
            <h1 className="ejemplo">Una experiencia gustativa unica</h1>
         </div>
         <div className="tituloLanding">
            <Link to={'/home'}>
               <button className="CTA">Menu</button>
            </Link>
         </div>
         <video autoPlay loop muted id="video">
            <source src={video} type="video/mp4" />
         </video>
      </div>
   );
};
