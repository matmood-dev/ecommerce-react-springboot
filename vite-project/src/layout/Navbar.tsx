import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-blue-600">Max Bikers</Link>
        <div className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="hover:text-blue-600 font-medium">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-700 font-medium hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
