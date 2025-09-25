import { FaHeart, FaAppleAlt } from "react-icons/fa"

export default function About() {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6"
    >
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* תוכן כרטיס */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">אודות הפרויקט</h2>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          פרויקט <span className="font-semibold text-indigo-600">Meal Tracker</span> נבנה כדי לעזור
          לאנשים לעקוב אחרי הארוחות שלהם, לחשב קלוריות וחלבון, ולשמור על אורח חיים בריא ומאוזן. כאן אפשר
          להוסיף מאכלים, ליצור ארוחות, ולראות סיכומים יומיים בצורה פשוטה ונוחה.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          הכלי הזה פותח כפרויקט אישי\לימודי בטכנולוגיות{" "}
          <span className="font-semibold">React</span> ו-{" "}
          <span className="font-semibold">Tailwind CSS</span>. המטרה הייתה לשלב פיתוח פרקטי עם נושא חשוב –
          תזונה ובריאות.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          בעתיד ניתן להרחיב את המערכת עם פיצ'רים נוספים כמו מעקב אחרי שתייה, הוספת מטרות אישיות וגרפים
          מתקדמים.
        </p>

        <p className="text-gray-600 italic ">
          תודה שנכנסת! מקווה שתמצא/י את הכלי מועיל במסע שלך לאורח
          חיים בריא יותר
        </p>
      </section>
    </div>
  )
}
