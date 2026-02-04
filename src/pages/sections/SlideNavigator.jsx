import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store"
import { useMediaQuery } from "react-responsive";





import TiposSustanciasQuimicas from '../slides/TiposSustanciasQuimicas';
import QueEsElRiesgoQuimico from '../slides/QueEsElRiesgoQuimico';

import RegulacionDeRiesgoQuimico from "../slides/RegulacionDeRiesgoQuimico";
import PictogramasImagen from "../slides/PictogramasImagen";
import PictogramasYRepresentacionDeLosPeligros from "../slides/PictogramasYRepresentacionDeLosPeligros";
import PictogramasDeLasNacionesUnidas from "../slides/PictogramasDeLasNacionesUnidas";
import EscenariosDeEmergencias from "../slides/EscenariosDeEmergencias";
import momet_mobile1 from "../../assets/img/momentos/momento_1_riesgos_quimico_movil.webp";
import momet_mobile2 from "../../assets/img/momentos/momento_2_riesgos_quimico_movil.webp";
import momet_mobile3 from "../../assets/img/momentos/momento_3_riesgos_quimico_movil.webp";
import momet_mobile4 from "../../assets/img/momentos/momento_4_riesgos_quimico_movil.webp";
import EstructuraTematica from '../../pages/slides/EstructuraTematica'
import DivisorMomentos from "../slides/DivisorMomentos";
import momento1 from "../../assets/img/momentos/momento_1_riesgos_quimico.webp";
import momento2 from "../../assets/img/momentos/momento_2_riesgos_quimico.webp";
import momento3 from "../../assets/img/momentos/momento_3_riesgos_quimico.webp";
import momento4 from "../../assets/img/momentos/momento_4_riesgos_quimico.webp";
import TiposRiesgoQuimico from "../slides/TiposRiesgoQuimico";
import ViasIngresoSustancias from "../slides/ViasIngresoSustancias";
import TiposRiesgoQuimicoDnD from "../slides/TiposRiesgoQuimicoDnD";

import ConozcamosEtiquetasSGA from "../slides/ConozcamosEtiquetasSGA";

import PeligrosEnNuestraOperacion from "../slides/PeligrosEnNuestraOperacion";
import BienvenidoModulo from '../slides/BienvenidoModulo';
import EfectosSobreLaSalud from "../slides/EfectosSobreLaSalud";
import ActosyCondicionesInseguras from "../slides/ActosyCondicionesInseguras";
import ManejoDeProductosQuimicos from "../slides/ManejoDeProductosQuimicos";
import RutaDeInspeccion from "../slides/RutaDeInspeccion";

import LineamientosDeObligatorioAlmacenes from "../slides/LineamientosDeObligatorioAlmacenes";
import ActosyCondicionesInsegurasProductosQuimicos from "../slides/ActosyCondicionesInsegurasProductosQuimicos";
import FichaDeDatosDeSeguridadFDS from "../slides/FichaDeDatosDeSeguridadFDS";
import RecordemosTerminosNormativos from "../slides/RecordemosTerminosNormativos";
import EtiquetadoMercanciaPeligrosa from "../slides/EtiquetadoMercanciaPeligrosa";
import RecordemosListaDesplegable from "../slides/RecordemosListaDesplegable";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setArrayValidacionTraking, getArrayValidacionTraking, setPorcentajeTraking, getPorcentajeTraking } from "../../traking";

const EmployeeDataUpdateProg = () => {
  const params = new URLSearchParams(window.location.search);
  axios.get('../../../data_user.php',
    {
      params: { // Aquí agregamos los parámetros a la URL
        course_code: params.get('course_code'),
        uid: params.get('uid'),
        mid: params.get('mid')
      }
    }
  )
    .then((response) => {
      console.log(response.data.data.user_id);
      const datos = response.data;
      axios.post('../../../react_update_progress.php', {
        progress: getPorcentajeTraking(), // Enviar parámetros en el cuerpo de la solicitud
        module_id: params.get('mid'),
        unique_course_id: params.get('uid'),
        asistencia_id: datos.data.user_id,
        react_progress_object: JSON.stringify(getArrayValidacionTraking())
      })
        .then((response) => {
          const datos = response;
          console.log(datos);
        })
        .catch((error) => {
          console.error('Error al obtener los datos:', error); // Imprime el error
        });
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error); // Imprime el error
    });
};

const addNumber = (number) => {
  const storedArray = getArrayValidacionTraking() || [];
  if (!storedArray.includes(number)) {
    const updatedNumbers = [...storedArray, number];
    setArrayValidacionTraking(updatedNumbers);
  }
};

function SlideNavigator() {
  const slides = [



    <BienvenidoModulo key='BienvenidoModulo' />,
    <EstructuraTematica key="EstructuraTematica" />,
    <DivisorMomentos
      background={momento1}
      mobileBackground={momet_mobile1}
      index={2}
      line1="Entendamos"
      line2="El Riesgo"
      line3="Químico"
      key="DivisorMomentos" />,
    <QueEsElRiesgoQuimico key='QueEsElRiesgoQuimico' />,
    <RecordemosTerminosNormativos key='RecordemosTerminosNormativos' />,
    <TiposSustanciasQuimicas key='TiposSustanciasQuimicas' />,


    <RegulacionDeRiesgoQuimico key='RegulacionDeRiesgoQuimico' />,
    <DivisorMomentos
      background={momento2}
      mobileBackground={momet_mobile2}
      index={2}
      line1="Apliquemos"
      line2="El Sistema Globalmente "
      line3="Armonizado (SGA)"
      key="DivisorMomentos" />,
    <PictogramasImagen key='PictogramasImagen' />,
    <PictogramasYRepresentacionDeLosPeligros key='PictogramasYRepresentacionDeLosPeligros' />,
    <TiposRiesgoQuimico key='TiposRiesgoQuimico' />,
    <TiposRiesgoQuimicoDnD key='TiposRiesgoQuimicoDnD' />,
    <ViasIngresoSustancias key='ViasIngresoSustancias' />,
    <PeligrosEnNuestraOperacion key='PeligrosEnNuestraOperacion' />,
    <ConozcamosEtiquetasSGA key='ConozcamosEtiquetasSGA' />,
    <FichaDeDatosDeSeguridadFDS key='FichaDeDatosDeSeguridadFDS' />,
    <LineamientosDeObligatorioAlmacenes key='LineamientosDeObligatorioAlmacenes' />,
    <DivisorMomentos
      background={momento3}
      mobileBackground={momet_mobile3}
      index={2}
      line1="Actos y Condiciones"
      line2="Inseguras de"
      line3="Productos Químicos"
      key="DivisorMomentos" />,
    <EfectosSobreLaSalud key='EfectosSobreLaSalud' />,
    <ActosyCondicionesInseguras key='ActosyCondicionesInseguras' />,
    <ManejoDeProductosQuimicos key='ManejoDeProductosQuimicos' />,
    <ActosyCondicionesInsegurasProductosQuimicos key='ActosyCondicionesInsegurasProductosQuimicos' />,
    <RecordemosListaDesplegable key='RecordemosListaDesplegable' />,
    <RutaDeInspeccion key='RutaDeInspeccion' />,
    <EscenariosDeEmergencias key='EscenariosDeEmergencias' />,
    <DivisorMomentos
      background={momento4}
      mobileBackground={momet_mobile4}
      index={2}
      line1="Transporte"
      line2="De Mercancias"
      line3="Peligrosas"
      key="DivisorMomentos" />,
    <PictogramasDeLasNacionesUnidas key='PictogramasDeLasNacionesUnidas' />,
    <EtiquetadoMercanciaPeligrosa key='EtiquetadoMercanciaPeligrosa' />,
  ];

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setSlideIndex = useStore((state) => state.setSlideIndex);
  const slideIndex = useStore((state) => state.slideIndex);
  const setTotalSlides = useStore((state) => state.setTotalSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setCurrentProgress = useStore((state) => state.setCurrentProgress);
  const isOnDivisor = useStore((state) => state.isOnDivisor);
  const navigate = useNavigate();

  // Función para hacer scroll al Header y al slide actual
  const scrollToSlide = () => {
    if (window.innerWidth <= 768) { // Solo en móviles
      const headerElement = document.getElementById("slide-Header"); // Obtén el Header
      if (headerElement) {
        headerElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll al Header
      }

      const slideId = `slide-${slides[currentSlide].key}`; // Construye el ID del slide actual
      const slideElement = document.getElementById(slideId); // Obtén el elemento del slide
      if (slideElement) {
        slideElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll al inicio del slide
      }
    }
  };

  // Efecto para hacer scroll cuando cambia el slide
  useEffect(() => {
    scrollToSlide();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

    if (currentSlide === slides.length - 1) {
      null;
    } else {
      setSlideIndex(currentSlide + 1);
      if (slides.length === 0) {
        setPorcentajeTraking(0);
      } else {
        addNumber(parseInt(currentSlide + 2))
        const storedArray = getArrayValidacionTraking() || [];
        const sum = storedArray.length;
        console.log(sum);
        const porcentaje = (sum / parseInt(slides.length)) * 100;
        setPorcentajeTraking(parseInt(porcentaje))
        EmployeeDataUpdateProg();
      }
    }
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
    if (currentSlide === 0) {
      null;
    } else {
      setSlideIndex(currentSlide - 1);
      if (slides.length === 0) {
        setPorcentajeTraking(0);
      } else {
        if (parseInt(currentSlide - 1) != 0) {
          addNumber(parseInt(currentSlide - 1));
          const storedArray = getArrayValidacionTraking() || [];
          const sum = storedArray.length;
          console.log(sum);
          const porcentaje = (sum / parseInt(slides.length)) * 100;
          setPorcentajeTraking(parseInt(porcentaje));
          EmployeeDataUpdateProg();
        }
      }
    }
  };

  const setProgress = (currentSlide) => {
    const progress = (currentSlide / (slides.length - 1)) * 100;
    setCurrentProgress(parseInt(progress));
  };

  useEffect(() => {
    setCurrentSlide(slideIndex);
    setProgress(slideIndex);
  }, [slideIndex, setCurrentSlide]);

  useEffect(() => {
    setTotalSlides(slides.length);
  }, []);

  return (
    <div
      className="relative p-0 m-0 overflow-x-hidden"

    >
      {currentSlide === 0 ? null : (
        <div
          className="absolute bottom-0 right-1/2 md:right-auto md:left-0 md:top-1/2 md:bottom-auto group md:h-fit transform -translate-y-1/2 z-10 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer"
          onClick={prevSlide}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="4x"

            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div className="flex justify-between w-full">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-full mx-1 my-0 hover:cursor-pointer ${currentSlide >= index ? "bg-background-progres-bar" : "bg-main-color/30"} `}
            onClick={() => {
              addNumber(parseInt(index + 1));
              const storedArray = getArrayValidacionTraking() || [];
              const sum = storedArray.length;
              const porcentaje = (sum / parseInt(slides.length)) * 100;
              setPorcentajeTraking(parseInt(porcentaje));
              setCurrentSlide(index);
              setSlideIndex(index);
            }}
          ></div>
        ))}
      </div>
      {currentSlide === slides.length - 1 ? (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={() => navigate('/evaluación')}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      ) : (
        <div
          className={`absolute bottom-0 left-1/2 md:right-0 md:top-1/2 md:bottom-auto md:left-auto group md:h-fit transform z-10 -translate-y-1/2 hover:bg-gray-300/50 transition duration-300 rounded-md py-0 md:py-0 cursor-pointer`}
          onClick={nextSlide}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            size="4x"
            className={`${isOnDivisor === true ? "group-hover:text-main-color text-white" : "group-hover:text-main-color text-secondary-color"} transition-colors px-4 py-2`}
          />
        </div>
      )}
      <div
        className={`${isMobile ? "overflow-auto" : "overflow-hidden"
          } p-0 m-0 w-screen hide-scrollbar`}

      >
        {slides[currentSlide]}
      </div>
    </div>
  );
}

export default SlideNavigator;
