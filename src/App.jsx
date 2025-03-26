import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import './App.css'

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
