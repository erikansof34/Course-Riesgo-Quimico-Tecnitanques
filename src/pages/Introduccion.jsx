import logoMorelco from '../assets/img/artes-morelco/tecnitanques_color_blanco.webp';
import background from '../assets/img/fondo01.webp';
import { Clock, BookOpen, User, CheckSquare } from 'lucide-react';
import Button from './components/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
import React, { useState } from 'react';
import axios from 'axios';
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../traking.js";

export default function Component() {

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const sections = [

    {
      icon: <Clock className="w-8 h-8" />,
      title: "Duración del Curso",
      content: [
        { label: "Tiempo máximo estimado de duración virtual:", value: "30 Minutos" },

      ]
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Objetivo del Curso",
      content: [
        { label: "Este curso le permitirá:", value: "Reconocer las políticas de seguridad, cuyo objetivo es proteger su salud y seguridad en la operación." }

      ]
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Al finalizar el curso",
      content: [
        {
          label: "Este curso le permitirá:", value: (
            <ul className="list-disc list-inside">
              <li>Identificar y utilizar correctamente las etiquetas, pictogramas y fichas de seguridad para garantizar el manejo adecuado de las sustancias químicas en sus operaciones.</li>
              <li>Reconocer las regulaciones específicas aplicables al manejo, almacenamiento y transporte de productos químicos peligrosos dentro del territorio nacional.</li>
              <li>Planificar y ejecutar el transporte de mercancías peligrosas siguiendo las recomendaciones para minimizar riesgos dentro y fuera de la operación.</li>
            </ul>
          )
        }
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Recomendaciones",
      content: [
        { label: "1.", value: "Estar dispuesto a adquirir nuevos conocimientos y reforzar los existentes para asegurar tu seguridad durante las actividades a ejecutar." },
        { label: "2.", value: "Disponer del tiempo mínimo estimado de duración para completar el curso." },
        { label: "3.", value: "Contar con conexión a internet" },
        { label: "4.", value: "Realizar todas las actividades de refuerzo y repetirlas si es necesario" },
        { label: "5.", value: "No olvides firmar tu compromiso y presentar la Evaluación del curso" },
        { label: "6.", value: "Si estás en un lugar abierto, usa audífonos solo en áreas permitidas; hay audios con información valiosa que no te querrás perder." },
        { label: "7.", value: "Toma el curso en un lugar cómodo y seguro, donde esté autorizado el uso de dispositivos móviles o electrónicos, y no estés expuesto a ningún tipo de riesgo." }
      ]
    }
  ];

  const navigate = useNavigate();

  const addNumber = (number) => {
    const storedArray = (getArrayValidacionTraking()) || [];
    if (!storedArray.includes(number)) {
      const updatedNumbers = [...storedArray, number];
      setArrayValidacionTraking((updatedNumbers));
    }
  };

  const handleClick = () => {
    logEmployeeData();
    navigate("/slides");
  };

  const logEmployeeData = () => {
    const params = new URLSearchParams(window.location.search);
    axios.get('../../../data_user.php',
      {
        params: {
          course_code: params.get('course_code'),
          uid: params.get('uid'),
          mid: params.get('mid')
        }
      }
    )
      .then((response) => {
        const datos = response.data;
        if (datos.data_course[0].react_progress_object != "") {
          setArrayValidacionTraking((JSON.parse(datos.data_course[0].react_progress_object)));
          const storedArray = getArrayValidacionTraking();
          const sum = storedArray.length;
          const porcentaje = (sum / parseInt(28)) * 100;
          setPorcentajeTraking(parseInt(porcentaje));
        } else {
          addNumber(parseInt(1))
          setPorcentajeTraking(0)
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <div className="mx-auto p-6 min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className={`relative mb-14 flex ${isMobile ? 'flex-col items-center' : 'flex-col'}`}>
        <div className={`absolute top-0 ${isMobile ? 'relative' : 'left-0'}`}>
          <img src={logoMorelco} className="w-32" alt="logo" />
        </div>


        <h1
          className="text-3xl font-bold text-white pt-2"
          style={{
            justifyContent: isMobile ? 'center' : 'center',
            alignItems: isMobile ? 'center' : 'center',
            textAlign: isMobile ? 'center' : 'center',
          }}
        >
          Información del Curso
        </h1>
      </div>

      {/* Cuadros de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:shadow-main-color/30 transition-shadow max-h-64 overflow-auto">
            <div className="p-2 bg-introduccion">
              <div className="flex items-center space-x-4">
                <div className="text-white bg-introduccion p-1 rounded-full">{section.icon}</div>
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              </div>
            </div>
            <div className="p-2 px-5">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-1">
                  <span className="font-medium text-gray-700">{item.label} </span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón de navegación */}
      <div className='flex justify-center items-center my-6'>
        <Button onClick={handleClick} roundedFull={true} icon={faArrowRight}>Siguiente</Button>
      </div>
    </div>
  );
}

