import React, { useEffect, useRef, useState } from "react";
import "./App.css";

/*
  Fixed top bar (Header + SectionNav) with scroll-reveal: hides when you scroll
  down (more room to read) and slides back the instant you scroll up. Always
  visible near the very top. Uses position: fixed (immune to ancestor overflow),
  with a measured spacer so the hero doesn't jump underneath.
*/
const TopBar = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  const [barHeight, setBarHeight] = useState(0);
  const barRef = useRef(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // Keep the spacer the same height as the fixed bar
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const measure = () => setBarHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    lastY.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 96) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY.current = y;
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={barRef} className={`topbar ${hidden ? "topbar--hidden" : ""}`}>
        {children}
      </div>
      <div
        className="topbar-spacer"
        style={{ height: barHeight }}
        aria-hidden="true"
      />
    </>
  );
};

export default TopBar;
