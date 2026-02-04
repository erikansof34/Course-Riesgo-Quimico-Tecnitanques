import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import useStore from "../../store";
import imgIngeMorelco from "../../assets/img/artes-morelco/avatar_asombrado.webp";
import Button from '../components/Button';
import ModalDialogText from '../components/ModalDialogText';
// Importar imágenes de peligros
import imgPeligro1 from "../../assets/img/artes-morelco/efecto_salud_carcinogenicos_.webp";
import imgPeligro2 from "../../assets/img/artes-morelco/efecto_salud_mutagenicos.webp";
import imgPeligro3 from "../../assets/img/artes-morelco/efecto_salud_teratogenicos.webp";
import imgPeligro4 from "../../assets/img/artes-morelco/efecto_salud_toxicos_reproduccion.webp";
import img1 from '../../assets/img/artes-morelco/Efecto_salud_infografía_horizontal_morelco.webp';
import img2 from '../../assets/img/artes-morelco/efectos_sobre_salud_infografía.webp';
// import imgPeligro5 from "../../assets/img/artes-morelco/peligro-5-sld6.png";
// import imgPeligro6 from "../../assets/img/artes-morelco/peligro-6-sld6.png";
// import imgPeligro7 from "../../assets/img/artes-morelco/peligro-7-sld6.png";
// import imgPeligro8 from "../../assets/img/artes-morelco/peligro-8-sld6.png";
// Importar audios
// import audioFisico from "../../assets/audio/sld6_fisico.mp3";
// import audioQuimico from "../../assets/audio/sld6_quimicos.mp3";
// import audioBiologico from "../../assets/audio/sld6_biologicos.mp3";
// import audioPsicosocial from "../../assets/audio/sld6_riesgo_psicosical.mp3";
// import audioBiomecanico from "../../assets/audio/sld6_biomecanicos.mp3";
// import audioSeguridad from "../../assets/audio/sld6_condiciones_seguridad.mp3";
// import audioNatural from "../../assets/audio/sld6_fenomenos_naturales.mp3";
// import audioMecanico from "../../assets/audio/sld6_mecanicos.mp3";

import "../../pages/slides/styles/EfectosSobreLaSalud.css";

export default function EfectosSobreLaSalud() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hazardCards = [
    {
      image: imgPeligro1,
      title: "Carcinogénicos",
      description: "Sustancia química que puede producir cáncer",

    },
    {
      image: imgPeligro2,
      title: "Mutagénicos",
      description: " sustancia química que causa malformaciones genéticas.",

    },
    {
      image: imgPeligro3,
      title: "Teratogénicos",
      description: "productos químicos que afectan el feto.",

    },
    {
      image: imgPeligro4,
      title: "Tóxicos para la reproducción",
      description: "sustancias que causan esterilidad.",

    },
    // {
    //   image: imgPeligro5,
    //   title: "Biomecánicos",
    //   description: "Posturas prolongadas, esfuerzo, movimiento repetitivo.",

    // },
    // {
    //   image: imgPeligro6,
    //   title: "Condiciones de seguridad",
    //   description: "Trabajo en alturas, espacios confinados",

    // },
    // {
    //   image: imgPeligro7,
    //   title: "Fenómenos naturales",
    //   description: "Sismo, terremoto, inundación, derrumbes",

    // },
    // {
    //   image: imgPeligro8,
    //   title: "Mecánicos",
    //   description: "Uso de maquinaria, equipos, herramientas.",

    // }
  ];

  useEffect(() => {
    setIsOnDivisor(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsOnDivisor]);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        {/* Left Column */}
        <div className="md:w-2/5 w-full h-auto md:h-screen bg-dark-color px-6 md:px-20 py-6 md:py-3 flex flex-col justify-center items-center">
          <div className="text-center">
            <Title>Efectos sobre la salud</Title>
          </div>
          <div className='w-[60%]'>
            <img className='mb-0' src={imgIngeMorelco} alt="Avatar instructor" />
          </div>
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Los efectos sobre la salud de sustancias químicas peligrosas incluyen diversas alteraciones dependiendo del tipo de exposición.</Paragraph>
          <div className='mt-5'>
            <Button
              bold={false}
              icon={faThumbsUp}
              roundedFull={true}
              onClick={handleOpenModal}
            >
              Recordemos
            </Button>
          </div>
        </div>
        {/* Right Column */}
        <div className="md:w-3/5 w-full bg-white px-6 md:pr-20 py-6 md:py-3 flex flex-col justify-start items-center">
          <div className="w-full">
            <div className="flex flex-col items-center">
              <div className="w-auto mb-4">
                <Instruction arrow="down" theme="light">
                  Desplaza el mouse para ver más información              </Instruction>
              </div>
              <div className="cards-wrapper_peligro">
                {hazardCards.map((card, index) => (
                  <div key={index} className="card-container_peligro">
                    <div className="card_peligro">
                      <div className="card-face_peligro card-front_peligro">
                        <img src={card.image} alt={card.title} style={{ width: '95%', maxWidth: '200px', height: 'auto', objectFit: 'cover', margin: '0 auto' }} />

                        <h3>{card.title}</h3>
                      </div>
                      <div className="card-face_peligro card-back_peligro">
                        <Paragraph>{card.description}</Paragraph>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal personalizado */}
      <ModalDialogText
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Recordemos"
      >
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          Observar la siguiente información sobre los posibles efectos sobre la salud
          <img
            src={isMobile ? img2 : img1} // Selección de imagen según el dispositivo
            alt="Recordemos"
            className={isMobile ? " w-[330px] h-[560px]" : " w-[100%]"} // Clases condicionales
          />
          {/* El resto del contenido del modal permanece igual */}
        </Paragraph>
      </ModalDialogText>

    </>
  );
}