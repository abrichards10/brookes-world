import React, { useEffect, useRef, useState } from "react";
import wallaceAndGromit from "./assets/Wallace_and_Gromit.png";
import "./App.css";

/*
  The night-sky moon. Poke it and Wallace & Gromit peek up from behind
  before ducking back down.
*/
const Moon = () => {
  const [peeking, setPeeking] = useState(false);
  const timer = useRef(null);

  const poke = () => {
    if (peeking) return;
    setPeeking(true);
    timer.current = setTimeout(() => setPeeking(false), 2000);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <>
      {/* moon + peekers — decorative, sits in the sky behind the content */}
      <div className="moon-scene" aria-hidden="true">
        <div className={`moon-peek ${peeking ? "is-up" : ""}`}>
          <img className="moon-peek-img" src={wallaceAndGromit} alt="" />
        </div>
        <div className="moon-orb" />
      </div>
      {/* transparent hit-target above the content so the moon stays clickable */}
      <button
        className="moon-hit"
        onClick={poke}
        aria-label="Poke the moon"
        title="Poke the moon…"
      />
    </>
  );
};

export default Moon;
