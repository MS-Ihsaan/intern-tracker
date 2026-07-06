import { BrowserRouter, NavLink, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";

const navLinkClasses = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-white/15 text-white"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

export default function App() {
  return (
    <BrowserRouter>
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-lg font-semibold tracking-tight text-white">
            InternTrack
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/" className={navLinkClasses}>
              Browse
            </NavLink>
            <NavLink to="/tracker" className={navLinkClasses}>
              My Applications
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracker" element={<Tracker />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}