import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // ניקוי state של המשתמש
      navigate("/"); // אחרי התנתקות חוזרים לדף הבית
    } catch {
      alert("שגיאה בהתנתקות");
    }
  };

  return (
    <header className="bg-white shadow relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
        {/* לוגו */}
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <img src="/pngegg.png" alt="Logo" className="w-8 h-8 object-contain" />
          Meal Tracker
        </NavLink>

        {/* Desktop Menu */}
        <div dir="rtl" className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={navLinkClasses}>דף הבית</NavLink>
          <NavLink to="/add" className={navLinkClasses}>הוספת ארוחה</NavLink>
          <NavLink to="/meals" className={navLinkClasses}>ניהול</NavLink>
          <NavLink to="/profile" className={navLinkClasses}>פרופיל</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>צור קשר</NavLink>
          <NavLink to="/about" className={navLinkClasses}>אודות</NavLink>

          {/* כפתור התחברות/התנתקות */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              התנתקות
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClasses}>התחברות</NavLink>
          )}
        </div>

        {/* Hamburger Icon */}
        <div dir="rtl" className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div dir="rtl" className="md:hidden bg-white shadow-lg flex flex-col gap-2 px-4 py-2">
          <NavLink to="/" className={navLinkClasses} onClick={() => setMenuOpen(false)}>דף הבית</NavLink>
          <NavLink to="/add" className={navLinkClasses} onClick={() => setMenuOpen(false)}>הוספת ארוחה</NavLink>
          <NavLink to="/meals" className={navLinkClasses} onClick={() => setMenuOpen(false)}>ניהול</NavLink>
          <NavLink to="/profile" className={navLinkClasses} onClick={() => setMenuOpen(false)}>פרופיל</NavLink>
          <NavLink to="/contact" className={navLinkClasses} onClick={() => setMenuOpen(false)}>צור קשר</NavLink>
          <NavLink to="/about" className={navLinkClasses} onClick={() => setMenuOpen(false)}>אודות</NavLink>

          {user ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
            >
              התנתקות
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClasses} onClick={() => setMenuOpen(false)}>התחברות</NavLink>
          )}
        </div>
      )}
    </header>
  );
}
