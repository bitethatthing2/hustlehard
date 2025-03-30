import { notFound } from 'next/navigation';
import { eventsData, EventType } from '../eventsData';
import EventPageClient from './EventPageClient';

// Define the params type separately for better reusability
type Params = { id: string };

// Use the standard Next.js page props pattern
type PageProps = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EventPage({ params, searchParams }: PageProps) {
  // Find the current event
  const event = eventsData.find(e => e.id === params.id);

  // If event not found, show 404
  if (!event) {
    notFound();
  }

  // Get related events (excluding current event)
  const relatedEvents = eventsData
    .filter(e => e.id !== params.id)
    .slice(0, 3); // Limit to 3 related events

  return <EventPageClient event={event} relatedEvents={relatedEvents} />;
}

// Generate static params for all events
export function generateStaticParams(): Array<Params> {
  return eventsData.map((event) => ({
    id: event.id,
  }));
} 