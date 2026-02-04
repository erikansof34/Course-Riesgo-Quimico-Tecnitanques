import { useState, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { faCheck, faRepeat } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import Instruction from "../components/Instruction";
import Picto8 from "../../assets/img/pictogramas/toxicidad_aguda.webp";
import Picto9 from "../../assets/img/pictogramas/explosivo.webp";
import Picto4 from "../../assets/img/pictogramas/gas_presion.webp";
import Picto5 from "../../assets/img/pictogramas/inflamable.webp";
import Bien from "../../assets/img/checkAct.webp";
import Mal from "../../assets/img/xmarkAct.webp";
import Button from "../components/Button";
import "../../pages/slides/styles/TiposRiesgoQuimicoDnD.css";

function Draggable({ id, children, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 1000,
    }
    : undefined;

  if (isDropped) return null;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

function Droppable({ id, children, isCorrect, isVerified }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isVerified
      ? isCorrect
        ? "#4CAF50"
        : "#F44336"
      : isOver
        ? "#e9e9e9"
        : undefined,
    position: "relative",
    zIndex: 1,
    minHeight: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div ref={setNodeRef} style={style} className="bottom-box-act12 box-mobile">
      {children}
      {isVerified && (
        <img
          src={isCorrect ? Bien : Mal}
          alt={isCorrect ? "Correcto" : "Incorrecto"}
          className="img-feedback"
        />
      )}
    </div>
  );
}

const INITIAL_OPTIONS = [
  { value: 'explosivo', label: 'Explosivo', image: Picto9 },
  { value: 'gas_presion', label: 'Gas a presión', image: Picto4 },
  { value: 'inflamable', label: 'Inflamable', image: Picto5 },
  { value: 'toxicidad_aguda', label: 'Toxicidad aguda', image: Picto8 },
];

function MobileDropdown({ id, label, value, onChange, options, isCorrect, isVerified, disabled }) {
  return (
    <div className={`mobile-dropdown ${isVerified ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
      {isVerified && (
        <img
          src={isCorrect ? Bien : Mal}
          alt={isCorrect ? "Correcto" : "Incorrecto"}
          className="mobile-feedback-icon"
        />
      )}
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || isVerified}
        className={value ? 'has-value' : ''}
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isVerified && value && (
        <div className="selected-value">
          {options.find(opt => opt.value === value)?.label}
        </div>
      )}
    </div>
  );
}

export default function TiposRiesgoQuimicoDnD() {
  const [items, setItems] = useState({
    act2_drop1: null,
    act2_drop2: null,
    act2_drop3: null,
    act2_drop4: null,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");

  const [mobileSelections, setMobileSelections] = useState({
    act2_drop1: '',
    act2_drop2: '',
    act2_drop3: '',
    act2_drop4: '',
  });

  const [usedOptions, setUsedOptions] = useState(new Set());
  const [dropdownStates, setDropdownStates] = useState({
    act2_drop1: false,
    act2_drop2: false,
    act2_drop3: false,
    act2_drop4: false
  });

  const correctItems = {
    act2_drop1: ["act2_drag1", "act2_drag2"],
    act2_drop2: ["act2_drag1", "act2_drag2"],
    act2_drop3: ["act2_drag3", "act2_drag4"],
    act2_drop4: ["act2_drag3", "act2_drag4"],
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const calculatePercentage = () => {
    return (correctCount / 4) * 100;
  };

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over) {
      setItems((items) => ({ ...items, [over.id]: active.id }));
    }
  }

  const isItemDropped = (id) => Object.values(items).includes(id);

  const handleMobileSelection = (dropId, value) => {
    const previousValue = mobileSelections[dropId];
    if (previousValue) {
      setUsedOptions(prev => {
        const newSet = new Set(prev);
        newSet.delete(previousValue);
        return newSet;
      });
    }

    if (value) {
      setUsedOptions(prev => new Set([...prev, value]));
    }

    setMobileSelections(prev => ({
      ...prev,
      [dropId]: value
    }));

    if (value) {
      setDropdownStates(prev => ({
        ...prev,
        [dropId]: true
      }));
    }
  };

  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  const getAvailableOptions = (dropId) => {
    return INITIAL_OPTIONS.filter(option =>
      !usedOptions.has(option.value) || mobileSelections[dropId] === option.value
    );
  };

  const handleVerify = () => {
    if (isMobile()) {
      if (Object.values(mobileSelections).some(item => item === '')) {
        setErrorMessage("Debe seleccionar todas las opciones antes de validar.");
        return;
      }

      setErrorMessage("");
      let count = 0;

      if (mobileSelections.act2_drop1 === 'inflamable' || mobileSelections.act2_drop1 === 'gas_presion') {
        count++;
      }
      if (mobileSelections.act2_drop2 === 'inflamable' || mobileSelections.act2_drop2 === 'gas_presion') {
        count++;
      }

      if (mobileSelections.act2_drop3 === 'explosivo' || mobileSelections.act2_drop3 === 'toxicidad_aguda') {
        count++;
      }
      if (mobileSelections.act2_drop4 === 'explosivo' || mobileSelections.act2_drop4 === 'toxicidad_aguda') {
        count++;
      }

      setCorrectCount(count);
      setIsVerified(true);

      if (count === 4) {
        setFeedbackMessage("¡Lo hiciste muy bien!");
        setFeedbackClass("correct");
      } else {
        setFeedbackMessage("¡Piénsalo bien, no está correcto!");
        setFeedbackClass("incorrect");
      }
    } else {
      if (Object.values(items).some((item) => item === null)) {
        setErrorMessage("Debe arrastrar todos los elementos antes de validar.");
        return;
      }

      setErrorMessage("");
      let count = 0;
      Object.keys(items).forEach((key) => {
        if (correctItems[key].includes(items[key])) count++;
      });
      setCorrectCount(count);
      setIsVerified(true);

      if (count === 4) {
        setFeedbackMessage("¡Lo hiciste muy bien!");
        setFeedbackClass("correct");
      } else {
        setFeedbackMessage("¡Piénsalo bien, no está correcto!");
        setFeedbackClass("incorrect");
      }
    }
  };

  const handleReset = () => {
    setItems({ act2_drop1: null, act2_drop2: null, act2_drop3: null, act2_drop4: null });
    setMobileSelections({ act2_drop1: '', act2_drop2: '', act2_drop3: '', act2_drop4: '' });
    setUsedOptions(new Set());
    setDropdownStates({
      act2_drop1: false,
      act2_drop2: false,
      act2_drop3: false,
      act2_drop4: false
    });
    setIsVerified(false);
    setCorrectCount(0);
    setErrorMessage("");
    setFeedbackMessage("");
    setFeedbackClass("");
  };

  return (
    <div className="tipos-riesgo-container-trdnd mb-40 md:mb-0 overflow-auto">
      <div className="header-section-trdnd">
        <Title>Pictogramas y representación de los peligros</Title>
        <Subtitle>en las sustancias químicas</Subtitle>
      </div>

      <div className="intro-text-trdnd">
      </div>
      <div className="px-6 relative top-[-10px]">
        <Instruction theme="ligth" arrow="down">
          De acuerdo con tu experiencia, relaciona los pictogramas con las 2 situaciones relacionadas con sustancias químicas que se presentan
        </Instruction>
      </div>

      {isMobile() ? (
        <>
          <div className="mobile-images-container">
            <img src={Picto8} alt="Toxicidad aguda" className="mobile-pictogram" />
            <img src={Picto9} alt="Explosivo" className="mobile-pictogram" />
            <img src={Picto4} alt="Gas a presión" className="mobile-pictogram" />
            <img src={Picto5} alt="Inflamable" className="mobile-pictogram" />
          </div>
          <div className="mobile-dropdowns-container">
            <div className="situation-container">
              <div className="orange-box-act12">
                SITUACION 1:
                <br />
                Un cuarto de almacenamiento de sustancias químicas que almacena combustibles inflamables, y que no cuenta con las inspecciones debidas.
              </div>
            </div>
            <MobileDropdown
              id="act2_drop1"
              label="Opción 1"
              value={mobileSelections.act2_drop1}
              onChange={(value) => handleMobileSelection('act2_drop1', value)}
              options={getAvailableOptions('act2_drop1')}
              isCorrect={isVerified && (mobileSelections.act2_drop1 === 'inflamable' || mobileSelections.act2_drop1 === 'gas_presion')}
              isVerified={isVerified}
              disabled={dropdownStates.act2_drop1}
            />
            <MobileDropdown
              id="act2_drop2"
              label="Opción 2"
              value={mobileSelections.act2_drop2}
              onChange={(value) => handleMobileSelection('act2_drop2', value)}
              options={getAvailableOptions('act2_drop2')}
              isCorrect={isVerified && (mobileSelections.act2_drop2 === 'inflamable' || mobileSelections.act2_drop2 === 'gas_presion')}
              isVerified={isVerified}
              disabled={dropdownStates.act2_drop2}
            />
            <div className="situation-container">
              <div className="orange-box-act12">
                SITUACION 2:
                <br />
                Una valvula de un tanque de gas a presión que tiene un escape aún no detectada.
              </div>
            </div>
            <MobileDropdown
              id="act2_drop3"
              label="Opción 1"
              value={mobileSelections.act2_drop3}
              onChange={(value) => handleMobileSelection('act2_drop3', value)}
              options={getAvailableOptions('act2_drop3')}
              isCorrect={isVerified && (mobileSelections.act2_drop3 === 'explosivo' || mobileSelections.act2_drop3 === 'toxicidad_aguda')}
              isVerified={isVerified}
              disabled={dropdownStates.act2_drop3}
            />
            <MobileDropdown
              id="act2_drop4"
              label="Opción 2"
              value={mobileSelections.act2_drop4}
              onChange={(value) => handleMobileSelection('act2_drop4', value)}
              options={getAvailableOptions('act2_drop4')}
              isCorrect={isVerified && (mobileSelections.act2_drop4 === 'explosivo' || mobileSelections.act2_drop4 === 'toxicidad_aguda')}
              isVerified={isVerified}
              disabled={dropdownStates.act2_drop4}
            />
          </div>
        </>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="dnd-container-trdnd">
            <div className="draggables-container-trdnd">
              <Draggable id="act2_drag4" isDropped={isItemDropped("act2_drag4")}>
                <img src={Picto8} alt="Pictograma 8" className="draggable-item-trdnd" />
              </Draggable>
              <Draggable id="act2_drag1" isDropped={isItemDropped("act2_drag1")}>
                <img src={Picto5} alt="Pictograma 5" className="draggable-item-trdnd" />
              </Draggable>
              <Draggable id="act2_drag3" isDropped={isItemDropped("act2_drag3")}>
                <img src={Picto9} alt="Pictograma 9" className="draggable-item-trdnd" />
              </Draggable>
              <Draggable id="act2_drag2" isDropped={isItemDropped("act2_drag2")}>
                <img src={Picto4} alt="Pictograma 4" className="draggable-item-trdnd" />
              </Draggable>
            </div>
            <div className="droppables-container-trdnd">
              <div className="double-column-act12">
                <div className="col-act12">
                  <div className="orange-box-act12">
                    SITUACION 1:
                    <br />
                    Un cuarto de almacenamiento de sustancias químicas que almacena combustibles inflamables, y que no cuenta con las inspecciones debidas.
                  </div>
                  <div className="bottom-boxes-act12">
                    <Droppable
                      id="act2_drop1"
                      isCorrect={correctItems.act2_drop1.includes(items.act2_drop1)}
                      isVerified={isVerified}
                    >
                      {items.act2_drop1 && (
                        <img
                          className="mb-0 w-full h-full object-contain"
                          src={items.act2_drop1 === "act2_drag1" ? Picto5 : items.act2_drop1 === "act2_drag2" ? Picto4 : items.act2_drop1 === "act2_drag3" ? Picto9 : Picto8}
                          alt="Dropped item"
                        />
                      )}
                    </Droppable>
                    <Droppable
                      id="act2_drop2"
                      isCorrect={correctItems.act2_drop2.includes(items.act2_drop2)}
                      isVerified={isVerified}
                    >
                      {items.act2_drop2 && (
                        <img
                          className="mb-0 w-full h-full object-contain"
                          src={items.act2_drop2 === "act2_drag1" ? Picto5 : items.act2_drop2 === "act2_drag2" ? Picto4 : items.act2_drop2 === "act2_drag3" ? Picto9 : Picto8}
                          alt="Dropped item"
                        />
                      )}
                    </Droppable>
                  </div>
                </div>
                <div className="col-act12">
                  <div className="orange-box-act12">
                    SITUACION 2:
                    <br />
                    Una valvula de un tanque de gas a presión que tiene un escape aún no detectada.
                  </div>
                  <div className="bottom-boxes-act12">
                    <Droppable
                      id="act2_drop3"
                      isCorrect={correctItems.act2_drop3.includes(items.act2_drop3)}
                      isVerified={isVerified}
                    >
                      {items.act2_drop3 && (
                        <img
                          className="mb-0 w-full h-full object-contain"
                          src={items.act2_drop3 === "act2_drag1" ? Picto5 : items.act2_drop3 === "act2_drag2" ? Picto4 : items.act2_drop3 === "act2_drag3" ? Picto9 : Picto8}
                          alt="Dropped item"
                        />
                      )}
                    </Droppable>
                    <Droppable
                      id="act2_drop4"
                      isCorrect={correctItems.act2_drop4.includes(items.act2_drop4)}
                      isVerified={isVerified}
                    >
                      {items.act2_drop4 && (
                        <img
                          className="mb-0 w-full h-full object-contain"
                          src={items.act2_drop4 === "act2_drag1" ? Picto5 : items.act2_drop4 === "act2_drag2" ? Picto4 : items.act2_drop4 === "act2_drag3" ? Picto9 : Picto8}
                          alt="Dropped item"
                        />
                      )}
                    </Droppable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DndContext>
      )}

      <div className="button-container-trdnd">
        {isVerified && (
          <div className="result-container-trdnd">
            <p className={`feedback-message ${feedbackClass}`}>
              {feedbackMessage}
            </p>
            <p className={`result-count-trdnd feedback-message text-[#8f8f8f] ${feedbackClass}`}>
              {correctCount} de 4 respuestas correctas ({calculatePercentage()}%)
            </p>
            {/* <p className={`result-percentage-trdnd feedback-message ${feedbackClass}`}>
          Porcentaje de acierto: {calculatePercentage()}%
        </p> */}
          </div>
        )}

        {errorMessage && <p className="error-message-trdnd mb-0">{errorMessage}</p>}
        <div className="buttons-wrapper-trdnd">
          <Button
            className="verify-btn-trdnd"
            onClick={handleVerify}
            disabled={isVerified}
            icon={faCheck}
            roundedFull={true}
          >
            Validar
          </Button>
          <Button
            className="reset-btn-trdnd"
            onClick={handleReset}
            icon={faRepeat}
            roundedFull={true}
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}

