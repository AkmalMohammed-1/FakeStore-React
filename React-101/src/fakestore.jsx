import { useEffect, useState } from 'react'

const API_URL = 'https://fakestoreapi.com/products'

export default function FakeStore() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error('Could not fetch products.'); return r.json() })
      .then(data => setProducts(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'all' || p.category === category)
  )

  return (
    <section style={{ padding: '1.5rem 0', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>Fake Store</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Products from the Fake Store API</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading && <p style={{ color: '#888', textAlign: 'center' }}>Loading products...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {!loading && !error && (
        <>
          <p style={{ fontSize: 13, color: '#888', marginBottom: '1rem' }}>
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {filtered.map(p => (
              <article key={p.id} style={cardStyle}>
                <div style={imgWrapStyle}>
                  <img src={p.image} alt={p.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#888' }}>
                    {p.category}
                  </span>
                  <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.title}
                  </p>
                  <p style={{ fontSize: 12, color: '#888', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {p.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, borderTop: '0.5px solid #e5e5e5', paddingTop: 8 }}>
                    <strong style={{ fontSize: 15 }}>${p.price.toFixed(2)}</strong>
                    <span style={{ fontSize: 12, color: '#888' }}>★ {p.rating.rate}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

const inputStyle = {
  padding: '8px 12px', fontSize: 14, border: '0.5px solid #ddd',
  borderRadius: 8, background: '#fff', outline: 'none', flex: 1, minWidth: 140
}

const cardStyle = {
  border: '0.5px solid #e5e5e5', borderRadius: 12,
  overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff'
}

const imgWrapStyle = {
  background: '#f7f7f7', height: 140,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
}