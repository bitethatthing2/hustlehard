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
    fullDescription: "Get ready for the most epic Halloween party in Portland! Our annual Halloween Bash returns with an unforgettable night of thrills and chills. Featuring top DJs spinning the best tracks, multiple costume contests with amazing prizes, themed cocktails, and spine-tingling decorations that will transform Side Hustle into a haunted paradise.",
    link: "https://www.instagram.com/sidehustlepdx",
    image: "/images/events/halloween-bash.jpg",
    upcoming: true,
    location: "Side Hustle Portland",
    address: "123 Main Street, Portland, OR 97201",
    ticketLink: "https://tickets.sidehustlepdx.com/halloween2025"
  },
  {
    id: "spring-break-dj-blaze",
    title: "Spring Break Gone Wild DJ BLAZE",
    date: "March 15, 2024",
    description: "Get ready for the hottest Spring Break party with DJ BLAZE! High-energy beats, wild atmosphere, and non-stop dancing.",
    fullDescription: "DJ BLAZE takes over Side Hustle for an explosive Spring Break celebration! Known for his electric sets and ability to keep the dance floor packed all night long, DJ BLAZE brings his signature mix of hip-hop, EDM, and party anthems. Don't miss this legendary night of pure energy and unforgettable moments.",
    link: "https://www.instagram.com/sidehustlepdx",
    image: "/images/events/spring-break.jpg",
    upcoming: true,
    location: "Side Hustle Portland",
    address: "123 Main Street, Portland, OR 97201",
    ticketLink: "https://tickets.sidehustlepdx.com/spring-break-2024"
  }
]; 