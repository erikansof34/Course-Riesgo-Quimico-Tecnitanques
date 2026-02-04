import { useState, useEffect } from "react";
import "../../assets/css/style.css";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Instruction from "../components/Instruction";
import Audio from "../../assets/audio/slide-sga-pictograma_vehiculo.mp3";
import { useMediaQuery } from "react-responsive";
import rombo from "../../assets/img/artes-morelco/sl16rombo.webp";
import truck from "../../assets/img/artes-morelco/sl16truck.webp";
import useStore from "../../store";

function EtiquetadoMercanciaPeligrosa() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const tooltipStyle = isMobile
    ? {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "90%",
        width: "300px",
        height: "auto",
        maxHeight: "80%",
        overflowY: "auto",
        zIndex: 1000,
      }
    : {
        position: "absolute",
        top: "5%",
        left: "34%",
        backgroundColor: "white",
        color: "black",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "300px",
        maxHeight: "450%",
        zIndex: 10,
      };

  return (
    <>
      <div className="flex flex-col md:flex-row mb-36 md:mb-0">
        {/* Columna Izquierda */}
        <div className="md:flex-1 display-mobile dark-mobile bg-dark-color md:w-1/2 w-full">
          <div
            className="display-mobile flex flex-col justify-center items-center mb-4 px-6"
            style={{
              position: isMobile ? "static" : "relative",
              top: isMobile ? "0" : "-20px",
            }}
          >
            <div className="my-3 text-center text-title-size">
              <Title>
                Etiquetado de la <span className="text-title-color">mercancía <br /> peligrosa </span> y del <span className="text-title-color">vehículo</span>
              </Title>
            </div>
            <Paragraph theme="dark" justify="justify">
              El vehículo y contenedores de las mercancías peligrosas deben estar debidamente marcados. Los rombos y placa UN deben ser reflectivos, en material duradero y fijos al vehículo. Escriba los números de la placa UN con un marcador de tinta durable.
            </Paragraph>
            <div className="dynamic-border mt-4">
              <img
                src={rombo}
                style={{ width: "150px", height: "auto" }}
                alt="Rombo"
              />
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="md:flex-2 ligth-display bg-white md:w-1/2 w-full flex justify-center items-center">
          <div
            className="flex flex-col justify-center items-center gap-4 mt-10"
            style={{
              textAlign: isMobile ? "center" : "left",
              padding: isMobile ? "10px" : "20px",
            }}
          >
            <Instruction arrow="down" theme="light">
              Haz clic sobre el botón para ver más información
            </Instruction>
            <div
              className="flex justify-center items-center overflow-hidden"
              style={{
                position: "relative",
                width: isMobile ? "100%" : "90%",
              }}
            >
              {/* Imagen del camión */}
              <img
                src={truck}
                style={{
                  width: isMobile ? "100%" : "90%",
                  height: "auto",
                }}
                alt="Camión"
              />
              {/* Botón con tooltip */}
              <button
                onClick={handleTooltipToggle}
                className="tooltip-button"
                style={{
                  position: "absolute",
                  top: "43%",
                  left: "31%",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                +
              </button>

              {/* Cuadro de texto que se muestra al hacer clic en el botón */}
              {showTooltip && (
                <div className="tooltip-box" style={tooltipStyle}>
                  <button
                    onClick={closeTooltip}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      lineHeight: "1",
                    }}
                  >
                    X
                  </button>
                  <div className={isMobile ? "mt-7 mb-4" : "mt-7"}>
                    <Paragraph theme="light" justify="justify">
                      Información adicional sobre el etiquetado del camión y sus normativas de seguridad.
                    </Paragraph>
                  </div>
                  <div className={isMobile ? "px-2 mb-4" : "px-2"}>
                    <Instruction theme="light" arrow="down">
                      Haz clic en el siguiente audio
                    </Instruction>
                  </div>
                  <audio controls className="media-espanol w-full">
                    <source src={Audio} type="audio/mp3" />
                  </audio>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EtiquetadoMercanciaPeligrosa;
