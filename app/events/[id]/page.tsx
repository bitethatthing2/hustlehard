import { notFound } from 'next/navigation';
import { eventsData, EventType } from '../eventsData';
import EventPageClient from './EventPageClient';

interface PageProps {
  params: { id: string };
}

export default async function EventPage({ params }: PageProps) {
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
export async function generateStaticParams() {
  return eventsData.map((event) => ({
    id: event.id,
  }));
} 