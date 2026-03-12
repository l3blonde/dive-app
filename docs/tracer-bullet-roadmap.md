# Dive App - Tracer Bullet Roadmap

> Each bullet is a traceable feature combining Frontend + Backend + Database.
> Deadlines aligned with university sprint schedule (Feb 9 - Jun 30, 2026).

---

## Timeline Overview

| Phase | Dates | Focus |
|-------|-------|-------|
| Sprint 1 | Feb 26 - Mar 12 | Figma Refinement + Core Setup |
| Sprint 2 | Mar 12 - Mar 26 | Explore Page (Home) |
| Sprint 3 | Mar 26 - Apr 23 | Dive Site Details + Plan Feature |
| Sprint 4 | Apr 23 - May 7 | Start Dive + Logbook |
| Sprint 5 | May 7 - May 21 | Profile/Memories + Polish |
| Sprint 6 (FP Focus) | May 21 - Jun 10 | Final Polish + Testing + Upload |
| Jury | Jun 17 | Final Presentation |

---

## Tracer Bullet 1: Figma Prototype Refinement
**Sprint:** Pre-Sprint / Sprint 1 (Feb 12 - Feb 26)
**Deadline:** Thu Feb 26

### Scope
- Refine all app pages based on UX testing results
- Update user flows and navigation patterns
- Finalize design system (colors, typography, components)
- Create component library in Figma

### Pages to Refine
- [ ] Explore (Home) page with map, search, filters
- [ ] Dive Site Overview modal/page
- [ ] Plan page (saved dive sites/trips)
- [ ] Start Dive flow
- [ ] Logbook page
- [ ] Profile/Memories page
- [ ] Edit Profile page

### Deliverables
- [ ] Updated Figma prototype with all screens
- [ ] User flow diagrams
- [ ] Design system documentation
- [ ] Clickable prototype for stakeholder review

### Testing Criteria
- [ ] User flow walkthrough with 3+ test users
- [ ] All screens match design system
- [ ] Navigation is intuitive (< 3 clicks to any feature)
- [ ] Accessibility review (contrast, touch targets)

---

## Tracer Bullet 2: Explore Page (Home)
**Sprint:** Sprint 2 (Mar 12 - Mar 26)
**Deadline:** Thu Mar 26 (Mid-term eval)

### Scope
User can browse dive sites, dive trips, and marine life on an interactive map with search and filters.

### Frontend
- [ ] Interactive map with dive site markers
- [ ] Search bar: "Search dive sites, trips, species"
- [ ] Filter modal with depth, difficulty, marine life filters
- [ ] Tab navigation: Dive Sites | Trips | Marine Life
- [ ] Dive site carousel cards with "Add to Plan" + "View Details"
- [ ] Map controls (zoom, location, nearby sites, marine life toggle)
- [ ] Bottom navigation: Explore | Plan | Dive | Logbook | Memories

### Backend (API Routes)
- [ ] `GET /api/dive-sites` - List all dive sites with filters
- [ ] `GET /api/dive-sites/[id]` - Single dive site details
- [ ] `GET /api/dive-trips` - List dive trips
- [ ] `GET /api/marine-life` - List marine species
- [ ] `GET /api/search` - Universal search endpoint

### Database Schema
```sql
-- dive_sites table
CREATE TABLE dive_sites (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  max_depth_meters INTEGER,
  difficulty VARCHAR(50), -- beginner, intermediate, advanced
  visibility_meters INTEGER,
  water_temp_celsius DECIMAL(4, 1),
  rating DECIMAL(2, 1),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- dive_trips table
CREATE TABLE dive_trips (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dive_site_id UUID REFERENCES dive_sites(id),
  duration_days INTEGER,
  num_dives INTEGER,
  price_usd DECIMAL(10, 2),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- marine_species table
CREATE TABLE marine_species (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255),
  category VARCHAR(100), -- fish, mollusk, coral, etc.
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- dive_site_species junction table
CREATE TABLE dive_site_species (
  dive_site_id UUID REFERENCES dive_sites(id),
  species_id UUID REFERENCES marine_species(id),
  PRIMARY KEY (dive_site_id, species_id)
);
```

### Testing Criteria
- [ ] Map loads with 50+ dive site markers
- [ ] Search returns results in < 500ms
- [ ] Filters correctly narrow results
- [ ] Tab switching works without page reload
- [ ] Carousel swipes smoothly on mobile
- [ ] "Add to Plan" shows confirmation feedback
- [ ] All API endpoints return valid JSON

---

## Tracer Bullet 3: Dive Site Details + Add to Plan
**Sprint:** Sprint 3 (Mar 26 - Apr 23)
**Deadline:** Thu Apr 23

### Scope
User can view detailed dive site information and add sites to their dive plan.

### Frontend
- [ ] Dive Site Overview page/modal
  - Hero image with back/share buttons
  - Site name, rating, location
  - Tabs: Overview | Marine Life | Dive Trips | Reviews
  - CTAs: "Add to Plan" + "Start Dive"
  - Overview section with description + info chips
  - Highlights carousel (species, depth, features)
  - Site information cards (temp, depth, visibility, signal)
  - Species section with category filters
  - Reviews section with rating breakdown
- [ ] Plan page showing saved dive sites/trips
- [ ] Remove from plan functionality

### Backend (API Routes)
- [ ] `GET /api/dive-sites/[id]/details` - Full site details with species, reviews
- [ ] `POST /api/user/plan` - Add site to user's plan
- [ ] `DELETE /api/user/plan/[id]` - Remove from plan
- [ ] `GET /api/user/plan` - Get user's saved plan items
- [ ] `GET /api/dive-sites/[id]/reviews` - Site reviews

### Database Schema
```sql
-- user_plans table
CREATE TABLE user_plans (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  dive_site_id UUID REFERENCES dive_sites(id),
  dive_trip_id UUID REFERENCES dive_trips(id),
  added_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  planned_date DATE
);

-- reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  dive_site_id UUID REFERENCES dive_sites(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  location_rating DECIMAL(2, 1),
  water_cleanliness_rating DECIMAL(2, 1),
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Testing Criteria
- [ ] Dive site details load in < 1s
- [ ] All tabs display correct content
- [ ] "Add to Plan" persists across sessions
- [ ] Plan page shows all saved items
- [ ] Remove from plan updates UI immediately
- [ ] Reviews display with correct ratings
- [ ] Share button copies link / opens share sheet

---

## Tracer Bullet 4: Start Dive + Active Dive Session
**Sprint:** Sprint 4 (Apr 23 - May 7)
**Deadline:** Thu May 7

### Scope
User can start a dive session, track dive data, and end the dive.

### Frontend
- [ ] Start Dive confirmation screen
  - Safety checklist
  - Buddy confirmation
  - Equipment check
- [ ] Active Dive screen
  - Timer / duration
  - Depth indicator (if connected to device)
  - Quick species log button
  - Emergency surface button
- [ ] End Dive flow
  - Dive summary
  - Species spotted selector
  - Notes input
  - Rating input
  - Save to logbook

### Backend (API Routes)
- [ ] `POST /api/dives/start` - Start new dive session
- [ ] `PUT /api/dives/[id]/update` - Update active dive data
- [ ] `POST /api/dives/[id]/end` - End dive and save
- [ ] `POST /api/dives/[id]/species` - Log species during dive
- [ ] `GET /api/dives/active` - Get current active dive

### Database Schema
```sql
-- dives table
CREATE TABLE dives (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  dive_site_id UUID REFERENCES dive_sites(id),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  duration_minutes INTEGER,
  max_depth_meters DECIMAL(5, 1),
  water_temp_celsius DECIMAL(4, 1),
  visibility_meters INTEGER,
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(20) DEFAULT 'active', -- active, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW()
);

-- dive_species_log table
CREATE TABLE dive_species_log (
  id UUID PRIMARY KEY,
  dive_id UUID REFERENCES dives(id),
  species_id UUID REFERENCES marine_species(id),
  spotted_at TIMESTAMP DEFAULT NOW(),
  quantity INTEGER DEFAULT 1,
  notes TEXT
);
```

### Testing Criteria
- [ ] Start dive creates new session in DB
- [ ] Timer increments correctly
- [ ] Species can be logged mid-dive
- [ ] End dive saves all data
- [ ] Dive appears in logbook after completion
- [ ] Edge case: app backgrounded during dive
- [ ] Edge case: network loss during dive

---

## Tracer Bullet 5: Logbook
**Sprint:** Sprint 4-5 (Apr 30 - May 14)
**Deadline:** Thu May 14

### Scope
User can view their dive history with statistics and details.

### Frontend
- [ ] Logbook page
  - Dive statistics summary (total dives, total time, deepest dive)
  - Dive list with cards (date, site, duration, depth)
  - Filter by date range, site, rating
  - Search dives
- [ ] Dive detail view
  - Full dive information
  - Species spotted list
  - Photos (if any)
  - Notes
  - Edit capability

### Backend (API Routes)
- [ ] `GET /api/user/dives` - List user's dives with pagination
- [ ] `GET /api/user/dives/[id]` - Single dive details
- [ ] `PUT /api/user/dives/[id]` - Update dive notes/rating
- [ ] `GET /api/user/dives/stats` - User dive statistics
- [ ] `DELETE /api/user/dives/[id]` - Delete dive

### Database Schema
```sql
-- (uses existing dives table)

-- dive_photos table
CREATE TABLE dive_photos (
  id UUID PRIMARY KEY,
  dive_id UUID REFERENCES dives(id),
  image_url TEXT NOT NULL,
  caption TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

### Testing Criteria
- [ ] Logbook loads with 100+ dives efficiently
- [ ] Statistics calculate correctly
- [ ] Filters work in combination
- [ ] Dive detail shows all logged species
- [ ] Edit saves changes
- [ ] Delete removes dive with confirmation

---

## Tracer Bullet 6: Profile / Memories
**Sprint:** Sprint 5 (May 7 - May 21)
**Deadline:** Thu May 21

### Scope
User can view and edit their profile, see achievements, and browse dive memories.

### Frontend
- [ ] Profile page
  - Cover photo + avatar
  - Name, username, diver level badge
  - Following/friends count
  - Collected section (species discovered, logged dives)
  - Species categories breakdown
  - Favorite species carousel
  - Badges/achievements
  - Settings menu
- [ ] Edit Profile page
  - Change cover photo
  - Change avatar
  - Edit name, username, bio, location
  - Diver level selector
  - Social links
  - Privacy settings
- [ ] Memories gallery (dive photos timeline)

### Backend (API Routes)
- [ ] `GET /api/user/profile` - Get user profile
- [ ] `PUT /api/user/profile` - Update profile
- [ ] `POST /api/user/avatar` - Upload avatar image
- [ ] `POST /api/user/cover` - Upload cover image
- [ ] `GET /api/user/badges` - Get user achievements
- [ ] `GET /api/user/species-stats` - Species discovery stats
- [ ] `GET /api/user/memories` - Photo gallery

### Database Schema
```sql
-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  username VARCHAR(50) UNIQUE,
  bio TEXT,
  location VARCHAR(100),
  diver_level VARCHAR(50), -- beginner, hobby, advanced, professional, instructor
  avatar_url TEXT,
  cover_url TEXT,
  instagram_handle VARCHAR(100),
  website_url TEXT,
  show_dive_log_public BOOLEAN DEFAULT true,
  allow_friend_requests BOOLEAN DEFAULT true,
  show_location_on_dives BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- user_badges table
CREATE TABLE user_badges (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  badge_type VARCHAR(50), -- first_dive, species_100, depth_30m, etc.
  earned_at TIMESTAMP DEFAULT NOW()
);

-- user_species_discovered table
CREATE TABLE user_species_discovered (
  user_id UUID REFERENCES users(id),
  species_id UUID REFERENCES marine_species(id),
  first_seen_dive_id UUID REFERENCES dives(id),
  discovered_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, species_id)
);
```

### Testing Criteria
- [ ] Profile loads with correct stats
- [ ] Edit profile saves all fields
- [ ] Image upload works (< 5MB limit)
- [ ] Badges display correctly
- [ ] Species stats match dive logs
- [ ] Privacy settings apply correctly
- [ ] Memories gallery loads efficiently

---

## Tracer Bullet 7: Authentication
**Sprint:** Sprint 5-6 (May 14 - May 28)
**Deadline:** Thu May 28

### Scope
User can sign up, log in, and manage their session.

### Frontend
- [ ] Sign up page (email, password, confirm)
- [ ] Login page
- [ ] Forgot password flow
- [ ] Session persistence
- [ ] Protected routes

### Backend (API Routes)
- [ ] `POST /api/auth/signup` - Create account
- [ ] `POST /api/auth/login` - Login
- [ ] `POST /api/auth/logout` - Logout
- [ ] `POST /api/auth/forgot-password` - Request reset
- [ ] `POST /api/auth/reset-password` - Reset password
- [ ] `GET /api/auth/session` - Get current session

### Database Schema
```sql
-- (uses existing users table)

-- sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- password_resets table
CREATE TABLE password_resets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Testing Criteria
- [ ] Sign up creates user with hashed password
- [ ] Login returns valid session token
- [ ] Protected routes redirect to login
- [ ] Session persists across browser refresh
- [ ] Logout clears session
- [ ] Password reset email sends correctly

---

## Tracer Bullet 8: Final Polish + QA
**Sprint:** Sprint 6 / FP Focus (May 28 - Jun 10)
**Deadline:** Wed Jun 10 (Upload)

### Scope
Final bug fixes, performance optimization, and quality assurance.

### Tasks
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile responsiveness audit
- [ ] Performance optimization (< 3s initial load)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Error handling for all API calls
- [ ] Loading states for all async operations
- [ ] Empty states for lists
- [ ] Offline handling / error messages
- [ ] Analytics integration
- [ ] Final design polish

### Testing Criteria
- [ ] All user flows work end-to-end
- [ ] No console errors in production
- [ ] Lighthouse score > 90 (Performance, Accessibility)
- [ ] Works on iOS Safari + Android Chrome
- [ ] All edge cases handled gracefully

---

## Key Milestones

| Date | Milestone |
|------|-----------|
| Thu Feb 26 | Sprint 1 Start - Figma Complete |
| Thu Mar 26 | Mid-term Eval - Explore Page Complete |
| Thu Apr 23 | Sprint 4 Start - Dive Details + Plan Complete |
| Thu May 7 | Sprint 5 Start - Start Dive + Logbook Complete |
| Thu May 21 | FP Focus Start - Profile Complete |
| Wed Jun 10 | Upload Deadline - All Features Complete |
| Thu Jun 11 | S15 - Final Review |
| Wed Jun 17 | Jury Presentation |
| Tue Jun 30 | Ceremony |

---

## Risk Register

| Risk | Mitigation |
|------|------------|
| Database integration delays | Start with mock data, swap later |
| Complex map interactions | Use established library (Mapbox/Leaflet) |
| Image upload complexity | Use Vercel Blob storage |
| Authentication security | Use established patterns (bcrypt, httpOnly cookies) |
| Time constraints | Prioritize core features, cut nice-to-haves |

---

## Definition of Done

A feature is complete when:
1. Frontend UI matches Figma design
2. Backend API endpoints working
3. Database schema migrated
4. Unit tests passing
5. Manual QA completed
6. No console errors
7. Works on mobile and desktop
