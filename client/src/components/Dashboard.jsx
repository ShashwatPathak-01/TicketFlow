import { 
  ChartBarIcon, 
  ExclamationTriangleIcon, 
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard({ tickets, allTickets, onViewTicket, setCurrentView, currentUser }) {
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    pending: tickets.filter(t => t.status === 'Pending').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
  };

  const criticalTickets = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Closed' && t.status !== 'Resolved');
  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const statCards = [
    { label: 'Total Tickets', value: stats.total, icon: ChartBarIcon, color: 'bg-blue-500' },
    { label: 'Open', value: stats.open, icon: ExclamationTriangleIcon, color: 'bg-red-500' },
    { label: 'In Progress', value: stats.inProgress, icon: ClockIcon, color: 'bg-yellow-500' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircleIcon, color: 'bg-green-500' },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isAdmin = currentUser.role === 'Admin';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isAdmin 
            ? 'Overview of all support tickets and system status' 
            : 'Overview of your support tickets'}
        </p>
      </div>

      {/* Welcome Banner */}
      <div className={`rounded-xl shadow-sm p-6 text-white ${
        isAdmin ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'
      }`}>
        <h3 className="text-2xl font-bold mb-2">
          Welcome back, {currentUser.name}!
        </h3>
        <p className={isAdmin ? 'text-purple-100' : 'text-blue-100'}>
          {isAdmin 
            ? `You have ${tickets.length} total tickets to manage across all departments.`
            : `You have ${tickets.length} active ticket${tickets.length !== 1 ? 's' : ''}.`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Tickets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Critical Tickets</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {criticalTickets.length}
            </span>
          </div>
          <div className="space-y-3">
            {criticalTickets.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No critical tickets</p>
            ) : (
              criticalTickets.map(ticket => (
                <div 
                  key={ticket._id}
                  onClick={() => onViewTicket(ticket)}
                  className="p-4 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{ticket.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{"TKT-" + ticket._id.slice(-6).toUpperCase()} • {ticket.category}</p>
                    </div>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
            <button 
              onClick={() => setCurrentView('tickets')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTickets.map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => onViewTicket(ticket)}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{ticket.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{ticket.id}</p>
                  </div>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions / Admin Stats */}
      {isAdmin ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total System Tickets</h4>
            <p className="text-3xl font-bold text-gray-900">{allTickets.length}</p>
            <p className="text-xs text-gray-500 mt-1">Across all users</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Needs Attention</h4>
            <p className="text-3xl font-bold text-orange-600">
              {allTickets.filter(t => t.status === 'Open' || t.status === 'Pending').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Open or pending tickets</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Resolution Rate</h4>
            <p className="text-3xl font-bold text-green-600">
              {allTickets.length > 0 
                ? Math.round((allTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length / allTickets.length) * 100)
                : 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Resolved or closed</p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
          <p className="text-blue-100 mb-6">Create a new ticket and our team will assist you as soon as possible.</p>
          <button 
            onClick={() => setCurrentView('create')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Create New Ticket
          </button>
        </div>
      )}
    </div>
  );
}
