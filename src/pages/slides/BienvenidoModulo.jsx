import { useState, useEffect } from "react";
import imgZoom from "../../assets/img/sld1/slide1.webp";
import '../../assets/css/switch.css';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
// import ParagraphMobile from "../components/ParagraphMobile";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import '../slides/styles/BienvenidoModulo.css';
import { useMediaQuery } from "react-responsive";
import img1 from '../../assets/img/botones/recuerda_icono.webp';

import useStore from "../../store";

function BienvenidosModulo() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        {/* Columna Izquierda */}
        <div className="md:flex-1 display-mobile dark-mobile bg-dark-color md:w-1/2 w-full">
          <div className="display-mobile flex flex-col justify-center items-center mb-4"style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '-20px' }}>
            <div className="my-3 text-center text-title-size">
              <Title>Bienvenidos al módulo de</Title>
              <Subtitle>Prevención y Control del Riesgo Químico</Subtitle>
            </div>
            <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
              Bienvenidos a este módulo virtual, en el cual queremos sensibilizar a los responsables del manejo de sustancias químicas en nuestra operación, acerca del buen uso y aplicación del SGA (Sistema Globalmente Armonizado) para una correcta manipulación de las sustancias químicas más usadas en nuestros procesos. Recordaremos la regulación que nos rige en Colombia, y las recomendaciones para un correcto transporte de mercancías peligrosas dentro y fuera de nuestra operación.
            </Paragraph>
            <Instruction arrow="down" theme="dark">
              Haz clic sobre el botón para ver más información
            </Instruction>
            <Button
              bold={false}
              icon={faThumbsUp}
              roundedFull={true}
              onClick={handleOpenModal}
            >
              Recuerda
            </Button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="md:flex-2 ligth-display bg-white md:w-1/2 w-full flex justify-start">
          <div className="flex flex-col justify-start items-center gap-4">
            {/* <Instruction arrow="down" theme="ligth" className="w-full">
              Observa la animación de la imagen
            </Instruction> */}
            <div className=" w-full h-auto max-w-[100%] flex justify-center items-center overflow-hidden">
              <img 
                src={imgZoom} 
                alt="Animated image" 
                className="w-[60%] animate-slide"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal personalizado */}
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Recuerda"
      >
        <img
          src={img1}
          alt="Votemos"
          className="image-boton w-[40%]"
        />
        <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'} >
        Asegúrate siempre de contar con los elementos de protección personal (EPP) 
        adecuados para la tarea que va a realizar, considerando el tipo de producto químico 
        que se manipulará. Verifique que estos elementos se encuentren en buen estado antes 
        de usarlos. En caso de dudas o si necesita solicitar EPP adicionales, consulte con el 
        área de Salud, Seguridad y Medio Ambiente (HSE).
        </Paragraph>
      </ModalDialog>
    </>
  );
}

export default BienvenidosModulo;