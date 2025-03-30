import { notFound } from 'next/navigation';
import { eventsData } from '../eventsData';
import EventPageClient from './EventPageClient';

// Define params type according to Netlify Edge function specs
type Params = {
  id: string;
};

// Use Next.js standard props pattern
interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function EventPage({ params }: PageProps) {
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
export function generateStaticParams() {
  return eventsData.map((event) => ({
    id: event.id,
  }));
}

// Configure for Netlify Edge with latest format
export const runtime = 'edge'; 