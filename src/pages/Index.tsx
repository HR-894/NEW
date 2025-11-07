import { useEffect, useRef } from 'react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Timeline } from '@/components/Timeline';
import { Types } from '@/components/Types';
import { Contact } from '@/components/Contact';
import { ThemeToggle } from '@/components/ThemeToggle';
import gsap from 'gsap'; // <-- 1. GSAP IMPORT

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const mainRef = useRef<HTMLElement>(null); // <-- 2. MAIN REF
  
  // <-- 3. OPTIMIZED STATE REFS -->
  const isBouncingBack = useRef(false); // Track karta hai ki "bounce back" animation chal rahi hai ya nahi
  const scaleDownTween = useRef<gsap.core.Tween | null>(null); // Track karta hai "scale down" animation ko

  useEffect(() => {
    // ... (Ye code same rahega)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    // ... (Yahaan tak same)

    return () => observer.disconnect();
  }, []);

  // <-- 4. OPTIMIZED BOUNCE EFFECT -->
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    let scrollEndTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Agar page pehle se hi bounce back kar raha hai, toh naya scroll mat hone do
      if (isBouncingBack.current) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      const atTop = scrollTop === 0;
      // Bottom check ke liye thoda buffer rakha hai
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2;

      // e.deltaY < 0 matlab UP scroll
      // e.deltaY > 0 matlab DOWN scroll
      const isOverscrollingTop = atTop && e.deltaY < 0;
      const isOverscrollingBottom = atBottom && e.deltaY > 0;

      // Agar Top ya Bottom par overscroll ho raha hai...
      if (isOverscrollingTop || isOverscrollingBottom) {
        e.preventDefault(); // Sabse pehle, browser ka default scroll roko

        // Dynamic Transform Origin set karo
        gsap.set(mainEl, { 
          transformOrigin: isOverscrollingTop ? 'center top' : 'center bottom' 
        });

        // "Scroll End" ka timer reset karo
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          isBouncingBack.current = true; // Bounce back animation ko lock karo
          scaleDownTween.current?.kill(); // "Scale down" animation ko roko (agar chal rahi hai)
          
          // Asli Bounce Back animation
          gsap.to(mainEl, { 
            scale: 1, 
            duration: 0.8, 
            ease: "elastic.out(1, 0.5)", // Ye hai Apple/Samsung waala feel
            onComplete: () => {
              isBouncingBack.current = false; // Animation lock kholo
            }
          });
        }, 150); // 150ms tak koi scroll nahi hua, matlab user ruk gaya

        // YEH HAI OPTIMIZATION:
        // "Scale down" animation tabhi chalao jab woh pehle se nahi chal rahi ho
        if (!scaleDownTween.current || !scaleDownTween.current.isActive()) {
          scaleDownTween.current = gsap.to(mainEl, { 
            scale: 0.98, // Thoda "squish" karo
            duration: 0.3, // Turant
            ease: "power1.out" 
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      // Cleanup
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollEndTimer);
      gsap.killTweensOf(mainEl); // Saare animations cancel karo
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navigation />
      <ThemeToggle />
      
      {/* <-- 5. Main ref ko yahaan lagao (bina style ke) --> */}
      <main ref={mainRef}>
        <div ref={(el) => el && (sectionsRef.current[0] = el)} className="section-transition">
          <Hero />
        </div>
        <div ref={(el) => el && (sectionsRef.current[1] = el)} className="section-transition">
          <About />
        </div>
        <div ref={(el) => el && (sectionsRef.current[2] = el)} className="section-transition">
          <Portfolio />
        </div>
        <div ref={(el) => el && (sectionsRef.current[3] = el)} className="section-transition">
          <Timeline />
        </div>
        <div ref={(el) => el && (sectionsRef.current[4] = el)} className="section-transition">
          <Types />
        </div>
        <div ref={(el) => el && (sectionsRef.current[5] = el)} className="section-transition">
          <Contact />
        </div>
      </main>
      
      <footer className="relative z-10 border-t border-border glass-effect">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HIMANSHU RAJ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;