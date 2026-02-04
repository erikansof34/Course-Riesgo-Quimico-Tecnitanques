import { useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faTimes, faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
// import Subtitle from "../components/Subtitle";
// import Button from "../components/Button";
import Magnifier from "react-magnifier";
import cilynderOillabelFull from "../../assets/img/cilynder-oillabel_full.webp";
import "../../assets/css/cards.css";
import Subtitle from '../components/Subtitle';

function ConozcamosEtiquetasSGA() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:w-2/5 display-mobile dark-mobile bg-dark-color py-3 px-12 w-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-3 "></div>
        <div className=" my-auto flex flex-col justify-center items-center">
          <div className="items-center text-center text-title-size mb-2">
            <Title>Conozcamos las </Title>
            <Subtitle>etiquetas del SGA</Subtitle>
          </div>
          <Paragraph theme='dark' justify='justify'>
            Son herramientas clave para comunicar peligros de productos químicos. Estas etiquetas incluyen símbolos, palabras de advertencia y frases de peligro que ayudan a identificar los riesgos asociados con una sustancia o mezcla. El objetivo es garantizar la seguridad de los trabajadores y usuarios mediante información clara y estandarizada a nivel mundial.
          </Paragraph>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto px-10 md:pr-20 flex flex-col justify-center items-center">
        <Instruction arrow="down" theme="light" className="mb-6">
          Haz zoom sobre el área de la etiqueta del SGA para observar con mayor detalle los símbolos
        </Instruction>
        <div className="w-full flex justify-center items-center max-w-md">
          <Magnifier
            src={cilynderOillabelFull}
            width="80%"
            mgWidth={200}
            mgHeight={200}
            mgShape="circle"
            mgBorderWidth={3}
            mgBorderColor="#f0f0f0"
            mgShadow={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ConozcamosEtiquetasSGA;