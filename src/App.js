import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Venues from "./pages/Venues"; 
import Process from "./pages/Process";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/process" element={<Process />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
