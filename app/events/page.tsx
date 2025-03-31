import EventCard from '@/components/events/EventCard';
import { eventsData } from './eventsData';
import Link from 'next/link';
import BackButton from '@/components/navigation/BackButton';

export default function EventsPage() {
  // Filter upcoming and past events
  const upcomingEvents = eventsData.filter(event => event.upcoming);
  const pastEvents = eventsData.filter(event => !event.upcoming);

  // Sort past events by date (most recent first)
  const sortedPastEvents = [...pastEvents].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
        <div className="mb-6">
          <BackButton className="mb-4" />
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Side Hustle Events
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Join us for unforgettable nights featuring talented performers, incredible music, and the best vibes in town.
          </p>
        </div>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Upcoming Events</h2>
            {upcomingEvents.length === 0 && (
              <Link 
                href="#newsletter" 
                className="px-4 py-2 bg-transparent border border-white text-white rounded-md font-semibold hover:bg-white/10 transition-colors transform hover:scale-[1.02]"
              >
                Get Notified
              </Link>
            )}
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  link={event.link}
                  image={event.image}
                  upcoming={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 text-center">
              <h3 className="text-xl font-bold mb-3 text-white">New Events Coming Soon!</h3>
              <p className="text-white mb-6">
                We're planning more exciting events. Sign up for our newsletter to be the first to know when new events are announced.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-black/50 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-4 py-2 bg-transparent border border-white text-white rounded-md font-semibold hover:bg-white/10 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPastEvents.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                description={event.description}
                link={event.link}
                image={event.image}
                upcoming={false}
              />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="mt-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Stay Updated</h2>
            <p className="text-white mb-6">
              Subscribe to our newsletter to receive notifications about upcoming events, special performances, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-black/50 border border-white/20 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-transparent border border-white text-white rounded-md font-bold hover:bg-white/10 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-white/60 text-sm mt-4">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 