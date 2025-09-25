import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {

  const navigate = useNavigate();

  if (!user) {
    return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl text-center">
        <p className="text-gray-500 text-lg mb-6">אף משתמש לא התחבר</p>
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          לחץ להתחברות
        </Link>
      </section>
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">פרופיל אישי</h2>

        <div className="bg-white rounded-xl shadow p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
              <FaUserCircle size={120} />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
            <p>
              <span className="font-medium">גיל:</span> {user.age}
            </p>
            <p>
              <span className="font-medium">מין:</span> {user.gender}
            </p>
            <p>
              <span className="font-medium">גובה:</span> {user.height} ס״מ
            </p>
            <p>
              <span className="font-medium">משקל:</span> {user.weight} ק״ג
            </p>
            <p>
              <span className="font-medium">רמת פעילות:</span> {user.activity}
            </p>
            <p>
              <span className="font-medium">יעד קלוריות יומי:</span> {user.dailyGoal} קלוריות
            </p>
          </div>

          {/*buttons*/}
          <div className="flex gap-4">
            <button 
             type="button"
             className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
             onClick={() => navigate('/edit-profile')}
          >
            <FaUserEdit /> עדכן פרופיל
          </button>
          <button
             type="button"
             className="items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
             onClick={() => navigate('/dashboard')}
          >מעקב יומי</button>
          </div>
          
        </div>
      </section>
    </div>
  );
}
