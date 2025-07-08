import React from 'react';

const features = [
  { title: 'Free Shipping', desc: 'On all orders over $50' },
  { title: '24/7 Support', desc: 'We’re here to help anytime' },
  { title: 'Secure Payment', desc: 'Safe & trusted checkout' },
];

export default function Features() {
  return (
    <section className="py-12 px-6 grid md:grid-cols-3 gap-8 text-center">
      {features.map((f, i) => (
        <div key={i} className="shadow p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-2">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}
