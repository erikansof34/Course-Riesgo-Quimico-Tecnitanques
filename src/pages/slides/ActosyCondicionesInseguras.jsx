import { useState, useEffect } from "react";
import img1 from '../../assets/img/artes-morelco/actos-inseguros-manejo-quimicos.webp';
import '../../assets/css/switch.css';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from "../components/ModalDialog";
import '../slides/styles/ActosyCondicionesInseguras.css';
import { useMediaQuery } from "react-responsive";
import img2 from '../../assets/img/botones/sabias_que_icono.webp';

import useStore from "../../store";

function ActosyCondicionesInseguras() {
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
        <div className="md:flex-1 display-mobile bg-dark-color md:w-1/2 w-full">
          <div className="flex flex-col justify-center items-center mb-4" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '-20px' }}>
            <div className="my-3 text-center text-title-size">
              <Title>Actos y condiciones inseguras durante el manejo de <span className="text-title-color">productos químicos</span></Title>
            </div>
            <img
              src={img1}
              alt="Imagen "
              className="mx-auto mb-4"
              style={{ maxWidth: '40%' }}
            />
            <Paragraph theme="dark" justify={isMobile ? 'justify' : 'justify'}>
              ¿ Qué pasaría si ... un producto se mezcla accidentalmente con otro?
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
              Ten en cuenta
            </Button>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="md:flex-2 light-display bg-white md:w-1/2 w-full flex justify-center">
          <div className="flex flex-col justify-center items-center gap-4 mb-36">
            {/* Instrucción centrada */}
            <Instruction arrow="down" theme="light" className="text-center w-full">
              Lee atentamente estas situaciones
            </Instruction>
            {/* Tabla centrada */}
            <table className="table-wide border-collapse text-center">

  <thead>
    <tr>
      <th className="bg-black text-white p-2">Situaciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="table-cell-hover bg-gray-300 p-2">Es peligrosa para la salud</td>
    </tr>
    <tr>
      <td className="table-cell-hover bg-gray-200 p-2">Puede provocar incendios y explosiones</td>
    </tr>
    <tr>
      <td className="table-cell-hover bg-gray-300 p-2">Es peligrosa para el medio ambiente</td>
    </tr>
    <tr>
      <td className="table-cell-hover bg-gray-200 p-2">Riesgo tóxico</td>
    </tr>
    <tr>
      <td className="table-cell-hover bg-gray-300 p-2">Afecciones respiratorias, cutáneas y oculares</td>
    </tr>
  </tbody>
</table>

          </div>
        </div>
      </div>

      {/* Modal personalizado */}
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title=" Ten en cuenta"
      >
          <img
          src={img2}
          alt="Votemos"
          className="image-boton w-[40%]"
        />

        <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          La mezcla de cloro con:<br/>
          🚫 Vinagre produce “gas cloro”. Tóxico<br/>
          🚫 Amoníaco produce Cloramina. Tóxico<br/>
          🚫 Alcohol produce Cloroformo. Tóxico<br/>
          La mezcla de agua oxigenada y vinagre: Ácido Peracético.
        </Paragraph>
      </ModalDialog>
    </>
  );
}

export default ActosyCondicionesInseguras;
