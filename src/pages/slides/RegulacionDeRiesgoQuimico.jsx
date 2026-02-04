import  { useState, useEffect } from "react";
import useStore from "../../store";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Instruction from "../components/Instruction";
import audio1 from "../../assets/audio/titulosdl7_regulacion_colombia.mp3";
import { useMediaQuery } from "react-responsive";
import "../../pages/slides/styles/RegulacionDeRiesgoQuimico.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// import img1 from '../../assets/img/botones/recordemos.png';
import ModalDialog from "../components/ModalDialog";
import Button from "../components/Button";
function RegulacionDeRiesgoQuimico() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipText, setTooltipText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const timelineItems = [
    { year: "1993", law: "Ley 55 de 1993", tooltip: "Por medio de la cual se aprueba el Convenio No. 170 y la Recomendación número 177 sobre la Seguridad en la Utilización de los Productos Químicos en el trabajo" },
    // { year: "2014", law: "Resolución 1223", tooltip: "Información sobre la Resolución 1223 del 2014" },
    { year: "2018", law: "Dec. 1496", tooltip: "Por el cual se adopta el Sistema Globalmente Armonizado de Clasificación y Etiquetado de Productos Químicos y se dictan otras disposiciones en materia de seguridad química" },
    { year: "2021", law: "Resolución 773", tooltip: "Por la cual se definen las acciones que deben desarrollar los empleadores para la aplicación del Sistema Globalmente Armonizado (SGA) en los lugares de trabajo y se dictan otras disposiciones en materia de seguridad." },
    // { year: "2018", law: "Decreto 1496", tooltip: "Información del Decreto 1496 de 2018" },
    // { year: "2021", law: "Resolución 0773", tooltip: "Descripción de la Resolución 0773 de 2021" }
  ];

  return (
    <div className="regulacion-container-rq mb-52 md:mb-0">
      <div className="header-section-rq">
        <Title>Regulación de riesgo químico en <span className="text-title-color">Colombia</span></Title>
        <Subtitle>Evolución de la normativa</Subtitle>
      </div>

      <div className="intro-text-rq">
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          La regulación en materia de la gestión del riesgo químico en Colombia ha evolucionado con el tiempo. 
          Acá les recordamos las normas clave que debemos tener en cuenta en nuestra operación. Le agradecemos 
          escuche el audio y consulte las normas en línea para conocer los requerimientos desde la fuente.
        </Paragraph>
      </div>

      <div className="instruction-text-rq">
        <Instruction theme="light" arrow="down">
          Haz clic para ejecutar el audio
        </Instruction>
      </div>

      <div className="audio-container-rq">
        <audio controls className="media-espanol mx-auto">
          <source src={audio1} type="audio/mp3" />
        </audio>
      </div>

      <div className="timeline-container-rq">
        <div className="timeline-line-rq"></div>
        {timelineItems.map((item, index) => (
          <div 
            key={index} 
            className={`timeline-item-rq ${activeItem === index ? 'active' : ''}`}
            onClick={() => setActiveItem(index)}
            onMouseEnter={() => {
              setHoveredItem(index);
              setTooltipText(item.tooltip);
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
              setTooltipText("");
            }}
          >
            <div className="toolp-mobile">
            {hoveredItem === index && (
              <div className="tooltip-rq">
                {tooltipText}
              </div>
            )}
</div>
            <div className="timeline-content-rq">
              <div className="timeline-year-rq">{item.year}</div>
              <div className="timeline-law-rq">{item.law}</div>
            </div>
          </div>
          
        ))}
         <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Otras normativas"
      >
         {/* <img
          src={img1}
          alt="Votemos"
          className="image-boton w-[40%]"
        /> */}
        <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'} >
            Decreto 1072 de 2015 <br/>
            Decreto 1079 de 2015 <br/>
            Decreto 1347 de 2021 <br/>
            Decreto 1360 de 2021 <br/>
            Resolución 2400 de 1979 <br/>
        </Paragraph>
      </ModalDialog>
      </div>
      <div className="mt-2">
          <Button
              bold={false}
              icon={faThumbsUp}
              roundedFull={true}
              onClick={handleOpenModal}
            >
              Otras normativas
            </Button>
          
      </div>
    </div>
  );
}

export default RegulacionDeRiesgoQuimico;
