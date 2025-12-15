# Layout Architecture Guide

This document explains the core layout structure of the Seafolio Dive App,
breaking down every line of code in our key files:
`layout.tsx`,
`page.tsx`,
`globals.css`.

---

## File 1: app/layout.tsx

This is the root layout component that wraps every page in our application.
It runs on the server by default.

### Line-by-Line Explanation:

\`\`\`tsx
import type React from "react"
\`\`\`
Import the React type definitions so TypeScript knows what React components are.
The `type` keyword means we're only importing types, not actual code, which keeps the bundle smaller.

\`\`\`tsx
import type { Metadata } from "next"
\`\`\`
Import the Metadata type from Next.js.
This tells TypeScript what properties are valid for page metadata like
title, description, icons, etc.

\`\`\`tsx
import "./globals.css"
\`\`\`
Load the global CSS file that contains all our Tailwind CSS configuration,
design tokens (colors, spacing), and custom styles.
This CSS applies to every page.

\`\`\`tsx
import "mapbox-gl/dist/mapbox-gl.css"
\`\`\`
Load Mapbox's CSS file which contains all the styles needed for
the interactive map (markers, controls, popups, zoom buttons).
Without this, the map would look broken.

\`\`\`tsx
export const metadata: Metadata = {
\`\`\`
Create and export a metadata object.
Next.js automatically reads this and injects it into the HTML `<head>` tag for SEO and browser features.

\`\`\`tsx
title: "Seafolio Dive App",
\`\`\`
Set the browser tab title and the title that appears in Google search results.

\`\`\`tsx
description: "Discover amazing dive sites and marine species",
\`\`\`
Set the meta description that appears in search engine results below the title. Good for SEO.

\`\`\`tsx
icons: {
\`\`\`
Define the icons that appear in browser tabs, bookmarks,
and when users save the app to their home screen.

\`\`\`tsx
icon: [
{
url: "/icon-light-32x32.png",
media: "(prefers-color-scheme: light)",
},
\`\`\`
Show this icon when the user's system is set to light mode.
The browser automatically chooses the right icon based on user preferences.
!!! We need to create it.

\`\`\`tsx
{
url: "/icon-dark-32x32.png",
media: "(prefers-color-scheme: dark)",
},
\`\`\`
Show this icon when the user's system is set to dark mode.
!!! We need to create it.

\`\`\`tsx
{
url: "/icon.svg",
type: "image/svg+xml",
},
\`\`\`
Provide a vector (SVG) icon that scales to any size without losing quality.
Browsers that support SVG will use this.
!!! We need to create it.

\`\`\`tsx
],
apple: "/apple-icon.png",
},
}
\`\`\`
Special icon for Apple devices (iPhone, iPad)
when users save the website to their home screen.
!!! We need to create it.

\`\`\`tsx
export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode
}>) {
\`\`\`
Define the RootLayout function component.
The `children` prop contains whatever page content Next.js wants to display.
`Readonly` means the children prop can't be modified.
`React.ReactNode` means children can be any valid React content (text, components, HTML elements).

\`\`\`tsx
return (
<html lang="en">
\`\`\`
Create the root HTML element and set the language to English.
This helps screen readers pronounce text correctly and helps search engines
understand the content language.

\`\`\`tsx
<body className={`font-sans antialiased`} suppressHydrationWarning>
\`\`\`
Create the body element with two CSS classes: `font-sans` applies our sans-serif font,
and `antialiased` smooths text rendering on macOS/iOS.
The `suppressHydrationWarning` attribute tells React to ignore minor differences between
server-rendered HTML and client-rendered HTML (needed for Mapbox which only runs in the browser).

\`\`\`tsx
{children}
\`\`\`
Insert the page content here.
Next.js automatically replaces this with the current page component
like our Home page with the dive map.

\`\`\`tsx
</body>
</html>
)
}
\`\`\`
Close all the HTML tags and finish the component.

### Key Functions Used:

**RootLayout():** The main function that wraps every page. It sets up the HTML structure, loads global CSS, and defines metadata for SEO.

**What is metadata?** Information about your website that search engines and browsers use. Includes page title, description, and icons.

**What is mapbox-gl.css?** The CSS file from Mapbox that styles the interactive map components (zoom controls, markers, popups).

**What is children?** A special React prop that represents the page content Next.js wants to display inside this layout.

**What is Readonly<React.ReactNode>?** A TypeScript type meaning the children prop is read-only and can contain any valid React content (components, text, HTML).

**What is antialiased?** A Tailwind CSS class that smooths text rendering, making fonts look cleaner on screens.

**What is suppressHydrationWarning?** An attribute that tells React to ignore warnings when server HTML doesn't exactly match client HTML. Necessary for our app because Mapbox only runs in the browser, not on the server.

---

## File 2: app/page.tsx

This is the home page component that displays the dive map.
It runs on the client (browser) because the map needs browser APIs.

### Line-by-Line Explanation:

\`\`\`tsx
"use client"
\`\`\`
Tell Next.js this component must run in the browser, not on the server.
Required because Mapbox needs browser APIs like `window` and `navigator` which don't exist on the server.

\`\`\`tsx
import dynamic from "next/dynamic"
\`\`\`
Import Next.js's dynamic import function.
This lets us load components only when needed and skip server-side rendering.

\`\`\`tsx
const DiveMap = dynamic(() => import("@/components/dive-map").then((mod) => ({ default: mod.DiveMap })), {
\`\`\`
Create a dynamically imported version of the DiveMap component.
The `@/components/dive-map` path loads the file,
and `.then((mod) => ({ default: mod.DiveMap }))` extracts the named export `DiveMap` from that file.

\`\`\`tsx
ssr: false,
\`\`\`
Disable server-side rendering (SSR) for this component.
The map will only load in the browser because Mapbox requires browser APIs.

\`\`\`tsx
loading: () => (
\`\`\`
Define what to show while the DiveMap component is loading.

\`\`\`tsx
<div className="flex h-screen items-center justify-center bg-blue-50">
\`\`\`
Create a full-screen container
with light blue background
centered content using flexbox 

\`\`\`tsx
<div className="text-center">
\`\`\`
Create a centered text container for the loading message.

\`\`\`tsx
<div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto"></div>
\`\`\`
Create a spinning loader circle. It's 48px × 48px (h-12 w-12),
has a blue border on 3 sides, transparent on top (to create spinner effect),
spins infinitely, and is centered horizontally.

\`\`\`tsx
<p className="text-sm text-gray-600">Loading map...</p>
\`\`\`
Show "Loading map..." text in small gray font while the map loads.

\`\`\`tsx
export default function Home() {
return <DiveMap />
}
\`\`\`
Define the Home page component. It simply returns the DiveMap component,
which displays the full-screen interactive map.

### Key Functions Used:

**Home():** The main page component that Next.js displays when users visit the root URL (/).

**dynamic():** Next.js function for lazy loading components. Used to load DiveMap only in the browser, not during server-side rendering.

**Why ssr: false?** Mapbox requires browser APIs (window, navigator, DOM)
that don't exist on the server. Setting `ssr: false` prevents Next.js
from trying to render the map on the server.

---

## File 3: app/globals.css

This file contains all global styles, Tailwind CSS configuration, and design tokens (colors, spacing).

### Line-by-Line Explanation:

\`\`\`css
@import "tailwindcss";
\`\`\`
Load Tailwind CSS v4. This gives us utility classes like `flex`, `bg-blue-500`, `p-4`, etc.

\`\`\`css
@import "mapbox-gl/dist/mapbox-gl.css";
\`\`\`
Load Mapbox's CSS styles for the map interface (controls, popups, markers).

\`\`\`css
@custom-variant dark (&:is(.dark *));
\`\`\`
Define a custom Tailwind variant for dark mode.
This tells Tailwind how to detect when dark mode is active.

\`\`\`css
:root {
\`\`\`
Define CSS variables for the light theme.
These apply when the user's system is in light mode or no theme is set.

\`\`\`css
--background: oklch(1 0 0);
\`\`\`
Set the main background color to pure white using OKLCH color space (a modern color format).
Format is: oklch(lightness chroma hue).

\`\`\`css
--foreground: oklch(0.145 0 0);
\`\`\`
Set the main text color to very dark gray (almost black).

\`\`\`css
--card: oklch(1 0 0);
--card-foreground: oklch(0.145 0 0);
\`\`\`
Card colors: white background, dark text.

\`\`\`css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
\`\`\`
Primary button/accent colors: dark background, light text.

\`\`\`css
--destructive: oklch(0.577 0.245 27.325);
\`\`\`
Red color for delete buttons and error messages.

\`\`\`css
--radius: 0.625rem;
\`\`\`
Default border radius for rounded corners (10px). Used on cards, buttons, inputs.

\`\`\`css
.dark {
\`\`\`
Define CSS variables for dark theme.
These override the light theme values when dark mode is active.

\`\`\`css
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
\`\`\`
In dark mode: background is dark, text is light (opposite of light mode).

\`\`\`css
@theme inline {
\`\`\`
Configure Tailwind CSS v4 to use our custom CSS variables.
This connects our design tokens to Tailwind utility classes.

\`\`\`css
--color-background: var(--background);
\`\`\`
Map the `--background` CSS variable to Tailwind's `bg-background` class.
Now `bg-background` automatically uses the right color for light/dark mode.

\`\`\`css
@layer base {
\`\`\`
Define base styles that apply to all elements before any component styles.

\`\`\`css
* {
  @apply border-border outline-ring/50;
  }
  \`\`\`
Apply default border and outline colors to all elements for consistency.

\`\`\`css
body {
@apply bg-background text-foreground;
}
\`\`\`
Set the body to use our design token colors (automatically switches in dark mode).

\`\`\`css
html,
body {
@apply h-full w-full;
}
\`\`\`
Make the HTML and body elements fill the entire viewport height and width.
Essential for full-screen map.

\`\`\`css
.mapboxgl-ctrl-group {
background: white !important;
box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1) !important;
border-radius: 4px !important;
}
\`\`\`
Style Mapbox control buttons (zoom, compass, geolocate) with white background, subtle shadow,
and rounded corners.

\`\`\`css
.mapboxgl-ctrl-logo,
.mapboxgl-ctrl-attrib,
.mapboxgl-ctrl-attrib-button {
display: none !important;
opacity: 0 !important;
visibility: hidden !important;
}
\`\`\`
Hide the Mapbox logo and attribution text from the map interface.

\`\`\`css
.hide-scrollbar::-webkit-scrollbar {
display: none;
}
.hide-scrollbar {
-ms-overflow-style: none;
scrollbar-width: none;
}
\`\`\`
Hide scrollbars on elements with the `hide-scrollbar` class.
Used for the horizontal species carousel.

---

## Tailwind CSS Root Colors Explained

### What are design tokens?

Design tokens are CSS variables that store your brand colors, spacing, and other design values in one place.
When you want to change a color site-wide, you only update the token, not hundreds of CSS classes.

### How do we use them?

Instead of writing `bg-white` or `bg-blue-500`, we write `bg-background` or `bg-primary`.
These classes automatically use the correct color from our design tokens and switch between light and dark mode.

### Where shall we put brand colors?

**Option 1: We will replace existing tokens with brand colours** 

Edit `globals.css` in the `:root` section.
For example, to make our primary brand color ocean blue:

\`\`\`css
:root {
--primary: oklch(0.5 0.15 230);  /* Ocean blue */
--primary-foreground: oklch(1 0 0);  /* White text on blue */
}
\`\`\`

**Option 2: Add custom brand tokens**

Add new CSS variables in `:root`:

\`\`\`css
:root {
--brand-ocean: oklch(0.5 0.15 230);
--brand-coral: oklch(0.7 0.2 30);
--brand-sand: oklch(0.9 0.05 80);
}
\`\`\`

Then map them to Tailwind in `@theme inline`:

\`\`\`css
@theme inline {
--color-ocean: var(--brand-ocean);
--color-coral: var(--brand-coral);
--color-sand: var(--brand-sand);
}
\`\`\`

So we can use `bg-ocean`, `text-coral`, `border-sand` in our components.

### OKLCH Color Format

OKLCH is a modern color space that's more perceptually uniform than RGB or HSL.

Format: `oklch(lightness chroma hue)`
- **Lightness:** 0 (black) to 1 (white)
- **Chroma:** 0 (gray) to 0.4 (very saturated)
- **Hue:** 0-360 degrees (0=red, 120=green, 240=blue)

Example: `oklch(0.7 0.15 230)` = Medium light, slightly saturated, blue

Convert colors using: https://oklch.com

---

## What is suppressHydrationWarning?

### The Problem:

Next.js renders HTML on the server first,
then "hydrates" it in the browser (attaches JavaScript event listeners).
React expects the server HTML to exactly match the client HTML.
If they differ, React shows a warning.

Our app has this issue because:
1. Mapbox only runs in the browser (needs `window` API)
2. Server renders the page without Mapbox
3. Browser renders with Mapbox
4. HTML is slightly different → warning

### The Solution:

`suppressHydrationWarning` tells React "I know these don't match, it's intentional."
It prevents the warning without breaking functionality.

**When shall we use it:**
- Client-only components (maps, charts)
- Date/time displays (server and client may have different timezones)
- Dark mode toggles (user preference is browser-only)

**When NOT to use it:**
- Normal React components
- Server-rendered content

---

## Summary

**layout.tsx:** Root wrapper for all pages. Sets up HTML structure, loads global CSS, defines metadata for SEO.

**page.tsx:** Home page component. Displays the dive map using dynamic import to skip server-side rendering.

**globals.css:** Global styles, Tailwind configuration, design tokens (colors, spacing), Mapbox customization.

**Brand colors:** We'll add them later to `:root` in globals.css using OKLCH format, then map to Tailwind classes in `@theme inline`.

**antialiased:** Tailwind class that smooths text rendering for better readability.

**suppressHydrationWarning:** Prevents React warnings when server and client HTML differ (needed for Mapbox).

**Home() function:** The main page component that returns the DiveMap.

**RootLayout() function:** The root layout component that wraps all pages and sets up the HTML structure.
