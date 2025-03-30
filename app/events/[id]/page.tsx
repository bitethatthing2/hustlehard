import { notFound } from 'next/navigation';
import { eventsData } from '../eventsData';
import EventPageClient from './EventPageClient';

// Define params type for Netlify Edge
interface Params {
  id: string;
}

// Props type following Next.js + Netlify Edge pattern
interface PageProps {
  params: Params;
}

// Server Component for Edge runtime
export default async function EventPage({ params }: PageProps) {
  // Destructure id from params
  const { id } = params;

  // Find the current event
  const event = eventsData.find(e => e.id === id);

  // If event not found, show 404
  if (!event) {
    notFound();
  }

  // Get related events (excluding current event)
  const relatedEvents = eventsData
    .filter(e => e.id !== id)
    .slice(0, 3); // Limit to 3 related events

  return <EventPageClient event={event} relatedEvents={relatedEvents} />;
}

// Generate static params for all events
export async function generateStaticParams(): Promise<Params[]> {
  return eventsData.map((event) => ({
    id: event.id,
  }));
}

// Configure for Netlify Edge
export const runtime = 'edge';

// Add Netlify Edge specific config
export const config = {
  runtime: 'edge',
  regions: ['all'], // Deploy to all regions
}; 