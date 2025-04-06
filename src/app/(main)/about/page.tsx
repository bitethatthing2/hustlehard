'use client';

import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Chef Michael",
    role: "Executive Chef & Founder",
    bio: "With over 15 years of culinary experience, Chef Michael brings his passion for innovative flavors and sustainable cooking to every dish at Hustle Hard.",
    image: "/images/team/chef-michael.jpg"
  },
  {
    name: "Sarah Chen",
    role: "Head Barista",
    bio: "A certified coffee expert with a background in specialty coffee roasting, Sarah ensures every cup meets our high standards of quality and taste.",
    image: "/images/team/sarah-chen.jpg"
  }
];

interface Value {
  title: string;
  description: string;
  icon: string;
}

const values: Value[] = [
  {
    title: "Quality First",
    description: "We source the finest ingredients and never compromise on quality. Every dish is crafted with care and attention to detail.",
    icon: "🌟"
  },
  {
    title: "Sustainable Practices",
    description: "From our locally sourced ingredients to our eco-friendly packaging, we're committed to minimizing our environmental impact.",
    icon: "🌱"
  },
  {
    title: "Community Focus",
    description: "We believe in building strong relationships with our local community, suppliers, and team members.",
    icon: "🤝"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">About Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Welcome to Hustle Hard, where passion meets flavor. We&apos;re more than just a restaurant - we&apos;re a community of food lovers dedicated to creating exceptional dining experiences.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-black dark:bg-white rounded-lg overflow-hidden">
            <div className="relative w-full aspect-[21/9]">
              <Image
                src="/images/about/restaurant-story.jpg"
                alt="Hustle Hard Restaurant"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white dark:text-black mb-4">Our Story</h2>
              <p className="text-gray-400 dark:text-gray-600">
                Founded in 2020, Hustle Hard began with a simple mission: to serve exceptional food in a welcoming atmosphere. 
                What started as a small coffee shop has grown into a beloved establishment known for its innovative menu, 
                quality ingredients, and commitment to community.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <div key={index} className="bg-black dark:bg-white rounded-lg p-6">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white dark:text-black mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-black dark:bg-white rounded-lg overflow-hidden">
                <div className="relative w-full aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white dark:text-black">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400 dark:text-gray-600 mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-400 dark:text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
