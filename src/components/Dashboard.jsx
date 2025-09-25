import { Link } from "react-router-dom";

export default function Dashboard({ meals, user }) {
  // חישוב סיכומים
  const totalCalories = meals.reduce((sum, meal) => 
    sum + meal.items.reduce((s, f) => s + f.calories * f.quantity, 0),
   0
  );
  const totalProtein = meals.reduce((sum, meal) =>
     sum + meal.items.reduce((s, f) => s + f.protein * f.quantity, 0),
    0
  );

  // מציגים עד 3 הארוחות האחרונות
  const recentMeals = meals.slice(-3).reverse();

  const dailyGoal = user?.dailyGoal;
  const progress = Math.min((totalCalories / dailyGoal) * 100, 100);

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">מעקב יומי</h2>

      {/* סיכומים */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">סה"כ קלוריות</h3>
          <p className="text-2xl font-bold text-indigo-600">{totalCalories}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">סה"כ חלבון</h3>
          <p className="text-2xl font-bold text-indigo-600">{totalProtein.toFixed(2)} גרם </p>
        </div>
      </div>

      {/*progressBar*/}
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="font-semibold text-xl">ההתקדמות שלך היום:</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4 mb-4">
          <div
             className="h-4 rounded-full transition-all"
             style={{
             width: `${progress}%`,
             background: "linear-gradient(90deg, #4f46e5, #a78bfa, #ec4899)", 
            }}
          ></div>
          <p className="mt-2">{dailyGoal} / {totalCalories} קלוריות</p>
        </div>
      </div>

      {/* ארוחות אחרונות */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">ארוחות אחרונות</h3>
        {recentMeals.length > 0 ? (
          <ul className="space-y-3">
            {recentMeals.map(m => (
              <li
                key={m.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div>
                  <span className="font-medium">{m.items.map(f => f.name).join(", ")}</span>
                  <p className="text-sm text-gray-500">
                    {m.items.reduce((sum, f) => sum + f.calories * f.quantity, 0)} קלוריות |{" "} 
                    {m.items.reduce((sum, f) => sum + f.protein * f.quantity, 0).toFixed(2)} גרם חלבון
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">אין ארוחות עדיין</p>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/add"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            הוספת ארוחה
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
}
