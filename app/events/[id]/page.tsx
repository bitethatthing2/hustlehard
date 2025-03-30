import { notFound } from 'next/navigation';
import { eventsData } from '../eventsData';
import EventPageClient from './EventPageClient';

// Define params type for static routes
interface Params {
  id: string;
}

// Props type following Next.js pattern
interface PageProps {
  params: Params;
}

// Server Component with static generation
export default function EventPage({ params }: PageProps) {
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
export function generateStaticParams(): Params[] {
  return eventsData.map((event) => ({
    id: event.id,
  }));
} 