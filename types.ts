
export enum ServiceType {
  GENERAL = 'General Cleaning',
  DEEP = 'Deep Cleaning',
  MOVE_IN_OUT = 'Move-In/Move-Out',
  POST_CONSTRUCTION = 'Post-Construction',
  OFFICE = 'Office & Commercial',
  SHORT_LET = 'Short-let/Airbnb Turnover',
  INDUSTRIAL = 'Industrial Cleaning',
  FLOOR_POLISHING = 'Floor Polishing',
  CARPET_UPHOLSTERY = 'Carpet & Upholstery',
  FUMIGATION = 'Fumigation & Pest Control',
  JANITORIAL = 'Janitorial Contracts',
  EVENT_VENUE = 'Event Venue Cleaning'
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number; // In Naira
  durationHours: number;
  features: string[];
  image: string;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  addons: string[];
  totalPrice: number;
  address: string;
  neighborhood: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Neighborhood {
  name: string;
  surcharge: number; // Extra transport cost for far areas
}
