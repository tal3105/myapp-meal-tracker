import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ManageMeals({ meals, onDelete }) {
    return( 
        <section className='max-w-4xl mx-auto px-4 py-10'>
            <h2 className='text-2xl font-semibold mb-6'>Manage Meals</h2>
            <div className='space-y-4'>
                {meals.map(m => (
                    <div key={m.id} className='bg-white p-4 rounded-xl shadow flex justify-between items-center'>
                       <div>
                           <h3 className='font-semibold'>{m.name}</h3>
                           <p className='text-sm text-gray-500'>{m.calories} kcal | {m.protein}g protein</p>
                       </div>
                       <div className='flex items-center gap-2'>
                           <Link to={`/edit/${m.id}`} className='text-indigo-600 hover:text-indigo-800 transition'>
                              <FaEdit size={18} />
                           </Link>
                           <button className='text-red-600 hover:text-red-800 transition' onClick={() => onDelete(m.id)}><FaTrash size={18} /></button>
                       </div>
                    </div>
                ))}
            </div>
        </section>
    );
}