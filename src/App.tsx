
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Culture from './pages/Culture';
import States from './pages/States';
import StateDetails from './pages/StateDetails';
import Login from './pages/Login';
import Food from './pages/Food';
import Festivals from './pages/Festivals';
import Navbar from './components/Navbar';
import AbstractBackground from './components/AbstractBackground';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <AbstractBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/culture" element={<PageTransition><Culture /></PageTransition>} />
          <Route path="/states" element={<PageTransition><States /></PageTransition>} />
          <Route path="/states/:state" element={<PageTransition><StateDetails /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/food" element={<PageTransition><Food /></PageTransition>} />
          <Route path="/festivals" element={<PageTransition><Festivals /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
