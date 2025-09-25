import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 flex justify-center items-center space-x-2">
        <FaRegCopyright />
        <span>2025 Meal Tracker. All rights reserved.</span>
      </div>
    </footer>
  );
}
