import { useEffect, useState } from "react";
import useStore from "../../store";
import Title from "../components/Title";
import "../../pages/slides/styles/LineamientosDeObligatorioBodega.css";
import imgFondo from '../../assets/img/artes-morelco/bodega.jpg';
import Instruction from "../components/Instruction";
import Subtitle from "../components/Subtitle";

function LineamientosDeObligatorioBodega() {
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
    { id: 1, texto: "1.Almacenar en áreas frescas, ventiladas, sin exposición a luz solar ni fuentes de calor, con 70 cm de distancia de las paredes", top: "10%", left: "20%" },
    { id: 2, texto: "2.Separar materiales incompatibles con muros cortafuego o precauciones adecuadas. ​", top: "35%", left: "35%" },
    { id: 3, texto: "3.Mantener oxidantes separados de otros productos; separar peligrosos de no peligrosos, y sólidos de líquidos.", top: "40%", left: "50%" },
    { id: 4, texto: "4.Usar contención secundaria (bandejas, diques, etc.) para líquidos, con capacidad del 110% del recipiente más grande.", top: "20%", left: "80%" },
    { id: 5, texto: "5.Almacenar productos más peligrosos en zonas bajas, limitar apilamiento: 0,4 m para envases frágiles y 1,50 m para otros", top: "40%", left: "70%" },
    { id: 6, texto: "6.Aplicar el sistema FIFO (Primero en entrar, primero en salir).", top: "10%", left: "60%" },
    { id: 7, texto: "7.Señalizar áreas de almacenamiento con la clasificación de los productos", top: "60%", left: "30%" },
    { id: 8, texto: "8.Utilizar estantes no combustibles y resistentes al ácido.", top: "70%", left: "90%" },
    { id: 9, texto: "9.Garantizar compatibilidad química y segregar según la Matriz de compatibilidad.", top: "70%", left: "60%" },
    { id: 10, texto: "10.Contar con un plano de almacenamiento de productos.", top: "20%", left: "40%" },
    { id: 11, texto: "11.Tener disponible un kit de derrames y revisar su estado regularmente.", top: "10%", left: "10%" },
  ];

  const handleTooltipClick = (id) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setActiveTooltip(null);
  };

  return (
    <div className="regulacion-container-rq">
      <div className="header-section-rq">
        <Title>
          Lineamientos de obligatorio cumplimiento para las áreas 
        </Title>
        <Subtitle>de almacenamiento en los proyectos a pequeña escala (Bodegas)</Subtitle>
      </div>
      <Instruction theme="light" arrow="down">Haz clic sobre cada botón para ver más información</Instruction>
      <div className="image-container1_2">
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
        <span className="tooltip-text active post-message" data-tooltip-id={tooltip.id}>
          {tooltip.texto}
          <button className="close-button" onClick={handleCloseClick}>X</button>
        </span>
    )}
  </div>
))}

      </div>
    </div>
  );
}

export default LineamientosDeObligatorioBodega;
