import { useEffect } from "react";
import Title from "../components/Title";
import audio1 from "../../assets/audio/sld10_sga_pictograma.mp3";
import Paragraph from "../components/Paragraph";
import useStore from "../../store";
import Instruction from "../components/Instruction";
import img1 from "../../assets/img/artes-morelco/ghspictogram.webp";
import img2 from "../../assets/img/artes-morelco/chemrisk.webp"; // Imagen de fondo
import { useMediaQuery } from "react-responsive";

function PictogramasImagen() {

  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(false);
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen mb-36 md:mb-0" // Agregado 'min-h-screen' para cubrir todo el alto de la pantalla
      style={{
        backgroundImage: `url(${img2})`, // Imagen de fondo para todo el contenedor
        backgroundSize: "cover", // Cubrir todo el contenedor
        backgroundPosition: "center", // Centrar la imagen
        backgroundRepeat: "no-repeat", // No repetir la imagen
      }}
    >
      {/* Cuadro con texto y audio en la izquierda */}
      <div className="flex-1 flex justify-center items-center display-mobile">
        <div
          className="bg-dark-color text-white p-8 rounded-lg shadow-lg flex m-4 flex-col justify-center items-center"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <div className="text-center">
            <div className="mb-3">
              <Title>
                Pictogramas y representación de los peligros en las sustancias
                químicas
              </Title>
            </div>
            <Paragraph theme="dark" justify={isMobile ? "justify" : "justify"}>
              El SGA utiliza{" "}
              <span style={{ color: "#003454" }}>pictogramas de peligro</span>{" "}
              que consisten en un símbolo negro sobre un fondo blanco con un
              marco rojo en forma de rombo, como el que aparece en la siguiente
              imagen.
            </Paragraph>

            {/* Ajustar el contenedor de la instrucción */}
            <div className="flex flex-col items-center mt-4">
              <Instruction arrow="down">Haz clic para ejecutar el audio</Instruction>

              {/* Audio control centrado debajo de la instrucción */}
              <audio controls className="media-espanol mt-4">
                <source src={audio1} type="audio/mp3" />
              </audio>
            </div>
          </div>
        </div>
      </div>

      {/* Imagen en la derecha */}
      <div className="flex-1 px-6 flex justify-center items-center">
        <div className="h-full my-auto flex flex-col justify-center items-center">
          <img
            className="mx-auto mb-2"
            style={{ maxWidth: "450px" }} // Reducir el tamaño de la imagen
            src={img1}
          />
        </div>
      </div>
    </div>
  );
}

export default PictogramasImagen;
