import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import type { Engine } from 'tsparticles-engine';
import type { RootState } from '../store/store';

// CRITICAL: These background effects must be maintained at all times
// This component ensures a persistent, interactive particle background
export default function ParticleBackground() {
  const { theme } = useSelector((state: RootState) => state.userPreferences.display);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: theme === 'light' ? "#3b82f6" : "#ffffff", // Blue in light mode, white in dark mode
      },
      links: {
        color: theme === 'light' ? "#3b82f6" : "#ffffff",
        distance: 150,
        enable: true,
        opacity: theme === 'light' ? 0.3 : 0.2, // Slightly more visible in light mode
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 70,
      },
      opacity: {
        value: theme === 'light' ? 0.7 : 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: theme === 'light' ? 0.4 : 0.3,
          sync: false
        }
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: theme === 'light' ? 0.8 : 1
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "bubble"]
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: theme === 'light' ? 0.7 : 0.5
          }
        },
        bubble: {
          distance: 200,
          size: 4,
          duration: 2,
          opacity: theme === 'light' ? 0.9 : 0.8
        }
      },
    },
    detectRetina: true,
  }), [theme]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
    />
  );
}