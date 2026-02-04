import { useState, useEffect, useRef } from 'react';
import useStore from '../../store';
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from '../components/Instruction';
import "../../pages/slides/styles/PeligrosEnNuestraOperacion.css";
// import audioRight1 from '../../assets/audio/sl06au01.mp3';
// import audioRight2 from '../../assets/audio/sl06au01.mp3';
// import audioRight3 from '../../assets/audio/sl06au01.mp3';
// import audioRight4 from '../../assets/audio/sl06au01.mp3';
import { useMediaQuery } from "react-responsive";
import fisi from '../../assets/img/artes-morelco/propiedades_fisicoquimicas.webp';
import toxi from '../../assets/img/artes-morelco/propiedades_toxicologicas.webp';
import fis_img1 from '../../assets/img/artes-morelco/p-fisicoquimico-explosivos.svg';
import fis_img2 from '../../assets/img/artes-morelco/p-fisicoquimico-comurentes.svg';
import fis_img3 from '../../assets/img/artes-morelco/p-fisicoquimico-inflamable.svg';
import fis_img4 from '../../assets/img/artes-morelco/p-fisicoquimico-combustible.svg';
import tox_img1 from '../../assets/img/artes-morelco/p-toxicologico-toxico.svg';
import tox_img2 from '../../assets/img/artes-morelco/p-toxicologico-nocivo.svg';
import tox_img3 from '../../assets/img/artes-morelco/p-toxicologico-corrosivo.svg';
import tox_img4 from '../../assets/img/artes-morelco/p-toxicologico-irritacion.svg';
import tox_img5 from '../../assets/img/artes-morelco/p-toxicologico-sensibilizantes.svg';

function UsoAdecuadoHerramientasMecanicas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [activeLeftSlide, setActiveLeftSlide] = useState(0);
  const [activeRightSlide, setActiveRightSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('condiciones');
  // const audioLeftRef = useRef(null);
  // const audioRightRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const leftSlides = [
    { title: "Explosivos", content: "Sustancia explosiva es una sustancia sólida o líquida (o mezcla de sustancias) que de manera espontánea, por reacción química, puede desprender gases a una temperatura, presión y velocidad tales que pueden ocasionar daños a su entorno.", image: fis_img1 },
    { title: "Comburentes", content: "Sustancia que por sí misma no es necesariamente combustible, pero que puede por desprendimiento de oxígeno, causar o contribuir a la combustión de otro material. Ejemplo: Encender una cabeza de un fósforo: fósforo rojo + azufre + clorato de potasio. \nEl calor generado del fósforo descompone el clorato de potasio (Comburente), y, en el proceso, éste libera oxígeno. El oxígeno se combina con el azufre, produciendo una llama.", image: fis_img2 },
    { title: "Inflamables", content: "Es toda sustancia que por efecto de la llama o por aumento de la temperatura puede arder. En ocasiones y según las sustancias puede arder espontáneamente. Lo que caracteriza una sustancia inflamable es su punto de inflamación y su rango de inflamabilidad.", image: fis_img3 },
    { title: "Combustibles", content: "Toda sustancia o producto que se quema para producir calor o energía.", image: fis_img4 },
  ];

  const rightSlides = [
    { title: "Tóxicos", content: "Sustancias o preparados que pueden ocasionar daños graves a la salud o la muerte al ser ingeridos, inhalados o entrar en contacto con la piel en MUY pequeña cantidad.", image: tox_img1 },
    { title: "Nocivos", content: "Las sustancias y preparados que, por inhalación, ingestión o penetración cutánea puedan provocar efectos agudos o crónicos e incluso la muerte. Nota: La diferencia entre estos dos conceptos radica en la capacidad del producto químico de producir el daño.", image: tox_img2 },
    { title: "Corrosivos", content: "Sustancia que causa la destrucción visible o cambio permanente en la piel o los tejidos, en su sitio de contacto o puede dañar los metales, incluso destruirlos.", image: tox_img3 },
    { title: "Irritantes", content: "Las sustancias y preparados no corrosivos que, en contacto breve, prolongado o repetido con la piel o las mucosas puedan provocar una reacción inflamatoria.", image: tox_img4 },
    { title: "Sensibilizantes", content: "Las sustancias y preparados que por inhalación o penetración cutánea, puedan ocasionar una reacción de hipersensibilidad, de forma que una exposición posterior a esa sustancia o preparado dé lugar a efectos negativos característicos.", image: tox_img5 },
  ];

  const handleSlideChange = (index) => {
    if (activeSection === 'condiciones') {
      setActiveLeftSlide(index);
    } else {
      setActiveRightSlide(index);
    }
  };

  const renderContent = () => {
    const slides = activeSection === 'condiciones' ? leftSlides : rightSlides;
    const activeSlide = activeSection === 'condiciones' ? activeLeftSlide : activeRightSlide;

    return (
      <div className="mb-36 md:mb-0 overflow-x-hidden">
        <div className="w-full flex flex-col flex-grow box-web box-movil relative border rounded-lg bg-white p-4">
          <div className="absolute top-0 left-0 right-0 flex justify-start bg-gray-100 border-b tabs-button-container">
            {slides.map((slide, index) => (
              <button
                key={index}
                className={`tabs-button transition-all rounded-t-lg text-sm mx-1 ${activeSlide === index
                  ? `bg-secondary-color text-white`
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                onClick={() => handleSlideChange(index)}
              >
                {slide.title}
              </button>
            ))}
          </div>
          <div className="mt-12 p-4 flex flex-col flex-grow">
            <div className="p-3 rounded-lg flex-grow bg-gray-100">
              <h3 className="text-lg font-bold mb-1 text-gray-800">
                {slides[activeSlide].title}
              </h3>
              <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
                {slides[activeSlide].content}
              </Paragraph>
              <div className="contenedor">
                <img
                  src={slides[activeSlide]?.image}
                  className="contenido-imagen w-2/5 h-auto mb-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden mb-36 md:mb-0">
      <div className="bg-dark-color w-full py-6 px-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Title className="text-2xl mb-1 text-white">Aprendamos…</Title>
          <Subtitle className="text-xl text-white">Peligros en nuestra operación</Subtitle>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row p-4 md:p-6">
          {/* Columna izquierda para la imagen y el nuevo texto */}
          <div className="w-full md:w-2/5 flex flex-col">
            <div className="bg-white p-3 md:p-4 izq-img tam-img mx-auto"> {/* Updated div */}
              <img
                src={activeSection === 'condiciones' ? fisi : toxi}
                alt={activeSection === 'condiciones' ? "Condiciones subestándares" : "Actos subestándares"}
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Nuevo contenedor para el texto debajo de la imagen */}
            {/* <div className="bg-white p-4 mt-4 rounded-lg shadow">
              <Subtitle className="text-xl mb-4 text-center">
                {activeSection === 'condiciones' 
                  ? "Condiciones Subestándares (Inseguras):"
                  : "Actos Subestándares (Inseguros):"}
              </Subtitle>
              <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'} className="text-sm">
                {activeSection === 'condiciones'
                  ? "De acuerdo con el Capítulo 6 del Dec. 1072 del 2015, es toda situación que se presenta en el lugar de trabajo y que se caracteriza por la presencia de riesgos no controlados que pueden generar accidentes de trabajo o enfermedades laborales. Se pueden clasificar en:"
                  : "De acuerdo con Capítulo 6 del Dec. 1072 del 2015, es todo acto que realiza un trabajador de manera insegura o inapropiada y que puede facilitar la ocurrencia de un accidente de trabajo. Se pueden clasificar en:"}
              </Paragraph>
            </div> */}
          </div>

          {/* Columna derecha para el contenido */}
          <div className="w-full md:w-3/5 h-full bg-white p-3 md:p-4 md:ml-4">
            <div className='lar-instru px1'>
              <Instruction theme='light' arrow='down'>Clic sobre cada elemento para ampliar información</Instruction>
            </div>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setActiveSection('condiciones')}
                className={`flex-1 p-3 rounded-lg text-white transition-all ${activeSection === 'condiciones' ? 'bg-secondary-color' : 'bg-gray-500 hover:bg-gray-600'
                  }`}
              >
                Propiedades fisicoquímicas
              </button>
              <button
                onClick={() => setActiveSection('actos')}
                className={`flex-1 p-3 rounded-lg text-white transition-all ${activeSection === 'actos' ? 'bg-secondary-color' : 'bg-gray-500 hover:bg-gray-600'
                  }`}
              >
                Propiedades toxicológicas
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsoAdecuadoHerramientasMecanicas;


