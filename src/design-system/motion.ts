export const motion = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.8,
    cinematic: 1.2
  },
  easing: {
    // Standard fast/snappy easing
    base: [0.16, 1, 0.3, 1],
    // Buttery smooth easing for reveals
    reveal: [0.65, 0, 0.35, 1],
    // Cinematic slow ramp-up, smooth land
    cinematic: [0.25, 1, 0.5, 1]
  },
  spring: {
    stiff: { type: 'spring', stiffness: 200, damping: 20, mass: 0.1 },
    bouncy: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
    cinematic: { type: 'spring', stiffness: 50, damping: 20, mass: 1 }
  }
};
