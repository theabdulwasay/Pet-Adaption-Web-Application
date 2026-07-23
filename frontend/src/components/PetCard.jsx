import { Link } from 'react-router-dom'

const PLACEHOLDER = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600'

export default function PetCard({ pet }) {
  return (
    <Link to={`/pets/${pet.id}`} className="kennel-card">
      <span className="kennel-hole" />
      <img
        className="kennel-photo"
        src={pet.image_url || PLACEHOLDER}
        alt={pet.name}
        onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
      />
      <span className={`kennel-stamp stamp-${pet.status}`}>{pet.status}</span>
      <div className="kennel-body">
        <h3 className="kennel-name">{pet.name}</h3>
        <div className="kennel-meta">
          {pet.breed || pet.species_display} · {Math.round(pet.age)} mo · {pet.gender}
        </div>
        <div className="kennel-tags">
          <span className="tag">{pet.size}</span>
          {pet.vaccinated && <span className="tag">Vaccinated</span>}
          {pet.location && <span className="tag">{pet.location}</span>}
        </div>
      </div>
    </Link>
  )
}
