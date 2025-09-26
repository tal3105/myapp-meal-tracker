
import { FaTrash, FaEdit } from "react-icons/fa";

export default function MealsPage({ meals, onDelete }) {

    return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">דף ארוחות</h2>

            {meals.length === 0 ? (
                <p className="text-gray-500 text-center">לא קיימות ארוחות</p>
            ) : (
                <div className="space-y-4">
                    {meals.map((meal, index) => {
                        // חישוב סה"כ קלוריות וחלבון לכל ארוחה
                        const totalCalories = meal.items.reduce(
                            (sum, f) => sum + f.calories * f.quantity,
                            0
                        );
                        const totalProtein = meal.items.reduce(
                            (sum, f) => sum + f.protein * f.quantity,
                            0
                        );

                        return (
                            <div key={meal.id} className="bg-white shadow rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-lg">ארוחה #{index + 1}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onDelete(meal.id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="מחק"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>

                                <div dir="rtl" className="space-y-1 mb-2">
                                    {meal.items.map((f, idx) => (
                                        <p key={idx} className="text-gray-700">
                                            {/*{f.name} x{f.quantity} - {f.calories * f.quantity} קלוריות | {f.protein * f.quantity} גרם חלבון */}
                                            {f.name} {f.quantity}x
                                        </p>
                                    ))}
                                </div>

                                <p className="font-semibold text-gray-800">
                                    סך הכל: {totalCalories} קלוריות | {totalProtein} גרם חלבון
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
        </div>
    );
}
