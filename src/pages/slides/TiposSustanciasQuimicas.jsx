import { useEffect, useState } from "react";
import slider3_1 from "../../assets/img/artes-morelco/sustancias-quimicas-tóxicas.webp";
import slider3_2 from "../../assets/img/artes-morelco/sustancias-quimicas-corrosivas.webp";
import slider3_3 from "../../assets/img/artes-morelco/sustancias-quimicas-inflamables.webp";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import Instruction from "../components/Instruction";
import { useMediaQuery } from "react-responsive";
import Title from "../components/Title";
import "../../pages/slides/styles/TiposSustanciasQuimicas.css";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import img1 from '../../assets/img/botones/recuerda_icono.webp';

function TiposSustanciasQuimicas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [activeCard, setActiveCard] = useState(null);
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

  const chemicalTypes = [
    {
      id: 1,
      icon: slider3_1,
      title: "Sustancias Químicas Tóxicas",
      characteristics: "Son altamente dañinas para la salud, pueden causar enfermedades agudas o crónicas.",
      examples: "Cianuro de potasio, mercurio, arsénico",
      alt: "Recordemos qué es el riesgo químico y su regulación en Colombia"
    },
    {
      id: 2,
      icon: slider3_2,
      title: "Sustancias Químicas Corrosivas",
      characteristics: "Son capaces de destruir tejidos vivos y materiales inorgánicos al contacto.",
      examples: "Ácido sulfúrico, hidróxido de sodio, ácido clorhídrico",
      alt: "Apliquemos el SGA (Sistema Globalmente Armonizado)"
    },
    {
      id: 3,
      icon: slider3_3,
      title: "Sustancias Químicas Inflamables",
      characteristics: " Pueden encenderse fácilmente y causar incendios o explosiones.",
      examples: "Gasolina, acetona, metano",
      alt: "Transporte de mercancías peligrosas"
    }
  ];

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="tipos-container-tp overflow-auto mb-52 md:mb-0">
      <div className="header-section-tp">
        <Title> Recordemos 3 de las clases de sustancias químicas</Title>
        <Subtitle>las cuales se consideran entre las más peligrosas</Subtitle>
      </div>

      <div className="intro-text-tp">
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          En el manejo de productos químicos, es fundamental conocer las <strong>clases</strong> más peligrosas para prevenir
          accidentes y proteger la salud. A continuación, se presentan tres de las principales <strong>clases de sustancias
            químicas peligrosas </strong> y sus características clave.
        </Paragraph>
      </div>

      <div className="instruction-text-tp">
        <Instruction theme="light" arrow="down">
          Desliza el cursor sobre cada tarjeta
        </Instruction>
      </div>

      <div className="cards-container-tp">
        {chemicalTypes.map((type) => (
          <div
            key={type.id}
            className={`chemical-card-tp ${activeCard === type.id ? 'active' : ''}`}
            onClick={() => handleCardClick(type.id)}
          >
            <img
              className="card-icon-tp"
              src={type.icon}
              alt={type.alt}
            />
            <h3 className="card-title-tp">{type.title}</h3>
            <div className="card-content-tp">
              <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
                <strong>Características:</strong> <span>{type.characteristics}</span>
                <br />
                <strong>Ejemplos: </strong><span>{type.examples}</span>
              </Paragraph>
            </div>

          </div>
        ))}

        <ModalDialog
          open={isModalOpen}
          handleClose={handleCloseModal}
          title="Recordemos"
        >
          <img
            src={img1}
            alt="Votemos"
            className="image-boton w-[40%]"
          />
          <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'} >
            Las sustancias peligrosas son aquellas que pueden producir un daño a la salud de las personas, afectación al medio ambiente, deterioro de las instalaciones o espacios físicos.
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
          Recordemos
        </Button>
      </div>
    </div>
  );
}

export default TiposSustanciasQuimicas;
