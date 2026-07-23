import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

const initial = {
  name: '', species: 'dog', breed: '', age: '', gender: 'male', size: 'medium',
  color: '', description: '', image_url: '', location: '', vaccinated: false, neutered: false,
}

export default function AddPet() {
  const [form, setForm] = useState(initial)
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMsg(null)
    try {
      const pet = await api.createPet({ ...form, age: Number(form.age) })
      navigate(`/pets/${pet.id}`)
    } catch (err) {
      setMsg({ type: 'error', text: 'Could not save this pet. Please check the required fields.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="container" style={{ padding: '40px 0 70px', maxWidth: 720 }}>
      <div className="section-head">
        <div>
          <h2 className="section-title">List a pet for adoption</h2>
          <div className="section-sub">Fill out a kennel card and it'll appear in the browse list instantly.</div>
        </div>
      </div>

      <div className="form-card">
        {msg && <div className={`form-msg ${msg.type}`}>{msg.text}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-row">
              <label>Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Bella" />
            </div>
            <div className="form-row">
              <label>Species *</label>
              <select name="species" value={form.species} onChange={handleChange}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="rabbit">Rabbit</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label>Breed</label>
              <input name="breed" value={form.breed} onChange={handleChange} placeholder="Labrador Retriever" />
            </div>
            <div className="form-row">
              <label>Age (months) *</label>
              <input type="number" min="0" name="age" required value={form.age} onChange={handleChange} placeholder="14" />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-row">
              <label>Size</label>
              <select name="size" value={form.size} onChange={handleChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-row">
              <label>Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="Golden" />
            </div>
            <div className="form-row">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Lahore, PK" />
            </div>
          </div>

          <div className="form-row">
            <label>Photo URL</label>
            <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://…" />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange} placeholder="Tell adopters about this pet's personality…" />
          </div>

          <div className="form-grid-2">
            <div className="form-row checkbox-row">
              <input type="checkbox" name="vaccinated" checked={form.vaccinated} onChange={handleChange} id="vac" />
              <label htmlFor="vac" style={{ fontWeight: 500 }}>Vaccinated</label>
            </div>
            <div className="form-row checkbox-row">
              <input type="checkbox" name="neutered" checked={form.neutered} onChange={handleChange} id="neu" />
              <label htmlFor="neu" style={{ fontWeight: 500 }}>Neutered / Spayed</label>
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting} style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
            {submitting ? 'Saving…' : 'Add Pet to Kennel'}
          </button>
        </form>
      </div>
    </section>
  )
}
