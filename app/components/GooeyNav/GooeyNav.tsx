"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import "./GooeyNav.css";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface GooeyNavProps {
  items: NavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  r: number;
  alpha: number;
  color: number;
  speed: [number, number];
  life: number;
  maxLife: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const noiseRef = useRef<number>(0);

  const getColorVar = useCallback((num: number): string => {
    const colorMap: { [key: number]: string } = {
      1: "#4f46e5", // indigo-600
      2: "#6366f1", // indigo-500
      3: "#818cf8", // indigo-400
      4: "#4338ca", // indigo-700
    };
    return colorMap[num] || "#4f46e5";
  }, []);

  const updateIndicator = useCallback((index: number) => {
    if (!navRef.current || !indicatorRef.current) return;
    const li = itemRefs.current[index];
    if (!li) return;

    const navRect = navRef.current.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();

    const left = liRect.left - navRect.left;
    const width = liRect.width;

    indicatorRef.current.style.left = `${left}px`;
    indicatorRef.current.style.width = `${width}px`;
    indicatorRef.current.style.opacity = "1";
  }, []);

  useEffect(() => {
    // Small delay to let DOM render
    const timer = setTimeout(() => {
      updateIndicator(activeIndex);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeIndex, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(activeIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, updateIndicator]);

  const spawnParticles = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (!navRef.current || !itemRefs.current[fromIndex]) return;

      const fromLi = itemRefs.current[fromIndex];
      const toLi = itemRefs.current[toIndex];
      if (!fromLi || !toLi) return;

      const navRect = navRef.current.getBoundingClientRect();
      const fromRect = fromLi.getBoundingClientRect();
      const toRect = toLi.getBoundingClientRect();

      const startX = fromRect.left - navRect.left + fromRect.width / 2;
      const endX = toRect.left - navRect.left + toRect.width / 2;
      const midY = fromRect.height / 2;

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        (_, i) => {
          const t = Math.random();
          const x = startX + (endX - startX) * t;
          const dist =
            particleDistances[0] +
            Math.random() * (particleDistances[1] - particleDistances[0]);
          const angle = Math.random() * Math.PI * 2;
          return {
            id: Date.now() + i,
            x: x + Math.cos(angle) * dist * 0.3,
            y:
              midY +
              Math.sin(angle) * dist * 0.3 +
              (Math.random() - 0.5) * 20,
            r: particleR * (0.5 + Math.random() * 0.5),
            alpha: 1,
            color: colors[i % colors.length],
            speed: [
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 2,
            ] as [number, number],
            life: 0,
            maxLife: animationTime + Math.random() * timeVariance,
          };
        }
      );

      setParticles((prev) => [...prev, ...newParticles]);

      const animate = () => {
        setParticles((prev) => {
          const updated = prev
            .map((p) => ({
              ...p,
              x: p.x + p.speed[0],
              y: p.y + p.speed[1],
              life: p.life + 16,
              alpha: Math.max(0, 1 - p.life / p.maxLife),
              r: p.r * 0.98,
            }))
            .filter((p) => p.alpha > 0.01);
          return updated;
        });
        if (animIdRef.current !== null) {
          animIdRef.current = requestAnimationFrame(animate);
        }
      };

      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
      }
      animIdRef.current = requestAnimationFrame(animate);
    },
    [
      particleCount,
      particleDistances,
      particleR,
      colors,
      animationTime,
      timeVariance,
    ]
  );

  const handleClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      spawnParticles(activeIndex, index);
      setActiveIndex(index);
      items[index]?.onClick?.();
    },
    [activeIndex, items, spawnParticles]
  );

  return (
    <div ref={containerRef} className="gooey-nav-container">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="8"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <ul ref={navRef} className="gooey-nav-list">
        {/* Sliding indicator */}
        <div ref={indicatorRef} className="gooey-nav-indicator" />

        {/* Particles canvas overlay */}
        {particles.length > 0 && (
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 1,
            }}
          >
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.r * 0.15}
                fill={getColorVar(p.color)}
                opacity={p.alpha * 0.6}
              />
            ))}
          </svg>
        )}

        {items.map((item, index) => (
          <li
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`gooey-nav-item${activeIndex === index ? " active" : ""}`}
          >
            <button
              type="button"
              onClick={() => handleClick(index)}
              aria-current={activeIndex === index ? "page" : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GooeyNav;
