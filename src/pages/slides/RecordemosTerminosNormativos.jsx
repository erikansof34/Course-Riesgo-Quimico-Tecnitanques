import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
// import "../../assets/css/cards.css";
// import "../../../node_modules/video-react/dist/video-react.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import imgMain from '../../assets/img/artes-morelco/recordemos_estos_terminos.webp'
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";


const secondaryColor = '#0a9ead';

function RecordemosTerminosNormativos() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [expanded, setExpanded] = useState('panel1');
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionData = [
    {
      title: "Sustancia química",
      content: 'Es cualquier elemento químico y sus compuestos, ya sea en su forma natural o producidos mediante cualquier proceso de producción.'
    },
    {
      title: "Producto químico",
      content: "Es cualquier sustancia química, ya sea pura o combinada con otras sustancias, que puede incluir mezclas."
    },
    {
      title: "Producto químico peligroso",
      content: "Es una sustancia química o su mezcla que cumple con al menos uno de los criterios que indican que puede ser peligrosa, según el Sistema Globalmente Armonizado de Clasificación y Etiquetado de Productos Químicos."
    },
  ];

  return (
    <div className={`flex flex-col md:flex-row mb-40 md:mb-0`}>
      <div className="md:flex-1 display-mobile ligth-display bg-dark-color md:w-1/2 w-full px-6 flex-col justify-center items-center">
        <div className="display-mobile my-auto flex flex-col py-3 px-0 justify-center items-center" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '-30px' }}>
          <div className="text-center text-title-size">
            <Title>Recordemos</Title>
            <Subtitle>Estos términos</Subtitle>
          </div>
          <div className="w-full mx-auto flex items-center justify-center my-3">
            <img src={imgMain} alt="Main" className="w-[70%] mb-0" />
          </div>
          {/* <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
          Para una gestión estratégica de peligros y riesgos relacionados con el
          manejo de carga, es importante considerar las normas legales que
          ayuden a crear pilares sólidos que permitan encaminar la acciones a
          disminuir los lesiones
        </Paragraph> */}
        </div>
      </div>

      <div className="md:flex-2 bg-white md:w-1/2 w-full px-1 md:pr-20 flex justify-start items-start pb-8">
        <div className="w-full flex flex-col justify-start items-start " style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '150PX' }}>
          <div className="flex justify-center mx-auto items-center">
            <Instruction arrow="down" theme="light" className="w-full">
              Haz clic sobre las flechas para desplegar el contenido
            </Instruction>
          </div>
          <div className=" w-full px-5">
            {accordionData.map((item, index) => (
              <Accordion
                key={`panel${index + 1}`}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                className="bg-secondary-color text-red mb-1 m-0"
                sx={{
                  backgroundColor: '#0a9ead',
                  color: 'white',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  style={{ minHeight: '36px', maxHeight: '36px', lineHeight: '1.1rem' }}
                  expandIcon={<ExpandMoreIcon className="text-white" />}
                  aria-controls={`panel${index + 1}a-content`}
                  id={`panel${index + 1}a-header`}
                  sx={{
                    backgroundColor: '#003454',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: secondaryColor,
                    },
                    '&.Mui-expanded': {
                      backgroundColor: secondaryColor,
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      color: 'white',
                    },
                    '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
                      color: 'white',
                    },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <span className="text-white">{item.title}</span>
                </AccordionSummary>
                <AccordionDetails className="bg-white" style={{ border: '1px solid gray', margin: 0 }}>
                  <Paragraph theme='light' justify='justify' className="text-slate-900">{item.content}</Paragraph>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordemosTerminosNormativos;