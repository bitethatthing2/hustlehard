import GoogleReviewsSection from '@/components/reviews/GoogleReviewsSection';

export const metadata = {
  title: 'Customer Reviews | The Side Hustle Bar',
  description: 'See what our customers are saying about us. Real reviews from Google.',
}

export default function ReviewsPage() {
  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See what our customers have to say about their experiences at The Side Hustle Bar.
          </p>
        </div>
        
        {/* Google Reviews Widget */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <GoogleReviewsSection />
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Share Your Experience</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Enjoyed your visit? We'd love to hear about it! Your feedback helps us improve and serve you better.
          </p>
          <a 
            href="https://g.page/r/CQFvIkYoqoS2EAE/review" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </div>
  );
} 