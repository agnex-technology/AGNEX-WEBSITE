import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'view' | 'cta'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on fine-pointer devices (desktop mouse), never on touch
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');
      if (interactive) {
        const customType = interactive.getAttribute('data-cursor');
        if (customType === 'view') {
          setCursorState('view');
        } else if (customType === 'cta') {
          setCursorState('cta');
        } else {
          setCursorState('hover');
        }
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  const size = cursorState === 'hover' ? 24 : cursorState === 'view' ? 48 : cursorState === 'cta' ? 32 : 10;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: cursorState === 'view' ? 'var(--agnex-navy)' : cursorState === 'cta' ? 'var(--agnex-blue)' : 'var(--agnex-blue)',
        opacity: cursorState === 'hover' ? 0.4 : cursorState === 'view' ? 0.9 : 0.85,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: '9px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        mixBlendMode: cursorState === 'default' ? 'multiply' : 'normal'
      }}
    >
      {cursorState === 'view' && <span>VIEW</span>}
    </div>
  );
};
