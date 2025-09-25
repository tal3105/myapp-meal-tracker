import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function ManageFood() {
  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem("mealHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // שמירה נכונה של השינויים ב-mealHistory
  useEffect(() => {
    localStorage.setItem("mealHistory", JSON.stringify(foods));
  }, [foods]);

  const handleDelete = (id) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div dir="rtl" className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">ניהול מאכלים שמורים</h2>
      {foods.length === 0 && <p>אין מאכלים שמורים עדיין.</p>}
      <div className="space-y-3">
        {foods.map((food) => (
          <div
            key={food.id}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
          >
            <span>
              {food.name} ({food.calories} קלוריות, {food.protein} גרם חלבון)
            </span>
            <button
              onClick={() => handleDelete(food.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
