import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      background: {
        color: {
          value: "#020617",
        },
      },

      fpsLimit: 60,

      particles: {
        color: {
          value: ["#0077FF", "#cce6ff", "#99ccff"],
        },

        links: {
          enable: false,
        },

        move: {
          enable: true,
          direction: MoveDirection.top,
          speed: 1,
          straight: false,
          outModes: {
            default: OutMode.out,
          },
        },

        number: {
          value: 120,
          density: {
            enable: true,
          },
        },

        opacity: {
          value: { min: 0.3, max: 0.9 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.2,
            sync: false,
          },
        },

        shape: {
          type: "circle",
        },

        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.8,
            sync: false,
          },
        },
      },

      detectRetina: true,
    }),
    [],
  );


  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0"
      />
    );
  }

  return <></>;
};
export default ParticlesBackground;
