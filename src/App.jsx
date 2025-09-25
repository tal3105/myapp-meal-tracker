import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from './components/Dashboard';
import AddMeal from './components/AddMeal';
import ManageMeals from './components/ManageMeals';
import EditMeal from './components/EditMeal';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ManageFood from './components/ManageFood';
import Home from './components/Home';
import MealsPage from './components/MealsPage';
import EditProfile from "./components/EditProfile";
import Contact from './components/Contact';
import About from './components/About';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export default function App() {
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);

  const addMeal = (meal) => setMeals(prev => [...prev, {...meal, id: Date.now() }]);
  const updateMeal = (update) => setMeals(prev => prev.map(m => m.id === update.id ? update : m));
  const deleteMeal = (id) => setMeals(prev => prev.filter(m => m.id !== id));

  // מאזין למשתמש ב-Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header עכשיו מקבל user ו-setUser */}
        <Header user={user} setUser={setUser} />
        <main className='flex-grow'>
          <Routes>
            <Route path='/dashboard' element={<Dashboard meals={meals} user={user} />} />
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddMeal onAddMeal={addMeal} />} />
            <Route path='/manage' element={<ManageMeals meals={meals} onDelete={deleteMeal} onUpdate={updateMeal} />} />
            <Route path='/profile' element={<Profile user={user} />} />
            {/* Login ו-Register עכשיו מקבלים setUser */}
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register setUser={setUser} />} />
            <Route path='/manage-food' element={<ManageFood />} />
            <Route path='/meals' element={<MealsPage meals={meals} onDelete={deleteMeal} />} />
            <Route path='/edit-profile' element={<EditProfile user={user} setUser={setUser} />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
