# export const dynamic = "force-dynamic";

// Opt out of caching for an entire route:
// Create a layout.js file in the route directory and set dynamic = 'force-dynamic':what it will doEditCertainly. Let's dive deeper into what happens when you opt out of caching for an entire route using dynamic = 'force-dynamic' in a layout.js file:
// When you create a layout.js file in a route directory with dynamic = 'force-dynamic', it does the following:

// Dynamic Rendering: Every request to this route and its nested routes will be dynamically rendered on the server. This means the server will generate the HTML for each request, rather than serving cached or statically generated content.
// No Caching: The route will not use any cached data. Each request will fetch fresh data, ensuring that the content is always up-to-date.
// Server-Side Rendering (SSR): All components in this route will be rendered on the server for each request, allowing you to access request-specific information like cookies or headers.
// Nested Routes: This setting affects not just the current route, but all nested routes beneath it in the file structure.

// Here's an example of how you might set this up:
// javascriptCopy// app/dashboard/layout.js

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }) {
return <div>{children}</div>
}
// In this example:

// All routes under /dashboard (e.g., /dashboard, /dashboard/settings, /dashboard/profile) will be dynamically rendered.
// Each request to these routes will trigger new data fetches, ignoring any cached data.
// You can access request-specific information in any component under this layout.

// Use cases for this approach include:

// Real-time data: When you need to ensure users always see the most up-to-date information, such as in a stock trading dashboard or live chat application.
// Personalized content: If the content varies significantly based on user data or session information.
// Frequently changing data: When your data changes so often that caching would be counterproductive.
// Debugging: During development, when you want to ensure you're always seeing the latest changes.

// However, it's important to note that using force-dynamic can impact performance and increase server load, as each request requires server-side rendering and fresh data fetching. It should be used judiciously, balancing the need for real-time data against performance considerations.
// Would you like me to explain how this compares to other caching strategies or dive deeper into any specific aspect?


// # Control caching for fetch requests:
// You can use the cache and next.revalidate options in the fetch function to control caching behavior:
async function getData() {
const res = await fetch('https://api.example.com/data', {
cache: 'no-store', // Disable caching
// or
next: { revalidate: 60 } // Revalidate every 60 seconds
})
return res.json()
}

export default async function Page() {
const data = await getData()
return <main>{/_ Use data _/}</main>
}

// # Use Route Segment Config:

// You can add a loading.js file to a route segment to control caching behavior for that segment:

// export const revalidate = 60 // Revalidate this segment every 60 seconds

export default function Loading() {
return <p>Loading...</p>
}


// # Dynamic rendering:
// Force dynamic rendering for a route segment by adding a dynamic = 'force-dynamic' export:

export const dynamic = 'force-dynamic'

export default async function Page() {
const data = await getData()
return <main>{/_ Use data _/}</main>
}


// # Opt out of caching for an entire route:
// Create a layout.js file in the route directory and set dynamic = 'force-dynamic':

 const dynamic = 'force-dynamic'

export default function Layout({ children }) {
  return <div>{children}</div>
}


// # Use cookies or headers for dynamic content:
// If you need to vary content based on user-specific data, use cookies or headers:

import { cookies, headers } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const headersList = headers()
  
  const theme = cookieStore.get('theme')
  const userAgent = headersList.get('user-agent')

  // Fetch data based on theme or user agent
  const data = await getData(theme, userAgent)

  return <main>{/* Use data */}</main>
}


// Clear server-side cache programmatically:

// For cases where you need to clear the cache programmatically, you can use the revalidatePath or revalidateTag functions:

import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateData() {
  await updateDatabase()
  revalidatePath('/data')
  // or
  revalidateTag('data-tag')
}
