import React from 'react';

const products = [
  { id: 1, name: 'Leather Bag', price: '$120', image: '/products/bag.jpg' },
  { id: 2, name: 'Sneakers', price: '$85', image: '/products/shoes.jpg' },
  { id: 3, name: 'Wrist Watch', price: '$150', image: '/products/watch.jpg' },
];

export default function ProductGrid() {
  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="border rounded-lg overflow-hidden shadow-sm">
            <img src={p.image} alt={p.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-blue-600">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
