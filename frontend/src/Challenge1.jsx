// Challenge1.jsx
import React, { useState, useEffect } from 'react';

const categories = [
  { label: '📦 All', value: 'all' },
  { label: '🎁 Gifts', value: 'Gifts' },
  { label: '🔌 Electronics', value: 'Electronics' },
  { label: '📱 Gadgets', value: 'Gadgets' },
];

function Challenge1() {
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get('category') || 'all';

  const [category, setCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = `${window.location.origin}/challenge1?category=${category}`;
    window.history.pushState(null, '', url);
  }, [category]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/filter?category=${category}`);
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(errText || 'Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* NavBar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc'
      }}>
        <div>
          <span style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem' }}>🛒 ShadowMart</span>
          <span style={{ color: 'black', marginLeft: 20 }}><strong>Filter by:</strong></span>
          {categories.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              style={{
                marginLeft: '10px',
                padding: '6px 12px',
                backgroundColor: category === c.value ? '#007bff' : '#e0e0e0',
                color: category === c.value ? 'white' : 'black',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div style={{ flex: 1, padding: '20px 40px' }}>
        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && products.length === 0 && <p>No products found.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map(p => (
            <li key={p.id} style={{ borderBottom: '1px solid #ccc', marginBottom: 10, paddingBottom: 10 }}>
              <h3>{p.name}</h3>
              <p>{p.abstract}</p>
              <p>💰 ₹{Number(p.cost).toLocaleString('en-IN')}</p>
              <p><i>Category: {p.category}</i></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Challenge1;
