import { useState, useEffect } from "react";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { faCircleQuestion, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "../../store";
import { useMediaQuery } from "react-responsive";
import sabiaque from '../../assets/img/botones/sabias_que_icono.webp';
import imgPortada from "../../assets/img/artes-morelco/slide_portada_peligro.webp";
import imgIngeMorelco from "../../assets/img/artes-morelco/riesgo_quimico_manos.webp";
import mano1 from "../../assets/img/artes-morelco/irritacion.webp";
import mano2 from "../../assets/img/artes-morelco/quemaduras.webp";
import mano3 from "../../assets/img/artes-morelco/alergias.webp";
import mano4 from "../../assets/img/artes-morelco/riesgos_microbiológicos.webp";
import mano5 from "../../assets/img/artes-morelco/piel_agrietada.webp";
import mano6 from "../../assets/img/artes-morelco/dermatosis_irritacion.webp";
import "../slides/styles/ActosyCondicionesInsegurasProductosQuimicos.css";
import Subtitle from "../components/Subtitle";

function ActosyCondicionesInsegurasProductosQuimicos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const slides = [
    // {
    //   image: imgPortada,
    //   title: "Haz clic sobre las flechas",

    // },
    {
      image: mano1,
      title: "1. Irritación",

    },
    {
      image: mano2,
      title: "2. Quemaduras",

    },
    {
      image: mano3,
      title: "3. Alergias e incluso cáncer",

    },
    {
      image: mano4,
      title: "4. Riesgos microbiológicos que causan infecciones y muerte",

    },
    {
      image: mano5,
      title: "5. Piel agrietada",

    },
    {
      image: mano6,
      title: "6. Dermatosis por irritación (sustancias químicas, frotación) o las dermatosis alérgicas (sustancias químicas, polvos, vegetales).",

    }
  ];

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden mb-40 md:mb-0">
      <div className="md:flex-1 bg-dark-color md:w-1/2 w-full h-auto md:h-screen py-6 md:py-3 px-[6px] md:px-[14px] flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <div className="my-2 text-center">
            <Title>Actos y condiciones inseguras durante el </Title>
            <Subtitle>manejo de productos químicos</Subtitle>

          </div>
          <div className='w-[45%]'>
            <img className='mb-5' src={imgIngeMorelco} alt="Avatar instructor" />
          </div>
          <div className="px-6 md:px-14">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              ¿ Qué pasaría si ... agarro sin guantes de protección esta sustancia química?

            </Paragraph>
          </div>
          <div className="mt-2">
            <Button
              bold={false}
              icon={faCircleQuestion}
              roundedFull={true}
              onClick={() => setIsModalOpen(true)}
            >
              Considera
            </Button>
          </div>
        </div>
      </div>

      <div className="md:flex-1 bg-white md:w-1/2 w-full h-auto md:h-screen px-[6px] md:px-[14px] flex-col justify-start items-center">
        <div className="h-full my-auto flex flex-col justify-start items-center">
          <div className="px-6 md:px-14 flex justify-center w-auto">
            <Instruction arrow="down" theme="light">
              Clic sobre las flechas laterales para avanzar y retroceder
            </Instruction>
          </div>

          <div className="carousel-container">
            <button className="carousel-arrow prev" onClick={handlePrevSlide}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="carousel-content">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="carousel-image"
              />
              <div className="carousel-caption">
                <p>{slides[currentSlide].title}</p>
                {slides[currentSlide].audio && (
                  <audio controls className="carousel-audio">
                    <source src={slides[currentSlide].audio} type="audio/mp3" />
                  </audio>
                )}
              </div>
            </div>

            <button className="carousel-arrow next" onClick={handleNextSlide}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        title="Considera"
      >
        <div className="flex justify-center">
          <img
            src={sabiaque}
            alt="Considera"
            className="image-boton w-[40%]"
          />
        </div>
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          Debes utilizar protección de las manos siempre que exista el riesgo de algún tipo de lesión o enfermedad mientras realiza su trabajo.

        </Paragraph>
      </ModalDialog>
    </div>
  );
}

export default ActosyCondicionesInsegurasProductosQuimicos;