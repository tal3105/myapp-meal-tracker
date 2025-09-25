import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditMeal({ meals, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // מוצאים את הארוחה לפי id
  const meal = meals.find(m => m.id === Number(id));

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");

  useEffect(() => {
    if (meal) {
      setName(meal.name);
      setCalories(meal.calories);
      setProtein(meal.protein);
    }
  }, [meal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      id: meal.id,
      name,
      calories: Number(calories),
      protein: Number(protein)
    });
    navigate("/manage");
  };

  if (!meal) {
    return <p className="text-center text-gray-500 mt-10">Meal not found.</p>;
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Meal</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Meal Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Calories</label>
          <input
            type="number"
            value={calories}
            onChange={e => setCalories(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Protein (g)</label>
          <input
            type="number"
            value={protein}
            onChange={e => setProtein(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
