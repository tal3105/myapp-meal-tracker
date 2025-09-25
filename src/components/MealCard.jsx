export default function MealCard({ meal }) {
    return (
        /*<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-900">{meal.name}</h3>
            <p className="text-gray-600">Calories: {meal.calories}</p>
            <p className="text-gray-600">Protein: {meal.protein}g</p>
        </div>*/

        <article className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition ytansform hover:-translate-y-1">
            <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>Calories: <span className="font-medium">{meal.calories}</span></p>
                <p>Protein: <span className="font-medium">{meal.protein}g</span></p>
            </div>
        </article>
    );
}