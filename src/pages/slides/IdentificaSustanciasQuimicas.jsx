import { useEffect } from "react";
import useStore from "../../store";
import "../../pages/slides/styles/IdentificaSustanciasQuimicas.css"
import Paragraph from "../components/Paragraph";
import Title from "../components/Title";
import { useMediaQuery } from "react-responsive";
import Instruction from "../components/Instruction";

function IdentificaSustanciasQuimicas() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  
  useEffect(() => {
    setIsOnDivisor(false);
  }, [setIsOnDivisor]);

  return (
    <div className="quiz-container mb-36 md:mb-0">
      <div className="quiz-header">
        <Title>REFLEXIONEMOS</Title>
        <div className="quiz-subtitle">
          <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
            Identifica cuál de estas <span>sustancias químicas</span> es la que más ha causado accidentes en la operación en el <span>sector petrolero:</span>
          </Paragraph>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Instruction theme="ligth"  arrow="down">
          Pasa el cursor sobre las cards
        </Instruction>
      </div>

      <div className="cards-container">
        {/* Card 1 */}
        <div className="quiz-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="card-image card-image-1"></div>
              <div className="card-content">
                <h3 className="card-title">Sulfuro de Hidrógeno</h3>
              </div>
            </div>
            <div className="card-back">
              <div>
                <p className="result-correct">Correcto</p>
                <Paragraph className="result-message text-justify">Gran inicio de curso</Paragraph>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="quiz-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="card-image card-image-2"></div>
              <div className="card-content">
                <h3 className="card-title">Vapores de hidrocarburos</h3>
              </div>
            </div>
            <div className="card-back">
              <div>
                <p className="result-incorrect">Incorrecto</p>
                <Paragraph className="result-message text-justify">
                  Recuerda que el sistema de gestión FORUS se está implementando en EMERALD ENERGY desde 2022 y buscar que seamos una empresa altamente competitiva internacionalmente
                </Paragraph>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="quiz-card">
          <div className="card-inner">
            <div className="card-front">
              <div className="card-image card-image-3"></div>
              <div className="card-content">
                <h3 className="card-title">Nitrato de Amonio</h3>
              </div>
            </div>
            <div className="card-back">
              <div>
                <p className="result-incorrect">Incorrecto</p>
                <Paragraph className="result-message text-justify">
                  Recuerda que el sistema de gestión FORUS se está implementando en EMERALD ENERGY desde 2022 y buscar que seamos una empresa altamente competitiva internacionalmente
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentificaSustanciasQuimicas;