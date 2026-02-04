import { useEffect, useRef } from "react";
import useStore from "../../store";
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import Instruction from "../components/Instruction";
import { useMediaQuery } from "react-responsive";
import imgDerrames from "../../assets/img/artes-morelco/derrames.webp";
import imgConatoIncendios from "../../assets/img/artes-morelco/conato_incendio.webp";
import imgReaccionNoDeseada from "../../assets/img/artes-morelco/reaccion_no_deseada.webp";
import imgRobo from "../../assets/img/artes-morelco/robo.webp";
import imgEmergenciaSalud from "../../assets/img/artes-morelco/emergencias_salud.webp";
import audioDerrame from "../../assets/audio/sld18_derrames.mp3";
import audioConatoIncendio from "../../assets/audio/sld18_conatos_incendio.mp3";
import audioReaccionNoDeseada from "../../assets/audio/slide_16_reacciones.mp3";
import audioRobo from "../../assets/audio/slide_16_robo.mp3";
import audioEmergenciaSalud from "../../assets/audio/sld18_emergencias_salud.mp3";
import "../../pages/slides/styles/EscenariosDeEmergencias.css";

function EscenariosDeEmergencias() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const audioRefs = useRef([]);

  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  // Función para manejar la reproducción de audio
  const handleAudioPlay = (index) => {
    // Detener todos los otros audios
    audioRefs.current.forEach((audio, idx) => {
      if (idx !== index && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const emergencyScenarios = [
    {
      title: "Derrames",
      image: imgDerrames,
      audio: audioDerrame,
      description: "Reporte inmediatamente al profesional ambiental y a la Brigada de Emergencias. Identifique el sitio de escape/derrame y si tiene conocimiento en el tema impida el mayor derrame posible. Para más información consulte el PON de derrames del plan de emergencias de la instalación.",
      gradient: "from-green-400 to-green-600"
    },
    {
      title: "Conatos de incendio",
      image: imgConatoIncendios,
      audio: audioConatoIncendio,
      description: "Mantenga la calma, reporte inmediatamente al profesional HSE y a la Brigada de Emergencias. Alerte a las personas del lugar y pídales que evacuen. Si está capacitado utilice el extintor portátil adecuado. Para más información consulte el PON de incendios del plan de emergencias de la instalación.",
      gradient: "from-lime-400 to-green-500"
    },
    {
      title: "Reacciones no deseadas",
      image: imgReaccionNoDeseada,
      audio: audioReaccionNoDeseada,
      description: "Avise al contratista dueño de los productos para que activen sus PON's según su Plan de Emergencias.",
      gradient: "from-yellow-300 to-lime-400"
    },
    {
      title: "Robo",
      image: imgRobo,
      audio: audioRobo,
      description: "Siga las sugerencias del Coordinador de Seguridad Física y los protocolos definidos.",
      gradient: "from-yellow-300 to-yellow-500"
    },
    {
      title: "Emergencias de salud",
      image: imgEmergenciaSalud,
      audio: audioEmergenciaSalud,
      description: "Mantenga la calma, reporte inmediatamente a los profesionales de salud ocupacional y a la Brigada de Primeros Auxilios. Para más información consulte el PON de primeros auxilios del plan de emergencias de la instalación.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="quiz-container-ee mb-36 md:mb-0 overflow-auto">
      <div className="quiz-header-ee">
        <Title>
          Escenarios de emergencias con <span className="text-title-color">productos químicos</span>
        </Title>
        <div className="quiz-subtitle-ee">
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Veamos los escenarios de emergencia que pueden ocurrir en nuestra operación y cómo gestionarlos en caso de que ocurran:
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center items-center px-4">
        <Instruction theme="light" arrow="down">
          Pasa el cursor sobre las cards para más información
        </Instruction>
      </div>

      <div className="cards-container-ee">
        {emergencyScenarios.map((scenario, index) => (
          <div className="quiz-card-ee" key={index}>
            <div className="card-inner-ee">
              <div className="card-front-ee">
                <div className={`card-image-ee bg-gradient-to-b ${scenario.gradient}`}>
                  <img src={scenario.image} alt={scenario.title} className="w-full h-full object-cover" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }} />
                </div>
                <div className="card-content-ee">
                  <h3 className="card-title-ee">{scenario.title}</h3>
                </div>
              </div>
              <div className="card-back-ee">
                <div>
                  <p className="result-message-ee text-justify text-parag">{scenario.description}</p>
                  <audio
                    ref={el => audioRefs.current[index] = el}
                    controls
                    className="mt-1 w-full"
                    onPlay={() => handleAudioPlay(index)}
                  >
                    <source src={scenario.audio} type="audio/mp3" />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EscenariosDeEmergencias;