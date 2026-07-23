import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from '../api'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'

export default function PetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pet, setPet] = useState(null)
  const [form, setForm] = useState({ applicant_name: '', email: '', phone: '', message: '' })
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const load = () => api.getPet(id).then(setPet)

  useEffect(() => { load() }, [id])

  if (!pet) return <div className="spinner">Loading pet profile…</div>

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMsg(null)
    try {
      await api.submitAdoption(pet.id, form)
      setMsg({ type: 'success', text: `Application sent! The shelter will reach out to you at ${form.email}.` })
      setForm({ applicant_name: '', email: '', phone: '', message: '' })
      load()
    } catch (err) {
      setMsg({ type: 'error', text: 'Something went wrong submitting your application. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Remove ${pet.name}'s profile? This cannot be undone.`)) return
    await api.deletePet(pet.id)
    navigate('/')
  }

  return (
    <section className="container detail-grid">
      <div>
        <img className="detail-photo" src={pet.image_url || PLACEHOLDER} alt={pet.name}
          onError={(e) => { e.currentTarget.src = PLACEHOLDER }} />
      </div>
      <div>
        <Link to="/" className="section-sub">← Back to all pets</Link>
        <h1 className="detail-name" style={{ marginTop: 10 }}>{pet.name}</h1>
        <div className="detail-breed">{pet.breed || pet.species_display} · {pet.location || 'Location unavailable'}</div>

        <div className="badge-row">
          <span className={`kennel-stamp stamp-${pet.status}`} style={{ position: 'static', transform: 'none' }}>
            {pet.status}
          </span>
        </div>

        <div className="detail-facts">
          <div className="fact"><div className="fact-label">Age</div><div className="fact-value">{pet.age} months</div></div>
          <div className="fact"><div className="fact-label">Gender</div><div className="fact-value">{pet.gender}</div></div>
          <div className="fact"><div className="fact-label">Size</div><div className="fact-value">{pet.size}</div></div>
          <div className="fact"><div className="fact-label">Color</div><div className="fact-value">{pet.color || '—'}</div></div>
          <div className="fact"><div className="fact-label">Vaccinated</div><div className="fact-value">{pet.vaccinated ? 'Yes' : 'No'}</div></div>
          <div className="fact"><div className="fact-label">Neutered/Spayed</div><div className="fact-value">{pet.neutered ? 'Yes' : 'No'}</div></div>
        </div>

        <p className="detail-desc">{pet.description || 'No description provided yet.'}</p>

        <button className="btn btn-danger" style={{ marginBottom: 24 }} onClick={handleDelete}>
          Remove this listing
        </button>

        <div className="form-card">
          <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0 }}>
            Apply to adopt {pet.name}
          </h3>
          {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Your name</label>
              <input name="applicant_name" required value={form.applicant_name} onChange={handleChange} placeholder="Jane Doe" />
            </div>
            <div className="form-grid-2">
              <div className="form-row">
                <label>Email</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="jane@example.com" />
              </div>
              <div className="form-row">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" />
              </div>
            </div>
            <div className="form-row">
              <label>Why would {pet.name} be a good fit for you?</label>
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Tell the shelter about your home, experience, and lifestyle…" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
              {submitting ? 'Submitting…' : 'Submit Adoption Application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
