import React, { useState, useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import imgZoom from "../../assets/img/artes-morelco/que-es-riesgo-quimico.webp";
import riesgoAudio from "../../assets/audio/sld4_que-riesgo-qumico.mp3";
import etiquetas1 from "../../assets/audio/identificacion_rapida_sld_4_etiqueta.mp3";
import etiquetas2 from "../../assets/audio/prevencion_riesgos_sld_4_etiqueta.mp3";
import etiquetas3 from "../../assets/audio/cumplimiento_normativo_sld_4_etiqueta.mp3";
import fichas1 from "../../assets/audio/informacion_completa_sld4_ficha_fds.mp3";
import fichas2 from "../../assets/audio/guia_manejo_seguro_sld4_ficha_fds.mp3";
import fichas3 from "../../assets/audio/referencia_emergencias_sld4_ficha_fds.mp3";

// import '../../assets/css/switch.css';
import './styles/QueEsElRiesgoQuimico.css';

import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";

import useStore from "../../store";

const AudioPlayer = React.forwardRef(({ src, id }, ref) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.load();
    }

    const handlePlay = () => {
      document.querySelectorAll('audio').forEach(otherAudio => {
        if (otherAudio !== audio && !otherAudio.paused) {
          otherAudio.pause();
        }
      });
    };

    if (audio) {
      audio.addEventListener('play', handlePlay);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
      }
    };
  }, []);

  React.useImperativeHandle(ref, () => ({
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }));

  return (
    <audio
      ref={audioRef}
      controls
      className="media-espanol"
    >
      <source src={src} type="audio/mp3" />
    </audio>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

function BienvenidosModulo() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isModalOpenEtiquetas, setIsModalOpenEtiquetas] = useState(false);
  const [isModalOpenFDS, setIsModalOpenFDS] = useState(false);
  const mainAudioRef = useRef(null);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const pauseMainAudio = useCallback(() => {
    if (mainAudioRef.current) {
      mainAudioRef.current.pause();
    }
  }, []);

  const handleOpenModalEtiquetas = () => {
    pauseMainAudio();
    setIsModalOpenEtiquetas(true);
  };

  const handleCloseModalEtiquetas = () => {
    setIsModalOpenEtiquetas(false);
  };

  const handleOpenModalFDS = () => {
    pauseMainAudio();
    setIsModalOpenFDS(true);
  };

  const handleCloseModalFDS = () => {
    setIsModalOpenFDS(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row mb-52 md:mb-0">
        {/* Columna Izquierda */}
        <div className="md:flex-1 display-mobile dark-mobile bg-dark-color md:w-1/2 w-full" style={{ paddingLeft: isMobile ? '12px' : '70px' }}>
          <div className="display-mobile flex flex-col justify-center items-center mb-4" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '-20px' }}>
            <div className="my-3 text-center text-title-size">
              <Title>¿Qué es el <span className="text-title-color">riesgo químico?</span></Title>
            </div>
            <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
              Es la probabilidad de que una o varias sustancias químicas causen daño a la salud de las personas,
              al medio ambiente o a las instalaciones. Esto puede ocurrir a través de la exposición a productos
              químicos peligrosos, ya sea por inhalación, contacto con la piel o ingestión. El riesgo químico puede
              incluir efectos inmediatos, como intoxicaciones, o efectos a largo plazo, como enfermedades crónicas.
            </Paragraph>
            <Instruction arrow="down" theme="dark">
              Haz clic para ejecutar el audio
            </Instruction>
            <AudioPlayer ref={mainAudioRef} src={riesgoAudio} id="riesgoAudio" />
            <div className="mt-10">
              <Button
                bold={false}
                icon={faThumbsUp}
                roundedFull={true}
                onClick={handleOpenModalEtiquetas}
              >
                Etiquetas de productos químicos
              </Button>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="md:flex-2 ligth-display bg-white md:w-1/2 w-full flex justify-center">
          <div className="flex flex-col justify-start items-center gap-0">
            <div className=" w-full h-auto max-w-[100%] flex justify-center items-center overflow-hidden mt-7">
              <img
                src={imgZoom}
                alt="Animated image"
                className="w-[80%] animate-slide"
              />
            </div>
            <Button
              bold={false}
              icon={faThumbsUp}
              roundedFull={true}
              onClick={handleOpenModalFDS}
            >
              Ficha de Datos de Seguridad (FDS)
            </Button>

            {/* Modal for Etiquetas */}
            <ModalDialog
              open={isModalOpenEtiquetas}
              handleClose={handleCloseModalEtiquetas}
              title="Etiquetas de productos químicos"
            >
              <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'}>
                La etiqueta es una señalización que se encuentra en el envase del producto químico y
                proporciona información inmediata sobre el mismo. Incluye pictogramas, advertencias, y
                detalles sobre los peligros asociados.
                <br /> <strong> Identificación Rápida:</strong>
                <div className="audio-center">
                  <AudioPlayer src={etiquetas1} id="etiquetas1" />
                </div>
                <br /> <strong> Prevención de Riesgos:</strong>
                <div className="audio-center">
                  <AudioPlayer src={etiquetas2} id="etiquetas2" />
                </div>
                <br /> <strong> Cumplimiento Normativo: <br /></strong>
                <div className="audio-center">
                  <AudioPlayer src={etiquetas3} id="etiquetas3" />
                </div>
              </Paragraph>
            </ModalDialog>

            {/* Modal for FDS */}
            <ModalDialog
              open={isModalOpenFDS}
              handleClose={handleCloseModalFDS}
              title="Ficha de Datos de Seguridad (FDS)"
            >
              <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'}>
                La FDS es un documento más extenso y detallado que proporciona información sobre las propiedades, riesgos, manejo, almacenamiento, y medidas de emergencia relacionadas con un producto químico.
                <br /> <strong> Información Completa:</strong> <br />
                <div className="audio-center">
                  <AudioPlayer src={fichas1} id="fichas1" />
                </div>
                <br /> <strong> Guía para el Manejo Seguro:</strong> <br />
                <div className="audio-center">
                  <AudioPlayer src={fichas2} id="fichas2" />
                </div>
                <br /> <strong> Referencia en Emergencias:<br /> </strong>
                <div className="audio-center">
                  <AudioPlayer src={fichas3} id="fichas3" />
                </div>
              </Paragraph>
            </ModalDialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default BienvenidosModulo;

