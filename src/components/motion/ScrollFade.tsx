import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
}

const ScrollFade: React.FC<ScrollFadeProps> = ({ 
  children, 
  className = '', 
  yOffset = 50, 
  duration = 0.8,
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actualYOffset = prefersReducedMotion ? 0 : yOffset;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { 
          y: actualYOffset,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, elementRef);

    return () => {
      ctx.revert();
    };
  }, [yOffset, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollFade;
