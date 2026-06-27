import { useState,useEffect } from 'react';
import { mockUsers } from "./data/mockUsers";
import { getProfile } from "./api/authApi";
import Dashboard from './components/Dashboard';
import CommonDashboard from './components/CommonDashboard';
import TicketList from './components/TicketList';
import CreateTicket from './components/CreateTicket';
import TicketDetails from './components/TicketDetails';
import Header from './components/Header';
import Login from './components/Login';

import {
  getTickets,
  createTicket,
  updateTicket,
} from "./api/ticketApi";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  console.log("Current User:", currentUser);
  console.log("Tickets:", tickets);
  console.log("Role:", currentUser?.role);

  useEffect(() => {
    const initializeApp = async () => {
      const token = localStorage.getItem("token");
      

      if (!token) {
          setLoading(false);
          return;
      }

      try {
        const profile = await getProfile();

        const ticketData = await getTickets();

        setTickets(ticketData.tickets);
        setCurrentUser(profile.user);

        setLoading(false);
      } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
          setLoading(false);
        }
    };
    

    initializeApp();
  }, []);

  const handleCreateTicket = async (newTicket) => {
    try {
      const response = await createTicket(newTicket);

      setTickets((prev) => [response.ticket, ...prev]);

      setCurrentView("tickets");

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to create ticket."
      );
    }
  };

  const handleUpdateTicket = async (updatedTicket) => {
    try {
      const response = await updateTicket(
        updatedTicket._id,
        updatedTicket
      );

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === response.ticket._id
            ? response.ticket
            : ticket
        )
      );

      setSelectedTicket(response.ticket);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to update ticket."
      );
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setCurrentView('details');
  };

  const handleLogin = async (user) => {
    setLoading(true);

    try {
      const ticketData = await getTickets();

      setTickets(ticketData.tickets);
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setCurrentUser(null);
    setTickets([]);     // <-- Add this

    setCurrentView("home");
    setFilterStatus("All");
    setFilterPriority("All");
    setSearchQuery("");
  };

if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 font-medium">
        Loading tickets...
      </p>
    </div>
  );
}

  // If not logged in, show login page
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Filter tickets based on user role
  let displayTickets = tickets;

  if (currentUser.role === "Employee") {
    displayTickets = tickets.filter(
      (ticket) =>
        ticket.createdBy?._id === currentUser._id ||
        ticket.reportedFor?._id === currentUser._id
    );
  } else if (currentUser.role === "SupportAgent") {
    displayTickets = tickets.filter(
      (ticket) => ticket.assignedTo?._id === currentUser._id
    );
  }

  const filteredTickets = displayTickets.filter(ticket => {
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || ticket.priority === filterPriority;
    const matchesSearch =
      searchQuery === "" ||
      ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket._id?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  console.log("Display Tickets:", displayTickets);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <CommonDashboard 
            currentUser={currentUser}
            allTickets={tickets}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard 
            tickets={displayTickets}
            allTickets={tickets}
            onViewTicket={handleViewTicket}
            setCurrentView={setCurrentView}
            currentUser={currentUser}
          />
        )}
        
        {currentView === 'tickets' && (
          <TicketList
            tickets={filteredTickets}
            onViewTicket={handleViewTicket}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentUser={currentUser}
          />
        )}
        
        {currentView === 'create' && (
          <CreateTicket
            onCreateTicket={handleCreateTicket}
            onCancel={() => setCurrentView('tickets')}
            currentUser={currentUser}
            users={mockUsers}
          />
        )}
        
        {currentView === 'details' && selectedTicket && (
          <TicketDetails
            ticket={selectedTicket}
            onUpdateTicket={handleUpdateTicket}
            onBack={() => setCurrentView('tickets')}
            currentUser={currentUser}
            users={mockUsers}
          />
        )}
      </main>
    </div>
  );
}

export default App;
