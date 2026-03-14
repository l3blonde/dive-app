-- Create dive_trips table
CREATE TABLE IF NOT EXISTS dive_trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Land-based', 'Liveaboard', 'Day Trip'
  difficulty TEXT, -- 'Beginner', 'Intermediate', 'Advanced', 'Expedition'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  marine_life TEXT, -- JSON array: '["whale-shark","manta-ray","reef-shark"]'
  spots_total INTEGER,
  spots_left INTEGER,
  image_url TEXT,
  location TEXT,
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  dive_site_ids TEXT, -- JSON array of linked dive site UUIDs
  rating DECIMAL(2,1) DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert 15 dive trips (removed price_usd field)
INSERT INTO dive_trips (name, type, difficulty, start_date, end_date, description, marine_life, spots_total, spots_left, image_url, location, latitude, longitude, rating, review_count) VALUES

-- MALDIVES (5 trips)
('Dhigurah Island Trip', 'Land-based', 'Beginner', '2026-04-07', '2026-04-11', 'Relaxed island vibe + chance to see whale sharks, manta rays, and reef sharks in crystal clear waters.', '["whale-shark","manta-ray","reef-shark"]', 12, 8, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Dhigurah, Maldives', 3.5042, 72.9288, 4.9, 214),

('Maldives Liveaboard', 'Liveaboard', 'Advanced', '2026-04-15', '2026-04-22', 'Remote reefs + chance to see whale sharks, manta rays, and tiger sharks. Expedition style diving.', '["whale-shark","manta-ray","tiger-shark"]', 16, 6, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Male Atoll, Maldives', 4.1755, 73.5093, 4.8, 156),

('South Ari Atoll Explorer', 'Liveaboard', 'Intermediate', '2026-05-01', '2026-05-08', 'Best whale shark encounters in the Maldives. Daily sightings guaranteed or next trip free.', '["whale-shark","manta-ray","hammerhead-shark"]', 20, 12, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'South Ari Atoll, Maldives', 3.4833, 72.8167, 4.9, 342),

('Hanifaru Bay Day Trip', 'Day Trip', 'Beginner', '2026-06-15', '2026-06-15', 'UNESCO Biosphere Reserve. Witness the famous manta ray feeding aggregation.', '["manta-ray","whale-shark"]', 8, 4, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Baa Atoll, Maldives', 5.2500, 72.9333, 5.0, 89),

('Fuvahmulah Tiger Shark Expedition', 'Land-based', 'Advanced', '2026-07-10', '2026-07-15', 'The only place where tiger sharks are seen year-round. Deep dives with oceanic mantas.', '["tiger-shark","oceanic-manta","thresher-shark"]', 10, 5, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Fuvahmulah, Maldives', -0.2983, 73.4247, 4.7, 78),

-- RED SEA / EGYPT (3 trips)
('Brothers Islands Expedition', 'Liveaboard', 'Advanced', '2026-04-20', '2026-04-27', 'Legendary dive sites with hammerheads, oceanic whitetips, and stunning walls.', '["hammerhead-shark","oceanic-whitetip","grey-reef-shark"]', 22, 14, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Brothers Islands, Egypt', 26.3167, 34.8500, 4.8, 267),

('Daedalus Reef Safari', 'Liveaboard', 'Intermediate', '2026-06-01', '2026-06-05', 'Remote offshore reef with schooling hammerheads and thresher sharks at dawn.', '["hammerhead-shark","thresher-shark","silky-shark"]', 24, 18, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Daedalus Reef, Egypt', 24.9167, 35.8500, 4.6, 189),

('SS Thistlegorm Wreck Dive', 'Day Trip', 'Beginner', '2026-06-20', '2026-06-20', 'Iconic WWII wreck with motorcycles, tanks, and abundant marine life.', '["batfish","lionfish","moray-eel"]', 16, 11, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Sharm El Sheikh, Egypt', 27.8167, 33.9167, 4.9, 412),

-- INDONESIA (4 trips)
('Raja Ampat Explorer', 'Liveaboard', 'Intermediate', '2026-05-15', '2026-05-24', 'The most biodiverse marine region on Earth. Over 1,500 fish species.', '["manta-ray","wobbegong-shark","pygmy-seahorse"]', 14, 6, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Raja Ampat, Indonesia', -0.2333, 130.5167, 5.0, 287),

('Komodo Dragon & Dive', 'Land-based', 'Intermediate', '2026-06-10', '2026-06-16', 'World-class diving with manta rays plus land excursions to see Komodo dragons.', '["manta-ray","reef-shark","giant-trevally"]', 10, 4, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Labuan Bajo, Indonesia', -8.4539, 119.8772, 4.8, 234),

('Banda Sea Expedition', 'Liveaboard', 'Expedition', '2026-08-20', '2026-09-01', 'Remote expedition to pristine reefs, hammerhead schools, and sea snakes.', '["hammerhead-shark","sea-snake","bumphead-parrotfish"]', 12, 3, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Banda Islands, Indonesia', -4.5258, 129.8958, 4.9, 67),

('Lembeh Strait Muck Diving', 'Land-based', 'Intermediate', '2026-09-10', '2026-09-15', 'Critter capital of the world. Bizarre creatures you wont see anywhere else.', '["mimic-octopus","frogfish","blue-ringed-octopus"]', 8, 6, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Lembeh, Indonesia', 1.4669, 125.2264, 4.8, 145),

-- CARIBBEAN (2 trips)
('Roatan Shark Dive', 'Land-based', 'Intermediate', '2026-05-20', '2026-05-25', 'Caribbean reef sharks guaranteed. Stunning wall dives and vibrant coral.', '["caribbean-reef-shark","nurse-shark","eagle-ray"]', 10, 7, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Roatan, Honduras', 16.3333, -86.5333, 4.6, 123),

('Bahamas Tiger Beach', 'Liveaboard', 'Advanced', '2026-06-25', '2026-06-30', 'Face-to-face encounters with tiger sharks in crystal clear shallow water.', '["tiger-shark","lemon-shark","great-hammerhead"]', 14, 9, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/Black-Coral.png', 'Grand Bahama, Bahamas', 26.6500, -78.5167, 4.9, 198),

-- THAILAND (1 trip)
('Similan Islands Safari', 'Liveaboard', 'Beginner', '2026-04-10', '2026-04-14', 'Thailands premier dive destination with pristine reefs and gentle currents.', '["leopard-shark","manta-ray","whale-shark"]', 20, 15, 'https://xu5qaaigiohvkyk8.public.blob.vercel-storage.com/site-placeholder.png', 'Similan Islands, Thailand', 8.6500, 97.6333, 4.7, 356);
