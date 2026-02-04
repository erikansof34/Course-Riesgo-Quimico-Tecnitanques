import { useState, useEffect } from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faCircleQuestion, faCheck } from "@fortawesome/free-solid-svg-icons";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import ModalDialog from '../components/ModalDialog';
import useStore from "../../store";
import img1 from '../../assets/img/botones/recordemos.png';
import pairs5 from "../../assets/img/artes-morelco/Mesa_trabajo_20img_.jpg";
import pairs6 from "../../assets/img/artes-morelco/Mesa_trabajo_21img_.jpg";
import pairs7 from "../../assets/img/artes-morelco/Mesa_trabajo_22img_.jpg";
import pairs8 from "../../assets/img/artes-morelco/Mesa_trabajo_23img_.jpg";

import "../../pages/slides/styles/TiposRiesgoQuimicoDnDEtiquetas.css";

function NumberedItem({ number, children }) {
  return (
    <div className="numbered-item">
      <span className="item-number">{number}</span>
      {children}
    </div>
  );
}

function DraggableOption({ id, children, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        visibility: isDropped ? "hidden" : "visible",
      }
    : { visibility: isDropped ? "hidden" : "visible" };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="draggable-option"
    >
     <span className="text-center" style={{ fontSize: '14px' }}>{children}</span>
    </div>
  );
}

function DropArea({ id, children, isCorrect, isVerified, onSelect, availableOptions, items, isDraggedOver, allCorrect }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hasItem = items[id] !== null;

  if (isMobile) {
    const bgColor = isVerified ? (allCorrect ? '#4CAF50' : '#F44336') : '#FFFFFF';
    const textColor = isVerified ? '#FFFFFF' : '#000000';

    return (
      <div className="dropdown-mobile"> 
        <select 
          onChange={(e) => onSelect(id, e.target.value)} 
          value={items[id] || ''}
          className="select-dropdown"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            border: `2px solid ${isVerified ? (allCorrect ? '#4CAF50' : '#F44336') : '#0f172a'}`
          }}
        >
          <option value="" disabled>Seleccione...</option>
          {[...availableOptions, ...(items[id] ? [options.find(opt => opt.id === items[id])] : [])].map((option) => (
            <option key={option.id} value={option.id}>{option.text}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef} 
      className={`
        drop-area 
        ${hasItem ? 'drop-area-activado' : ''} 
        ${isOver ? 'is-over' : ''} 
        ${isVerified ? (allCorrect ? 'all-correct' : 'all-incorrect') : ''} 
        ${isDraggedOver ? 'dragged-over' : ''}
      `}
    >
      <span className="drop-text" style={{ fontSize: '14px' }}>{children}</span>
    </div>
  );
}

const options = [
  { id: "option4", text: "Deterioro de la etiqueta" },
  { id: "option2", text: "Etiqueta no se entiende" },
  { id: "option3", text: "Se realizan trasvases" },
  { id: "option1", text: "Etiqueta no compatible con SGA" },
];

export default function TiposRiesgoQuimicoDnDEtiquetas() {
  const [items, setItems] = useState({
    drop1: null,
    drop2: null,
    drop3: null,
    drop4: null,
  });
  const [isVerified, setIsVerified] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [draggedOverId, setDraggedOverId] = useState(null);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [feedbackClass, setFeedbackClass] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [allCorrect, setAllCorrect] = useState(false);
  const correctItems = {
    drop1: "option1",
    drop2: "option2",
    drop3: "option3",
    drop4: "option4",
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  useEffect(() => {
    setIsOnDivisor(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsOnDivisor]);

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id) {
      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));
    }
  };

  const handleSelect = (dropId, optionId) => {
    setItems((prevItems) => ({
      ...prevItems,
      [dropId]: optionId,
    }));
  };

  const handleVerify = () => {
    if (Object.values(items).some(item => item === null)) {
      setErrorMessage(isMobile ? "Debe seleccionar todas las opciones antes de validar." : "Debe arrastrar todos los elementos antes de validar.");
      return;
    }

    setErrorMessage("");
    let count = 0;
    Object.keys(items).forEach((key) => {
      if (items[key] === correctItems[key]) {
        count++;
      }
    });
    setCorrectCount(count);
    setIsVerified(true);
    const allAnswersCorrect = count === Object.keys(items).length;
    setAllCorrect(allAnswersCorrect);
    if (allAnswersCorrect) {
      setFeedbackMessage("¡Lo hiciste muy bien!")
      setFeedbackClass("correct")
    } else {
      setFeedbackMessage("¡Piénsalo bien, no está correcto!")
      setFeedbackClass("incorrect")
    }
  };

  const handleReset = () => {
    setItems({
      drop1: null,
      drop2: null,
      drop3: null,
      drop4: null,
    });
    setIsVerified(false);
    setCorrectCount(0);
    setErrorMessage("");
    setAllCorrect(false);
    setFeedbackMessage("");
    setFeedbackClass("");
  };

  return (
    <DndContext sensors={sensors} onDragStart={(event) => setDraggedOverId(event.over?.id || null)} onDragEnd={(event) => { handleDragEnd(event); setDraggedOverId(null); }}>
      <div className="tipos-riesgo-container mb-36 md:mb-0">
        <div className="left-column px-6 py-3 md:px-14">
          <div className="text-center mb-6">
            <Title>Tipos de Riesgo Químico</Title>
          </div>
          <div className='mb-6'>
          <Paragraph theme="dark" justify={isMobile ? 'justify' : 'justify'}>
            En qué casos se debe etiquetar un producto o sustancia química.
          </Paragraph>
          </div>
          <button
            onClick={() => setIsModalOpen1(true)}
            className="recordemos-button"
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="mr-2" />Recordemos...
          </button>
        </div>

        <div className="right-column">
          <div className="content-wrapper md:w-[90%]">
            <Instruction arrow="down" theme="ligth" className="mb-4 self-start">
              {isMobile ? "Selecciona las opciones correctas" : "Arrastra las opciones a las casillas correspondientes"}
            </Instruction>
            <div className={`images-container ${isMobile ? 'mobile' : ''}`}>
              {isMobile ? (
                <>
                  <NumberedItem number={1}><img src={pairs5} alt="Tipo de riesgo químico 1" /></NumberedItem>
                  <NumberedItem number={2}><img src={pairs6} alt="Tipo de riesgo químico 2" /></NumberedItem>
                  <NumberedItem number={3}><img src={pairs7} alt="Tipo de riesgo químico 3" /></NumberedItem>
                  <NumberedItem number={4}><img src={pairs8} alt="Tipo de riesgo químico 4" /></NumberedItem>
                </>
              ) : (
                <>
                  <img src={pairs5} alt="Tipo de riesgo químico 1" />
                  <img src={pairs6} alt="Tipo de riesgo químico 2" />
                  <img src={pairs7} alt="Tipo de riesgo químico 3" />
                  <img src={pairs8} alt="Tipo de riesgo químico 4" />
                </>
              )}
            </div>

            <div className={`drop-areas-container ${isMobile ? 'mobile' : ''}`}>
              {Object.keys(items).map((key, index) => (
                isMobile ? (
                  <NumberedItem key={key} number={index + 1}>
                    <DropArea 
                      id={key}
                      isCorrect={items[key] === correctItems[key]}
                      isVerified={isVerified}
                      onSelect={handleSelect}
                      availableOptions={options}
                      items={items}
                      isDraggedOver={draggedOverId === key}
                      allCorrect={allCorrect}
                    >
                      {items[key] ? options.find(opt => opt.id === items[key]).text : "Arrastra aquí"}
                    </DropArea>
                  </NumberedItem>
                ) : (
                  <DropArea 
                    key={key}
                    id={key}
                    isCorrect={items[key] === correctItems[key]}
                    isVerified={isVerified}
                    onSelect={handleSelect}
                    availableOptions={options}
                    items={items}
                    isDraggedOver={draggedOverId === key}
                    allCorrect={allCorrect}
                  >
                    {items[key] ? options.find(opt => opt.id === items[key]).text : "Arrastra aquí"}
                  </DropArea>
                )
              ))}
            </div>

            {!isMobile && (
              <div className="draggable-options-container">
                {options.map((option) => (
                  <DraggableOption 
                    key={option.id}
                    id={option.id}
                    isDropped={Object.values(items).includes(option.id)}
                  >
                    {option.text}
                  </DraggableOption>
                ))}
              </div>
            )}
          </div>

          <div className="button-container">
            <div className='mb-4'>
            {isVerified && (
              <p className={`result-text ${correctCount === 4 ? 'correct' : 'incorrect'}`}>
                {correctCount} de 4 respuestas correctas
              </p>
            )}
             {feedbackMessage && (
  <p className={`feedback-message ${feedbackClass}`}>
    {feedbackMessage}
  </p>
)}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
          </div>
          <div className='button-container'>
          {!isVerified ? (
              <button onClick={handleVerify} className="action-button verify">
                <FontAwesomeIcon icon={faCheck} className="mr-2" /> Validar
              </button>
            ) : (
              <button onClick={handleReset} className="action-button reset">
                <FontAwesomeIcon icon={faRepeat} className="mr-2" /> Reiniciar
              </button>
            )}
            </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen1}
        handleClose={() => setIsModalOpen1(false)}
        title="Recordemos..."
      >
         <img
          src={img1}
          alt="Votemos"
          className="image-boton w-[40%]"
        />
        <Paragraph theme="ligth" justify={isMobile ? 'justify' : 'justify'}>
        Una sustancia química puede estar asociada a más de un tipo de peligro clasificado por la SGA, para ello las tablas de clasificación te ayudarán a identificarlos.
          </Paragraph>
          <div className='flex justify-center'>
          <Instruction arrow="down" theme="ligth" className="w-full">
          Haz clic para escuchar el audio
          </Instruction>
          </div>
        <audio controls className="w-full">
          <source src='' type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </ModalDialog>
    </DndContext>
  );
}