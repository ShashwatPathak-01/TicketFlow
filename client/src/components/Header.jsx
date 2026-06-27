import { TicketIcon, HomeIcon, ListBulletIcon, PlusCircleIcon, ArrowRightOnRectangleIcon, UserCircleIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Header({ currentView, setCurrentView, currentUser, onLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TicketIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ticket System</h1>
              <p className="text-xs text-gray-500">Corporate Support Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <nav className="flex space-x-1">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChartBarIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('tickets')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'tickets'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
                <span>{currentUser.role === 'admin' ? 'All Tickets' : 'My Tickets'}</span>
              </button>
              <button
                onClick={() => setCurrentView('create')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'create'
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span>New Ticket</span>
              </button>
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
              {currentUser.role === 'admin' ? (
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
              ) : (
                <UserCircleIcon className="h-5 w-5 text-gray-600" />
              )}
              <div className="text-left">
                <p className="text-xs font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors flex items-center space-x-2"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
