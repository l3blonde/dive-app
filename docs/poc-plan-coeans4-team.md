# POC Plan - Ocean's 4 Team
## Proof of Concept for Future Seafolio App Features

**Team:** Ocean's 4  
**Project:** Seafolio Dive App  
**Document Purpose:** POC Plan for testing 3 advanced features
before full implementation

---

## Overview

This document outlines our Proof of Concept (POC) plan for three major features
we want to add to Seafolio app in the future.
Since we're still learning and these are complex features,
we're starting with basic tests to see if they're even possible
before building fancy UIs and the real app.

**Important Note:**
For POC testing, we're keeping the frontend super simple
(basic HTML forms, black text on white background, maybe some buttons).
The goal is to test if the technology works, not to make it pretty yet.

---

## POC 1: Bluetooth Sync with Dive Computer/Smartwatch

### What We Want to Test

Can we sync dive logs with our app viw Bluetooth?
How can we connect a smartwatch or dive computer to our web app
and pull dive data automatically?
Most dive computers use Bluetooth Low Energy (BLE) to communicate?

### Hardware Requirements

- **Test Device Options:**
    - Android SmartWatch / Gear (easiest to test with)
    - Apple Watch or Samsung Galaxy Watch (if we can borrow)
    - Actual dive computer (if we can borrow one)
    - Any camera
    - Actual underwater camera (if we can borrow one)

- **What the device needs:**
    - Bluetooth 4.0+ support
    - Ability to pair with computer/phone
    - Some kind of fitness/dive data we can read

### Technical Architecture

#### Frontend (Web Browser)
```
User clicks "Connect Device" button
  ↓
Web Bluetooth API requests device
  ↓
User selects device from browser popup
  ↓
Browser connects via Bluetooth
  ↓
Frontend requests specific data
(heart rate, depth, time)
  ↓
Data received → send to backend
```

**Technology:** Web Bluetooth API
(Chrome/Edge only, doesn't work on Firefox or Safari yet)

**Frontend Code Structure:**
- `bluetooth-connect.html`
Simple page with "Connect" button
- `bluetooth-handler.js`
- Handles Web Bluetooth API calls
- Shows connection status (Connected/Disconnected)
- Displays raw data received from device

#### Backend (Next.js API Routes)
```
POST /api/bluetooth/sync
  ↓
Receive dive data from frontend
  ↓
Parse and validate the data
  ↓
Store in Supabase database
  ↓
Return success/error response
```

**API Route:** `/app/api/bluetooth/sync/route.ts`

#### Database Schema Addition

```sql
ALTER TABLE dive_logs ADD COLUMN device_name TEXT;
ALTER TABLE dive_logs ADD COLUMN device_type TEXT;
ALTER TABLE dive_logs ADD COLUMN sync_method TEXT DEFAULT 'bluetooth';
```

### Communication Protocol

**Web Bluetooth API → Browser → Our Frontend → HTTP POST → Backend API → Supabase**

1. **Bluetooth Layer:** 

2. **HTTP Layer:** Frontend sends JSON to backend

3. **Database Layer:** Backend inserts into Supabase using PostgreSQL

### Test Plan

**Phase 1: Basic Connection Test**
- Can we connect to a device at all?
- Can we read ANY data from it?
- Does the connection stay stable?

**Phase 2: Data Extraction Test**
- Can we identify which data is what? (heart rate vs depth vs time)
- Can we parse it correctly?
- Test with 5-10 connection attempts - success rate?

**Phase 3: Sync Test**
- Can we send the data to our backend?
- Does it save correctly in the database?
- How fast is the whole process?

**Success Criteria:**
- [ ] Successfully connect to device 80% of the time
- [ ] Read at least one type of data correctly
- [ ] Store data in database without errors
- [ ] Complete sync in under 10 seconds

**Potential Issues We Expect:**
- Web Bluetooth API only works on certain browsers
- Smartwatches might not expose dive-related data
- Different devices use different data formats (no standard)
- Connection might drop randomly

---

## POC 2: Marine Species ID with AI

### What We Want to Test

Can we take a photo of a fish and have AI tell us what species it is?
Plus give us cool info about it
(scientific name, habitat, fun facts, danger level).

### AI API Options

**Option 1: Google Gemini Vision API**
- **Pros:** Good at image recognition, has free tier
- **Cons:** Need Google Cloud account, might have rate limits
- **Cost:** Free tier = 60 requests/minute

**Option 2: OpenAI GPT-4 Vision API**
- **Pros:** Very accurate, can give detailed explanations
- **Cons:** Costs money ($0.01 per image), need API key
- **Cost:** ~$1 for 100 images

**Option 3: Custom Model (TensorFlow/PyTorch)**
- **Pros:** Free once trained, we control everything
- **Cons:** Need to train it ourselves (hard) or cloud, need lots of fish photos
- **Cost:** Free but LOTS of time

**Decision for POC:** 
We'll first test both Gemini and GPT-4 Vision, compare accuracy, then pick one.

### Technical Architecture

#### Frontend (Simple Test Page)
```
User uploads image (or takes photo)
  ↓
Show loading spinner
  ↓
Send image to backend API
  ↓
Wait for response
  ↓
Display results:
  - Species name
  - Scientific name
  - AI confidence %
  - Info about the species
```

**Frontend Files:**
- `species-id-test.html`
Upload form
- `species-id.js`
- Handles image upload
- Shows results in plain text

```html
<!-- Super basic POC frontend -->
<input type="file" id="fishPhoto" accept="image/*">
<button onclick="identifySpecies()">Identify Species</button>
<div id="results"></div>
```

#### Backend (Next.js API Route)

**Flow Diagram:**
```
POST /api/species/identify
  ↓
Receive image from frontend
  ↓
Convert image to base64
  ↓
Send to AI API (Gemini or GPT-4)
  ↓
Parse AI response
  ↓
Cross-reference with WoRMS database for scientific name
  ↓
Return structured data
```

**API Route:** `/app/api/species/identify/route.ts`


### Communication Protocol

**Image Upload → Frontend → Backend API → AI API → WoRMS API → Database → Frontend**

1. **Image Upload:**
    - User selects image file
    - Frontend sends via FormData (multipart/form-data)
    - Max size: 5MB

2. **AI API Call:**
    - Backend converts image to base64
    - POST request to Gemini/GPT-4 with image + prompt
    - Receives JSON response with species info

3. **WoRMS Integration:**
    - GET request to AphiaId, WoRMS API
    - Receives taxonomic classification
    - Cross-reference to ensure accuracy

4. **Database Storage:**
    - Store identified species in `marine_species` table if not exists
    - Link to user's dive log if photo is from a dive

### Test Plan

**Phase 1: AI Accuracy Test**
- Collect 20 test images of known fish species
- Run through both Gemini and GPT-4
- Compare results vs reality
- Calculate accuracy percentage

**Test Images:**
- 5 easy fish (clownfish, lionfish, angelfish)
- 5 medium (parrotfish, grouper, moray eel)
- 5 hard (similar looking species, juvenile fish)
- 5 trick images (not fish - coral, rocks, plants)

**Phase 2: Response Time Test**
- Measure how long each API takes
- Test with different image sizes
- Test with slow internet connection

**Phase 3: Cost Analysis**
- Track API call costs
- Calculate cost per identification
- Decide if it's sustainable for real users

**Success Criteria:**
- [ ] AI correctly identifies species 70%+ of the time
- [ ] Response time under 5 seconds
- [ ] Cost under $0.05 per identification
- [ ] Can handle underwater photos (blurry, blue tint)

**Potential Issues We Expect:**
- AI might struggle with similar-looking species
- Underwater photos are harder (lighting, clarity)
- Scientific names might not match WoRMS exactly
- Cost could be too high for many users


If we switch from Gemini to GPT-4,
we ONLY change the AI Module,
so we will test other models too.
Image processing and database don't care which AI we use.

---

## POC 3: Auto-Generate Dive Reels

### What We Want to Test

Can we automatically create a cool video reel from multiple dive photos/videos?
Like how Polarsteps creates travel videos, but for diving.

**Input:** 10-20 photos + 3-5 video clips from different dives  
**Output:** 60-second cinematic reel with transitions, music, and dive info overlays

### Research on Video APIs

**Option 1: Cloudinary Video API**
- **What it does:** Video transformations, overlays, effects
- **Pros:** Easy to use, good documentation, has free tier
- **Cons:** Limited free tier (25 GB storage, 25 GB bandwidth/month)
- **Cost:** Free tier then $0.10/GB
- **Can it do:** Yes - transitions, overlays, trim, merge clips

**Option 2: FFmpeg (via Remotion)**
- **What it does:** Create videos with React components
- **Pros:** Full control, can do anything, open source
- **Cons:** Complex, need to learn Remotion, render time can be slow
- **Cost:** Free but needs rendering server
- **Can it do:** Yes - everything we want

**Option 3: Shotstack API**
- **What it does:** Video editing API specifically for auto-generation
- **Pros:** Built for this exact use case, has templates
- **Cons:** Paid service, minimum plan $49/month
- **Cost:** $49/month minimum
- **Can it do:** Yes - perfect for our needs but expensive

**Option 4: OpenAI DALL-E + MoviePy**
- **What it does:** Generate images with AI + Python video library
- **Pros:** Creative control, can generate missing content
- **Cons:** Complex pipeline, need Python backend
- **Cost:** AI generation costs money
- **Can it do:** Partially - good for stills, harder for video

**Decision for POC:** We'll test **Cloudinary** first (easiest), then try **Remotion** if we need more control.

### Technical Architecture

#### Frontend (Test Interface)
```
User selects photos/videos
  ↓
Upload to Vercel Blob storage
  ↓
Click "Generate Reel" button
  ↓
Show progress bar
  ↓
Display generated video
  ↓
Option to download
```

**Frontend Files:**
- `reel-generator-test.html` - Upload interface
- `reel-creator.js` - Handles file upload and API call
- Shows video player when done

#### Backend Architecture (Two Approaches)

**Approach A: Using Cloudinary**

```
POST /api/reels/generate
  ↓
Receive image/video URLs
  ↓
Upload media to Cloudinary
  ↓
Create transformation script:
  - Order clips chronologically
  - Add transitions (fade, slide)
  - Overlay dive info (date, location)
  - Add background music
  ↓
Cloudinary processes video
  ↓
Return video URL
```

**Approach B: Using Remotion (More Control)**

```
POST /api/reels/generate
  ↓
Receive media URLs
  ↓
Create Remotion composition:
  - Map images/videos to React components
  - Define transitions with animations
  - Add text overlays with dive data
  - Sync with audio track
  ↓
Render video (takes 30-60 seconds)
  ↓
Upload to Vercel Blob
  ↓
Return video URL
```

#### Reel Structure

**60-Second Reel Breakdown:**

```
0-5s: Intro
  - App logo/name
  - Text: "Dive Log Compilation"
  
5-10s: Dive 1
  - Location overlay
  - Date
  - 2-3 best photos with smooth transitions
  
10-20s: Dive 2
  - Same structure
  
20-30s: Dive 3
  - Same structure
  
30-50s: Best moments montage
  - Quick cuts of coolest species
  - Fun fact overlays
  
50-60s: Outro
  - Total dive stats (# dives, # species seen)
  - "Made with Seafolio" branding
```

### API Route Structure

**File:** `/app/api/reels/generate/route.ts`
```

### Test Plan

**Phase 1: Basic Generation Test**
- Use 5 test images + 2 test videos
- Try to generate a simple 30-second reel
- Does it work at all?
- How long does it take?

**Phase 2: Quality Test**
- Test different transition effects
- Test with various image qualities
- Test with underwater footage (blue tint, darkness)
- Get feedback from 5 testers - does it look good?

**Phase 3: Performance Test**
- Generate reel with 20 images - how long?
- Generate reel with 5 videos - how long?
- Server load during rendering
- Cost per reel generation

**Phase 4: Automation Test**
- Can we auto-select best photos (based on focus, lighting)?
- Can we auto-sync music to transitions?
- Can we add species name overlays automatically?

**Success Criteria:**
- [ ] Successfully generate a 60-second reel
- [ ] Rendering time under 2 minutes
- [ ] Video quality good enough for social media (1080p)
- [ ] Cost under $1 per reel
- [ ] Transitions look smooth (not jarring)

---

### Communication Protocols Summary

**Frontend ↔ Backend:**
- Protocol: HTTPS
- Format: JSON
- Methods: GET, POST
- Authentication: JWT tokens (Supabase Auth)

**Backend ↔ Supabase:**
- Protocol: PostgreSQL wire protocol
- Connection: Direct database connection
- Authentication: Service role key

**Backend ↔ AI APIs:**
- Protocol: HTTPS/REST
- Format: JSON with base64 images
- Authentication: API keys in headers

**Backend ↔ WoRMS:**
- Protocol: HTTPS/REST
- Format: JSON
- Authentication: None (public API)

**Backend ↔ Cloudinary:**
- Protocol: HTTPS/REST
- Format: JSON + multipart/form-data
- Authentication: API key + secret

---

## Testing Timeline (4 days min)

### Day 1: Bluetooth POC
- Step 1: Set up Web Bluetooth API, test connection
- Step 2: Parse device data, test with smartwatch
- Step 3: Send data to backend, save to database
- Step 4: Document results, calculate success rate

### Day 2: Species ID POC
- Step 5: Set up Gemini API, test with 5 images
- Step 6: Set up GPT-4 API, test with same images
- Step 7: Compare results, choose winner
- Step 8: Integrate WoRMS API for scientific names
- Step 9: Document accuracy, costs, response times

### Day 3: Reel Generator POC
- Step 10: Research Cloudinary, set up account
- Step 11: Test basic video generation (5 images)
- Step 12: Test with real dive photos and videos
- Step 13: Optimize quality and transitions
- Step 14: Document costs, rendering times, quality

### Day 4: Documentation & Decision
- Review all POC results
- Calculate total costs for real implementation
- Decide which features to build first
- Create technical spec for chosen features
- Update project roadmap

---

## Expected Outcomes & Decisions

### Bluetooth Sync
**If successful (>80% connection rate):**
- Implement in the app
- Research more dive computer brands

**If unsuccessful:**
- Consider alternative: Manual QR code sync
- Or: Partner with dive computer manufacturers
- Or: Skip feature entirely, focus on manual entry

### Species ID
**If successful (>70% accuracy):**
- Implement in the app
- Add to dive log entry flow

**If unsuccessful:**
- Fallback: Manual species selection from database
- Consider training custom model later
- Partner with marine biology researchers for dataset

### Reel Generator
**If successful (good quality, <$1 per reel):**
- Implement in the app
- Create reel templates
- Allow customization (music, length, style, message)

**If unsuccessful (too expensive or slow):**
- Simplify to photo collage instead
- Or: Only generate on demand (not real-time)
- Or: Skip video, focus on static dive reports

---

## Architecture We Want to Principles Applied
(based on "the Progmatic Programmer" by Andrew Hunt and David Thomas, 2025)

### DRY (Don't Repeat Yourself)

**What we're doing:**
- Creating reusable service modules (bluetooth-service, ai-service, video-service)
- One database schema used by all features
- Shared authentication across all POCs
- Common error handling utilities

**Why it matters:**
- If Supabase API changes, we update ONE file, not 20
- If we add new AI provider, we update ONE service
- Less code = fewer bugs

### Orthogonality

**What we're doing:**
- Each API route handles ONE feature
- Database tables are independent (bluetooth data doesn't mix with AI data)
- Frontend pages are separate for each POC
- Services don't depend on each other

**Why it matters:**
- If Species ID breaks, Bluetooth Sync still works
- We can test each feature independently
- We can deploy features separately
- Team members can work on different POCs without conflicts
---

## Next Steps After POC

1. **Document all test results**
    - Create spreadsheet with success rates
    - Note all issues encountered
    - List all costs

2. **Team meeting to review**
    - Present POC results
    - Discuss which features to pursue
    - Vote on priorities

3. **Start UI design for chosen features**
    - Only after POC proves it works
    - Create the real app based on Figma prototypes
    - Get user feedback

---

## Questions We Need to Answer During POC

### Bluetooth
- [ ] Does Web Bluetooth API work on mobile browsers?
- [ ] Can we access dive computer data?
- [ ] Do we need native apps instead?

### Species ID
- [ ] Is AI accurate enough to be useful?
- [ ] Can we afford the API costs for many users?
- [ ] Do we need to train our own model?

### Reels
- [ ] How users want this feature to be?
- [ ] Should we let users edit the reel or auto-only?

---

**End of POC Plan**

*Deadline to submit POC: 14/01/2026
*Send for tom for review before the deadline
*Ocean's 4 Team - Seafolio Project, Thomas More 2025*
