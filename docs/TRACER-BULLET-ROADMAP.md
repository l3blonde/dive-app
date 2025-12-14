# Dive App - Proof of Concept Implementation Plan

The Ocean's4 team will implement the dive app as a Proof of Concept to validate core features
and technical architecture before full-scale development.

## What is Tracer Bullet Development?

**Tracer Bullet Technique:**
- Build one complete feature end-to-end (frontend → backend → database)
- Test and validate it fully before moving to the next
- Each "bullet" traces through all layers of the stack
- Reduces risk by proving architecture early
- Allows for quick pivots based on user feedback

## Feature 1: Interactive Map with Dive Sites

First, we're going to build an interactive map that displays dive sites worldwide
using real location data and allows users to browse sites visually.

### APIs We'll Use
- **Mapbox GL API** - Interactive map rendering with custom styling
- **Mapbox Geocoding API** - Location search and coordinate validation
- **Supabase Database** - Store and retrieve dive site data
- **WoRMS API** - Species taxonomy and scientific names
- **OBIS API** - Species occurrence data at dive locations

### What We'll Build

#### 1.1 Map Display Component
We'll create `components/dive-map.tsx` that initialises Mapbox GL and displays an interactive map.

**Code we'll write:**
- Import `react-map-gl` library and Mapbox GL styles
- Set up map state (viewport, zoom level, center coordinates)
- Configure Mapbox access token from environment variables
- Add navigation controls (zoom in/out, compass, geolocation)
- Handle map interactions (pan, zoom, click events)
- Add map styles (ocean colour and land colour)
- Add marines species button (fish icon)

**Functions we'll use:**
- `useState()` for map viewport state
- `useEffect()` to initialise map on component mount
- `Map` component from react-map-gl
- `NavigationControl` and `GeolocateControl` for map controls

**Testing:**
- Load the map and verify it displays correctly
- Test zoom controls work smoothly
- Verify geolocation button centres map on user's location
- Check map is responsive on mobile and desktop

#### 1.2 Dive Site Markers
We'll add custom markers to the map showing dive site locations.

**Code we'll write:**
- Create `components/map/map-marker.tsx` for custom circular markers
- Fetch dive sites from Supabase database
- Map over dive sites array and render markers at lat/lng coordinates
- Style markers with blue circular icons
- Add hover effects to markers

**Functions we'll use:**
- `Marker` component from react-map-gl
- `fetch()` to get dive sites from `/api/dive-sites`
- `map()` to iterate over sites and render markers
- CSS transforms for hover animations

**Testing:**
- Verify all dive site markers appear on map
- Test marker positions match actual dive site coordinates
- Check hover effects trigger correctly
- Verify markers cluster properly when zoomed out

#### 1.3 Dive Site Database Setup
We'll create a Supabase database to store dive site information.

**Code we'll write:**
- SQL schema in `scripts/01-create-dive-sites-table.sql`
- Define columns: id, name, latitude, longitude, depth, difficulty, description
- Add indexes on latitude/longitude for fast spatial queries
- Seed database with 50 MVP dive sites across different oceans
- SQL script in `scripts/02-seed-dive-sites.sql` with INSERT statements

**Testing:**
- Run SQL scripts in Supabase dashboard
- Query database to verify all 50 sites inserted correctly
- Check indexes are created and working
- Test spatial queries return sites within a bounding box

#### 1.4 Dive Site Popup Cards
We'll display detailed information when users click on a marker.

**Code we'll write:**
- Create `components/dive-site/site-popup.tsx` as a flip card component
- Front face: dive site image, name, location, rating badge
- Back face: depth, difficulty, description, "Read More" button
- Add flip animation using CSS transforms
- Handle close button to dismiss popup

**Functions we'll use:**
- `useState()` to track card flip state
- Click handlers for flip and close actions
- CSS transitions for smooth 3D flip effect
- `Popup` component from react-map-gl

**Testing:**
- Click markers and verify popup opens at correct position
- Test card flips from front to back smoothly
- Check close button dismisses popup
- Verify popup displays all dive site data correctly

#### 1.5 Search Functionality
We'll add a search bar using Mapbox Geocoding API to find locations.

**Code we'll write:**
- Create `components/map/search-bar.tsx` with input field
- Call Mapbox Geocoding API on user input
- Display autocomplete suggestions in dropdown
- Pan and zoom map to selected location
- Handle API errors and loading states

**Functions we'll use:**
- `fetch()` to call Mapbox Geocoding endpoint
- `debounce()` to limit API calls while typing
- `flyTo()` to animate map to search result
- State management for search results

**Testing:**
- Type location names and verify suggestions appear
- Select a result and check map moves to that location
- Test with various location types (cities, countries, dive sites)
- Verify error handling when API fails

## Feature 2: Marine Species Integration

We'll connect dive sites to marine species data so users can see what wildlife lives at each location.

### What We'll Build

#### 2.1 Marine Species Database
We'll fetch and store species data from scientific databases.

**Code we'll write:**
- Create API route `app/api/species/worms/route.ts` to fetch from WoRMS
- Create API route `app/api/species/obis/route.ts` to fetch from OBIS
- Parse JSON responses and extract relevant fields
- Cache API responses to reduce external calls
- Store species in Supabase `marine_species` table

**Functions we'll use:**
- `fetch()` to call WoRMS and OBIS APIs
- `JSON.parse()` to handle API responses
- SQL INSERT statements to store species data
- Next.js API route caching with `revalidate`

**Testing:**
- Call WoRMS API and verify species data returns correctly
- Call OBIS API with dive site coordinates
- Check species are saved to database with all fields
- Test cache prevents duplicate API calls

#### 2.2 Link Species to Dive Sites
We'll match species from APIs to our dive sites based on location.

**Code we'll write:**
- SQL query to get species within radius of dive site coordinates
- Parse `marine_life` JSON field from dive sites
- Match species names to WoRMS/OBIS scientific names
- Create junction table linking sites to species
- SQL script `scripts/03-link-species-to-sites.sql`

**Functions we'll use:**
- PostGIS spatial queries (`ST_DWithin()`)
- `JSON.parse()` to extract species arrays
- String matching algorithms for fuzzy name matching
- Batch INSERT statements for efficiency

**Testing:**
- Query OBIS for species at specific dive site
- Verify species match those known at the location
- Check junction table correctly links sites and species
- Test spatial query performance with large datasets

#### 2.3 Species Display Mode
We'll add a toggle to switch map from showing dive sites to showing species.

**Code we'll write:**
- Add state variable `mapMode: 'dive-sites' | 'marine-species'`
- Create `components/map/species-marker.tsx` for species avatars
- Fetch unique species from all dive sites' `marine_life` arrays
- Render circular avatar markers with species photos
- Add count badge showing number of dive sites with that species

**Functions we'll use:**
- `Set()` to extract unique species from arrays
- Conditional rendering based on `mapMode` state
- Filter and map functions to process species data
- Toggle handler to switch between modes (fish icon for marine species map)

**Testing:**
- Click fish icon and verify map switches to species mode
- Check only species from dive sites appear
- Verify species count badges show correct numbers
- Test toggle switches back to dive sites mode

#### 2.4 Species Popup Cards
We'll display species information when users click on a species marker.

**Code we'll write:**
- Create `components/marine-species/species-popup.tsx` matching dive site popup design
- Front face: species photo, common name, scientific name, category badge
- Back face: habitat, best months to see, number of dive sites
- Add "View Dive Sites" button to filter map by that species
- Flip card animation matching dive site cards

**Functions we'll use:**
- Same flip card logic as dive site popup
- Click handler for "View Dive Sites" button
- State update to filter dive sites by selected species
- CSS animations for card flip

**Testing:**
- Click species marker and verify popup opens
- Test card flips to show species details
- Click "View Dive Sites" and check map filters correctly
- Verify only dive sites with that species are shown

#### 2.5 Species Carousel
We'll add a horizontal scrolling carousel showing all species when in species mode.

**Code we'll write:**
- Create `components/marine-species/species-carousel.tsx`
- Display species cards with photos, names, and categories
- Implement horizontal scroll with touch/swipe support
- Sync carousel with map - clicking a species card centres the map on that species' markers
- Add smooth scroll behaviour and snap points

**Functions we'll use:**
- `useRef()` to access carousel DOM element
- `scrollIntoView()` to centre selected card
- Touch event handlers for mobile swipe
- CSS scroll-snap for smooth scrolling

**Testing:**
- Swipe through carousel and verify smooth scrolling
- Click a species card and check map updates
- Test scroll snap aligns cards properly
- Verify touch gestures work on mobile devices

## Feature 3: Advanced Filtering

We'll add filters to help users find dive sites matching their preferences.

### What We'll Build

#### 3.1 Filter Modal
We'll create a full-screen filter interface.

**Code we'll write:**
- Create `components/dive-site/filter-modal.tsx`
- Add checkboxes for activities (snorkelling, diving, freediving, scuba-diving)
- Add difficulty level filter (beginner, intermediate, advanced)
- Add depth range slider
- Add marine life species selector with icons
- Apply button to update map with filtered results

**Functions we'll use:**
- State management for all filter values
- Array filter methods to match dive sites
- Range slider component for depth
- Multi-select component for species

**Testing:**
- Open filter modal and verify all options display
- Select multiple filters and check they combine correctly
- Test depth slider updates min/max values
- Click apply and verify filtered sites show on map

#### 3.2 Sort Functionality
We'll add options to sort dive sites by different criteria.

**Code we'll write:**
- Add sort dropdown to map controls
- Implement sort by: Most Recent, Highest Rated, Most Reviews, Nearest
- Calculate distance from user location for "Nearest" sort
- Update carousel order based on sort selection

**Functions we'll use:**
- `Array.sort()` with custom comparators
- Haversine formula to calculate distance
- `navigator.geolocation` for user position
- Update state to re-render sorted results

**Testing:**
- Select each sort option and verify order changes
- Test "Nearest" uses correct user location
- Check carousel updates to match new sort order
- Verify rating sort puts highest rated first

## Feature 4: API Integration and Data Management

We'll set up proper API routes and database queries.

### What We'll Build

#### 4.1 Dive Sites API
We'll create RESTful endpoints for dive site data.

**Code we'll write:**
- Create `app/api/dive-sites/route.ts` for GET all sites
- Create `app/api/dive-sites/[id]/route.ts` for GET single site
- Add query parameters for filtering (difficulty, depth, species)
- Add pagination for large result sets
- Return JSON responses with proper error handling

**Functions we'll use:**
- Supabase client `select()` queries
- URL search params parsing
- Conditional query building based on filters
- Error handling with try/catch blocks

**Testing:**
- Call `/api/dive-sites` and verify all sites return
- Test filters with query params work correctly
- Call `/api/dive-sites/[id]` with valid ID
- Test error responses for invalid requests

#### 4.2 Species API
We'll create endpoints for species data.

**Code we'll write:**
- Create `app/api/species/route.ts` for GET all species
- Create `app/api/species/[id]/route.ts` for GET single species
- Add endpoint to get species at a dive site
- Cache responses to minimise database calls

**Functions we'll use:**
- Database joins between species and sites tables
- Filter species by category
- Return species with dive site count

**Testing:**
- Fetch all species and check response structure
- Get species for a specific dive site
- Verify joins return correct data
- Test caching prevents redundant queries

## Testing Strategy

For each feature, we'll follow this testing approach:

1. **Unit Tests** - Test individual functions in isolation
2. **Integration Tests** - Test components with API calls
3. **Manual Testing** - Use app in browser and verify behaviour
4. **Edge Cases** - Test with missing data, errors, slow connections
5. **Mobile Testing** - Check responsiveness on phone screens
6. **Performance** - Verify fast load times and smooth interactions

We'll fix bugs immediately as they appear and document any issues in the project tracker.

## Success Criteria

The Proof of Concept will be considered successful when:

- Map displays correctly with all 50+ dive sites
- Users can click markers and see detailed information
- Search finds locations and moves the map
- Species mode shows marine life at map
- Filters and sorting work as expected
- All APIs return data without errors
- App works smoothly on mobile and desktop
- Page load time is under 3 seconds
- No critical bugs in core functionality

Once validated, we'll move to
Phase 2: scaling to 100+ dive sites, dive site and marine species images, or integrate a paid dive site API
Phase 3: user accounts, dive plans
Phase 4: dive logging, sync with dive computers
Phase 5: sharing features
