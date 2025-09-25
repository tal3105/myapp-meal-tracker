import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile"); // אחרי login נשלח ל-profile
    } catch {
      alert("האימייל או הסיסמא שגויים");
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    // כאן אפשר לבדוק את פרטי המשתמש מול DB או state
    console.log({ email, password });
    navigate("/"); // חוזרים ל-Dashboard לאחר Login
  };*/

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">התחברות</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block mb-1 font-medium">אימייל</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">סיסמא</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          התחברות
        </button>

        <p className="text-sm text-gray-500 mt-2 text-center">
          אין לך משתמש?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            לחץ להרשמה
          </Link>
        </p>
      </form>
    </section>
    </div>
  );
}
