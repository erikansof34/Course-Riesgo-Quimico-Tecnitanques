import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/img/artes-morelco/tecnitanques_color_blanco.webp";
// Cambia el URL del video aquí
import VideoBienvenida from "../assets/video/background_index.mp4";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";

function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/introduccion");
  };

  return (
    <div>
      <div className="contInd text-[40px] md:text-5xl parrafo z-20">
        <img src={Logo} alt="LogoW" className='w-[50vh]' />
        <h1 className="font-alata font-bold mt-16 text-white text-[40px] md:text-5xl">
          Manipulación Segura De Productos Químicos
        </h1>
      </div>

      <video id="iniVideo" autoPlay muted loop className="h-screen">
        {/* Asegúrate de que la nueva ruta del video esté correctamente referenciada aquí */}
        <source src={VideoBienvenida} type="video/mp4" />
      </video>
      <div className="opacidad z-10"></div>

      <button
        className="button-1 button-right z-20"
        role="button"
        id="btn_espanol"
        onClick={handleClick}
      >
        <span className="button-1-shadow"></span>
        <span className="button-1-edge"></span>
        <span className="button-1-front text hover:-translate-y-2 font-alata">
          <FontAwesomeIcon icon={faHandPointRight} className="pr-1" /> Iniciar
        </span>
      </button>
    </div>
  );
}

export default Index;
