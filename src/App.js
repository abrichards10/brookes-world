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
  const [backgroundColor, setBgColor] = React.useState("#E8E6E1");
  const [scrollPercent, setScrollPercent] = React.useState(0);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setBgColor(newMode ? "#18181B" : "#E8E6E1");
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
      const percent = Math.min(scrollPosition / scrollMax, 1);
      setScrollPercent(percent);

      // Only update background color if not in manual dark/light mode
      // When toggled, the background stays fixed
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter basename="/brookes-world">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isDarkMode={isDarkMode}
              backgroundColor={backgroundColor}
              scrollPercent={scrollPercent}
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
