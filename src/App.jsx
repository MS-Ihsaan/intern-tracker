import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-gray-900 text-white px-4 py-3 flex gap-6">
        <Link to="/" className="font-semibold">InternTrack</Link>
        <Link to="/">Browse</Link>
        <Link to="/tracker">My Applications</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </BrowserRouter>
  );
}