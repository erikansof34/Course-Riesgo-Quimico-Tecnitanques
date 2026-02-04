import { useState, useEffect } from "react";
import useStore from "../../store";
import "../../pages/slides/styles/RecordemosListaDesplegable.css"
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import { useMediaQuery } from "react-responsive";
import Instruction from "../components/Instruction";
import Button from "../../pages/components/Button";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import imgPeligro1 from "../../assets/img/artes-morelco/inhalar_proceso_quimico.webp";
import imgPeligro2 from "../../assets/img/artes-morelco/riesgo_quimico_manos.webp";
import imgPeligro3 from "../../assets/img/artes-morelco/actos-inseguros-manejo-quimicos.webp";
import imgFalso from "../../assets/img/xmarkAct.webp";
import imgVerdadero from "../../assets/img/checkAct.webp";

function RecordemosListaDesplegable() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctPercentage, setCorrectPercentage] = useState(0);

  const [hazards, setHazards] = useState([
    {
      image: imgPeligro1,
      description: "¿Qué pasaría si ... alguien inhala este producto químico?",
      correctAnswer: "1",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgPeligro2,
      description: "¿ Qué pasaría si ... agarro sin guantes de protección esta sustancia química?",
      correctAnswer: "2",
      selectedAnswer: "",
      isCorrect: false,
    },
    {
      image: imgPeligro3,
      description: "¿ Qué pasaría si ... un producto se mezcla accidentalmente con otro sustancia química?",
      correctAnswer: "3",
      selectedAnswer: "",
      isCorrect: false,
    },
  ]);

  const [availableOptions, setAvailableOptions] = useState([
    { value: "2", label: "Dermatosis por irritación" },
    { value: "1", label: "Inflamación de las vías respiratorias" },
    { value: "3", label: "Puede provocar incendios y explosiones" },
  ]);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  const handleSelect = (index, value) => {
    const updatedHazards = [...hazards];
    updatedHazards[index].selectedAnswer = value;
    setHazards(updatedHazards);

    const updatedOptions = availableOptions.filter(option => option.value !== value);
    setAvailableOptions(updatedOptions);
  };

  const handleValidate = () => {
    if (hazards.some(hazard => hazard.selectedAnswer === "")) {
      setErrorMessage("Debe seleccionar todas las opciones antes de validar.");
      return;
    }

    let correct = 0;
    const updatedHazards = hazards.map(hazard => {
      const isCorrect = hazard.selectedAnswer === hazard.correctAnswer;
      if (isCorrect) correct++;
      return { ...hazard, isCorrect };
    });

    setHazards(updatedHazards);
    setCorrectCount(correct);
    setCorrectPercentage((correct / hazards.length) * 100);
    setIsVerified(true);
    setErrorMessage("");
  };

  const handleReset = () => {
    setHazards(hazards.map(hazard => ({ ...hazard, selectedAnswer: "", isCorrect: false })));
    setAvailableOptions([
      { value: "2", label: "Dermatosis por irritación" },
      { value: "1", label: "Inflamación de las vías respiratorias" },
      { value: "3", label: "Puede provocar incendios y explosiones" },
    ]);
    setErrorMessage("");
    setIsVerified(false);
    setCorrectCount(0);
    setCorrectPercentage(0);
  };

  return (
    <div className="quiz-container mb-52 md:mb-0">
      <div className="quiz-header">
        <Title>Repasemos...</Title>
        <div className="quiz-subtitle">
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'center'}>
            Completa la siguiente actividad de acuerdo con los actos y condiciones inseguras durante el manejo de productos químicos         </Paragraph>
        </div>
      </div>
      <div className="flex justify-center items-center px-3">
        <Instruction theme="light" arrow="down">
          Selecciona en la lista despegable la opcion correcta
        </Instruction>
      </div>
      <div className="container_peligro gap-3">
        {hazards.map((hazard, index) => (
          <div
            key={index}
            className={`box_peligro h-[320px] flex flex-col justify-center items-center relative
              ${isVerified ? (hazard.isCorrect ? 'bg-[#4CAF50]' : 'bg-[#F44336]') : ''}
            `}
          >
            <div className="relative w-40 h-44 mb-2">
              <img src={hazard.image} alt={`Hazard ${index + 1}`} className="w-full h-full object-cover rounded-md" />
              {isVerified && (
                <img
                  src={hazard.isCorrect ? imgVerdadero : imgFalso}
                  alt={hazard.isCorrect ? "Correcto" : "Incorrecto"}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                />
              )}
            </div>
            <p className={`parrafo_peligro text-center text-paragraph-light-color ${isVerified ? 'text-white' : ''}`}>
              {hazard.description}
            </p>
            <select
              className="dropdown_peligro mt-2 w-full p-2 border rounded bg-white"
              value={hazard.selectedAnswer || ""}
              onChange={(e) => handleSelect(index, e.target.value)}
              disabled={isVerified}
            >
              <option value="" disabled>Seleccione...</option>
              {[
                ...availableOptions,
                ...(hazard.selectedAnswer ? [hazard.selectedAnswer].map(value => ({
                  value,
                  label: ["Inflamación de las vías respiratorias", "Dermatosis por irritación", "Puede provocar incendios y explosiones"][parseInt(value) - 1]
                })) : [])
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {isVerified && (
              <p className="text-white font-bold mt-2">
                {hazard.isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        {errorMessage && <p className="text-secondary-color text-center text-md font-bold mt-2">{errorMessage}</p>}
        {isVerified && (
          <>
            <p className={`text-md mt-2 font-bold ${correctCount === hazards.length ? 'text-green-500' : 'text-red-500'}`}>
              {correctCount} de {hazards.length} respuestas correctas ({correctPercentage.toFixed(0)}%)
            </p>
          </>
        )}
        <div className="button-container">
          <Button
            bold={false}
            icon={faCheck}
            roundedFull={true}
            onClick={handleValidate}
            disabled={isVerified}
          >
            Validar
          </Button>
          <Button
            bold={false}
            icon={faRepeat}
            roundedFull={true}
            onClick={handleReset}
            disabled={!isVerified}
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecordemosListaDesplegable;

