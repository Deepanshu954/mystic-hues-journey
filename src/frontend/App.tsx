
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Home from './pages/Home';
import Culture from './pages/Culture';
import CultureDetail from './pages/CultureDetail';
import States from './pages/States';
import StateDetails from './pages/StateDetails';
import Login from './pages/Login';
import Food from './pages/Food';
import Festivals from './pages/Festivals';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/ThemeProvider';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  // Preload critical assets
  useEffect(() => {
    // Add any critical assets here that should be preloaded
    const preloadAssets = async () => {
      try {
        // Preload important images
        const criticalImages = [
          '/lovable-uploads/abstract-light.jpg',
          '/lovable-uploads/abstract-dark.jpg',
          '/om.svg'
        ];
        
        criticalImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      } catch (error) {
        console.error('Error preloading assets:', error);
      }
    };
    
    preloadAssets();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden">
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/culture" element={<PageTransition><Culture /></PageTransition>} />
              <Route path="/culture/:id/:state" element={<PageTransition><CultureDetail /></PageTransition>} />
              <Route path="/states" element={<PageTransition><States /></PageTransition>} />
              <Route path="/states/:state" element={<PageTransition><StateDetails /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/food" element={<PageTransition><Food /></PageTransition>} />
              <Route path="/festivals" element={<PageTransition><Festivals /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
