import { useState } from 'react';
import {
  motion,
  useReducedMotion,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';

const FACES = [
  { time: '5', label: 'دقائق', desc: 'استراحة سريعة' },
  { time: '15', label: 'دقيقة', desc: 'تركيز خفيف' },
  { time: '25', label: 'دقيقة', desc: 'جلسة بومودورو' },
  { time: '60', label: 'دقيقة', desc: 'عمل عميق' },
];

// Preserves original face rotation mapping
const FACE_ROTATIONS = [
  { rotateX: 0, rotateY: 0 },
  { rotateX: 0, rotateY: -90 },
  { rotateX: 0, rotateY: -180 },
  { rotateX: 0, rotateY: 90 },
];

export function FocusCube({ scrollProgress }) {
  const [activeFace, setActiveFace] = useState(2); // Starts at 25 min face
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Pointer position tracking for magnetic 3D hover tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth hover tilt values with spring physics
  const hoverTiltX = useSpring(mouseY, { stiffness: 150, damping: 15 });
  const hoverTiltY = useSpring(mouseX, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized offset from center (-0.5 to 0.5)
    const offsetX = (e.clientX - rect.left) / width - 0.5;
    const offsetY = (e.clientY - rect.top) / height - 0.5;

    // Map pointer distance to max 12 degrees tilt
    mouseX.set(offsetX * 24);
    mouseY.set(-offsetY * 24);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Raw scroll transform targets (tumbles continuously down past section)
  const rawScrollRotateX = useTransform(scrollProgress, [0, 1], [0, 360]);
  const rawScrollRotateY = useTransform(scrollProgress, [0, 1], [0, 540]);
  const scrollScale = useTransform(scrollProgress, [0, 0.8, 1], [1, 0.85, 0.7]);
  const scrollOpacity = useTransform(scrollProgress, [0, 0.75, 1], [1, 0.6, 0]);

  // Inertial spring layer over raw scroll transforms to give mass/weight
  const springConfig = { stiffness: 90, damping: 20, mass: 1.2 };
  const scrollRotateX = useSpring(rawScrollRotateX, springConfig);
  const scrollRotateY = useSpring(rawScrollRotateY, springConfig);

  const handleNextFace = () => {
    setActiveFace((prev) => (prev + 1) % FACES.length);
  };

  const currentRotation = FACE_ROTATIONS[activeFace];

  return (
    <div
      className="relative flex flex-col items-center justify-center p-8 select-none cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleNextFace}
    >
      {/* Container perspective wrapper */}
      <div className="relative w-64 h-64 [perspective:1200px]">
        {/* Pulsing ambient radial glow beneath the cube */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.6, 0.35],
              }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 bg-terra/20 blur-2xl rounded-full pointer-events-none"
        />

        {/* Outer continuous idle rotation & scale pulse wrapper */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                scale: [1, 1.015, 1],
                rotateZ: [-1.5, 1.5, -1.5],
              }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={
            prefersReducedMotion
              ? undefined
              : {
                scale: scrollScale,
                opacity: scrollOpacity,
              }
          }
          className="w-full h-full [transform-style:preserve-3d]"
        >
          {/* Main 3D Cube: Combines scroll tumbling, pointer hover tilt, and face selection flips */}
          <motion.div
            style={
              prefersReducedMotion
                ? undefined
                : {
                  rotateX: scrollRotateX,
                  rotateY: scrollRotateY,
                }
            }
            animate={{
              rotateX: currentRotation.rotateX,
              rotateY: currentRotation.rotateY,
              x: isHovered && !prefersReducedMotion ? hoverTiltY.get() : 0,
              y: isHovered && !prefersReducedMotion ? -hoverTiltX.get() : 0,
            }}
            whileTap={{ scale: 0.94 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              mass: 0.8,
            }}
            className="relative w-full h-full [transform-style:preserve-3d]"
          >
            {/* Front Face - 25 Min */}
            <div className="absolute inset-0 bg-cream border-2 border-terra/20 rounded-3xl flex flex-col items-center justify-center p-6 shadow-xl backdrop-blur-sm [backface-visibility:hidden] [transform:translateZ(128px)]">
              <span className="text-7xl font-extrabold text-terra tracking-tight">25</span>
              <span className="text-lg font-medium text-ink-gray mt-1">دقيقة</span>
              <span className="text-xs text-ink-light mt-3 bg-terra/10 px-3 py-1 rounded-full">جلسة بومودورو</span>
            </div>

            {/* Right Face - 15 Min */}
            <div className="absolute inset-0 bg-cream border-2 border-terra/20 rounded-3xl flex flex-col items-center justify-center p-6 shadow-xl backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(90deg)_translateZ(128px)]">
              <span className="text-7xl font-extrabold text-terra tracking-tight">15</span>
              <span className="text-lg font-medium text-ink-gray mt-1">دقيقة</span>
              <span className="text-xs text-ink-light mt-3 bg-terra/10 px-3 py-1 rounded-full">تركيز خفيف</span>
            </div>

            {/* Back Face - 60 Min */}
            <div className="absolute inset-0 bg-cream border-2 border-terra/20 rounded-3xl flex flex-col items-center justify-center p-6 shadow-xl backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(128px)]">
              <span className="text-7xl font-extrabold text-terra tracking-tight">60</span>
              <span className="text-lg font-medium text-ink-gray mt-1">دقيقة</span>
              <span className="text-xs text-ink-light mt-3 bg-terra/10 px-3 py-1 rounded-full">عمل عميق</span>
            </div>

            {/* Left Face - 5 Min */}
            <div className="absolute inset-0 bg-cream border-2 border-terra/20 rounded-3xl flex flex-col items-center justify-center p-6 shadow-xl backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(-90deg)_translateZ(128px)]">
              <span className="text-7xl font-extrabold text-terra tracking-tight">5</span>
              <span className="text-lg font-medium text-ink-gray mt-1">دقائق</span>
              <span className="text-xs text-ink-light mt-3 bg-terra/10 px-3 py-1 rounded-full">استراحة سريعة</span>
            </div>

            {/* Top Cap */}
            <div className="absolute inset-0 bg-cream/80 border-2 border-terra/20 rounded-3xl [transform:rotateX(90deg)_translateZ(128px)]" />

            {/* Bottom Cap */}
            <div className="absolute inset-0 bg-cream/80 border-2 border-terra/20 rounded-3xl [transform:rotateX(-90deg)_translateZ(128px)]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Tactile hint label under cube */}
      <motion.p
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        className="mt-6 text-xs text-ink-light font-medium tracking-wide"
      >
        اضغط لتدوير الساعة ↻
      </motion.p>
    </div>
  );
}