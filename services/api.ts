import { Booking } from '../types';
import { SERVICES, ADDONS, PH_NEIGHBORHOODS } from '../constants';

// Simulated Backend Network Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface BookingSubmissionData {
  serviceId: string;
  addons: string[];
  location: {
    address: string;
    neighborhood: string;
  };
  schedule: {
    date: string;
    time: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

interface ContactSubmissionData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const api = {
  /**
   * Simulates a secure backend booking endpoint.
   * - Validates inputs
   * - Re-calculates price server-side (security)
   * - Stores in DB (LocalStorage)
   * - Triggers simulated emails
   */
  submitBooking: async (formData: BookingSubmissionData): Promise<{ success: boolean; data?: Booking; message?: string }> => {
    await delay(1500); // Simulate 1.5s network latency

    try {
      // 1. Server-Side Validation
      if (!formData.contact.email || !formData.contact.phone || !formData.contact.name) {
        throw new Error("Missing contact details.");
      }
      if (!formData.serviceId || !formData.schedule.date || !formData.schedule.time) {
        throw new Error("Missing service or schedule details.");
      }

      // 2. Secure Price Calculation (Never trust the client's total)
      let calculatedPrice = 0;
      
      const service = SERVICES.find(s => s.id === formData.serviceId);
      if (!service) throw new Error("Invalid Service ID detected.");
      calculatedPrice += service.basePrice;

      formData.addons.forEach((addonId: string) => {
        const addon = ADDONS.find(a => a.id === addonId);
        if (addon) calculatedPrice += addon.price;
      });

      const neighborhood = PH_NEIGHBORHOODS.find(n => n.name === formData.location.neighborhood);
      if (neighborhood) calculatedPrice += neighborhood.surcharge;

      // 3. Create Booking Record (Simulate DB Insert)
      const newBooking: Booking = {
        id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        customerName: formData.contact.name,
        email: formData.contact.email,
        phone: formData.contact.phone,
        serviceId: formData.serviceId,
        addons: formData.addons,
        totalPrice: calculatedPrice, // Using the verified server-calculated price
        address: formData.location.address,
        neighborhood: formData.location.neighborhood,
        date: formData.schedule.date,
        timeSlot: formData.schedule.time,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // 4. Persistence (Simulate Database Write)
      const existingBookings = JSON.parse(localStorage.getItem('ph_bookings') || '[]');
      localStorage.setItem('ph_bookings', JSON.stringify([newBooking, ...existingBookings]));

      // 5. Simulate Backend Actions (Emails/SMS)
      console.log(`[Backend] Emailing customer: ${newBooking.email} with Invoice #${newBooking.id}`);
      console.log(`[Backend] SMS sent to Admin: New booking from ${newBooking.neighborhood}`);

      return { success: true, data: newBooking, message: "Booking confirmed successfully!" };

    } catch (error: any) {
      console.error("Booking Error:", error);
      return { success: false, message: error.message || "An unexpected error occurred." };
    }
  },

  /**
   * Simulates a contact form submission endpoint.
   */
  submitContactMessage: async (data: ContactSubmissionData) => {
    await delay(1000); // Simulate latency

    if (!data.email.includes('@')) {
        return { success: false, message: "Invalid email address." };
    }

    // Simulate saving lead to DB
    console.log(`[Backend] New Lead: ${data.subject} from ${data.email}`);
    
    return { success: true, message: "Message sent successfully." };
  }
};