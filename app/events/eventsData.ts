export interface EventType {
  id: string;
  title: string;
  date: string;
  description: string;
  fullDescription: string;
  link: string;
  image: string;
  gallery: string[];
  upcoming: boolean;
  location: string;
  address: string;
  ticketLink: string;
}

export const eventsData: EventType[] = [
  {
    id: 'halloween-bash',
    title: 'Halloween Bash 2025',
    date: 'October 31, 2025',
    description: 'Join us for our Halloween Bash! Come through in your spookiest attire! Costume Contest @ Midnight! $1000 in cash prizes!',
    fullDescription: `
      <p>Get ready for the spookiest night of the year at Side Hustle Bar's Halloween Bash 2025! We're transforming the venue into a haunted paradise with thrilling decorations, special themed cocktails, and an atmosphere that will send chills down your spine.</p>
      
      <p>Come through in your spookiest attire and participate in our Costume Contest at Midnight! We're giving away $1000 in cash prizes to the best costumes of the night.</p>
      
      <p>Our resident DJs will be spinning the hottest tracks all night long, keeping the dance floor alive until the early hours. Don't miss out on this unforgettable Halloween celebration!</p>
    `,
    link: 'https://www.instagram.com/p/DHuvPn-RS_P/',
    image: '/events/halloween-bash.jpg',
    gallery: [],
    upcoming: true,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: 'https://sidehustlebar.com/tickets/halloween'
  },
  {
    id: 'spring-break-gone-wild',
    title: 'Spring Break Gone Wild DJ BLAZE',
    date: 'March 15, 2024',
    description: 'Get ready for the wildest Spring Break party with DJ BLAZE! Special performances, drink specials, and unforgettable moments!',
    fullDescription: `
      <p>Side Hustle Bar presents Spring Break Gone Wild featuring the incredible DJ BLAZE! Get ready for a night of non-stop energy and the hottest beats that will keep you dancing until dawn.</p>
      
      <p>DJ BLAZE will be bringing his signature style and electrifying performance to create an unforgettable Spring Break experience. Don't miss out on this exclusive event featuring special drink specials and surprises throughout the night.</p>
      
      <p>Early bird tickets are available now through our website. This event is expected to sell out, so secure your spot early!</p>
    `,
    link: 'https://www.instagram.com/sidehustle_bar/',
    image: '/events/sample-upcoming.jpg',
    gallery: [],
    upcoming: true,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: 'https://sidehustlebar.com/tickets/spring-break'
  },
  {
    id: 'grand-opening-portland',
    title: 'Grand Opening of Side Hustle Portland',
    date: 'March 9, 2023',
    description: 'Live music and cocktails to celebrate Portland expansion. Headlined by the legendary Mario with DJs @ejthatdj and @djdenverpdx.',
    fullDescription: `
      <p>The grand opening of Side Hustle Portland on Sunday, March 9th, was an unforgettable experience. The evening was headlined by the legendary Mario, whose performance captivated the audience and set the perfect tone for the night.</p>
      
      <p>DJs @ejthatdj and @djdenverpdx kept the energy high, ensuring the dance floor remained lively throughout the event. The atmosphere was electric, and the camaraderie among attendees made it a truly special occasion.</p>
      
      <p>Early arrival was indeed beneficial, as the venue filled up quickly, reflecting the community's excitement for this new hotspot. Overall, it was a night of exceptional music, vibrant energy, and memorable moments, marking a successful launch for Side Hustle Portland.</p>
    `,
    link: 'https://www.instagram.com/reel/DGw97rFRwnP/',
    image: '/events/grand-opening-portland.jpg',
    gallery: [
      '/events/portfolio/portland1.jpg',
      '/events/portfolio/portland2.jpg',
      '/events/portfolio/portland3.jpg',
    ],
    upcoming: false,
    location: 'Side Hustle Portland',
    address: '123 Portland Ave, Portland, OR',
    ticketLink: ''
  },
  {
    id: 'trinidad-james',
    title: 'Trinidad James Live in Salem',
    date: 'May 15, 2023',
    description: 'Side Hustle Bar x Rhythm & Flow presented: Trinidad James Live in Salem! An unforgettable night of high-energy performance.',
    fullDescription: `
      <p>Side Hustle Bar and Rhythm & Flow brought Trinidad James to perform live in Salem! Known for his energetic performances and hit tracks, Trinidad James delivered an incredible show at Side Hustle Bar.</p>
      
      <p>The exclusive performance in our intimate venue setting created an electric atmosphere as Trinidad James took the stage and kept the crowd energized throughout the night.</p>
      
      <p>It was truly a memorable night of incredible music and vibrant energy that showcased why Side Hustle Bar is becoming Salem's premier destination for live performances.</p>
    `,
    link: 'https://www.instagram.com/sidehustle_bar/',
    image: '/events/trinidad-james.jpg',
    gallery: [],
    upcoming: false,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: ''
  },
  {
    id: 'salem-after-party',
    title: 'Salem\'s Biggest After Party',
    date: 'August 12, 2023',
    description: 'After-party with Mr. Capone-E and Down AKA Kilo. TKO\'s Birthday Bash with DJ Ohm.',
    fullDescription: `
      <p>Salem's biggest after-party was an unforgettable experience. The night featured electrifying performances by Mr. Capone-E and Down AKA Kilo, who kept the energy high and the crowd engaged.</p>
      
      <p>The celebration also included TKO's Birthday Bash, adding a personal and festive touch to the event. DJ Ohm provided an exceptional soundtrack for the evening, ensuring the dance floor remained lively throughout.</p>
      
      <p>The 21+ crowd contributed to a vibrant and enthusiastic atmosphere, making it a night to remember in Salem's nightlife history.</p>
    `,
    link: 'https://www.instagram.com/p/C-yj9KVSv1U/',
    image: '/events/salem-after-party.jpg',
    gallery: [],
    upcoming: false,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: ''
  },
  {
    id: 'grand-opening-salem',
    title: 'Grand Opening of Side Hustle Salem',
    date: 'March 22, 2023',
    description: 'Inaugural event featuring live entertainment and food.',
    fullDescription: `
      <p>The grand opening of Side Hustle Salem was a landmark event for our community. Featuring an incredible lineup of local talent and special guests, the night was a perfect introduction to what Side Hustle is all about.</p>
      
      <p>Guests enjoyed our signature cocktails and a special menu created just for the occasion. The atmosphere was electric as attendees celebrated the newest addition to Salem's nightlife scene.</p>
      
      <p>We're grateful to everyone who joined us for this special occasion and helped make it an unforgettable night.</p>
    `,
    link: 'https://www.instagram.com/p/DGHpWEIRiJj/',
    image: '/events/grand-opening-salem.jpg',
    gallery: [],
    upcoming: false,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: ''
  },
  {
    id: 'vip-los-caimanes',
    title: 'VIP Event with Los Caimanes de Sinaloa',
    date: 'February 16, 2023',
    description: 'Exclusive meet-and-greet dinner featuring Los Caimanes de Sinaloa with DJs @obra_exclusiva and @cherry.dntwrry.',
    fullDescription: `
      <p>Attending the exclusive VIP event at Side Hustle Portland was an unforgettable experience. The evening began with an intimate meet-and-greet dinner featuring Los Caimanes de Sinaloa, creating a warm and engaging atmosphere.</p>
      
      <p>The delectable food provided by Side Hustle Portland complemented the lively conversations with the band members. The night continued with vibrant music from DJs @obra_exclusiva and @cherry.dntwrry, keeping everyone dancing and energized.</p>
      
      <p>The event culminated with tickets to the concert at the RV Inn Style Resorts Convention Center in Vancouver, WA, offering a seamless transition from the cozy dinner to a larger musical celebration. Overall, the event was a perfect blend of personal interaction, great food, and fantastic music, leaving attendees with cherished memories.</p>
    `,
    link: 'https://www.instagram.com/',
    image: '/events/vip-event.jpg',
    gallery: [],
    upcoming: false,
    location: 'Side Hustle Portland',
    address: '123 Portland Ave, Portland, OR',
    ticketLink: ''
  },
  {
    id: 'kirko-bangz',
    title: 'Kirko Bangz Concert',
    date: 'January 20, 2023',
    description: 'Dynamic performance by Kirko Bangz at Side Hustle Bar.',
    fullDescription: `
      <p>Attending the Kirko Bangz concert at Side Hustle Bar was an unforgettable experience. The venue buzzed with energy as fans gathered to enjoy his dynamic performance.</p>
      
      <p>Kirko delivered hit after hit, keeping the crowd engaged and singing along throughout the night. The intimate setting of Side Hustle Bar made the performance feel personal and electrifying.</p>
      
      <p>Overall, it was a fantastic night filled with great music and an enthusiastic atmosphere that showcased why Side Hustle is becoming known for hosting exceptional musical talent.</p>
    `,
    link: 'https://www.instagram.com/sidehustle_bar/reel/C70FlZyv6Sw/',
    image: '/events/kirko-bangz.jpg',
    gallery: [],
    upcoming: false,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: ''
  },
  {
    id: 'rnb-love',
    title: 'RnB, Love Event',
    date: 'February 16, 2023',
    description: 'R&B celebration with Adrian Marcel, CRSB, @iamdnyse, @mahinaa.x3, and DJ Inferno.',
    fullDescription: `
      <p>Attending the "RnB, Love" event at Side Hustle Bar on February 16, 2023, was an unforgettable experience. The evening was headlined by renowned R&B artists Adrian Marcel and CRSB, whose soulful performances captivated the audience.</p>
      
      <p>Opening acts @iamdnyse and @mahinaa.x3 set the tone with their engaging sets, while DJ Inferno kept the energy high throughout the night. The atmosphere was electric, with the crowd fully immersed in the music and dancing.</p>
      
      <p>The intimate setting of Side Hustle Bar provided the perfect backdrop for this celebration of R&B and love. Overall, it was a night filled with great music, vibrant energy, and memorable moments that showcased the venue's commitment to quality entertainment.</p>
    `,
    link: 'https://www.instagram.com/',
    image: '/events/rnb-love.jpg',
    gallery: [],
    upcoming: false,
    location: 'Side Hustle Salem',
    address: '456 Salem St, Salem, OR',
    ticketLink: ''
  }
]; 