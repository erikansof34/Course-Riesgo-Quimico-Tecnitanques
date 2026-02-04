import { useState, useEffect } from "react";
import useStore from "../../store";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import "../../pages/slides/styles/RutaDeInspeccion.css";
import img1 from '../../assets/img/artes-morelco/ruta_inespeccion1.webp';
import img2 from '../../assets/img/artes-morelco/ruta_inespeccion2.webp';
import img3 from '../../assets/img/artes-morelco/ruta_inespeccion3.webp';
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import recuerda from '../../assets/img/botones/recuerda_icono.webp';
function RutaDeInspeccion() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
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

  // Datos para cada cuadro con las imágenes importadas correctamente
  const cuadros = [
    {
      imagen: img1,
      texto: "Inspeccione el equipo antes de colocárselo, verifique que no tenga averías o deterioros."
    },
    {
      imagen: img2,
      texto: "Realice limpieza a los elementos de protección personal antes y después de utilizarlos."
    },
    {
      imagen: img3,
      texto: "Almacene sus elementos de protección adecuadamente."
    }
  ];

  return (
    <>
      <div className="regulacion-container-rq mb-40 md:mb-0">
        <div className="header-section-rq">
          <Title>Ruta de inspección</Title>
          <div className="intro-text-rq">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              Es el recorrido planificado que se sigue para revisar áreas, equipos o procesos,
              con el fin de identificar posibles fallos, riesgos o desviaciones en su funcionamiento.
            </Paragraph>
          </div>
        </div>

        {/* Cuadros de inspección */}
        <div className="cuadros-container pt-7 mb-5">
          {cuadros.map((cuadro, index) => (
            <div key={index} className="cuadro-wrapper">
              <div className="cuadro">
                <img src={cuadro.imagen} alt={`Imagen ${index + 1}`} className="cuadro-imagen" />
                <Paragraph justify="center" className="cuadro-texto">{cuadro.texto}</Paragraph>
              </div>
              {/* Añade la flecha entre tarjetas, excepto después de la última */}
              {index < cuadros.length - 1 && <div className="flecha">&#8594;</div>}
            </div>
          ))}
        </div>


        {/* <Button
          bold={false}
          icon={faThumbsUp}
          roundedFull={true}
          onClick={handleOpenModal}
        >
          Recuerda
        </Button> */}
      </div>
      {/* <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Recuerda"
      > */}
      {/* <img
          src={recuerda}
          alt="Votemos"
          className="image-boton w-[40%]"
        />
        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'} >
        Es importante verificar que se cuente siempre con los elementos de 
        protección personal adecuados para la labor a realizar, considerando 
        el tipo de productos químicos involucrados. Además, asegúrese de que 
        estos elementos estén en buen estado. Ante cualquier duda o requerimiento, 
        consulte con el área de HSE para recibir orientación y solicitar los equipos necesarios.
        </Paragraph>
      </ModalDialog> */}
    </>
  );
}

export default RutaDeInspeccion;
