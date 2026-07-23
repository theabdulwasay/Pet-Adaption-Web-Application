import { useEffect, useState } from 'react'
import { api } from '../api'
import PetCard from '../components/PetCard'

export default function Home() {
  const [pets, setPets] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [species, setSpecies] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    api.stats().then(setStats).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (species) params.species = species
    if (status) params.status = status
    const t = setTimeout(() => {
      api.listPets(params)
        .then((data) => setPets(data.results ?? data))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(t)
  }, [search, species, status])

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Open kennel · Updated daily</div>
            <h1 className="hero-title">
              Find your <em>new best friend</em>, waiting just around the corner.
            </h1>
            <p className="hero-sub">
              PawHome connects local shelters with people ready to open their homes.
              Browse real profiles, meet a pet's story, and start an adoption application in minutes.
            </p>
            <div className="hero-actions">
              <a href="#browse" className="btn btn-primary">Browse Pets →</a>
              <a href="/add" className="btn btn-ghost">List a pet for adoption</a>
            </div>
            {stats && (
              <div className="ledger">
                <div className="ledger-item">
                  <div className="ledger-num">{stats.total}</div>
                  <div className="ledger-label">Total Pets</div>
                </div>
                <div className="ledger-item">
                  <div className="ledger-num">{stats.available}</div>
                  <div className="ledger-label">Available</div>
                </div>
                <div className="ledger-item">
                  <div className="ledger-num">{stats.pending}</div>
                  <div className="ledger-label">Pending</div>
                </div>
                <div className="ledger-item">
                  <div className="ledger-num">{stats.adopted}</div>
                  <div className="ledger-label">Adopted</div>
                </div>
              </div>
            )}
          </div>
          <div className="hero-stamp-card">
            <span className="hero-stamp-tag">Kennel Card #001</span>
            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=700" alt="Bella the Labrador" />
            <div className="hero-stamp-caption">
              <strong>Bella</strong> · Labrador Retriever, 1 yr — "loves long walks and belly rubs."
            </div>
          </div>
        </div>
      </section>

      <section id="browse" className="container">
        <div className="section-head">
          <div>
            <h2 className="section-title">Pets looking for a home</h2>
            <div className="section-sub">{pets.length} shown{status ? ` · filtered by ${status}` : ''}</div>
          </div>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by name, breed, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="chip-select" value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="">All species</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="bird">Birds</option>
            <option value="rabbit">Rabbits</option>
            <option value="other">Other</option>
          </select>
          <select className="chip-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Any status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner">Fetching kennel records…</div>
        ) : pets.length === 0 ? (
          <div className="empty-state">
            <h3>No pets match your search</h3>
            <p>Try clearing a filter, or check back soon — new pets are added daily.</p>
          </div>
        ) : (
          <div className="pet-grid">
            {pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}
          </div>
        )}
      </section>
    </>
  )
}
