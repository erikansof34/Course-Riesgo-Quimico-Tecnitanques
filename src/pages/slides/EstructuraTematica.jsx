// import "../../assets/css/cards.css";
import momento1 from "../../assets/img/momentos/moment-1.png";
import momento2 from "../../assets/img/momentos/moment-2.png";
import momento3 from "../../assets/img/momentos/momento-3.webp";
import momento4 from "../../assets/img/momentos/moment-4.png";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Title from "../components/Title";
import "../slides/styles/EstructuraTematica.css"

import { useEffect } from "react";
import useStore from "../../store";
const cardData = [
  {
    imgSrc: [momento1],
    alt: 'Imagen 1',
    title: '1 - Recordemos qué es el riesgo químico y su regulación en Colombia',
    description: 'Los tipos de riesgo químico y las vías a través de las cuales podemos contaminarnos son la clave de este momento del módulo.',
  },
  {
    imgSrc: [momento2],
    alt: 'Imagen 2',
    title: '2- Apliquemos el SGA (Sistema Globalmente Armonizado)',
    description: 'El buen etiquetado de una sustancia química en la operación permite cuidar de tu salud y de los demás colaboradores y contratistas.',
  },
  {
    imgSrc: [momento3],
    alt: 'Imagen 3',
    title: '3 - Actos y condiciones inseguras de productos químicos',
    description: 'Prácticas que elevan el riesgo en el manejo de sustancias químicas, por no usar la protección adecuada.',
  },
  {
    imgSrc: [momento4],
    alt: 'Imagen 4',
    title: '4 - Transporte de mercancias peligrosas',
    description: 'Cuando transportemos mercancías peligrosas, debemos seguir las recomendaciones y protocolos para prevenir riesgos.',
  },
];
function EstructuraTematica() {

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [])
  return (
    <div className="px-4 w-full flex items-center justify-center mb-36 md:mb-0">
      <div className="container current pt-3">
        <div className="col-lg-12 col-md-12 md:h-[90vh] flex flex-col justify-center items-center">
          <div className="text-center">
            <div className="mb-3"><Title theme="ligth" className=" font-bold text-secondary-color text-center mb-2 text-[18px]">
              Estructura temática
            </Title></div>
            <div>
              <Paragraph theme='ligth' justify='justify'>
                A través del recorrido  de este módulo, te invitamos a revisar estos 4 momentos de aprendizaje
              </Paragraph>
            </div>
            <div className="w-auto flex justify-center items-center">
              <div className="instruction-web">
                <Instruction arrow="down" theme="ligth">
                  Pasa el mouse por cada sección para descubrir su contenido
                </Instruction>
              </div>
              <div className="instruction-mobile">
                <Instruction arrow="down" theme="ligth">
                  Desliza hacia abajo para ver el contenido de cada sección.
                </Instruction>
              </div>
            </div>
          </div>


          <div className="card-container_momentos">
            {cardData.map((card, index) => (
              <div className="card_momentos" key={index}>
                <img src={card.imgSrc} alt={card.alt} />
                <div className="info_momentos">
                  <h3>{card.title}</h3>
                  <hr />
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
}

export default EstructuraTematica;