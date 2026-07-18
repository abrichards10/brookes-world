import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SECTIONS, scrollToSection } from "./sections";
import "./App.css";

const isTyping = () => {
  const el = document.activeElement;
  return (
    el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable)
  );
};

const CommandPalette = ({ toggleDarkMode }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = useMemo(() => {
    const go = SECTIONS.map((s) => ({
      id: `go-${s.id}`,
      label: `Go to ${s.label}`,
      hint: "Section",
      icon: "→",
      run: () => scrollToSection(s.id),
    }));
    const actions = [
      {
        id: "theme",
        label: "Toggle light / dark",
        hint: "Theme",
        icon: "◐",
        run: () => toggleDarkMode(),
      },
      {
        id: "feedback",
        label: "Leave feedback",
        hint: "Action",
        icon: "✷",
        run: () => navigate("/feedback"),
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "Link",
        icon: "↗",
        run: () =>
          window.open("https://github.com/abrichards10", "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "Link",
        icon: "↗",
        run: () =>
          window.open(
            "https://www.linkedin.com/in/brooke-richards-swe/",
            "_blank",
            "noopener"
          ),
      },
      {
        id: "email",
        label: "Email Brooke",
        hint: "Link",
        icon: "✉",
        run: () => window.open("mailto:angelarichards261@gmail.com"),
      },
    ];
    return [...go, ...actions];
  }, [toggleDarkMode, navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Global hotkeys: ⌘K / Ctrl+K to toggle, "/" to open, plus a custom event
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !open && !isTyping()) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk-open", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk-open", onOpenEvent);
    };
  }, [open]);

  // Reset + focus on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Keep the highlighted row in range as the list shrinks
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const runCommand = (cmd) => {
    setOpen(false);
    setTimeout(() => cmd.run(), 0); // let the overlay close before scrolling/navigating
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) runCommand(filtered[active]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="cmdk-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="Jump to a section or action…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          aria-label="Command palette search"
        />
        <ul className="cmdk-list">
          {filtered.length === 0 && (
            <li className="cmdk-empty">No matches</li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.id}>
              <button
                className={`cmdk-item ${i === active ? "is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => runCommand(cmd)}
              >
                <span className="cmdk-icon" aria-hidden="true">
                  {cmd.icon}
                </span>
                <span className="cmdk-label">{cmd.label}</span>
                <span className="cmdk-hint">{cmd.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="cmdk-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
