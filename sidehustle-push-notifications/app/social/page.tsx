import { Metadata } from 'next';
import InstagramEmbed from '@/components/social/InstagramEmbed';

export const metadata: Metadata = {
  title: 'Social Media - Side Hustle',
  description: 'Connect with us on social media',
};

export default function SocialPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Connect With Us</h1>
      
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">Instagram</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <h3 className="text-xl mb-3 text-white">Our DJ - Elisha Johnson-McClyde</h3>
              <InstagramEmbed username="ejthatdj" className="mx-auto" />
              <p className="mt-4 text-white text-sm opacity-70">
                Follow our talented DJ on Instagram for the latest updates on upcoming events, mixes, and behind-the-scenes content.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Stay Connected</h2>
          <p className="text-white mb-4">
            Follow us on social media to stay updated with our latest events, menu specials, and promotions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </h3>
              <p className="text-white text-opacity-80 mb-3">
                Follow us for food pics, event announcements, and daily specials.
              </p>
              <a href="https://www.instagram.com/sidehustlebar/" className="inline-flex items-center text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm transition duration-200" target="_blank" rel="noopener noreferrer">
                @sidehustlebar
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                Facebook
              </h3>
              <p className="text-white text-opacity-80 mb-3">
                Like our page for events, promotions, and community updates.
              </p>
              <a href="https://www.facebook.com/sidehustlebar/" className="inline-flex items-center text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm transition duration-200" target="_blank" rel="noopener noreferrer">
                Side Hustle Bar
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 