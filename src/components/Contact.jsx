import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa"

export default function Contact() {
    return (
        <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        {/* רקעים דינמיים */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full opacity-30 animate-pulse blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200 rounded-full opacity-30 animate-pulse blur-2xl"></div>

          {/* כרטיס מרכזי */}
          <section className="relative z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">צור קשר</h2>

          <form className="space-y-4">
            <input
               type="text"
               placeholder="שם מלא"
               className="w-full p-3 border rounded-xl focus:outline-none focus:ring-indigo-400"
            />
            <input
               type="email"
               placeholder="אימייל"
               className="w-full p-3 border rounded-xl focus:outline-none focus:ring-indigo-400"
            />
            <input
               type="text"
               placeholder="נושא ההודעה"
               className="w-full p-3 border rounded-xl focus:outline-none focus:ring-indigo-400"
            />
            <textarea
               placeholder="תוכן ההודעה"
               rows={4}
               className="w-full p-3 border rounded-xl focus:outline-none focus:ring-indigo-400"
            />

            <button
               type="submit"
               className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >שליחה</button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <p>אימייל: <a href="mailto: taltul432@gmail.com" className="text-indigo-600">taltul432@gmail.com</a></p>
            <p>טלפון: <a href="tel:0527387319" className="text-indigo-600">0527387319</a></p>
          </div>

          <div className="flex justify-center gap-6 mt-6 text-2xl">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-500 hover:scale-110 transition"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:scale-110 transition"><FaFacebook /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:scale-110 transition"><FaLinkedin /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition"><FaTiktok /></a>
          </div>

          </section>
          </div>
    )
}