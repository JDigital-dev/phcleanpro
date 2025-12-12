
import { Service, Neighborhood, Addon, ServiceType } from './types';

export const PH_NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Old GRA', surcharge: 0 },
  { name: 'New GRA', surcharge: 0 },
  { name: 'Trans Amadi', surcharge: 1000 },
  { name: 'Peter Odili Rd', surcharge: 1000 },
  { name: 'Woji', surcharge: 1500 },
  { name: 'Rumuola', surcharge: 1500 },
  { name: 'G.R.A Phase 1-3', surcharge: 500 },
  { name: 'Rumodara', surcharge: 2500 },
  { name: 'Airport Road', surcharge: 3500 },
  { name: 'Elelenwo', surcharge: 2000 },
  { name: 'Agip Estate', surcharge: 1500 },
];

export const RECENT_WORKS = [
  {
    id: 'rw1',
    title: 'Post-Construction Cleanup',
    location: 'GRA Phase 2',
    image: 'https://images.unsplash.com/photo-1581578731117-104f2a8d467e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rw2',
    title: 'Luxury Apartment Deep Clean',
    location: 'Peter Odili Rd',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rw3',
    title: 'Corporate Office Maintenance',
    location: 'Trans Amadi',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rw4',
    title: 'Move-in Ready Prep',
    location: 'Woji Estate',
    image: 'https://images.unsplash.com/photo-1502005229766-31e4794e4514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'svc_general',
    title: ServiceType.GENERAL,
    description: 'Routine maintenance to keep your home fresh and tidy. Best for weekly or bi-weekly service.',
    basePrice: 15000,
    durationHours: 3,
    features: [
      'Sweep and mop floors',
      'Dust all surfaces',
      'Clean kitchen counters and sinks',
      'Wipe appliances externally',
      'Scrub toilets and basins',
      'Wipe mirrors',
      'Empty trash'
    ],
    image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_deep',
    title: ServiceType.DEEP,
    description: 'A thorough top-to-bottom clean. Ideal for homes that haven\'t been cleaned professionally in months.',
    basePrice: 35000,
    durationHours: 6,
    features: [
      'Wash walls where applicable',
      'Scrub tiles and grout',
      'Clean behind/under appliances',
      'Remove grease from kitchen hood',
      'Wash windows and tracks',
      'Clean light fixtures',
      'Sanitize high-touch points'
    ],
    image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_move',
    title: ServiceType.MOVE_IN_OUT,
    description: 'Ensure your deposit return or start fresh in a new home. Empty home requirement.',
    basePrice: 45000,
    durationHours: 7,
    features: [
      'Full deep-clean checklist',
      'Remove stickers and paint splashes',
      'Clean inside cabinets/wardrobes',
      'Clean inside ovens/fridges',
      'Scrub balcony areas',
      'Ensure property is odor-free'
    ],
    image: 'https://images.unsplash.com/photo-1594917666299-9759c8db9927?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_construction',
    title: ServiceType.POST_CONSTRUCTION,
    description: 'Specialized cleaning for after renovation or building work. We remove fine dust and debris.',
    basePrice: 60000,
    durationHours: 8,
    features: [
      'Remove debris and materials',
      'Sweep and vacuum fine dust',
      'Scrape paint and cement stains',
      'Thoroughly clean windows/tracks',
      'Mop with industrial solution',
      'Polish fixtures'
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_office',
    title: ServiceType.OFFICE,
    description: 'Professional cleaning for workspaces to maintain a productive and healthy environment.',
    basePrice: 25000,
    durationHours: 4,
    features: [
      'Clean desks and work surfaces',
      'Empty all trash bins',
      'Sanitize restrooms completely',
      'Wipe glass doors and partitions',
      'Clean reception and communal areas',
      'Disinfect high-touch points'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_shortlet',
    title: ServiceType.SHORT_LET,
    description: 'Fast and reliable turnover for Airbnb and short-let apartments. Impress your next guest.',
    basePrice: 12000,
    durationHours: 2,
    features: [
      'Strip and replace beddings',
      'Sanitize bathroom and kitchen',
      'Restock essentials',
      'Vacuum and mop floors',
      'Reset furniture layout',
      'Check for damages'
    ],
    image: 'https://images.unsplash.com/photo-1522771753035-4850d3a5d495?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_industrial',
    title: ServiceType.INDUSTRIAL,
    description: 'Heavy-duty cleaning for warehouses, factories, and industrial zones. Safety compliant.',
    basePrice: 150000,
    durationHours: 10,
    features: [
      'Assess hazard zones',
      'Degrease machinery areas',
      'Clean oil spills safely',
      'Vacuum industrial dust',
      'Wash high walls/structures',
      'Proper waste disposal'
    ],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_floor',
    title: ServiceType.FLOOR_POLISHING,
    description: 'Restore the shine to your marble, terrazzo, or tiled floors with professional buffing.',
    basePrice: 30000,
    durationHours: 5,
    features: [
      'Strip old polish',
      'Clean surface thoroughly',
      'Buff floor to shine',
      'Apply polish or sealant',
      'Inspect for streaks'
    ],
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_carpet',
    title: ServiceType.CARPET_UPHOLSTERY,
    description: 'Deep clean for rugs, carpets, and sofas to remove stains, allergens, and odors.',
    basePrice: 20000,
    durationHours: 3,
    features: [
      'Vacuum thoroughly',
      'Spot-treat stains',
      'Apply steam/chemical solution',
      'Extract moisture',
      'Brush fabric for even finish',
      'Deodorize'
    ],
    image: 'https://images.unsplash.com/photo-1558317374-a309d91bc40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_fumigation',
    title: ServiceType.FUMIGATION,
    description: 'Eliminate pests and insects safely. We use approved chemicals safe for residential use.',
    basePrice: 25000,
    durationHours: 4,
    features: [
      'Inspect infestation areas',
      'Seal food items',
      'Target nests and hidden zones',
      'Apply chemicals safely',
      'Ventilate after treatment',
      'Post-treatment guidance'
    ],
    image: 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_janitorial',
    title: ServiceType.JANITORIAL,
    description: 'Ongoing contract cleaning for corporate buildings. Price displayed is a monthly starting estimate.',
    basePrice: 200000,
    durationHours: 0,
    features: [
      'Daily floor cleaning',
      'Restroom sanitation',
      'Trash removal',
      'Consumables refilling',
      'Periodic deep-cleans',
      'Dedicated staff presence'
    ],
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'svc_event',
    title: ServiceType.EVENT_VENUE,
    description: 'Pre and post-event cleanup for weddings, parties, and conferences.',
    basePrice: 50000,
    durationHours: 5,
    features: [
      'Remove litter and trash',
      'Sweep and mop entire hall',
      'Sanitize chairs and tables',
      'Clear stage and backstage',
      'Clean restrooms',
      'Inspect venue before handover'
    ],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export const ADDONS: Addon[] = [
  { id: 'add_fridge', name: 'Inside Fridge', price: 3000 },
  { id: 'add_oven', name: 'Inside Oven', price: 4000 },
  { id: 'add_balcony', name: 'Balcony/Patio', price: 2500 },
  { id: 'add_laundry', name: 'Laundry (Wash & Fold)', price: 5000 },
  { id: 'add_upholstery_spot', name: 'Spot Clean Sofa', price: 4500 },
];

export const TIME_SLOTS = [
  '08:00 AM',
  '10:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM'
];

export const TEAM_MEMBERS = [
  { id: '1', name: "Chioma Okeke", role: "Operations Manager", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: '2', name: "David Bassey", role: "Senior Cleaning Supervisor", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: '3', name: "Grace Effiong", role: "Hygiene Specialist", image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: '4', name: "Emmanuel John", role: "Industrial Lead", image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
];

export const REVIEWS = [
  { id: '1', name: "Mrs. Amaka Onuoha", location: "GRA Phase 2", text: "The team arrived exactly on time and the deep cleaning was impeccable. My kitchen has never looked this good!", rating: 5 },
  { id: '2', name: "Mr. Peters", location: "Trans Amadi", text: "Professional service. They came with all their equipment and finished the office cleaning ahead of schedule.", rating: 5 },
  { id: '3', name: "Sarah J.", location: "Peter Odili Rd", text: "I use them for my weekly cleaning. Trustworthy staff and very detailed.", rating: 4 },
  { id: '4', name: "Chief Obi", location: "Old GRA", text: "Excellent move-out cleaning. Got my full deposit back from the landlord.", rating: 5 },
  { id: '5', name: "Tunde Bakare", location: "Woji", text: "Fumigation service was effective. No more issues with pests.", rating: 5 }
];

export const FAQS = [
  { question: "Do I need to be home during the cleaning?", answer: "No, you don't! Our staff are vetted and background-checked. You can leave a key or let us in and head out." },
  { question: "Do you bring your own supplies?", answer: "Yes, we bring all professional-grade equipment and eco-friendly cleaning solutions for all services." },
  { question: "What if I'm not satisfied?", answer: "We have a 24-hour satisfaction guarantee. If you're not happy, let us know and we'll re-clean the area for free." },
  { question: "How do I pay?", answer: "You can pay via bank transfer or card after the booking is confirmed. We also accept cash on completion for first-time customers." },
  { question: "Is your fumigation safe?", answer: "Yes, we use approved, safe chemicals. However, we recommend vacating the property for at least 4 hours during and after the process for maximum safety." },
  { question: "Do you clean on weekends?", answer: "Yes, we operate Monday through Saturday. Sunday service is available for emergency requests with a slight surcharge." },
  { question: "Can I get a custom quote for my office?", answer: "Absolutely. For commercial and janitorial contracts, we recommend scheduling a site visit for an accurate assessment." },
  { question: "How long does a post-construction clean take?", answer: "It depends on the size of the property, but it typically takes a full day (8+ hours) with a larger team to ensure all dust is removed." }
];
