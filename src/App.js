import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FeedbackForm from "./components/FeedbackForm";
import Layout from "./components/Layout";
import IntroSection from "./components/IntroSection";
import CareerSection from "./components/CareerSection";
import CarouselComponent from "./components/Carousel";
import WordCloud from "./components/WordCloud";
import Gallery from "./components/Gallery";
import CompaniesSection from "./components/CompaniesSection";
import ThanksMessage from "./components/ThanksMessage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [backgroundColor, setBgColor] = React.useState("var(--light-bg)");
  const [showClouds, setShowClouds] = React.useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setShowClouds(false); // Reset clouds on dark mode change
    setBgColor(newMode ? "var(--dark-start-bg)" : "var(--light-bg)");
  };

  React.useEffect(() => {
    const interpolateColor = (color1, color2, percent) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * percent);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * percent);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * percent);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToRgb = (hex) => {
      let r = 0,
        g = 0,
        b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      return { r, g, b };
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollPosition / scrollMax, 1); // Get percentage scrolled

      if (isDarkMode) {
        // Interpolate between dark-start-bg and dark-bg
        const darkStartColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--dark-start-bg");
        const darkEndColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--dark-bg");
        const interpolatedColor = interpolateColor(
          darkStartColor,
          darkEndColor,
          scrollPercent
        );
        setBgColor(interpolatedColor);
      } else {
        // Interpolate between light-bg and blue
        const lightStartColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--light-bg");
        const lightEndColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--blue");
        const interpolatedColor = interpolateColor(
          lightStartColor,
          lightEndColor,
          scrollPercent
        );
        setBgColor(interpolatedColor);
        setShowClouds(scrollPercent > 0.5); // Show clouds on scroll down
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDarkMode]);

  return (
    <BrowserRouter basename="/brookes-world">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
              backgroundColor={backgroundColor}
              showClouds={showClouds}
            />
          }
        >
          <Route
            index
            element={
              <>
                <Header
                  toggleDarkMode={toggleDarkMode}
                  isDarkMode={isDarkMode}
                />
                <Home />
                <IntroSection />
                <CareerSection />
                <div className="main-content">
                  <CarouselComponent />
                  <WordCloud />
                </div>
                <Gallery />
                <CompaniesSection />
                <ThanksMessage />
                {/* Add the Feedback component here */}
                <Footer />
                <ScrollToTopButton />
              </>
            }
          />
          <Route path="feedback" element={<FeedbackForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
