import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // npm install lucide-react

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ['Home', 'Shop', 'About', 'Contact'];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">YourShop</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {navItems.map((item) => (
            <li key={item} className="hover:text-blue-600 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <ul className="flex flex-col space-y-4 px-6 py-4 text-gray-700 font-medium">
            {navItems.map((item) => (
              <li key={item} className="hover:text-blue-600 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
