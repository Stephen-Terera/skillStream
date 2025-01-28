import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

interface Point {
  x: number;
  y: number;
}

// Zodiac constellation patterns
const zodiacPatterns = {
  aries: [
    { x: 120, y: 100 }, { x: 160, y: 80 }, { x: 200, y: 100 },
    { x: 240, y: 140 }, { x: 220, y: 180 }, { x: 180, y: 200 },
    { x: 140, y: 180 }, { x: 120, y: 140 }
  ],
  taurus: [
    { x: 120, y: 120 }, { x: 160, y: 100 }, { x: 200, y: 120 },
    { x: 220, y: 160 }, { x: 200, y: 200 }, { x: 160, y: 220 },
    { x: 120, y: 200 }, { x: 100, y: 160 }
  ],
  gemini: [
    { x: 100, y: 100 }, { x: 140, y: 80 }, { x: 180, y: 100 },
    { x: 200, y: 140 }, { x: 180, y: 180 }, { x: 140, y: 200 },
    { x: 100, y: 180 }, { x: 80, y: 140 }, { x: 140, y: 140 }
  ],
  cancer: [
    { x: 140, y: 100 }, { x: 180, y: 80 }, { x: 220, y: 100 },
    { x: 240, y: 140 }, { x: 220, y: 180 }, { x: 180, y: 200 },
    { x: 140, y: 180 }, { x: 120, y: 140 }
  ],
  leo: [
    { x: 100, y: 120 }, { x: 140, y: 100 }, { x: 180, y: 120 },
    { x: 200, y: 160 }, { x: 180, y: 200 }, { x: 140, y: 220 },
    { x: 100, y: 200 }, { x: 80, y: 160 }
  ],
  virgo: [
    { x: 120, y: 100 }, { x: 160, y: 80 }, { x: 200, y: 100 },
    { x: 220, y: 140 }, { x: 200, y: 180 }, { x: 160, y: 200 },
    { x: 120, y: 180 }, { x: 100, y: 140 }, { x: 160, y: 140 }
  ],
  libra: [
    { x: 100, y: 120 }, { x: 140, y: 100 }, { x: 180, y: 120 },
    { x: 200, y: 160 }, { x: 180, y: 200 }, { x: 140, y: 220 },
    { x: 100, y: 200 }, { x: 80, y: 160 }
  ],
  scorpio: [
    { x: 120, y: 100 }, { x: 160, y: 80 }, { x: 200, y: 100 },
    { x: 220, y: 140 }, { x: 200, y: 180 }, { x: 160, y: 200 },
    { x: 120, y: 180 }, { x: 100, y: 140 }
  ],
  sagittarius: [
    { x: 100, y: 120 }, { x: 140, y: 100 }, { x: 180, y: 120 },
    { x: 200, y: 160 }, { x: 180, y: 200 }, { x: 140, y: 220 },
    { x: 100, y: 200 }, { x: 80, y: 160 }
  ],
  capricorn: [
    { x: 120, y: 100 }, { x: 160, y: 80 }, { x: 200, y: 100 },
    { x: 220, y: 140 }, { x: 200, y: 180 }, { x: 160, y: 200 },
    { x: 120, y: 180 }, { x: 100, y: 140 }
  ],
  aquarius: [
    { x: 100, y: 120 }, { x: 140, y: 100 }, { x: 180, y: 120 },
    { x: 200, y: 160 }, { x: 180, y: 200 }, { x: 140, y: 220 },
    { x: 100, y: 200 }, { x: 80, y: 160 }
  ],
  pisces: [
    { x: 120, y: 100 }, { x: 160, y: 80 }, { x: 200, y: 100 },
    { x: 220, y: 140 }, { x: 200, y: 180 }, { x: 160, y: 200 },
    { x: 120, y: 180 }, { x: 100, y: 140 }
  ]
};

// Additional patterns
const additionalPatterns = {
  infinity: [
    { x: 100, y: 150 }, { x: 130, y: 120 }, { x: 160, y: 150 },
    { x: 130, y: 180 }, { x: 200, y: 150 }, { x: 230, y: 120 },
    { x: 260, y: 150 }, { x: 230, y: 180 }
  ],
  spiral: [
    { x: 180, y: 180 }, { x: 200, y: 160 }, { x: 210, y: 130 },
    { x: 200, y: 100 }, { x: 170, y: 80 }, { x: 140, y: 90 },
    { x: 120, y: 120 }, { x: 130, y: 150 }
  ],
  crown: [
    { x: 140, y: 100 }, { x: 180, y: 80 }, { x: 220, y: 100 },
    { x: 200, y: 130 }, { x: 160, y: 150 }, { x: 120, y: 130 }
  ]
};

const facts = {
  general: [
    "Over 77% of companies use online learning to help develop their employees' skills.",
    "The global e-learning market is expected to reach £350 billion by 2025.",
    "Online learning has led to an increase in retention rates of 25-60%.",
    "73% of students reported increased engagement with online learning.",
    "Corporate e-learning has grown by 900% since 2000.",
  ],
  student: [
    "Students who use SkillStream spend 60% more time practising skills.",
    "Our interactive exercises improve skill retention by 45%.",
    "Join over 10,000 study groups to enhance your learning journey.",
    "95% of SkillStream students complete their chosen courses.",
    "Access to 24/7 AI-powered learning assistance.",
  ]
};

export default function LoadingScreen() {
  const [points, setPoints] = useState<Point[]>([]);
  const [fact, setFact] = useState('');
  const [progress, setProgress] = useState(0);
  const { theme } = useSelector((state: RootState) => state.userPreferences.display);

  const particleColor = theme === 'light' ? '#3b82f6' : '#ffffff';

  useEffect(() => {
    // Get random constellation pattern and shuffle points
    const allPatterns = {
      ...zodiacPatterns,
      ...additionalPatterns
    };
    const patternKeys = Object.keys(allPatterns);
    const randomPattern = allPatterns[patternKeys[Math.floor(Math.random() * patternKeys.length)]];
    
    // Scale up the pattern (7.5x) and center it
    const scaledPoints = randomPattern.map(point => ({
      x: (point.x - 160) * 7.5 + 540, // Center horizontally (1080/2)
      y: (point.y - 140) * 7.5 + 540  // Center vertically (1080/2)
    }));
    
    // Shuffle points for more dynamic animation
    const shuffledPoints = [...scaledPoints].sort(() => Math.random() - 0.5);
    setPoints(shuffledPoints);

    // Set random fact from random category
    const categories = Object.keys(facts);
    const randomCategory = facts[categories[Math.floor(Math.random() * categories.length)]];
    const randomFact = randomCategory[Math.floor(Math.random() * randomCategory.length)];
    setFact(randomFact);

    const startTime = Date.now();
    const minLoadTime = 4500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / minLoadTime) * 100, 100);
      setProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50"
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-4">
        {/* Constellation Animation */}
        <motion.svg
          width="1080"
          height="1080"
          viewBox="0 0 1080 1080"
          className="mb-8"
          style={{ maxWidth: '90vh', maxHeight: '90vh' }}
        >
          {/* Connection lines with dynamic animations */}
          {points.map((point, index) => (
            points.slice(index + 1).map((nextPoint, nextIndex) => {
              const distance = Math.sqrt(
                Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)
              );
              if (distance < 800) { // Increased distance for larger pattern
                return (
                  <motion.line
                    key={`line-${index}-${nextIndex}`}
                    x1={point.x}
                    y1={point.y}
                    x2={nextPoint.x}
                    y2={nextPoint.y}
                    stroke={particleColor}
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: [0, 0.3, 0.1],
                      transition: {
                        duration: 2,
                        delay: index * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  />
                );
              }
              return null;
            })
          ))}

          {/* Stars with enhanced animations */}
          {points.map((point, index) => (
            <motion.g key={index}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill={particleColor}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.5],
                  scale: [0, 1.2, 1],
                  transition: {
                    duration: 2,
                    delay: index * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="none"
                stroke={particleColor}
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.2, 0],
                  scale: [0, 1.5, 1],
                  transition: {
                    duration: 3,
                    delay: index * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            </motion.g>
          ))}
        </motion.svg>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[var(--text-primary)] text-lg mb-4 font-light max-w-2xl text-center"
        >
          {fact}
        </motion.p>
        
        <motion.div
          className="h-1 rounded-full max-w-2xl w-full overflow-hidden bg-current/20"
          style={{ color: particleColor }}
        >
          <motion.div
            className="h-full bg-current"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}