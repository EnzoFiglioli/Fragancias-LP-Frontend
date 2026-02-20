import { AnimatePresence } from "framer-motion";
import RouterContent from "./context/RotuerContext";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch("https://api-server-malipi.onrender.com/api/health")
      .catch(() => {});
  }, []);  
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <RouterContent />
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
