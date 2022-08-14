import { Link } from "react-router-dom";
import "../style/Landing.css";
import video from "../assets/videoFoodCortado.mp4";

export const Landing = () => {

   const handleChange = (e) => {
      e.preventDefault(e);
   };
   console.log(process.env.PUBLIC_URL + "/video.mp4");
   return (
      <div className="container-fluid" onChange={(e) => handleChange(e)}>
         <div className="row home">
            <div className="col-md-12 splash">
               <div>
                  <div>
                     <h1 className="tituloPagina">Una experiencia gustativa unica</h1>
                  </div>
                  <Link to={'/home'}>
                     <button
                        className="btn btn-default CTA"
                     >
                        Menu
                     </button>
                  </Link>
               </div>
            </div>
         </div>
         <video autoPlay loop muted id="background-video">
            <source src={video} type="video/mp4" />
         </video>
      </div>
   );
};
