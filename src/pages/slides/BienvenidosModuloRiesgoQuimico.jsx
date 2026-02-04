import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import imgSlide2 from "../../assets/img/artes-morelco/m6slide2.png";
import img2 from "../../assets/img/artes-morelco/rateus.png";
// import rateUs from "../../assets/img/slides/rateus.png";
// import React, { useState} from 'react';
import Title from "../components/Title";
import { useState } from "react";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";

function BienvenidosModuloRiesgoQuimico() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  return (
    <>
      <div className="flex flex-col md:flex-row ">
        {/* Left Column */}
        <div className="md:flex-1 bg-slate-900 md:w-1/2 w-full h-screen py-6 px-24  flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-3 ">
          </div>
          <div className=" h-[90vh] my-auto flex flex-col justify-center items-center">
            <Title>
              Bienvenidos al módulo de Prevención y Control 
            </Title>
            <Subtitle>
             del Riesgo Químico
           </Subtitle>
            <Paragraph>
              Bienvenidos a este módulo virtual, en el cual queremos
              sensibilizar a los responsables del manejo de sustancias químicas
              en nuestra operación, acerca del buen uso y aplicación del SGA
              (sistema Globalmente Armonizado) para una correcta manipulación de
              las sustancias químicas más usadas en nuestros procesos.
              Recordaremos la regulación que nos rige en Colombia, y las
              recomendaciones para un correcto transporte de mercancías
              peligrosas dentro y fuera de nuestra operación.
            </Paragraph>
            <Button
              bold={true}
              icon={faThumbsUp}
              roundedFull={true}
              onClick={handleOpenModal}>
              Votemos

            </Button>
            <ModalDialog
            open={isModalOpen}
            handleClose={handleCloseModal}
            title="Votemos:"
          >
            <img src={img2} alt="" className="image-boton" />
            <p>
           Qué tan alto consideras el nivel de RIESGO QUIMICO en tus tareas diarias?
            </p>
                <div className="audio-container">            
                </div>
                
          </ModalDialog>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:flex-2 bg-white md:w-1/2 w-full px-10 md:pr-20 flex mx-auto justify-center items-center pb-24">
          <div className="flex flex-col justify-center items-center p-6 gap-4 h-[50vh] max-w-[70%] mx-auto ">
            {/* </div> */}
            <div className="image-container mt-5">
              <img
                src={imgSlide2}
                alt="sample67"
                className="animated-image pt-4"
              />
            </div>
          </div>
        </div>
      </div>        
    </>
  );
}

export default BienvenidosModuloRiesgoQuimico;
