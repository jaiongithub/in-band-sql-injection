import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ArticleLanding() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sort = searchParams.get('sort') || 'cost ASC';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    let url = `http://localhost:3000/articles?sort=${encodeURIComponent(sort)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;

    fetch(url)
      .then(async (res) => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setArticles(json);
          setError('');
        } catch {
          setArticles([]);
          setError(text); // Display raw DB error
        }
      })
      .catch(err => {
        setError('Failed to fetch: ' + err.message);
      });
  }, [sort, category]);

  function handleSort(order) {
    setSearchParams({ sort: `cost ${order}`, category });
  }

  function handleFilter(category) {
    setSearchParams({ sort, category });
  }

  function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>📰 Articles Dashboard</h1>
      <p>Find detailed guides for all your DARK operations.</p>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => handleSort('ASC')}>Sort by Price ↑</button>
        <button onClick={() => handleSort('DESC')} style={{ marginLeft: 10 }}>Sort by Price ↓</button>
        <button onClick={() => handleFilter('guides')} style={{ marginLeft: 10 }}>Filter: Guides</button>
        <button onClick={() => handleFilter('weapons')} style={{ marginLeft: 10 }}>Filter: Weapons</button>
        <button onClick={() => handleFilter('')} style={{ marginLeft: 10 }}>Show All</button>
        <button onClick={handleLogout} style={{ marginLeft: 20 }}>🚪 Logout</button>
      </div>

      {error && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Cost</th>
            <th>Abstract</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, idx) => (
            <tr key={idx}>
              <td>{a.title}</td>
              <td>{a.cost}</td>
              <td>{a.abstract}</td>
              <td>{a.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArticleLanding;
