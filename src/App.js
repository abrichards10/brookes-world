import React from "react";
import { flushSync } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FeedbackForm from "./components/FeedbackForm";
import Layout from "./components/Layout";
import IntroSection from "./components/IntroSection";
import SelectedWork from "./components/SelectedWork";
import CareerSection from "./components/CareerSection";
import CarouselComponent from "./components/Carousel";
import WordCloud from "./components/WordCloud";
import Gallery from "./components/Gallery";
import CompaniesSection from "./components/CompaniesSection";
import Bookshelf from "./components/Bookshelf";
import WhereIveBeen from "./components/WhereIveBeen";
import Contact from "./components/Contact";
import ThanksMessage from "./components/ThanksMessage";
import Header from "./components/Header";
import SectionNav from "./components/SectionNav";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CommandPalette from "./components/CommandPalette";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Theme the document canvas (html/body/#root) so dark mode never flashes light.
  React.useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const toggleDarkMode = (e) => {
    const doFlip = () => setIsDarkMode((prev) => !prev);

    // Origin of the circular-wipe transition (the click point, else top-center)
    const root = document.documentElement;
    if (e && typeof e.clientX === "number" && e.clientX !== 0) {
      root.style.setProperty("--r-x", `${e.clientX}px`);
      root.style.setProperty("--r-y", `${e.clientY}px`);
    } else {
      root.style.setProperty("--r-x", "50%");
      root.style.setProperty("--r-y", "0px");
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduced) {
      // Direction: going to light expands OUT of the toggle; going to dark
      // collapses INTO it.
      root.dataset.themeTransition = isDarkMode ? "to-light" : "to-dark";
      const transition = document.startViewTransition(() => flushSync(doFlip));
      const cleanup = () => root.removeAttribute("data-theme-transition");
      // Swallow benign aborts (background tab, rapid re-toggle); clean up either way.
      transition.ready?.catch(() => {});
      if (transition.finished) transition.finished.then(cleanup, cleanup);
      else cleanup();
    } else {
      doFlip();
    }
  };

  return (
    <BrowserRouter basename="/brookes-world">
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <ScrollProgress />
        <CommandPalette toggleDarkMode={toggleDarkMode} />
      </div>
      <Routes>
        <Route path="/" element={<Layout isDarkMode={isDarkMode} />}>
          <Route
            index
            element={
              <>
                <TopBar>
                  <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
                  <SectionNav />
                </TopBar>
                <Home />
                <IntroSection />
                <SelectedWork />
                <CompaniesSection />
                <CareerSection />
                <div className="main-content">
                  <CarouselComponent />
                  <WordCloud />
                </div>
                <Bookshelf />
                <WhereIveBeen />
                <Gallery />
                <Contact />
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
