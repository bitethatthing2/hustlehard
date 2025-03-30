import EventCard from '@/components/events/EventCard';
import { eventsData } from './eventsData';
import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';

export default function EventsPage() {
  // Filter upcoming and past events
  const upcomingEvents = eventsData.filter(event => event.upcoming);
  const pastEvents = eventsData.filter(event => !event.upcoming);

  // Sort past events by date (most recent first)
  const sortedPastEvents = [...pastEvents].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="container mx-auto px-4 text-white">
      <PageHeader 
        title="Side Hustle Events"
        subtitle="Join us for unforgettable nights featuring talented performers, incredible music, and the best vibes in town."
        className="mb-12"
      />

      {/* Upcoming Events Section - Now with Coming Soon message */}
      <section className="mb-20">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-bar-accent">Upcoming Events</h2>
          <div className="h-0.5 bg-gradient-to-r from-bar-accent to-transparent flex-grow ml-4"></div>
        </div>
        
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                id={event.id}
                title={event.title}
                date={event.date}
                description={event.description}
                link={event.link}
                image={event.image}
                upcoming={event.upcoming}
              />
            ))}
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-sm border border-bar-accent/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-bar-accent">New Events Coming Soon!</h3>
            <p className="text-gray-300 mb-6">
              We're planning more amazing events for you! Sign up for our newsletter to be the first to know when new events are announced.
            </p>
            <div className="flex justify-center">
              <Link 
                href="#newsletter"
                className="px-6 py-3 bg-bar-accent text-black rounded-lg font-bold hover:bg-bar-accent/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Notified
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Past Events Section */}
      {sortedPastEvents.length > 0 && (
        <section>
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-400">Past Events</h2>
            <div className="h-0.5 bg-gradient-to-r from-gray-400 to-transparent flex-grow ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPastEvents.map((event) => (
              <EventCard 
                key={event.id} 
                id={event.id}
                title={event.title}
                date={event.date}
                description={event.description}
                link={event.link}
                image={event.image}
                upcoming={event.upcoming}
              />
            ))}
          </div>
        </section>
      )}
      
      {/* Newsletter Subscription */}
      <div id="newsletter" className="mt-20 bg-gradient-to-r from-bar-accent/20 to-purple-900/20 rounded-xl p-8 border border-bar-accent/30">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-bar-accent">Never Miss an Event</h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter to get notified about upcoming events and early access to tickets.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg bg-black/60 border border-gray-700 focus:border-bar-accent focus:outline-none text-white"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-bar-accent text-black rounded-lg font-bold hover:bg-bar-accent/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 