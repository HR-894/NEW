import { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  // Store last position
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update last position immediately
      lastPos.current = { x: clientX, y: clientY };
      
      // Main cursor tracks instantly
      cursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
    };
    
    // Trail follows with a delay using CSS transition
    const followTrail = () => {
      if (trail) {
        trail.style.transform = `translate(${lastPos.current.x}px, ${lastPos.current.y}px)`;
      }
      requestAnimationFrame(followTrail);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    followTrail(); // Start the trail animation loop

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail Effect (simplified) */}
      <div
        ref={trailRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.3), transparent)`,
          filter: 'blur(8px)',
          willChange: 'transform',
          transition: `transform 80ms ease-out`, // Smooth CSS transition
        }}
      />
      
      {/* Main Cursor (Bright & Visible) */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'hsl(var(--foreground))',
          boxShadow: '0 0 10px hsl(var(--foreground)), 0 0 20px hsl(var(--foreground))',
          willChange: 'transform',
        }}
      />
    </>
  );
};