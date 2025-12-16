# API Routes in Next.js

## What Are API Routes?

API routes are like secret doorways in our app that let different parts
of our website talk to other websites (like WoRMS and OBIS) without users
seeing what's happening behind the scenes.

Analogy: Imagine you want to order food, you don't go into the kitchen yourself.
you tell the waiter (API route), the waiter goes to the kitchen (external API),
gets your food (data), and brings it back to you.
The API route is like the waiter :)

## Why Did Next.js Invent API Routes?

### Historical Context

**Before 2019:** If you wanted to build a website that talked to other websites,
you needed TWO separate projects:
1. A frontend (what users see - built with React)
2. A backend (the behind-the-scenes stuff - built with Express.js or another server)

This was painful because:
- You had to learn two different systems
- You had to deploy two separate apps
- You had to keep them in sync
- It was slow to develop

**2019: Next.js 9 Innovation**
Next.js said: "What if we could put the backend AND frontend in ONE project?"

They invented API routes, which lets you write backend code right inside
your Next.js app without needing a separate server.

### Benefits

1. **Everything in one place**: Your frontend (components) and backend (API routes) live together
2. **Same language**: You write everything in TypeScript/JavaScript
3. **Easy deployment**: Deploy to Vercel with one click, no server setup needed
4. **Fast development**: Change backend code and see it instantly
5. **Security**: API keys stay secret on the server, never exposed to users
6. **Automatic optimization**: Next.js caches responses for faster loading

## How We're Using API Routes

We have API routes for marine species because:
- WoRMS and OBIS are external third-party APIs
- We want to cache their responses (they're slow)
- We need to transform their data to our format
- We want error handling in one place

### External APIs We Use

#### 1. OBIS (Ocean Biodiversity Information System)

**What is OBIS?**
OBIS is a global open-access database that tracks where marine species
have been spotted in the ocean. It's like Google Maps for ocean creatures.
Scientists, researchers, and divers from around the world report marine life
sightings, and OBIS collects all this data in one massive database.

- **Created by:** UNESCO's Intergovernmental Oceanographic Commission
- **Founded:** 2000
- **Data:** Over 120 million observations of 240,000+ marine species
- **Website:** https://obis.org

**Why do we need OBIS?**
1. **Real occurrence data**: Shows actual GPS coordinates where species have been observed
2. **Scientific accuracy**: Data is verified by marine biologists and institutions
3. **Coverage**: Global database spanning all oceans and depths
4. **Free to use**: Open-access API for developers
5. **Species distribution**: Helps us show users where they're most likely to encounter specific marine life

**How we use it in our app:**
When a user switches to species mode on the map, we call the OBIS API
with the visible map area (bounding box) and get back actual coordinates
where species have been sighted. This lets us show real-world data
instead of guessing where species might be.

**Example OBIS data:**
```json
{
  "scientificName": "Manta birostris",
  "decimalLatitude": -8.5,
  "decimalLongitude": 115.5,
  "eventDate": "2024-03-15",
  "depth": 15,
  "occurrenceStatus": "present"
}
```

#### 2. WoRMS (World Register of Marine Species)

**What is WoRMS?**
WoRMS is the world's most authoritative database for marine species names
and taxonomy. It's like Wikipedia meets a scientific encyclopedia,
but only for ocean creatures, and every piece of information
is checked by experts.

- **Created by:** Flanders Marine Institute (Belgium)
- **Founded:** 2007
- **Data:** 240,000+ marine species with scientific names, classifications, and relationships
- **Website:** https://www.marinespecies.org
- **Updates:** Daily updates from 240+ taxonomic experts worldwide

**Why do we need WoRMS?**
1. **Correct scientific names**: Marine species often have multiple common names, but only one official scientific name
2. **Taxonomy hierarchy**: Shows how species are classified (Kingdom → Phylum → Class → Order → Family → Genus → Species)
3. **AphiaID system**: Each species gets a unique permanent ID number that never changes
4. **Authority**: The gold standard for marine species identification worldwide
5. **Rich metadata**: Includes synonyms, common names in multiple languages, authors who discovered the species

**How we use it in our app:**
When we display a species card, we fetch the scientific name, classification,
and AphiaID from WoRMS to ensure we're showing accurate,
scientifically-verified information.
This makes our app trustworthy for
serious divers and marine enthusiasts.

**Example WoRMS data:**
```json
{
  "AphiaID": 217370,
  "scientificname": "Manta birostris",
  "authority": "(Walbaum, 1792)",
  "status": "accepted",
  "kingdom": "Animalia",
  "phylum": "Chordata",
  "class": "Elasmobranchii",
  "order": "Myliobatiformes",
  "family": "Mobulidae",
  "genus": "Manta",
  "valid_name": "Mobula birostris"
}
```

**How we use AphiaID in our app:**

```typescript
// In lib/data/marine-species.ts
{
  id: "whale-shark",
  name: "Whale Shark",
  scientificName: "Rhincodon typus",
  aphiaId: 105819,  // ← This links to WoRMS database
}
```
---

## Our API Folder Structure

```
app/api/
  └── species/
      ├── worms/
      │   └── route.ts      (Gets species taxonomy from WoRMS)
      └── obis/
          └── route.ts      (Gets species locations from OBIS)
```

### Structure Logic

- `app/api/` - All API routes live here
- `species/` - Groups species-related endpoints together
- `worms/route.ts` - The filename `route.ts` is REQUIRED by Next.js (special name)

---

## Code Translation: WoRMS API Route

Let's break down every single line of `app/api/species/worms/route.ts`:

### Line 1: Import Statement
```ts
import { NextResponse } from "next/server"
```

"Hey Next.js, I need your special tool called NextResponse that lets me send data back to whoever asked for it."

**What is NextResponse?**
It's like a fancy envelope that wraps your data before sending it back. It can send:
- JSON data (like `{ name: "Manta Ray" }`)
- Error messages
- Status codes (200 = success, 404 = not found, 500 = server broke)

---

### Line 5: Function Declaration
```ts
export async function GET(request: Request) {
```
**async** = "This function does things that take time (like asking another website for data),
so don't wait around, keep doing other stuff"
**GET** = The name MUST be GET, POST, PUT, or DELETE
(Next.js looks for these exact names)
**request: Request** = "Someone is asking me for data,
and their question is called 'request'"

**What is async?**
Imagine you're baking a cake. Normal functions are like mixing ingredients,
you do it all at once. Async functions are like putting the cake in the oven,
you start it, then go do other things while it bakes.
When it's done, you come back.

In code:
- Normal function: Do step 1, then step 2, then step 3 (wait for each)
- Async function: Start step 1 (takes 5 seconds), don't wait, move on.
- When step 1 finishes, come back to it.

---

### Line 6: Extract Search Parameters
```ts
const { searchParams } = new URL(request.url)
```

"Someone sent a URL like `?name=Green Turtle`.
Extract the part after the `?` so I can read it."

**What is const?**
`const` means "constant", a container that holds a value that won't change.
Like a labeled jar that you can't swap out for a different jar.

Types of containers:
- `const` = Can't change what's in the jar
- `let` = Can change what's in the jar
- `var` = Old way, we don't use it anymore

---

### Line 7: Get the Species Name
```ts
const name = searchParams.get("name")
```
"From the URL `?name=Green Turtle`, grab whatever comes after `name=`
and put it in a container called `name`."

If the URL is `?name=Manta Ray`, then `name` now equals "Manta Ray"

---

### Lines 9-11: Validation Check
```ts
if (!name) {
  return NextResponse.json({ error: "Species name is required" }, { status: 400 })
}
```
"If nobody told me which species they want, send back an error message saying
'Hey, you forgot to tell me the species name!' with error code 400."

The `!` means "NOT". So `!name` means "if name is empty or doesn't exist"

**What is return?**
`return` means "Stop everything and send this back to whoever asked."
Like ending a conversation.

**What is 400?**
HTTP status codes are numbers that mean things:
- 200 = Success! Everything worked
- 400 = You made a mistake (bad request)
- 404 = Can't find what you're looking for
- 500 = Server broke (our fault, not yours)

---

### Line 13: Start Error Handling
```ts
try {
```
"Okay, I'm about to try something risky (asking another website for data).
If anything goes wrong, I'll catch the error instead of crashing."

**What is try?**
`try` is like saying "Let me attempt this, and if something breaks, don't panic."
It always comes with a `catch` at the bottom that says "If something broke, do this instead."

---

### Line 14: Encode the Species Name
```ts
const encodedName = encodeURIComponent(name)
```
"Convert the species name into a format safe for URLs.
Spaces become `%20`, special characters get converted."

**Why?**
URLs can't have spaces or weird characters.
"Manta Ray" becomes "Manta%20Ray"

---

### Lines 15-24: Fetch from WoRMS
```ts
const response = await fetch(
  `https://www.marinespecies.org/rest/AphiaRecordsByName/${encodedName}?like=true&marine_only=true`,
  {
    headers: {
      Accept: "application/json",
    },
    // Cache for 7 days since taxonomy doesn't change often
    next: { revalidate: 604800 },
  },
)
```

**Plain English:**
"Go to the WoRMS website and ask for information about this species.
Wait for their answer. Also tell them I want JSON format, and save their
answer for 7 days so I don't have to keep asking."

**What is await?**
Remember `async` from earlier? `await` is its partner.
It means "Wait for this to finish before moving to the next line."

Like baking:
- `async` = Put cake in oven
- `await` = Wait for it to finish baking before decorating it

**What is fetch?**
`fetch` is how you ask another website for data.
Like making a phone call to another server.

**What is response?**
`response` is the answer you got back.
It's like the other person picking up the phone and talking back to you.

`Accept: "application/json"` means "Please send me data
in JSON format (not HTML or XML)"

**What is revalidate: 604800?**
604800 seconds = 7 days. This tells Next.js "Save this answer for 7 days,
then fetch fresh data." Species taxonomy doesn't change often, so 7 days is fine.

---

### Lines 26-29: Check if Request Worked
```ts
if (!response.ok) {
  console.error("[WoRMS API] Error:", response.statusText)
  return NextResponse.json({ error: "Failed to fetch from WoRMS" }, { status: response.status })
}
```

"If the WoRMS website didn't answer properly
(like they're down or we got blocked),
write an error message to the console and tell the user 'Sorry,
couldn't get the data.'"

**What is console.error?**
Like leaving a note for developers.
It writes to the browser's developer console so we can debug issues.
Users don't see it.

**What is response.ok?**
`response.ok` is a built-in check that returns `true` if
status code is 200-299 (success), `false` otherwise.

---

### Line 31: Convert Response to JSON
```ts
const data = await response.json()
```

"Take the answer from WoRMS (which is text) and convert it
into a JavaScript object so I can read it easily."

**What is JSON?**
JSON = JavaScript Object Notation. It's a format for organizing data:
```json
{
  "name": "Manta Ray",
  "scientificName": "Mobula birostris",
  "family": "Mobulidae"
}
```

Like a labeled filing cabinet where everything has a name and value.

---

### Lines 34-35: Find Valid Result
```ts
const validResult = Array.isArray(data) ? data.find((record: any) => record.status === "accepted") || data[0] : data
```
"WoRMS sometimes sends back multiple species.
Find the one marked as 'accepted' (the official name).
If none are marked accepted, just use the first one.
If they only sent one species, use that."

**What is Array.isArray?**
Checks "Is this a list of things, or just one thing?"

**What is the ? and : symbols?**
This is called a "ternary operator",
a short way to write an if/else:
```
condition ? doThisIfTrue : doThisIfFalse
```

**What is data.find?**
`find` looks through a list and returns the first item that
matches your condition.

Like searching through a deck of cards: "Find me dive sites with soft corals in Maldives"

---

### Lines 37-53: Return the Data
```ts
return NextResponse.json({
  aphiaId: validResult?.AphiaID,
  scientificName: validResult?.scientificname,
  authority: validResult?.authority,
})
```

"Package up all the important information from WoRMS into a neat object
and send it back to whoever asked for it."

**What is the ?. symbol?**
The `?.` is called "optional chaining".
It means "Try to get this value, but if it doesn't exist, don't crash,
just return undefined."

Like saying: "Go to the fridge, if there's a box, if the box has straberries, grab some of them.
If any step fails, just return nothing."

Normal way (crashes if validResult is null):
```ts
validResult.AphiaID // CRASH if validResult doesn't exist
```

Safe way:
```ts
validResult?.AphiaID // Returns undefined if validResult doesn't exist
```

---

### Lines 54-57: Error Handling
```ts
} catch (error) {
  console.error("[WoRMS API] Fetch error:", error)
  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}
```

"If anything went wrong in the try block (network failed, WoRMS sent garbage, whatever),
write the error to the console and tell the user
'Sorry, something broke on our end.'"

**What is catch?**
The safety net for `try`. If try fails, catch runs instead.

**What is error?**
`error` is the mistake that happened. Like a note explaining what broke.

**What is 500?**
Status code 500 means "Server error",
something broke on our side, not the user's fault.

---

## Code Translation: OBIS API Route

Now let's break down `app/api/species/obis/route.ts`:

### Line 1: Import
```ts
import { NextResponse } from "next/server"
```
(Same as WoRMS)

### Line 5: Function
```ts
export async function GET(request: Request) {
```
(Same structure as WoRMS)

### Lines 6-9: Extract Parameters
```ts
const { searchParams } = new URL(request.url)
const scientificName = searchParams.get("scientificName")
const bounds = searchParams.get("bounds") 
const size = searchParams.get("size") || "50"
```

"Someone sent a URL like `?scientificName=Manta Ray&bounds=140,-30,160,-10&size=100`.
Extract each piece of information:
- Scientific name (which species to look for)
- Bounds (area on the map coordinates)
- Size (how many results to get, default to 50 if not specified)"

**What is || "50"?**
The `||` means "OR". It's a fallback:
```ts
searchParams.get("size") || "50"
```
Means: "Get the size parameter, but if it's empty or doesn't exist,
use 50 instead"

Like ordering food: "I'll have the special, OR if they're out,
give me the burger"

---

### Lines 11-13: Validation
```ts
if (!scientificName) {
  return NextResponse.json({ error: "Scientific name is required" }, { status: 400 })
}
```
(Same as WoRMS, we're checking if they told us which species they want)

### Lines 15-19: Build URL Parameters
```ts
try {
  const params = new URLSearchParams({
    scientificname: scientificName,
    size: size,
  })
```

"Create a new URL parameter builder and add the species name and size to it.
This will turn into `?scientificname=Manta Ray&size=50`"

**What is URLSearchParams?**
A tool that builds the `?key=value&key2=value2` part of URLs for you.
Handles encoding automatically.

---

### Lines 21-24: Add Bounding Box
```ts
if (bounds) {
  params.append("geometry", `POLYGON((${bounds}))`)
}
```

"If the user specified which area of the map they're looking at,
add that to the parameters so OBIS only returns sightings in that area.
OBIS wants it formatted as a POLYGON."

**What is append?**
`append` means "add one more parameter to the list"

Like building a sandwich: 
Start with bread,
append cheese,
append tomato,
append lettuce.

**What is POLYGON?**
A geographic shape format.
OBIS uses it to understand "only show me results inside this area"

---

### Lines 26-33: Fetch from OBIS
```ts
const response = await fetch(`https://api.obis.org/occurrence?${params.toString()}`, {
  headers: {
    Accept: "application/json",
  },
  // Cache for 1 hour since occurrence data updates occasionally
  next: { revalidate: 3600 },
})
```
"Go to the OBIS website and ask 'Where have people seen this species?'
Wait for their answer. Save it for 1 hour."

**Why 1 hour instead of 7 days?**
Species sightings (occurrences) get updated more often than taxonomy.
Scientists are constantly adding new observations, so we want fresher data.

3600 seconds = 1 hour

---

### Lines 35-38: Check Response
```ts
if (!response.ok) {
  console.error("[OBIS API] Error:", response.statusText)
  return NextResponse.json({ error: "Failed to fetch from OBIS" }, { status: response.status })
}
```
(Same as WoRMS, we check if the request worked)

### Line 40: Parse Response
```ts
const data = await response.json()
```
(Same as WoRMS, we convert text to JavaScript object)

---

### Lines 42-53: Transform Data
```ts
const occurrences =
  data.results?.map((record: any) => ({
    id: record.id,
    scientificName: record.scientificName,
    decimalLatitude: record.decimalLatitude,
    decimalLongitude: record.decimalLongitude,
    depth: record.depth,
    date: record.eventDate,
    datasetName: record.datasetName,
    occurrenceStatus: record.occurrenceStatus,
  })) || []
```

"OBIS sends back a lot of information we don't need.
Go through each sighting record and extract only the parts we care about:
location (lat/lng), depth, date, etc.
If OBIS didn't send any results, use an empty list []"

**What is map?**
`map` transforms each item in a list into something new.

Real life example:
```
List of corals → map(cook) → List of corals
```

In code:
```
List of OBIS records → map(extract fields) → List of simplified records
```

**What is occurrences?**
"Occurrences" is a scientific term meaning "times and places where someone observed this species"

Like a visitor log: "Manta Ray was seen at Great Barrier Reef on Jan 15, 2026 at 20m depth"

**What is || []?**
Fallback to empty array if `data.results?.map(...)` fails or returns undefined.

`[]` means empty list (no items)

---

### Lines 55-58: Return Formatted Data
```ts
return NextResponse.json({
  total: data.total || 0,
  occurrences: occurrences,
})
```

"Send back two things:
1. Total number of sightings found
2. The list of sightings with location, depth, date

If OBIS didn't tell us the total, say 0."

---

### Lines 59-62: Error Handling
```ts
} catch (error) {
  console.error("[OBIS API] Fetch error:", error)
  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}
```
(Same as WoRMS, safety net if anything breaks)

---

## Complete Function Glossary

### 1. async function
**What it is:** A function that can wait for slow things without freezing everything else
**Real life:** Ordering at a drive-thru, you place your order and pull forward while they make it

### 2. await
**What it is:** "Wait for this to finish before moving on"
**Real life:** Waiting for the microwave to beep before taking out your food

### 3. const
**What it is:** A labeled container that can't be swapped out
**Real life:** A jar labeled "Cookies", you can eat the cookies, but the jar stays the same

### 4. try / catch
**What it is:** "Try this risky thing, and if it breaks, do this backup plan"
**Real life:** "Try to open the jar. If it's stuck, use a towel for grip"

### 5. if statement
**What it is:** Ask a yes/no question, do different things based on the answer
**Real life:** "If it's raining, bring an umbrella. Otherwise, don't."

### 6. return
**What it is:** "Stop everything and send this answer back"
**Real life:** Answering a question and ending the conversation

### 7. fetch()
**What it is:** Ask another website for information
**Real life:** Calling a store to ask "Do you have this in stock?"

### 8. response
**What it is:** The answer you got back from fetch()
**Real life:** The store employee answering your question

### 9. .json()
**What it is:** Convert text into organized data (objects with names and values)
**Real life:** Taking a messy pile of papers and putting them in labeled folders

### 10. NextResponse.json()
**What it is:** Package data in a special envelope and send it back
**Real life:** Putting a letter in an addressed envelope before mailing it

### 11. console.error()
**What it is:** Write a note for developers to see (hidden from users)
**Real life:** Leaving a sticky note for yourself about what went wrong

### 12. Array.isArray()
**What it is:** Check if something is a list or just one item
**Real life:** "Am I looking at a pack of gum or a single piece?"

### 13. .map()
**What it is:** Transform each item in a list into something new
**Real life:** Taking a list of ingredients and cooking them into meals

### 14. .find()
**What it is:** Search through a list until you find what you're looking for
**Real life:** Looking through your closet for your favorite shirt

### 15. Optional chaining (?.)
**What it is:** "Try to get this value, but don't crash if it doesn't exist"
**Real life:** "Check the fridge for milk, but if there's no fridge, just say 'no milk'"

### 16. OR operator (||)
**What it is:** "Use this value, or if it's empty, use this backup"
**Real life:** "Order the special, or if they're out, get the burger"

### 17. Ternary operator (? :)
**What it is:** Short way to write if/else
**Real life:** "Raining? Umbrella : No umbrella"

### 18. encodeURIComponent()
**What it is:** Convert text to be safe for URLs (spaces → %20)
**Real life:** Addressing an envelope - can't have weird characters

### 19. URLSearchParams
**What it is:** Tool to build the `?key=value&key2=value2` part of URLs
**Real life:** Filling out a form with multiple fields

### 20. occurrences
**What it is:** Scientific term for "times/places where something was observed"
**Real life:**Dive atlas - records of dive sites

---

## Summary: API Routes in Our App

```
User clicks species marker
         ↓
Component calls /api/species/worms?name=Manta Ray
         ↓
Next.js route checks cache (is data less than 7 days old?)
         ↓
If cached: Return immediately (fast!)
If not cached: Fetch from WoRMS → Cache → Return (slow first time, fast after)
         ↓
Component displays species data





