'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "seasonal-menu-spring",
    title: "Spring Menu Inspiration",
    excerpt: "Exploring fresh, seasonal ingredients for our new spring menu items.",
    content: "As we welcome spring, our kitchen is buzzing with excitement over the abundance of fresh, local produce...",
    date: "April 1, 2025",
    image: "/images/blog/spring-menu.jpg",
    author: "Chef Michael",
    category: "Menu Updates"
  },
  {
    id: "coffee-origins",
    title: "Origins of Our Coffee",
    excerpt: "A journey through the regions where we source our signature coffee beans.",
    content: "From the highlands of Ethiopia to the mountains of Colombia, every bean tells a story...",
    date: "March 25, 2025",
    image: "/images/blog/coffee-origins.jpg",
    author: "Chef Michael",
    category: "Coffee Culture"
  },
  {
    id: "kitchen-secrets",
    title: "Kitchen Secrets: Our Famous Sauce",
    excerpt: "Behind the scenes look at how we craft our signature sauce.",
    content: "Every great chef has their secrets, and today I'm sharing one of ours...",
    date: "March 15, 2025",
    image: "/images/blog/kitchen-secrets.jpg",
    author: "Chef Michael",
    category: "Recipe Stories"
  },
  {
    id: "sustainable-cooking",
    title: "Sustainable Practices in Our Kitchen",
    excerpt: "How we're making our kitchen more environmentally friendly.",
    content: "Sustainability isn't just a buzzword for us - it's a commitment we make every day...",
    date: "March 8, 2025",
    image: "/images/blog/sustainable-kitchen.jpg",
    author: "Chef Michael",
    category: "Sustainability"
  }
];

export default function ChefBlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Chef's Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">Stories and insights from our kitchen</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-black dark:bg-white rounded-lg overflow-hidden">
              {post.image && (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600 mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-white dark:text-black">
                  {post.title}
                </h2>
                <p className="text-gray-400 dark:text-gray-600 mt-2">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <Button 
                    className="bg-white text-black dark:bg-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}