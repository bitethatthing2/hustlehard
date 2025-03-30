import { notFound } from 'next/navigation';
import { eventsData } from '../eventsData';
import EventPageClient from './EventPageClient';

// Define params type for Netlify Edge
interface Params {
  id: string;
}

// Props type for Netlify Edge functions
interface PageProps {
  params: Promise<Params>;
}

// Server Component with Netlify Edge compatibility
export default async function EventPage({ params }: PageProps) {
  // Await the params since they're a Promise in Netlify Edge
  const resolvedParams = await params;
  
  // Destructure id from resolved params
  const { id } = resolvedParams;

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

// Generate static params for all events (still needed for local development)
export async function generateStaticParams(): Promise<Params[]> {
  return eventsData.map((event) => ({
    id: event.id,
  }));
}

// Configure for Netlify Edge
export const runtime = 'edge'; 