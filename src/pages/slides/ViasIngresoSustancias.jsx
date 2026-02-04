import { useState, useEffect } from "react";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Button from "../components/Button";
import ModalDialog from '../components/ModalDialog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRepeat, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import img1 from "../../assets/img/artes-morelco/persona-sld-8.webp";
import "../slides/styles/ViasIngresoSustancias.css";
import { useMediaQuery } from "react-responsive";
import imgSabiasQue from "../../assets/img/botones/sabias_que_icono.webp";

const initialOptions = [
  { value: "1", label: "Dérmica" },
  { value: "2", label: "Inhalatoria" },
  { value: "3", label: "Ingestión" },
  { value: "4", label: "Parenteral" },
];

const correctAnswers = ["1", "2", "4", "3"];

export default function ViasIngresoSustancias() {
  const [dropdowns, setDropdowns] = useState(Array(4).fill("0"));
  const [borderColors, setBorderColors] = useState(Array(4).fill("border-slate-500"));
  const [isValidated, setIsValidated] = useState(false);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [errorMessage, setErrorMessage] = useState('');
  const [activeButton, setActiveButton] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const handleDropdownChange = (index, value) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = value;
    setDropdowns(newDropdowns);
  };

  const validateDropdowns = () => {
    if (dropdowns.includes("0")) {
      setErrorMessage('Debe seleccionar todas las opciones antes de validar.');
      return;
    }
    setErrorMessage('');
    const newBorderColors = dropdowns.map((value, index) =>
      value === correctAnswers[index] ? "bg-correct-feedback text-white border-slate-900" : "bg-incorrect-feedback text-white border-slate-900"
    );
    setBorderColors(newBorderColors);

    const correct = dropdowns.filter((value, index) => value === correctAnswers[index]).length;
    setCorrectCount(correct);
    setIsValidated(true);

    if (correct === correctAnswers.length) {
      setFeedback('¡Excelente! Todas las respuestas son correctas.');
    } else {
      setFeedback('Algunas respuestas son incorrectas. Intenta de nuevo.');
    }
  };

  const resetDropdowns = () => {
    setDropdowns(Array(4).fill("0"));
    setBorderColors(Array(4).fill("border-slate-900"));
    setIsValidated(false);
    setCorrectCount(0);
    setFeedback('');
    setErrorMessage('');
  };

  const getAvailableOptions = (index) => {
    const selectedOptions = dropdowns.filter((value, i) => i !== index && value !== "0");
    return initialOptions.filter(option => !selectedOptions.includes(option.value));
  };

  const handleButtonClick = (id) => {
    setActiveButton(activeButton === id ? null : id);
  };
  const tooltipTexts = {
    1: "1. Respiratoria: Ingreso de sustancias por la nariz, boca o pulmones, a través del aire que respiramos (polvos, humos, aerosoles, gases).​",
    2: "2. Digestiva: Entrada de sustancias por la boca, esófago, estómago e intestinos.",
    3: "3. Parental: Administración de sustancias mediante inyecciones u otros procedimientos que atraviesan la piel o mucosas.",
    4: "4. Dérmica: Penetración de sustancias a través de la piel, ingresando al torrente sanguíneo sin causar daños visibles."
  };

  const calculatePercentage = () => {
    return ((correctCount / correctAnswers.length) * 100).toFixed(0);
  };

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0 md:h-screen h-auto">
      <div className="md:flex-1 display-mobile dark-mobile bg-dark-color md:w-1/2 w-full py-3 px-6 flex-col justify-start items-center">
        <div className="display-mobile my-auto flex flex-col justify-start items-center" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '50px', paddingLeft: isMobile ? '0' : '1.5rem', paddingRight: isMobile ? '0' : '1.5rem' }}>
          <div className="text-center mb-6">
            <Title>Vias de ingreso de las</Title>
            <Subtitle>Sustancias del cuerpo humano</Subtitle>
          </div>
          <div className="relative">
            <img
              src={img1}
              alt="Imagen de trabajadores"
              className="mx-auto mb-4"
              style={{ maxWidth: '70%' }}
            />

            {[
              { id: 1, text: "1", top: "5%", left: "50%" },
              { id: 2, text: "2", top: "40%", left: "60%" },
              { id: 3, text: "3", top: "50%", left: "40%" },
              { id: 4, text: "4", top: "60%", left: "60%" },
            ].map((button) => (
              <button
                key={button.id}
                className={`absolute z-10 bg-[#003454] hover:bg-blue-700 text-white px-2 py-1 rounded-full text-sm ${activeButton === button.id ? 'ring-2 ring-white' : ''
                  }`}
                style={{ top: button.top, left: button.left }}
                onClick={() => handleButtonClick(button.id)}
              >
                {button.text}
              </button>
            ))}
            {activeButton && (
              <div className="absolute z-20 bg-white border border-blue-500 p-2 rounded shadow-md tooltip-container" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <button
                  className="close-tooltip absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                  onClick={() => setActiveButton(null)}
                >
                  &times;
                </button>
                {tooltipTexts[activeButton]}
              </div>
            )}



          </div>
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Son los mecanismos mediante los cuales diferentes agentes, como medicamentos, nutrientes, toxinas o patógenos, pueden entrar al organismo.
          </Paragraph>
          <div className="mt-3 flex justify-center items-center">
            <Button
              bold={false}
              icon={faCircleQuestion}
              roundedFull={true}
              onClick={handleOpenModal}
              className="bg-main-color"
            >
              ¿Sabías que?
            </Button>
          </div>
        </div>
      </div>

      <div className="md:w-3/5 bg-white flex flex-col justify-center" style={{ position: isMobile ? 'static' : 'relative', top: isMobile ? '0' : '30px' }}>
        <div className="flex flex-col items-start">
          <div className="ctActivityDragDrop pad-ejex flex flex-col justify-start display-mobile mb-3 ancho-resposnive">
            <div className="w-auto" style={{ display: 'flex', justifyContent: 'center' }}>
              <Instruction arrow="down" theme="light">
                Seleccione la opción correcta de cada lista desplegable
              </Instruction>
            </div>
            <div className="listOpcDrop">
              <Paragraph theme='ligth' justify={isMobile ? 'justify' : 'justify'}>
                La vía
                <Select index={0} value={dropdowns[0]} onChange={handleDropdownChange} borderColor={borderColors[0]} options={getAvailableOptions(0)} />
                implica la absorción a través de la piel, permitiendo que sustancias atraviesen las capas cutáneas y entren en la circulación sanguínea. La
                <Select index={1} value={dropdowns[1]} onChange={handleDropdownChange} borderColor={borderColors[1]} options={getAvailableOptions(1)} />
                se refiere a la entrada de sustancias a través de las vías respiratorias, donde son transportadas por el aire inhalado y pueden ser absorbidas por los pulmones y entrar en el torrente sanguíneo. La vía
                <Select index={2} value={dropdowns[2]} onChange={handleDropdownChange} borderColor={borderColors[2]} options={getAvailableOptions(2)} />
                involucra la administración directa de sustancias en el cuerpo a través de inyecciones, omite las barreras naturales y permite que las sustancias se distribuyan rápidamente en la sangre. Por último, la
                <Select index={3} value={dropdowns[3]} onChange={handleDropdownChange} borderColor={borderColors[3]} options={getAvailableOptions(3)} />
                es la entrada de sustancias a través de la boca, donde son absorbidas por el sistema digestivo y transportadas a través del tracto gastrointestinal hacia el torrente sanguíneo.
              </Paragraph>
            </div>
            {isValidated && (
              <div className="text-center">
                <h3 className="text-md mt-0 font-bold text-[#8f8f8f] ">
                  {correctCount} de {correctAnswers.length} respuestas correctas ({calculatePercentage()}%)
                </h3>
                <p className={`mb-1 ${correctCount === correctAnswers.length ? 'text-green-500' : 'text-red-500'}`}>
                  {feedback}
                </p>
              </div>
            )}
            <div className="flex flex-col items-center justify-center mb-2">
              {errorMessage && (
                <p className="text-secondary-color text-center font-bold mt-0 mb-2">
                  {errorMessage}
                </p>
              )}
              <div className="flex space-x-4">
                <Button
                  className="bg-main-color px-4 py-2 rounded-full shadow-md  text-white track-element"
                  onClick={validateDropdowns}
                  disabled={isValidated}
                  bold={false}
                  icon={faCheck}
                  roundedFull={true}
                >

                  Validar
                </Button>
                <Button
                  className="bg-main-color px-4 py-2 rounded-full shadow-md  text-white track-element"
                  onClick={resetDropdowns}
                  disabled={!isValidated}
                  bold={false}
                  icon={faRepeat}
                  roundedFull={true}
                >

                  Reiniciar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDialog
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="¿Sabías que?"
      >
        <div className="flex justify-center items-center">
          <img className="w-32" src={imgSabiasQue} alt="imagen Atencion" />
        </div>
        <Paragraph theme='ligth' justify={isMobile ? 'justify' : 'justify'}>
          Parenteral se refiere a la forma en que una sustancia ingresa al cuerpo por vías diferentes a la digestiva. Esto incluye métodos como inyecciones, infusiones o aplicaciones a través de llagas y heridas.
        </Paragraph>
      </ModalDialog>
    </div>
  );
}

function Select({ index, value, onChange, borderColor, options }) {
  return (
    <select
      className={`border-2 mx-2 py-0 rounded-md ${borderColor}`}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
    >
      <option value="0">Seleccione...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
