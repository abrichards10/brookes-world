import React, { useEffect, useState } from "react";
import { SECTIONS, scrollToSection } from "./sections";
import "./App.css";

const SectionNav = () => {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const sections = SECTIONS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setActive(id);
  };

  return (
    <nav className="section-nav" aria-label="Section navigation">
      <div className="section-nav-inner">
        {SECTIONS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`section-nav-link ${active === link.id ? "is-active" : ""}`}
            onClick={(e) => handleClick(e, link.id)}
            aria-current={active === link.id ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="cmdk-hint-chip"
          onClick={() => window.dispatchEvent(new Event("cmdk-open"))}
          aria-label="Open command palette"
          title="Command palette (⌘K)"
        >
          <kbd>⌘K</kbd>
        </button>
      </div>
    </nav>
  );
};

export default SectionNav;
