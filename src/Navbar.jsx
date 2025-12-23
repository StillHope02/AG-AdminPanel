import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <h1 className="font-bold text-lg">AG Admin</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link to="/user-info" className="hover:text-gray-200">
              User
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-600 px-4 py-2 space-y-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/user-info"
            onClick={() => setOpen(false)}
            className="block hover:text-gray-200"
          >
            User
          </Link>
        </div>
      )}
    </nav>
  );
}
