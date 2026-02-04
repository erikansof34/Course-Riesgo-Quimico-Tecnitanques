import section_1 from "../../assets/img/slides/section-1.png";

import useStore from "../../store";

function DivisorMomentosTemplate() {
  const setSlideIndex = useStore((state) => state.setSlideIndex);

  return (
    <div className="container slider02 relative min-h-screen p-0 m-0">
      <div
        className="absolute z-0 inset-0 bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${section_1})`,
          width: "100vw",
          height: "100%",
        }}
      >
        <div className="flex flex-col text-7xl z-50 justify-center h-full -mt-20 px-40 font-bold content-start">
          <h1 className="text-white">
            Entendamos el<span className="text-main-color">.</span>
          </h1>
          <h1 className="text-white">
            RIESGO<span className="text-main-color">.</span>
          </h1>
          <h1 className="text-white">
            Químico<span className="text-main-color">.</span>
          </h1>
          <button
            className="bg-main-color text-lg font-normal text-white w-fit py-2.5 px-4 mt-8"
            onClick={() => setSlideIndex(3)}
          >
            VER MÁS &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default DivisorMomentosTemplate;
