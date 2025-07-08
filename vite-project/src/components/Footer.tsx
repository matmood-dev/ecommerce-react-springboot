import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-12">
      <p className="text-gray-500">© {new Date().getFullYear()} YourShop. All rights reserved.</p>
    </footer>
  );
}
