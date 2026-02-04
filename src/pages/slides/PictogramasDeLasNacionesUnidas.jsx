import { useEffect, useState } from "react";
import useStore from "../../store";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Instruction from "../components/Instruction";
import Subtitle from "../components/Subtitle";
import signoInterrogacion from "../../assets/img/artes-morelco/signo_interrogacion.webp";
import imgExplosivos from "../../assets/img/artes-morelco/sl14-1.webp";
import imgGasInflamable from "../../assets/img/artes-morelco/sl14-2.webp";
import imgGasNoToxico from "../../assets/img/artes-morelco/sl14-3.webp";
import imgGasToxico from "../../assets/img/artes-morelco/sl14-4.webp";
import imgLiquidosInfamables from "../../assets/img/artes-morelco/sl14-5.webp";
import imgSolidosInflamables from "../../assets/img/artes-morelco/sl14-6.webp";
import imgSolidosEsponaneamenteCombustibles from "../../assets/img/artes-morelco/sl14-7.webp";
import imgSolidosReaccionAgua from "../../assets/img/artes-morelco/sl14-8.webp";
import imgOxidantes from "../../assets/img/artes-morelco/sl14-9.webp";
import imgPeroxidoOrganico from "../../assets/img/artes-morelco/sl14-10.webp";
import imgSolidosLiquidosToxicos from "../../assets/img/artes-morelco/sl14-11.webp";
import imgBiologicos from "../../assets/img/artes-morelco/sl14-12.webp";
import imgRadiactivos from "../../assets/img/artes-morelco/sl14-13.webp";
import imgCorrosivos from "../../assets/img/artes-morelco/sl14-14.webp";
import imgPeligrosVarios from "../../assets/img/artes-morelco/sl14-15.webp";
import '../../pages/slides/styles/PictogramasDeLasNacionesUnidas.css';

var correctCount4 = 0;

function PictogramasDeLasNacionesUnidas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [images, setImages] = useState({}); // Estado para almacenar imágenes reveladas

  const mostrarImagen = (elemento) => {
    const id = elemento.id; // Obtén el id del elemento clicado
    setImages((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Alterna el estado de visibilidad de la imagen
    }));

    correctCount4++;
    console.log(correctCount4);

    let interrogacion = elemento;
    let respuesta = elemento.nextElementSibling;

    // Ocultar el signo de interrogación
    interrogacion.style.display = "none";

    // Mostrar la imagen de respuesta
    respuesta.style.display = "inline";

    let correct = correctCount4;
    let total = 5;
    let percentage = (correctCount4 / total) * 100;

    // Actividad ID para el seguimiento
    let activity_id = 5;

    trackingManager_activities.getProgress(userId, courseId, module_id, fullName, percentage, activity_id);
    getProgressActivity(userId, courseId, module_id, fullName, percentage, activity_id, correct, total);
  };

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  return (
    <div className="picFlexCol">
      {/* Contenedor del título y el párrafo */}
      <div className="bg-dark-color w-full py-6 px-10 flex flex-col justify-center items-center text-center">
        <Title justify='center'>
          Pictogramas de las Naciones Unidas para el transporte de mercancías peligrosas
        </Title>
        <Subtitle>Transporte de mercancías peligrosas</Subtitle>
        <div className="text-center">
          <Paragraph justify="justify">
            Si los productos químicos requieren ser transportados, se debe
            incluir en la etiqueta, los pictogramas utilizados por las
            Recomendaciones de las Naciones Unidas relativas al Transporte de
            Mercancías Peligrosas: Reglamentación Modelo, acorde a lo
            establecido en el Decreto 1079 del 2015 y la Norma Técnica
            Colombiana - NTC1692 relativa al uso de los pictogramas de Naciones
            Unidas para el transporte.
          </Paragraph>
        </div>
      </div>

      <div className="md:mb-0 mb-36">
        <div className="bg-white py-6 flex flex-col justify-center items-center">
          <Instruction theme="light" arrow="down">
            Haz click en los signos de pregunta para descubrir los pictogramas
            recomendados por las Naciones Unidas
          </Instruction>
        </div>

        {/* Contenedor de los pictogramas */}
        <div className="picCtAct grid-containerPic overflow-y-auto w-[100vw] 2xl:px-[20%]">
          <div className="grid-item cuadro">
            <div className="interrogacion-container">
              <img
                className="interrogacion track-element"
                id="actividad_6"
                src={signoInterrogacion}
                onClick={(e) => mostrarImagen(e.currentTarget)}
                alt="Interrogación"
              />
              {images.actividad_6 && <img src={imgExplosivos} alt="Explosivos" />} {/* Imagen revelada */}
            </div>
            <Paragraph>Explosivos</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgGasInflamable} alt="Gas inflamable" />
            <Paragraph>Gas inflamable</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <div className="interrogacion-container">
              <img
                className="track-element"
                src={signoInterrogacion}
                id="actividad_7"
                onClick={(e) => mostrarImagen(e.currentTarget)}
                alt="Interrogación"
              />
              {images.actividad_7 && (
                <img src={imgGasNoToxico} alt="Gas no tóxico, no inflamable" />
              )}
            </div>
            <Paragraph>Gas no tóxico, no inflamable</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgGasToxico} alt="Gas tóxico" />
            <Paragraph>Gas tóxico</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgLiquidosInfamables} alt="Líquidos inflamables" />
            <Paragraph>Líquidos inflamables</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgSolidosInflamables} alt="Sólidos inflamables" />
            <Paragraph>Sólidos inflamables</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img
              src={imgSolidosEsponaneamenteCombustibles}
              alt="Sólidos espontáneamente combustibles"
            />
            <Paragraph>Sólidos espontáneamente combustibles</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img
              src={imgSolidosReaccionAgua}
              alt="Sólidos que reaccionan con el agua"
            />
            <Paragraph>Sólidos que reaccionan con el agua</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <div className="interrogacion-container">
              <img
                className="track-element"
                src={signoInterrogacion}
                id="actividad_9"
                onClick={(e) => mostrarImagen(e.currentTarget)}
                alt="Interrogación"
              />
              {images.actividad_9 && <img src={imgOxidantes} alt="Oxidantes" />}
            </div>
            <Paragraph>Oxidantes</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgPeroxidoOrganico} alt="Peróxido orgánico" />
            <Paragraph>Peróxido orgánico</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img
              src={imgSolidosLiquidosToxicos}
              alt="Sólidos y líquidos tóxicos"
            />
            <Paragraph>Sólidos y líquidos tóxicos</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <div className="interrogacion-container">
              <img
                className="track-element"
                src={signoInterrogacion}
                id="actividad_12"
                onClick={(e) => mostrarImagen(e.currentTarget)}
                alt="Interrogación"
              />
              {images.actividad_12 && (
                <img src={imgBiologicos} alt="Materiales biológicos" />
              )}
            </div>
            <Paragraph>Materiales biológicos</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgRadiactivos} alt="Materiales radiactivos" />
            <Paragraph>Materiales radiactivos</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgCorrosivos} alt="Materiales corrosivos" />
            <Paragraph>Materiales corrosivos</Paragraph>
          </div>

          <div className="grid-item cuadro">
            <img src={imgPeligrosVarios} alt="Peligros varios" />
            <Paragraph>Peligros varios</Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PictogramasDeLasNacionesUnidas;
