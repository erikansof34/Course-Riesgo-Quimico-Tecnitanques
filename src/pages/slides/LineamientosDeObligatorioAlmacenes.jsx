import { useEffect, useState } from "react";
import useStore from "../../store";
import Title from "../components/Title";
import "../../pages/slides/styles/LineamientosDeObligatorioAlmacenes.css";
import imgFondo from '../../assets/img/artes-morelco/sld27_lineaneamientos_de_almacenamiento.webp';
import Instruction from "../components/Instruction";
import Subtitle from "../components/Subtitle";
import Audio1 from "../../assets/audio/sdl_27_almacenes.mp3"; 
import Paragraph from "../components/Paragraph";
function LineamientosDeObligatorioAlmacenes() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    setIsOnDivisor(false);

    const handleClickOutside = (event) => {
      if (!event.target.closest(".tooltip-button") && !event.target.closest(".close-button")) {
        setActiveTooltip(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOnDivisor]);

  const tooltips = [
    { id: 1, texto: "1.FDS", top: "12%", left: "32%" },
    { id: 2, texto: "2.Etiqueta", top: "18%", left: "20%" },
    { id: 3, texto: "3.Señalización", top: "10%", left: "45%" },
    { id: 4, texto: "4.Ducha y estación lavaojos ", top: "30%", left: "88%" },
    { id: 5, texto: "5.Kit de derrames", top: "58%", left: "70%" },
    { id: 6, texto: "6.Matriz de compatibilidad", top: "25%", left: "60%" },
    { id: 7, texto: "7.Extintor acorde al PQ", top: "65%", left: "17%" },
    { id: 8, texto: "8.Sistemas de contencion secundarios", top: "84%", left: "45%" },
    // { id: 9, texto: "9.Las Fichas de Datos de Seguridad deben estar disponibles en el sitio.", top: "70%", left: "60%" },
    // { id: 10, texto: "10.Seguir matrices de compatibilidad de sustancias químicas al almacenar.", top: "20%", left: "40%" },
    // { id: 11, texto: "11.Todas las sustancias deben estar debidamente rotuladas.", top: "10%", left: "10%" },
    // { id: 12, texto: "12.Los gabinetes deben tener ventilación natural (rejillas o orificios).", top: "50%", left: "40%" },
    // { id: 13, texto: "13.Dejar los ítems mencionados anteriormente de alguna forma interactiva, con una imagen como la de la muestra.", top: "50%", left: "20%" },
  ];
  const handleTooltipClick = (id) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setActiveTooltip(null);
  };

  return (
    <div className="regulacion-container-rq  mb-52 md:mb-0">
      <div className="header-section-rq">
        <Title>
          Lineamientos de obligatorio cumplimiento para las áreas 
        </Title>
        <Subtitle>de almacenamiento en los proyectos a pequeña escala (Almacenes)
        </Subtitle>
      </div>
      <Instruction theme="light" arrow="down">Haz clic sobre cada botón para ver más información</Instruction>
      <div className="content-container">
        <div className="image-container2">
          <img
            src={imgFondo}
            alt="Imagen de fondo"
            className={`main-image ${activeTooltip ? 'darken' : ''}`}
          />
          {tooltips.map((tooltip) => (
            <div
              key={tooltip.id}
              className={`tooltip-button ${activeTooltip && activeTooltip !== tooltip.id ? 'hidden-button' : ''}`}
              style={{ top: tooltip.top, left: tooltip.left }}
              onClick={(e) => {
                e.stopPropagation();
                handleTooltipClick(tooltip.id);
              }}
            >
              {tooltip.id}
              {activeTooltip === tooltip.id && (
                <span className="tooltip-text active post-message" data-tooltip-id-2={tooltip.id}>
                  {tooltip.texto}
                  <button className="close-button" onClick={handleCloseClick}>X</button>
                </span>
              )}
            </div>
          ))}
        </div>
        <div>          
        <div className="text-container2 mb-5">
          <Paragraph theme="light" justify="justify">
            Las sustancias químicas deben almacenarse en estantes de material resistente, evitando el uso de madera, y estos deben contar con un sistema de contención secundaria con una capacidad equivalente al 110% del recipiente más grande. Es indispensable que los estantes estén correctamente ubicados y anclados al piso o a la pared, además de contar con un sistema de control de acceso.
          </Paragraph>     
        </div>
        <div className="px-16">
        <Instruction  theme="light" arrow="down">Haz clic para ejecutar el audio</Instruction>
      </div>
      <div className="px-14">
       <audio controls className="media-espanol">
                    <source src={Audio1} type="audio/mp3" />
                  </audio>
           </div>       
       </div>
       
     
        
      </div>
    </div>
  );
}
export default LineamientosDeObligatorioAlmacenes;