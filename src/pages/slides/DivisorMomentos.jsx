/* eslint-disable react/prop-types */
const desktopBackgroundImage = "https://placehold.co/1960x1080";
const mobileBackgroundImage = "https://placehold.co/640x1136";
import { useMediaQuery } from "react-responsive";
import useStore from "../../store";
import { useEffect } from "react";

/*
Esta plantilla es ideal para implementar las divisiones de los diferentes momentos del curso.
Tendrá una imagen que ocupará todo el fondo, un título grande, y un botón de acción para dirigir
al usuario a la siguiente slide.

PARÁMETROS:
- background: la imagen de fondo que se mostrará en la diapositiva.
- index: el índice de la diapositiva actual.
- line1: la primera línea de texto que se mostrará en la diapositiva.
- line2: la segunda línea de texto que se mostrará en la diapositiva.
- line3: la tercera línea de texto que se mostrará en la diapositiva.

*/

function DivisorMomentos({
  background = desktopBackgroundImage,
  mobileBackground = mobileBackgroundImage,
  index,
  line1,
  line2,
  line3,
}) {
  const setSlideIndex = useStore((state) => state.setSlideIndex);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);

  useEffect(() => {
    setIsOnDivisor(true);
  }, []);

  const backgroundImage = isMobile ? mobileBackground : background;
  const fontSize = isMobile ? "3rem" : "4.5rem"; // Ajuste del tamaño de fuente para móvil

  return (
    <div className="container slider02 relative min-h-screen p-0 m-0">
      <div
        className="absolute -z-10 inset-0 bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          width: "100vw",
          height: "100%",
        }}
      >
        <div
          className={`flex flex-col ${
            isMobile ? "px-6" : "px-40"
          } z-50 justify-center h-full -mt-20 font-bold content-start`}
        >
          <h1 className="text-white" style={{ fontSize }}>
            {line1}
          </h1>
          <h1 className="text-white" style={{ fontSize }}>
            {line2}
          </h1>
          <h1 className="text-white" style={{ fontSize }}>
            {line3}
          </h1>
          {/* <button
            className="bg-main-color text-lg font-normal text-white w-fit py-2.5 px-4 mt-8"
            onClick={() => setSlideIndex(index)}
          >
            VER MÁS &gt;
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default DivisorMomentos;
