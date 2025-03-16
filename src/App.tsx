
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

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <AbstractBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/states" element={<States />} />
          <Route path="/states/:state" element={<StateDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/food" element={<Food />} />
          <Route path="/festivals" element={<Festivals />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
