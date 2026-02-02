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

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setBgColor(newMode ? "#18181B" : "#E8E6E1");
  };

  return (
    <BrowserRouter basename="/brookes-world">
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              isDarkMode={isDarkMode}
              backgroundColor={backgroundColor}
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
