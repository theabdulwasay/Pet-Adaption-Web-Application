import { useEffect, useState } from 'react'

const BASE = '/api'

export default function Requests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetch(`${BASE}/requests/`)
      .then((r) => r.json())
      .then((data) => setRequests(data.results ?? data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const act = async (id, action) => {
    await fetch(`${BASE}/requests/${id}/${action}/`, { method: 'POST' })
    load()
  }

  return (
    <section className="container" style={{ padding: '40px 0 70px' }}>
      <div className="section-head">
        <div>
          <h2 className="section-title">Adoption applications</h2>
          <div className="section-sub">{requests.length} submitted so far</div>
        </div>
      </div>

      {loading ? (
        <div className="spinner">Loading applications…</div>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <h3>No applications yet</h3>
          <p>Once someone applies to adopt a pet, their request will show up here.</p>
        </div>
      ) : (
        <table className="req-table">
          <thead>
            <tr>
              <th>Pet</th>
              <th>Applicant</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.pet_name}</td>
                <td>{r.applicant_name}</td>
                <td>{r.email}{r.phone ? ` · ${r.phone}` : ''}</td>
                <td style={{ maxWidth: 260 }}>{r.message || '—'}</td>
                <td><span className={`status-pill ${r.status}`}>{r.status}</span></td>
                <td>
                  {r.status === 'pending' ? (
                    <div className="row-actions">
                      <button className="mini-btn approve" onClick={() => act(r.id, 'approve')}>Approve</button>
                      <button className="mini-btn reject" onClick={() => act(r.id, 'reject')}>Reject</button>
                    </div>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
