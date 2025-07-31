import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../component/Loader";
import Island from "../models/Island";
import Cloud from "../models/Cloud";
import Bird from "../models/Bird";
import Plane from "../models/plane";
import HomeInfo from "../component/HomeInfo"; // ✅ Use relative path

const Home = () => {
  const [isRotation, setisRotation] = useState(false);

  // TEMP: Set to 1 to display the blue box and first message
  const [currentStage, setCurrentStage] = useState(null);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, Math.PI, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale;
    let screenPosition;
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition, planeRotation] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>

      {/* Blue info box */}
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotation ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          {/* Models */}
          <Bird />
          <Cloud isRotation={isRotation} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotation={isRotation}
            setisRotation={setisRotation}
            setCurrentStage={setCurrentStage} // Used later when you want to trigger popup
          />
          <Plane
            isRotation={isRotation}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={planeRotation}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
