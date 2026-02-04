import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import ModalDialog from '../components/ModalDialog';
import Subtitle from "../components/Subtitle";
import useStore from "../../store";
import Button from '../components/Button';
import corrosivo from "../../assets/img/tiposRQ/slide_repasemos_corrsivo.webp";
import ambiente from "../../assets/img/tiposRQ/pictograma_3_ok.webp";
import biologicos from "../../assets/img/tiposRQ/pictograma_4_mal.webp";
import electricidad from "../../assets/img/tiposRQ/pictograma_5_mal.webp";
import inflamable from "../../assets/img/tiposRQ/pictograma_ok.webp";
import Peligro from "../../assets/img/tiposRQ/pictograma_4_ok.webp";
import imgRiesgoAmarrillo from "../../assets/img/artes-morelco/avatar_completo_saludando.webp";
import imgVerdadero from '../../assets/img/checkAct.webp';
import imgFalso from '../../assets/img/xmarkAct.webp';
import { useMediaQuery } from "react-responsive";
import "../../pages/slides/styles/TiposRiesgoQuimico.css";


function TiposRiesgoQuimico() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [results, setResults] = useState({});
  const [explanation, setExplanation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const correctImages = [corrosivo, inflamable, Peligro, ambiente];

  const actSelectImg = (image) => {
    const isSelected = selectedImages.includes(image);
    let newSelectedImages = [...selectedImages];

    if (isSelected) {
      newSelectedImages = newSelectedImages.filter(img => img !== image);
      setExplanation(null);
    } else if (newSelectedImages.length < 6) {
      newSelectedImages.push(image);
      setExplanation({ image, isCorrect: correctImages.includes(image) });
    }

    setSelectedImages(newSelectedImages);

    const isCorrect = correctImages.includes(image);
    setResults(prevResults => ({
      ...prevResults,
      [image]: isSelected ? undefined : isCorrect
    }));

    if (newSelectedImages.length === 6) {
      const count = newSelectedImages.filter(img => correctImages.includes(img)).length;
      if (count === 4) {
        setFeedbackMessage("¡Lo hiciste muy bien!");
        setFeedbackClass("correct");
      } else {
        setFeedbackMessage("¡Piénsalo bien, no está correcto!");
        setFeedbackClass("incorrect");
      }
      setIsModalOpen(true);
    }
  };

  const resetActivity = () => {
    setResults({});
    setSelectedImages([]);
    setExplanation(null);
    setFeedbackMessage("");
    setFeedbackClass("");
    setIsModalOpen(false);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Calculate the percentage of correct answers
  const calculatePercentage = () => {
    const correctCount = selectedImages.filter(img => results[img]).length;
    return (correctCount / 4) * 100;
  };

  return (
    <div className="flex flex-col md:flex-row mb-52 md:mb-0">
      {/* Columna izquierda */}
      <div className="md:w-2/5 display-mobile dark-mobile bg-dark-color py-3 w-full flex flex-col justify-center items-center">
        <div className="display-mobile flex flex-col justify-center items-center mb-4" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '-30px' }}>
          <div className="text-center mb-6">
            <Title>Repasemos... </Title>
            {/* <Subtitle>productos químicos</Subtitle> */}
          </div>
          <img src={imgRiesgoAmarrillo} alt="Main" className="w-[45%] h-[45%] " />
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Ayúdale a Tamara a identificar los pictogramas que corresponden al Sistema Globalmente Armonizado (SGA)
          </Paragraph>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="md:w-3/5 ligth-display bg-white px-6 py-0 flex flex-col justify-between">
        <div className="der-column w-full mx-auto">
          <div>
            <div className='flex justify-center items-center md:w-[90%]'>
              <Instruction arrow="Right" theme="ligth" className="mb-4">
                Selecciona los 4 pictogramas que SI pertenecen programa del SGA
              </Instruction>
            </div>
            {/* Image Container */}
            <div className="grid columnasweb columnas gap-4 md:w-[90%]">
              {[corrosivo, ambiente, biologicos, electricidad, inflamable, Peligro].map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => actSelectImg(imgSrc)}
                >
                  <img src={imgSrc} alt={`Imagen ${index}`} className="w-full h-auto" />
                  {selectedImages.includes(imgSrc) && (
                    <img
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                      src={results[imgSrc] ? imgVerdadero : imgFalso}
                      alt={results[imgSrc] ? 'Correcto' : 'Incorrecto'}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className='w-auto mx-auto flex flex-col items-start'>
              {/* Explicación de la imagen seleccionada con retroalimentación */}
              {explanation && (
                <>
                  <div
                  />
                  {feedbackMessage && (
                    <div className="w-full flex justify-center items-center feed-mov pr-20">
                      <p className={`feedback-message ${feedbackClass}`}>
                        {feedbackMessage}
                        <p className="text-center font-bold text-[#8f8f8f]">
                          Has seleccionado <span className='text-secondary-color'>{selectedImages.filter(img => results[img]).length} </span> de <span className='text-secondary-color'>4</span> imágenes correctas ({calculatePercentage()}%)
                        </p>
                      </p>
                    </div>
                  )}

                </>
              )}
            </div>
            <div className="flex gap-4 w-[90%] justify-center items-center">

              <Button
                bold={false}
                icon={faRepeat}
                roundedFull={true}
                onClick={resetActivity}
                className="flex items-center bg-main-color rounded-full px-4 py-2 mb-4 text-white"
              >
                Reiniciar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de resultados */}
      {/* <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Recordemos..."
      >
        <h2 className="text-center text-secondary-color font-bold mb-3">Imágenes seleccionadas:</h2>
        <div className="grid grid-cols-3 gap-4 justify-center">
          {selectedImages.map((imgSrc, index) => (
            <div key={index} className="relative">
              <img
                src={imgSrc}
                alt={`Imagen seleccionada ${index}`}
                className="w-full h-18 object-cover rounded-md"
              />
              {results[imgSrc] !== undefined && (
                <img
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
                  src={results[imgSrc] ? imgVerdadero : imgFalso}
                  alt={results[imgSrc] ? 'Correcto' : 'Incorrecto'}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center font-bold text-[#8f8f8f]">
          Has seleccionado <span className='text-secondary-color'>{selectedImages.filter(img => results[img]).length} </span> de <span className='text-secondary-color'>4</span> imágenes correctas ({calculatePercentage()}%)
        </p>
        <p className="text-center font-bold mt-2">
          Porcentaje de acierto: <span className='text-secondary-color'>{calculatePercentage()}%</span>
        </p>
      </ModalDialog>   */}
    </div>
  );
}

export default TiposRiesgoQuimico;
