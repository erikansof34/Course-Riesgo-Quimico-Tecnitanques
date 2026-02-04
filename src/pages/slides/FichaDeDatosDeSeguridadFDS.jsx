import { useState, useEffect } from "react";
import useStore from "../../store";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import ModalDialog from "../components/ModalDialog";
import { useMediaQuery } from "react-responsive";
import "../../pages/slides/styles/FichaDeDatosDeSeguridadFDS.css";
import img1 from '../../assets/img/artes-morelco/ficha_fds_informacion_producto.webp';
import img2 from '../../assets/img/artes-morelco/ficha_fds_accidentes.webp';
import img3 from '../../assets/img/artes-morelco/ficha_fds_prevencion.webp';
import img4 from '../../assets/img/artes-morelco/ficha_fds_info_especifica_adicional.webp';
import Instruction from "../components/Instruction";

function RutaDeInspeccion() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleOpenModal = (texto, titulo) => {
    setModalText(texto);
    setModalTitle(titulo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalText("");
    setModalTitle("");
  };

  const cuadros = [
    {
      imagen: img1,
      texto: "Información Sobre el Producto.",
      modalTexto: "Información Sobre el Producto:\n 1. Identificación del producto y la compañía\n2. Identificación de peligros\n3. Composición e información sobre los componentes."
    },
    {
      imagen: img2,
      texto: "Accidentes.",
      modalTexto: "Accidentes: \n1. Medidas de primeros auxilios\n2. Medidas para extinción de incendios\n3. Medidas en caso de escape accidental"
    },
    {
      imagen: img3,
      texto: "Prevención de los Peligros y Protección",
      modalTexto: "Prevención de los Peligros y Protección:\n1. Manejo y almacenamiento\n2. Control de exposición y protección personal\n3. Propiedades físicas y químicas\n4. Estabilidad y reactividad"
    },
    {
      imagen: img4,
      texto: "Información Específica Adicional",
      modalTexto: "Información Específica Adicional:\n1. Información toxicológica\n2. Información ecológica\n3. Disposiciones del producto\n4. Información de transporte\n5. Información reglamentaria\n6. Información adicional"
    }
  ];

  return (
    <>
      <div className="regulacion-container-rq mb-36 md:mb-0">
        <div className="header-section-rq">
          <Title>Ficha De Datos De Seguridad FDS</Title>
          <div className="intro-text-rq">
            <Paragraph justify={isMobile ? 'justify' : 'justify'}>
              Documento oficial que proporciona información detallada sobre las propiedades, riesgos y manejo seguro de sustancias químicas o productos específicos.
            </Paragraph>
          </div>
        </div>
        <Instruction theme="light" arrow="down">
          Haz clic sobre cada elemento para ver más información
        </Instruction>
        <div className="cuadros-container pt-7 mb-5">
          {cuadros.map((cuadro, index) => (
            <div key={index} className="cuadro-wrapper">
              <div className="cuadro-fi">
                <img src={cuadro.imagen} alt={`Imagen ${index + 1}`} className="cuadro-imagen" />
                <Paragraph justify="justify" className="cuadro-texto">{cuadro.texto}</Paragraph>
                {/* Botón adicional */}
                <button
                  className="cuadro-boton"
                  onClick={() => handleOpenModal(cuadro.modalTexto, cuadro.texto)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle} // Usamos el título dinámico aquí
      >
        <Paragraph theme="light" justify={isMobile ? 'left' : 'left'}>
          {modalText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Paragraph>
      </ModalDialog>
    </>
  );
}

export default RutaDeInspeccion;
