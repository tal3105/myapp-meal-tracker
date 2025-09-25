import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register({ setUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [gender, setGender] = useState("");

  const calculatorCalories = () => {
    let BMR = 0;
    if (gender === "זכר") {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "נקבה") {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let factor = 1.2;
    if (activity === "קל") factor = 1.375;
    else if (activity === "בינוני") factor = 1.55;
    else if (activity === "גבוה") factor = 1.725;
    else if (activity === "בכלל לא") factor = 1.2;

    return Math.round(BMR * factor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dailyGoal = calculatorCalories();

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            email,
            password
        );
        const firebaseUser = userCredential.user;

        const newUser = {
            uid: firebaseUser.uid,
            name,
            email,
            age,
            height,
            weight,
            activity,
            gender,
            dailyGoal,
        };

        setUser(newUser);
        navigate("/profile");
    } catch {
        alert("אירעה שגיאה בהרשמה: ");
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    const dailyGoal = calculatorCalories();

    const newUser = {
      name,
      email,
      password,
      age,
      height,
      weight,
      activity,
      gender,
      dailyGoal,
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    navigate("/profile");
  }; */

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      {/* רקעים דינמיים */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

      {/* כרטיס מרכזי */}
      <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">הרשמה</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
          <div>
            <label className="block mb-1 font-medium">שם מלא</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="השם שלך"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">גיל</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
                placeholder="גיל"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">גובה</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
                placeholder="גובה (סנטימטר)"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">משקל</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
                placeholder="משקל (קילוגרם)"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">רמת פעילות</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              >
                <option value="">בחר רמת פעילות</option>
                <option value="בכלל לא">בכלל לא</option>
                <option value="קל">קל (1-3 ימים בשבוע)</option>
                <option value="בינוני">בינוני (3-5 ימים בשבוע)</option>
                <option value="גבוה">גבוה (6-7 ימים בשבוע)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-10 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="זכר"
                checked={gender === "זכר"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              זכר
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="נקבה"
                checked={gender === "נקבה"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              נקבה
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            הרשמה
          </button>

          <p className="text-sm text-gray-500 mt-2 text-center">
            כבר יש לך חשבון?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              התחברות
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
