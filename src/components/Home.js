import React from "react";
import { motion } from "framer-motion";
import "./App.css";

const Home = () => {
  return (
    <div className="FirstText">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="BrookesWorld">Brooke's World</div>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <i>"Commitment is an act, not a word."</i>
        <br />
        <span style={{ fontSize: '0.9em', opacity: 0.7 }}>– Jean-Paul Sartre</span>
      </motion.h2>
      <motion.h5
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        Full Stack Developer · Educator · Builder
      </motion.h5>
    </div>
  );
};

export default Home;
