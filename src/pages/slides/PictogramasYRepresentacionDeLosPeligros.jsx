import { useEffect, useState } from "react";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import Instruction from "../components/Instruction";
import riesgoAudio from "../../assets/audio/slide09.mp3";
import Picto1 from "../../assets/img/artes-morelco/picto1.webp";
import Picto2 from "../../assets/img/artes-morelco/picto2.webp";
import Picto3 from "../../assets/img/artes-morelco/picto3.webp";
import Picto4 from "../../assets/img/artes-morelco/picto4.webp";
import Picto5 from "../../assets/img/artes-morelco/picto5.webp";
import Picto6 from "../../assets/img/artes-morelco/picto6.webp";
import Picto7 from "../../assets/img/artes-morelco/picto7.webp";
import Picto8 from "../../assets/img/artes-morelco/picto8.webp";
import Picto9 from "../../assets/img/artes-morelco/picto9.webp";
import "../../pages/slides/styles/PictogramasYRepresentacionDeLosPeligros.css";
import { useMediaQuery } from "react-responsive";
import Subtitle from "../components/Subtitle";
import ModalDialog from '../components/ModalDialog';
import img1 from '../../assets/img/botones/recuerda_icono.webp';
import Button from "../components/Button";

function PictogramasYRepresentacionDeLosPeligros() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [flippedIndex, setFlippedIndex] = useState(null); // Almacena solo el índice de la tarjeta actual
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const images = [
    Picto9, Picto5, Picto7, Picto3, Picto4, Picto6, Picto1, Picto2, Picto8,
  ];
  const handleOpenModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleCloseModal1 = () => {
    setIsModalOpen1(false);
  };
  const backTexts = [
    "Nombre: Explosivo\nSímbolo: Bomba explotando Ejemplo: Fuegos artificiales.",
    "Nombre: Inflamable Símbolo: Llama \nEjemplo: Aceite para Lámparas.",
    "Nombre: Peligro para la salud \nSímbolo: Signo de exclamación \nEjemplo: Limpiadores de inodoros",
    "Nombre: Peligro grave para la salud \nSímbolo: Peligro para la salud \nEjemplo: Gasolina",
    "Nombre: Gas a presión Símbolo: Bombona de gas Ejemplo: Botellas de gas",
    "Nombre: Peligro para el medio ambiente \nSímbolo: Medio ambiente \nEjemplo: Plaguicidas",
    "Nombre: Corrosivo \nSímbolo: Corrosión \nEjemplo: Desatascadores de tuberías",
    "Nombre: Comburente\nSímbolo: Llama sobre un círculo \nEjemplo: Oxígeno para usos médicos",
    "Nombre: Toxicidad aguda Símbolo: Calavera y tibias cruzadas \nEjemplo: Metanol",
  ];

  const handleCardClick = (index) => {
    // Si la tarjeta que se hizo clic ya está volteada, se desvolteará, de lo contrario, volteará la tarjeta seleccionada
    setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0 md:h-screen h-auto">
      <div className="md:w-2/5 display-mobile dark-mobile bg-dark-color py-3 w-full flex flex-col justify-center items-center">
        <div
          className="display-mobile flex flex-col justify-center items-center mb-4"
          style={{
            position: isMobile ? "static" : "relative",
            top: isMobile ? "0" : "-30px",
            padding: isMobile ? "0" : "3rem",
          }}
        >
          <div className="my-3 text-center">
            <Title>Pictogramas y representación</Title>
            <Subtitle>de los peligros en las sustancias químicas</Subtitle>
          </div>
          <div>
            <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
              Recordemos los 9 pictogramas que utiliza el SGA para clasificar
              las sustancias o productos químicos: <br />
              Para conocer los tipos de peligros escucha el siguiente audio
            </Paragraph>
          </div>
          <Instruction arrow="down">Haz clic para ejecutar el audio</Instruction>
          <audio controls className="media-espanol mb-5">
            <source src={riesgoAudio} type="audio/mp3" />
          </audio>
          <Button
            roundedFull={true}
            icon={faBrain}
            onClick={handleOpenModal1}
            className="flex items-center bg-main-color rounded-full px-4 py-2 text-white"
          >
            Recordemos...
          </Button>
        </div>
      </div>

      <div className="bg-white md:max-w-[60%] w-full px-4 flex mx-auto justify-center items-center mr-10">
        <div
          className="h-full my-auto flex flex-col justify-center items-center"
          style={{
            position: isMobile ? "static" : "relative",
            top: isMobile ? "0" : "-30px",
          }}
        >
          <div
            className="container h-auto flex flex-col"
            style={{ padding: isMobile ? "0" : "3rem" }}
          >
            <div className="row mx-auto">
              <div className="col-md-12 col-lg-12 text-center mb-24">
                <Instruction theme="light" arrow="down">
                  Haz clic en cada pictograma para identificar el tipo de peligro y su clasificación
                </Instruction>
                <div className="ctAct h-full gap-2 grid grid-cols-1 md:grid-cols-3 mx-auto">
                  {images.map((src, index) => (
                    <div
                      className={`picto-card-container ${flippedIndex === index ? "flipped" : ""
                        }`}
                      key={index}
                      onClick={() => handleCardClick(index)}
                    >
                      <div className="picto-card">
                        <div className="picto-card-front">
                          <img
                            className="w-full max-w-[130px] h-auto mt-3"
                            src={src}
                            alt="Pictograma"
                          />
                        </div>
                        <div className="picto-card-back">
                          <p className="text-small">
                            {/* Procesar el texto con saltos de línea */}
                            {backTexts[index].split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                  <ModalDialog
                    open={isModalOpen1}
                    handleClose={handleCloseModal1}
                    title="Recordemos"
                  >
                    <img
                      src={img1}
                      alt="Votemos"
                      className="image-boton w-[40%]"
                    />
                    <Paragraph theme='light' justify='justify'>Recuerda que, según el Sistema Globalmente Armonizado (SGA), existen 9 pictogramas para identificar peligros en tres categorías: peligros físico-químicos, peligros para la salud y peligros ambientales, con los cuales podrás interactuar en la presente actividad.</Paragraph>
                  </ModalDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PictogramasYRepresentacionDeLosPeligros;
