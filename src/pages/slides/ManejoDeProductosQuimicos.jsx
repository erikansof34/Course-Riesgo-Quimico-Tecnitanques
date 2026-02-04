import { useState, useEffect } from "react";
import '../../assets/css/switch.css';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { useMediaQuery } from "react-responsive";
import useStore from "../../store";

import inhalar from '../../assets/img/artes-morelco/inhalar_proceso_quimico.webp';
import '../slides/styles/ManejoDeProductosQuimicos.css';
import img1 from '../../assets/img/artes-morelco/irritacion_ojos.webp';
import img2 from '../../assets/img/artes-morelco/pulmonar_deterioro.webp';
import img3 from '../../assets/img/artes-morelco/alergica_inflamacion.webp';
import img4 from '../../assets/img/artes-morelco/inflamacion_vias.webp';
import img5 from '../../assets/img/artes-morelco/cancer_plumon.webp';
import img6 from '../../assets/img/artes-morelco/dano_pulmonar.webp';
import sabiaque from '../../assets/img/botones/sabias_que_icono.webp';

function ManejoDeProductosQuimicos() {
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

  // Array para guardar las situaciones con sus respectivas imágenes y descripciones
  const situaciones = [
    { imgSrc: img1, descripcion: "Irritación de los ojos o la nariz, tos, sangre en el esputo y ahogo." },
    { imgSrc: img2, descripcion: "Daño pulmonar" },
    { imgSrc: img3, descripcion: "Inflamación de las vías respiratorias" },
    { imgSrc: img4, descripcion: "Respuesta alérgica que conduce a una inflamación." },
    { imgSrc: img5, descripcion: "Cáncer de pulmón" },
    { imgSrc: img6, descripcion: "Deterioro de la función pulmonar a largo plazo, aún años después del episodio de exposición a los gases" }
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        {/* Columna Izquierda */}
        <div className="md:flex-1 display-mobile dark-mobile py-12 bg-dark-color md:w-1/2 w-full">
          <div className="display-mobile flex flex-col justify-center items-center mb-4" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '-20px' }}>
            <div className="my-3 text-center text-title-size">
              <Title>Actos y condiciones inseguras durante el manejo de <span className="text-title-color">productos químicos</span></Title>
            </div>
            <img
              src={inhalar}
              alt="Imagen"
              className="mx-auto mb-4"
              style={{ maxWidth: '40%' }}
            />
            <Paragraph theme="dark" justify={isMobile ? 'justify' : 'justify'}>
              ¿Qué pasaría si ... alguien inhala este producto químico?
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
              ¿Sabías que?
            </Button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="md:flex-2 light-display bg-white md:w-1/2 w-full flex justify-center">
          <div className="flex flex-col justify-center items-center gap-4">
            {/* Instrucción centrada */}
            <Instruction arrow="down" theme="light" className="text-center w-full">
              Lee atentamente estas situaciones
            </Instruction>
            {/* Situaciones con imágenes y descripciones */}
            <div className="w-full max-w-md text-center mb-7"> {/* Alarga el ancho máximo */}
              {situaciones.map((situacion, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg cursor-pointer mb-2 situacion-item"
                  style={{ textAlign: 'justify' }} // Justifica el texto
                >
                  <img src={situacion.imgSrc} alt="Situación" className="w-10 h-10 mr-4" />
                  <span className="text-white">{situacion.descripcion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal personalizado */}
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="¿Sabías que?"
      >
        <img
          src={sabiaque}
          alt="Votemos"
          className="image-boton w-[40%]"
        />

        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          El mejor modo de prevenir la exposición es obrar con extrema cautela
          cuando se manipulan gases y sustancias químicas. Las personas que usan
          productos de limpieza u otros productos químicos deben trabajar en áreas bien ventiladas.
        </Paragraph>
      </ModalDialog>
    </>
  );
}

export default ManejoDeProductosQuimicos;
