import { notFound } from 'next/navigation';
import { eventsData, EventType } from '../eventsData';
import EventPageClient from './EventPageClient';

type Params = { id: string };

interface PageProps {
  params: Promise<Params>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;

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