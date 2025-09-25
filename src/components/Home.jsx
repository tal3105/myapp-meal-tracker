import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* רקע דינמי / צורות */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* תוכן מרכזי */}
      <div className="z-10 text-center px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-indigo-700 mb-4">
          Meal Tracker
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          אפליקציה פשוטה לניהול הארוחות שלך, מעקב קלוריות והתקדמות אישית
        </p>

        {/* כפתורי ניווט */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1"
          >
            התחברות
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-xl bg-white text-indigo-600 border border-indigo-300 font-semibold shadow-lg hover:bg-indigo-50 transition transform hover:-translate-y-1"
          >
            הרשמה
          </button>
        </div>

        {/* תכונות */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "ניהול יומי", desc: "הוסף ונהל ארוחות בקלות לפי סדר היום שלך" },
            { title: "מעקב קלוריות", desc: "ראה כמה אכלת היום וכמה עוד נשאר לך" },
            { title: "מטרות אישיות", desc: "קבע יעדים והתקדם לעבר אורח חיים בריא" },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
