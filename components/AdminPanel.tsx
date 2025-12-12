import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { SERVICES, TEAM_MEMBERS } from '../constants';

type AdminTab = 'dashboard' | 'bookings' | 'customers' | 'invoices' | 'revenue' | 'services' | 'settings';

interface AdminPanelProps {
  onExit: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [filter, setFilter] = useState('all');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const loadBookings = () => {
    const stored = localStorage.getItem('ph_bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem('ph_bookings', JSON.stringify(updated));
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to delete all bookings? This is for testing only.")) {
      localStorage.removeItem('ph_bookings');
      loadBookings();
    }
  };

  // Helper: Get Unique Customers
  const getCustomers = () => {
    const unique = new Map();
    bookings.forEach(b => {
      if (!unique.has(b.email)) {
        unique.set(b.email, {
          name: b.customerName,
          email: b.email,
          phone: b.phone,
          bookingsCount: 0,
          totalSpent: 0,
          lastBooking: b.date
        });
      }
      const customer = unique.get(b.email);
      customer.bookingsCount++;
      customer.totalSpent += b.totalPrice;
      if (new Date(b.date) > new Date(customer.lastBooking)) {
        customer.lastBooking = b.date;
      }
    });
    return Array.from(unique.values());
  };

  /* --- RENDER FUNCTIONS FOR TABS --- */

  const renderDashboard = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-slate-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">₦{bookings.reduce((acc, curr) => acc + curr.totalPrice, 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-slate-500 text-sm">Pending Bookings</p>
            <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <p className="text-slate-500 text-sm">Active Staff</p>
            <p className="text-2xl font-bold">{TEAM_MEMBERS.length}</p>
          </div>
           <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <p className="text-slate-500 text-sm">Customers</p>
            <p className="text-2xl font-bold">{new Set(bookings.map(b => b.email)).size}</p>
          </div>
      </div>
      
      {/* Recent Bookings Preview */}
      <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {bookings.slice(0, 5).map(b => (
                <div key={b.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                    <div>
                        <p className="font-medium text-slate-800">New booking by {b.customerName}</p>
                        <p className="text-sm text-slate-500">{SERVICES.find(s => s.id === b.serviceId)?.title} - {b.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${
                        b.status === 'pending' ? 'bg-blue-100 text-blue-700' : 
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        'bg-gray-100 text-gray-600'
                    }`}>{b.status}</span>
                </div>
            ))}
            {bookings.length === 0 && <p className="text-slate-500 italic">No recent activity.</p>}
          </div>
      </div>
    </>
  );

  const renderBookings = () => {
    const filteredBookings = filter === 'all' 
      ? bookings 
      : bookings.filter(b => b.status === filter);
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Filter Toolbar */}
         <div className="p-4 border-b flex gap-2 overflow-x-auto bg-slate-50">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                filter === status 
                ? 'bg-slate-800 text-white shadow' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
          <button onClick={loadBookings} className="ml-auto text-sm text-slate-500 hover:text-green-600"><i className="fas fa-sync-alt"></i> Refresh</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-slate-500 uppercase text-xs font-bold tracking-wider border-b">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date/Time</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">No bookings found in this category.</td>
                </tr>
              ) : (
                filteredBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-xs font-mono text-slate-400">#{booking.id.slice(-6)}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{booking.customerName}</div>
                      <div className="text-xs text-slate-500">{booking.phone}</div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className="font-medium">{SERVICES.find(s => s.id === booking.serviceId)?.title}</span>
                      <div className="text-xs text-slate-400">{booking.neighborhood}</div>
                    </td>
                    <td className="p-4 text-sm">
                      <div>{booking.date}</div>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{booking.timeSlot}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-700">₦{booking.totalPrice.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select 
                        className="text-xs border border-slate-300 rounded p-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Complete</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderCustomers = () => {
    const customers = getCustomers();
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b bg-slate-50 font-bold text-slate-700">Customer Database</div>
        <table className="w-full text-left">
          <thead className="bg-white border-b text-xs uppercase text-slate-500 font-bold">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Total Bookings</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((c, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-800">{c.name}</td>
                <td className="p-4 text-slate-600 text-sm">
                  <div>{c.email}</div>
                  <div className="text-xs">{c.phone}</div>
                </td>
                <td className="p-4 text-slate-600">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{c.bookingsCount}</span>
                </td>
                <td className="p-4 text-green-700 font-bold">₦{c.totalSpent.toLocaleString()}</td>
                <td className="p-4 text-slate-500 text-sm">{c.lastBooking}</td>
              </tr>
            ))}
             {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">No customers found.</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderInvoices = () => (
      <div className="bg-white rounded-lg shadow overflow-hidden">
         <div className="p-4 border-b bg-slate-50 font-bold text-slate-700 flex justify-between items-center">
             <span>Recent Invoices</span>
             <button className="text-xs bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded">Download All</button>
         </div>
         <table className="w-full text-left">
            <thead className="bg-white border-b text-xs uppercase text-slate-500 font-bold">
               <tr>
                  <th className="p-4">Invoice #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date Issued</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50">
                     <td className="p-4 text-sm font-mono text-slate-500">INV-{b.id.slice(-6).toUpperCase()}</td>
                     <td className="p-4 font-medium text-slate-800">{b.customerName}</td>
                     <td className="p-4 text-sm text-slate-600">{b.date}</td>
                     <td className="p-4 font-bold text-slate-800">₦{b.totalPrice.toLocaleString()}</td>
                     <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${b.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                           {b.status === 'completed' ? 'PAID' : 'PENDING'}
                        </span>
                     </td>
                     <td className="p-4">
                         <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                     </td>
                  </tr>
               ))}
               {bookings.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-400">No invoices generated.</td></tr>
               )}
            </tbody>
         </table>
      </div>
  );

  const renderRevenue = () => {
    // Simple revenue by service
    const revenueByService: Record<string, number> = {};
    let totalRevenue = 0;
    
    bookings.forEach(b => {
        const sName = SERVICES.find(s => s.id === b.serviceId)?.title || 'Unknown';
        revenueByService[sName] = (revenueByService[sName] || 0) + b.totalPrice;
        totalRevenue += b.totalPrice;
    });

    return (
       <div className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-6 text-slate-800">Revenue by Service</h3>
                    <div className="space-y-4">
                        {Object.entries(revenueByService).map(([service, amount]) => (
                        <div key={service}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-slate-700">{service}</span>
                                <span className="font-bold text-slate-900">₦{amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${totalRevenue ? (amount / totalRevenue) * 100 : 0}%` }}></div>
                            </div>
                        </div>
                        ))}
                        {bookings.length === 0 && <p className="text-slate-400 italic">No revenue data available.</p>}
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-6 text-slate-800">Monthly Projection</h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                        {/* Fake chart bars */}
                        {[30, 45, 25, 60, 75, 50].map((h, i) => (
                             <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                                 <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600" style={{ height: `${h}%` }}></div>
                             </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>
                </div>
           </div>
       </div>
    );
  };

  const renderServices = () => (
     <div className="grid md:grid-cols-3 gap-6">
        {SERVICES.map(s => (
           <div key={s.id} className="bg-white rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
              <div className="h-32 w-full overflow-hidden rounded mb-4 bg-slate-100">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
              </div>
              <h4 className="font-bold text-lg text-slate-800">{s.title}</h4>
              <p className="text-green-600 font-bold mb-2">₦{s.basePrice.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{s.description}</p>
              <div className="mt-auto pt-4 flex justify-between items-center text-sm border-t border-slate-100">
                 <span className="text-slate-500">{s.durationHours} Hours</span>
                 <button className="text-blue-600 font-medium hover:underline">Edit Price</button>
              </div>
           </div>
        ))}
     </div>
  );
  
  const renderSettings = () => (
     <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <h3 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">General Configuration</h3>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
           <div className="grid md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
                  <input type="text" className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none" defaultValue="PH Cleaning Pro" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Admin Email</label>
                  <input type="email" className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none" defaultValue="admin@phcleaning.ng" />
               </div>
           </div>
           
           <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Currency</label>
              <select className="w-full border border-slate-300 p-2.5 rounded focus:ring-2 focus:ring-green-500 outline-none">
                 <option>Nigerian Naira (₦)</option>
                 <option>US Dollar ($)</option>
              </select>
           </div>

           <div className="bg-slate-50 p-4 rounded border border-slate-200">
               <h4 className="font-bold text-sm text-slate-800 mb-3">Notifications</h4>
               <div className="space-y-3">
                   <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" defaultChecked />
                        <span className="text-sm text-slate-700">Email Admin on new booking</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" defaultChecked />
                        <span className="text-sm text-slate-700">Email Customer on confirmation</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-sm text-slate-700">SMS Notifications (Requires Twilio)</span>
                   </label>
               </div>
           </div>
           
           <div className="pt-4">
               <button className="bg-slate-800 text-white px-6 py-2.5 rounded font-bold hover:bg-slate-700 transition-colors">Save Settings</button>
           </div>
        </form>
     </div>
  );

  /* --- MAIN RENDER --- */

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-slate-400 w-64 flex-shrink-0 flex flex-col fixed md:relative h-full z-20 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64 md:-ml-64'}`}>
         <div className="h-16 flex items-center px-6 bg-slate-950 text-white font-bold text-xl tracking-tight border-b border-slate-800">
            <i className="fas fa-shield-alt mr-2 text-green-500"></i> PH Admin
         </div>

         <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">Main</div>
            <nav className="space-y-1 mb-8">
               <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-chart-line w-5 text-center"></i> Dashboard
               </button>
               <button 
                  onClick={() => setActiveTab('bookings')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'bookings' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-calendar-check w-5 text-center"></i> Bookings
               </button>
               <button 
                  onClick={() => setActiveTab('customers')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'customers' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-users w-5 text-center"></i> Customers
               </button>
            </nav>

            <div className="px-6 mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">Finance</div>
            <nav className="space-y-1 mb-8">
               <button 
                  onClick={() => setActiveTab('invoices')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'invoices' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-file-invoice-dollar w-5 text-center"></i> Invoices
               </button>
               <button 
                  onClick={() => setActiveTab('revenue')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'revenue' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-wallet w-5 text-center"></i> Revenue
               </button>
            </nav>

            <div className="px-6 mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">System</div>
            <nav className="space-y-1 mb-8">
               <button 
                  onClick={() => setActiveTab('services')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'services' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-broom w-5 text-center"></i> Services
               </button>
               <button 
                  onClick={() => setActiveTab('settings')} 
                  className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all ${activeTab === 'settings' ? 'bg-slate-800 text-white border-r-4 border-green-500' : 'hover:bg-slate-800 hover:text-white'}`}
               >
                  <i className="fas fa-cogs w-5 text-center"></i> Settings
               </button>
            </nav>
         </div>

         <div className="p-4 border-t border-slate-800">
            <button 
               onClick={onExit}
               className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-600 text-white py-2 rounded transition-colors text-sm font-bold"
            >
               <i className="fas fa-sign-out-alt"></i> Exit Admin
            </button>
         </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
         <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10 flex-shrink-0">
            <div className="flex items-center gap-4">
               <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-500 hover:text-slate-800 focus:outline-none">
                  <i className="fas fa-bars text-xl"></i>
               </button>
               <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
            </div>
            <div className="flex items-center gap-6">
               <button onClick={handleReset} className="text-xs text-red-500 font-bold hover:text-red-700 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition-colors">
                  <i className="fas fa-trash-alt mr-1"></i> Reset DB
               </button>
               <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                     <p className="text-sm font-bold text-slate-800">Admin Manager</p>
                     <p className="text-xs text-slate-500">Super User</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
                     A
                  </div>
               </div>
            </div>
         </header>

         {/* Scrollable Main Area */}
         <main className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
               {activeTab === 'dashboard' && renderDashboard()}
               {activeTab === 'bookings' && renderBookings()}
               {activeTab === 'customers' && renderCustomers()}
               {activeTab === 'invoices' && renderInvoices()}
               {activeTab === 'revenue' && renderRevenue()}
               {activeTab === 'services' && renderServices()}
               {activeTab === 'settings' && renderSettings()}
            </div>
         </main>
      </div>
      
      {/* Mobile Overlay */}
      {!isSidebarOpen && (
         <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden" 
            onClick={() => setSidebarOpen(true)}
         />
      )}
    </div>
  );
};

export default AdminPanel;