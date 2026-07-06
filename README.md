# InternTrack

A job & internship application tracker built to solve my own problem: too many tabs, too many spreadsheets, no clear view of where I stood with each application.

🔗 **Live demo:** https://intern-tracker-wp6s.vercel.app/

## Features

- **Browse live listings** — real internship/job postings pulled from the Remotive API
- **Search & filter** — search by title/company, filter by category, toggle remote-only
- **Save to tracker** — one click saves a listing into your personal application tracker
- **Kanban-style board** — track status across Saved → Applied → Interviewing → Offer/Rejected
- **Persistent storage** — your data survives a page refresh (localStorage)
- **Responsive design** — works cleanly on mobile and desktop

## Tech stack

- React + Vite
- Tailwind CSS
- React Router
- Axios
- Remotive API (public, no auth required)
- Context API for state management
- Deployed on Vercel

## Why I built this

As I was applying for internships, I kept losing track of what I'd applied to and where I stood. Most job boards don't have any tracking built in, and spreadsheets are clunky. I built InternTrack to combine live listings with a simple, visual tracker — so I could browse and organize in one place.

## Notable technical decisions

- **Client-side filtering:** Remotive's `search` API parameter doesn't reliably filter results, so all filtering (search, category, remote) is done client-side after a single fetch. This also makes filtering instant with no extra API calls.
- **Custom hooks:** `useFetch` for data fetching with loading/error states, `useApplications` for tracker logic — keeps components focused on rendering, not logic.
- **Context over prop drilling:** Application state is shared via Context since multiple pages (Browse, Tracker) need access.

## Running locally

git clone https://github.com/MS-Ihsaan/intern-tracker
cd interntrack
npm install
npm run dev

## Future improvements

- Drag-and-drop between status columns
- Notes/reminders per application
- Export applications to CSV
- Backend + auth for multi-device sync
