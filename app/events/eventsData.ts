export interface EventType {
  id: string;
  title: string;
  date: string;
  description: string;
  fullDescription?: string;
  link: string;
  image: string;
  gallery?: string[];
  upcoming: boolean;
  location: string;
  address?: string;
  ticketLink?: string;
}

export const eventsData: EventType[] = [
  {
    id: "halloween-bash-2025",
    title: "Halloween Bash 2025",
    date: "October 31, 2025",
    description: "Join us for the spookiest night of the year! Featuring live DJs, costume contests, and supernatural surprises.",
    fullDescription: "Get ready for the most epic Halloween party of 2025! Side Hustle presents our annual Halloween Bash featuring:\n\n- Multiple live DJs spinning the best tracks\n- $1000 costume contest\n- Themed cocktails and drinks\n- Professional photographers\n- VIP bottle service available\n\nDon't miss out on the biggest Halloween party in town!",
    link: "https://instagram.com/sidehustlepdx",
    image: "/images/events/halloween-bash.jpg",
    gallery: [
      "/images/events/halloween-1.jpg",
      "/images/events/halloween-2.jpg",
      "/images/events/halloween-3.jpg"
    ],
    upcoming: true,
    location: "Side Hustle Portland",
    address: "123 Main St, Portland, OR 97201",
    ticketLink: "https://tickets.sidehustlepdx.com/halloween2025"
  },
  {
    id: "spring-break-dj-blaze",
    title: "Spring Break Gone Wild DJ BLAZE",
    date: "March 15, 2024",
    description: "Get ready for the wildest Spring Break party featuring DJ BLAZE! Experience an unforgettable night of high-energy beats and epic vibes.",
    fullDescription: "Side Hustle presents Spring Break Gone Wild featuring the legendary DJ BLAZE!\n\n- Non-stop party anthems and club bangers\n- State-of-the-art sound and light show\n- Special guest performances\n- VIP tables available\n- Complimentary party favors\n\nDon't miss this epic Spring Break celebration!",
    link: "https://instagram.com/sidehustlepdx",
    image: "/images/events/spring-break.jpg",
    upcoming: true,
    location: "Side Hustle Portland",
    address: "123 Main St, Portland, OR 97201",
    ticketLink: "https://tickets.sidehustlepdx.com/spring-break-2024"
  }
]; 