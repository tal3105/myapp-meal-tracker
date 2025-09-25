import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import Papa from "papaparse";

export default function AddMeal({ onAddMeal }) {
  const navigate = useNavigate();

  const defaultFoods = [
    { id: 1, name: "תפוח", calories: 52, protein: 0.3 },
    { id: 2, name: "בננה", calories: 89, protein: 1.1 },
    { id: 3, name: "חזה עוף", calories: 165, protein: 31 },
  ];

  const [foods, setFoods] = useState(() => {
    const saved = localStorage.getItem("foods");
    const parsed = saved ? JSON.parse(saved) : [];
    const merged = [...defaultFoods];
    parsed.forEach((f) => {
      if (!merged.some((d) => d.id === f.id)) merged.push(f);
    });
    return merged;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [chosenFood, setChosenFood] = useState([]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("mealHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  

  // --- Load CSV ---
  useEffect(() => {
    fetch("/data/foods_israel.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const csvFoods = results.data
              .map((f, idx) => {
                const name = f["shmmitzrach"]?.trim() || f["shmmitzrach"]?.trim();
                const calories = Number(f["food_energy"] || 0);
                const protein = Number(f["protein"] || 0);
                return { id: Date.now() + idx, name, calories, protein };
              })
              .filter((f) => f.name);
            setFoods(csvFoods);
          },
        });
      })
      .catch((err) => console.error("CSV load error:", err));
  }, []);

  // שמירה ב־localStorage
  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem("mealHistory", JSON.stringify(history));
  }, [history]);

  // חיפוש
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    const results = foods.filter((f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setSearchResults(results);
    setLoading(false);
  };

  const handleAdd = (food) => {
    if (!food || quantity <= 0) return;

    setChosenFood((prev) => [...prev, { ...food, quantity }]);

    // מוסיפים רק אם לא קיימים ב-history
    setHistory((prev) => {
      if (prev.some((f) => f.id === food.id)) return prev;
      return [...prev, food];
    });

    setSelectedFoodId("");
    setQuantity(1);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleDeleteFromMeal = (index) => {
    setChosenFood((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveMeal = () => {
  if (chosenFood.length === 0) return;
  const newMeal = {
    id: Date.now(),
    items: chosenFood
  };
  onAddMeal(newMeal); // שולח את הארוחה כולה
  setChosenFood([]);
  alert("הארוחה נוספה בהצלחה!");
  // navigate("/meals");
};

  const totalCalories = chosenFood.reduce(
    (sum, f) => sum + f.calories * f.quantity,
    0
  );
  const totalProtein = chosenFood.reduce(
    (sum, f) => sum + f.protein * f.quantity,
    0
  );

  const totalProteinRounded = totalProtein.toFixed(2);

  // --- Dropdown foods = default + history ---
  const uniqueHistory = history.filter(
  (food, index, self) => 
    index === self.findIndex((f) => f.name === food.name)
);

const dropdownFoods = [
  ...defaultFoods,
  ...uniqueHistory.filter(
    (h) => !defaultFoods.some((d) => d.name === h.name))
];

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <div className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">הוספת ארוחה</h2>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="הקלד פריט מזון..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <FaSearch /> חיפוש
          </button>
        </div>

        {loading && <p className="text-gray-500 mb-2">טוען תוצאות...</p>}

        {/* Search Results */}
        {searchResults.map((food) => (
          <div key={food.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2">
            <span>{food.name} ({food.calories} קלוריות, {food.protein.toFixed(2)} גרם חלבון)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => handleAdd(food)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ))}

        {/* Dropdown from default + history */}
        <div className="flex flex-col md:flex-row items-center gap-2 my-4">
          <select
            value={selectedFoodId}
            onChange={(e) => setSelectedFoodId(e.target.value)}
            className="flex border rounded-lg px-3 py-2"
          >
            <option value="">בחירה ממאכלים שמורים</option>
            {dropdownFoods.map((food) => (
              <option key={food.id} value={food.id}>
                {food.name} 
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
          <button 
             onClick={() => {
                const food = dropdownFoods.find(f => f.id.toString() === selectedFoodId);
                if (food) handleAdd(food);
             }}
             className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
          >
             <FaPlus />
          </button>
        </div>

        {/* Chosen foods */}
        <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
          {chosenFood.length === 0 && <p className="text-gray-500">לא נבחר עדיין.</p>}
          {chosenFood.map((food, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <span>{food.name} {food.quantity}x  </span>
              <span>{food.calories * food.quantity} קלוריות | {food.protein * food.quantity} גרם חלבון</span>
              <button
                type="button"
                onClick={() => handleDeleteFromMeal(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mt-2">סה"כ: {totalCalories} קלוריות | {totalProteinRounded} גרם חלבון</h3>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={handleSaveMeal}
          >
            שמור ארוחה
          </button>
          <button
            type="button"
            className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            onClick={() => navigate("/meals")}
          >
            לך לדף ארוחות
          </button>
          <button
            type="button"
            className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
            onClick={() => navigate("/manage-food")}
          >
            ניהול מאכלים שמורים
          </button>
        </div>
      </div>
    </div>
  );
}
