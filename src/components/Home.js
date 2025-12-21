import React from "react";
import { motion } from "framer-motion";
import "./App.css"; // Make sure this CSS file includes the required styles

const Home = () => {
  return (
    <div className="FirstText">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="BrookesWorld">Brookes' World</div>
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <br />
        <i> "Commitment is an act, not a word." – Jean-Paul Sartre </i>
      </motion.h2>
      <motion.h5
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4 }}
      >
        <br />I am a teacher, mentor, and software engineer!
      </motion.h5>
      {/* Add more content here */}
    </div>
  );
};

export default Home;
