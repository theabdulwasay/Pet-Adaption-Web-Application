# 🐾 PawHome — Pet Adoption Web Application

A full-stack pet adoption platform where shelters can list pets and adopters can browse, search, and submit adoption applications — built with **Django REST Framework**, **SQLite**, and **React (Vite)**.

![status](https://img.shields.io/badge/status-complete-1E3D3A) ![backend](https://img.shields.io/badge/backend-Django%20%2B%20DRF-2E5850) ![frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-E8A33D) ![db](https://img.shields.io/badge/database-SQLite-C97E1F)

---

## ✨ Features

- **Browse pets** in a responsive "kennel card" gallery with photo, species, breed, age, size, and status stamp (Available / Pending / Adopted)
- **Search & filter** by species, status, or free-text (name, breed, description, location)
- **Pet detail page** with full profile facts (age, gender, size, color, vaccination, neutering status)
- **Adoption applications** — submit a request straight from a pet's profile
- **Applications dashboard** — shelter staff can view every application and **approve** or **reject** it (auto-updates the pet's status)
- **List a new pet** through a clean form — no admin login required
- **Delete a listing** directly from the pet profile
- **Live stats ledger** on the homepage (total / available / pending / adopted)
- **Django admin panel** for full data management
- REST API with filtering, search, ordering, and pagination (Django REST Framework + django-filter)

---

## 🧱 Tech Stack

| Layer      | Technology                                             |
|------------|---------------------------------------------------------|
| Frontend   | React 18, React Router, Vite                            |
| Backend    | Django 6, Django REST Framework, django-filter, CORS    |
| Database   | SQLite (zero setup, file-based)                          |
| Styling    | Hand-written CSS design system (no framework dependency) |

---

## 📁 Project Structure

```
pet-adoption-app/
├── backend/                   # Django REST API
│   ├── petadopt/              # Project settings & URL routing
│   ├── pets/                  # Main app: models, serializers, views, admin
│   │   └── management/commands/seed_pets.py   # Sample data seeder
│   ├── db.sqlite3             # SQLite database (pre-seeded with sample pets)
│   ├── manage.py
│   └── requirements.txt
├── frontend/                   # React (Vite) client
│   ├── src/
│   │   ├── components/        # Navbar, Footer, PetCard
│   │   ├── pages/              # Home, PetDetail, AddPet, Requests
│   │   ├── api.js              # Fetch wrapper for the Django API
│   │   ├── App.jsx / main.jsx
│   │   └── index.css           # Design system (colors, type, components)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend (Django + SQLite)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

# The repo ships with a pre-migrated, pre-seeded db.sqlite3.
# If you want to rebuild it from scratch instead, run:
python manage.py migrate
python manage.py seed_pets          # loads 8 sample pets
python manage.py createsuperuser    # optional, for /admin access

python manage.py runserver
```

The API will be running at **http://localhost:8000/api/**
Django admin is at **http://localhost:8000/admin/**

> A demo admin account is already seeded: **username `admin` / password `admin123`** (change this before deploying anywhere public).

### 2. Frontend (React + Vite)

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be running at **http://localhost:5173** — it proxies `/api` requests to the Django server automatically (see `vite.config.js`).

---

## 🔌 API Reference

Base URL: `/api/`

| Method | Endpoint                        | Description                                  |
|--------|----------------------------------|-----------------------------------------------|
| GET    | `/pets/`                         | List pets (supports `search`, `species`, `status`, `size`, `gender`, `ordering`) |
| POST   | `/pets/`                         | Create a new pet                              |
| GET    | `/pets/{id}/`                    | Get full pet detail (includes its applications)|
| PATCH  | `/pets/{id}/`                    | Update a pet                                   |
| DELETE | `/pets/{id}/`                    | Delete a pet                                   |
| GET    | `/pets/stats/`                   | Totals: `total`, `available`, `pending`, `adopted` |
| POST   | `/pets/{id}/adopt/`               | Submit an adoption application for this pet   |
| GET    | `/requests/`                     | List all adoption applications                |
| POST   | `/requests/`                     | Create an application directly                |
| POST   | `/requests/{id}/approve/`        | Approve — marks the pet as `adopted`          |
| POST   | `/requests/{id}/reject/`         | Reject — returns the pet to `available`       |

Example:
```bash
curl "http://localhost:8000/api/pets/?species=dog&status=available&search=lab"
```

---

## 🎨 Design Notes

The UI leans into the **shelter kennel-card** metaphor: each pet is shown on a punch-holed index card with a rotated rubber stamp for its status, echoing real animal-shelter paperwork. Headlines use **Fraunces** (a warm display serif) paired with **Manrope** for body text, set on a deep pine green + warm amber palette instead of a generic template look.

---

## 🛠️ Notes for Production

This project is configured for **local development**. Before deploying:
- Set `DEBUG = False` and a real `SECRET_KEY` in `backend/petadopt/settings.py`
- Set `ALLOWED_HOSTS` and restrict `CORS_ALLOW_ALL_ORIGINS`
- Swap SQLite for Postgres/MySQL if you expect concurrent write load
- Run `npm run build` in `frontend/` and serve the compiled `dist/` folder (e.g. via Nginx or Django static files)
- Change the demo admin password

---

Made with 🐕 for animal lovers everywhere.
<img width="1565" height="817" alt="image" src="https://github.com/user-attachments/assets/c6565373-3ed9-4630-bdc0-9976f60758b2" />
<img width="1066" height="821" alt="image" src="https://github.com/user-attachments/assets/d1cd01b2-9d69-4bc4-a94e-cdb1b3ddb861" />
<img width="1139" height="300" alt="image" src="https://github.com/user-attachments/assets/60963f3f-8515-47c7-86fc-536a63bc2ea0" />
<img width="768" height="771" alt="image" src="https://github.com/user-attachments/assets/fbab2f0f-c508-45c1-9854-ff14e815550b" />




