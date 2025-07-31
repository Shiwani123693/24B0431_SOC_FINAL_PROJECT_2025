import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { About, Contact, Home, Project } from "./pages"; // assumes these are exported from ./pages/index.js
import Navbar from "./component/navbar";

export default function App() {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  );
}
