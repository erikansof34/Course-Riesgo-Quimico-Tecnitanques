import Title from "../pages/components/Title";
import Subtitle from "../pages/components/Subtitle";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import Button from "../pages/components/Button";
import ModalDialog from "../pages/components/ModalDialog";
import { faPaw, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function VideoTextoTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="md:flex-1 bg-slate-900 md:w-1/2 w-full h-screen py-6 px-24 flex-col justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Left Column */}
          {/* Este div es opcional. Cuando el título requiere más información */}
          <div className="flex justify-start items-center gap-3">
            <span className="text-main-color font-bold my-auto">__</span>
            <h2 className="text-gray-500 font-semibold tracking-wide">
              ACTIVIDAD INTERACTIVA
            </h2>
          </div>
          <div className="my-8 text-center">
            <Title>Sistema Globalmente</Title>
            <Subtitle>Armonizado (SGA)</Subtitle>
          </div>
          <Paragraph>
            El Sistema Globalmente Armonizado (SGA) es un marco internacional
            para la clasificación y etiquetado de productos químicos, diseñado
            para comunicar los peligros y garantizar su manejo seguro mediante
            el uso de pictogramas y frases de precaución.
          </Paragraph>
          <Instruction arrow="up">
            Reproduce el video para dar respuesta a las preguntas
          </Instruction>
          <Button
            bold={true}
            icon={faThumbsUp}
            roundedFull={true}
            onClick={handleOpenModal}
          >
            Botón con ícono
          </Button>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full px-24 py-6 flex mx-auto justify-center items-center ">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          {/* Este div es opcional. Cuando el título requiere más información */}
          <div className="flex justify-start items-center gap-3">
            <span className="text-main-color font-bold my-auto">__</span>
            <h2 className="text-gray-500 font-semibold tracking-wide">
              ACTIVIDAD INTERACTIVA
            </h2>
          </div>
          <div className="my-8 text-center">
            <Title theme="light">Sistema Globalmente</Title>
            <Subtitle>Armonizado (SGA)</Subtitle>
          </div>
          <Paragraph theme="light">
            El Sistema Globalmente Armonizado (SGA) es un marco internacional
            para la clasificación y etiquetado de productos químicos, diseñado
            para comunicar los peligros y garantizar su manejo seguro mediante
            el uso de pictogramas y frases de precaución.
          </Paragraph>
          <Instruction arrow="down" theme="light">
            Reproduce el video para dar respuesta a las preguntas
          </Instruction>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Título del modal"
      >
        <p>Contenido del <strong>hola</strong>modal</p>
        <h1 className="text-4xl font-bold">titulo</h1>
      </ModalDialog>
    </div>
  );
}

export default VideoTextoTemplate;
