import { useEffect } from "react";
import Title from "../components/Title";
import { useMediaQuery } from "react-responsive";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import Instruction from "../components/Instruction";
import riesgoAudio from "../../assets/audio/Slide4RiesgoQuimico.mp3";
import img1 from "../../assets/img/artes-morelco/sld06systemwoman.png";
import "../../pages/slides/styles/QueEsRiesgoQuimico.css"

function QueEsRiesgoQuimico() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(false);
  },);

  return (
    <div className="flex flex-col md:flex-row ">
      {/* Left Column */}
      <div className="md:flex-1 display-mobile dark-mobile bg-slate-900 md:w-2/5 w-full">
          <div className="display-mobile flex flex-col justify-center items-center mb-24">
          <div className="my-3 text-center text-title-size">
          </div>
          <div className="my-8 text-center">
            <Title>1- ¿Qué es el <span style={{ color: '#6E3CD2' }}>riesgo químico?</span> </Title>
            
          </div>
          <Paragraph theme="light" justify={isMobile ? 'justify' : 'justify'}>
          Recordemos que el <span className="text-title-color">riesgo químico</span>, es la probabilidad de que una o varias sustancias 
          químicas desaten eventos que terminen en daños relacionados con la Salud de las personas, 
          afectación al medio ambiente, deterioro de las instalaciones o espacios físicos. 
          </Paragraph>    
          <Instruction arrow="down">
          Haz clic para ejecutar el audio
          </Instruction>     
          <audio controls className="media-espanol">
                <source src={riesgoAudio} type="audio/mp3" />
              </audio>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:flex-1 bg-white md:w-1/2 w-full px-24 py-6 flex mx-auto justify-center items-center ">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <img
                  className="mx-auto "
                  style={{ maxWidth: "300px" }} // Reducir el tamaño de la imagen
                  src={img1}
               
                />
        
        </div>
      </div>
    </div>
  );
}

export default QueEsRiesgoQuimico;