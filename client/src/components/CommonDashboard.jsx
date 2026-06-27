import { 
  MegaphoneIcon, 
  InformationCircleIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  LightBulbIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function CommonDashboard({ currentUser, allTickets }) {
  const isAdmin = currentUser.role === 'Admin';

  // Calculate some common stats
  const totalTickets = allTickets.length;
  const openTickets = allTickets.filter(t => t.status === 'Open').length;
  const avgResolutionTime = "2.5 days"; // Mock data
  const activeUsers = isAdmin ? 5 : "N/A";

  // Announcements (same for everyone)
  const announcements = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      content: "Planned maintenance on Saturday, 2 AM - 4 AM EST. Email services may be briefly unavailable.",
      date: new Date('2024-01-20'),
      type: "warning"
    },
    {
      id: 2,
      title: "New IT Support Hours",
      content: "IT Support is now available 24/7 for critical issues. Standard support: Mon-Fri, 8 AM - 6 PM.",
      date: new Date('2024-01-18'),
      type: "info"
    },
    {
      id: 3,
      title: "Updated Security Policy",
      content: "Please review the new password policy. Passwords must be changed every 90 days.",
      date: new Date('2024-01-15'),
      type: "important"
    }
  ];

  // Quick links
  const quickLinks = [
    { name: "IT Support Portal", url: "#", icon: QuestionMarkCircleIcon },
    { name: "HR Self-Service", url: "#", icon: UserGroupIcon },
    { name: "Company Policies", url: "#", icon: DocumentTextIcon },
    { name: "Training Resources", url: "#", icon: LightBulbIcon },
  ];

  // FAQs
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Submit a ticket under 'IT Support' category with priority 'High'. Include your username."
    },
    {
      question: "What are the ticket priority levels?",
      answer: "Critical (immediate), High (within hours), Medium (1-2 days), Low (when available)."
    },
    {
      question: "How long does it take to resolve a ticket?",
      answer: "Average resolution time is 2.5 days. Critical tickets are handled immediately."
    },
    {
      question: "Can I update my ticket after submission?",
      answer: "Yes! Click on your ticket and use the 'Edit Ticket' button or add comments."
    }
  ];

  const getAnnouncementColor = (type) => {
    switch(type) {
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      case 'important': return 'border-l-red-500 bg-red-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Home</h2>
        <p className="text-gray-600 mt-1">Welcome to the Corporate Support Portal</p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-sm p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Hello, {currentUser.name}! 👋
            </h3>
            <p className="text-indigo-100 mb-4">
              {isAdmin 
                ? "You're logged in as an administrator. You have full access to the system."
                : `Welcome to the support portal. We're here to help you with any queries.`}
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="h-5 w-5" />
                <span>
                  Role: {currentUser.role === "Admin" ? "Administrator" : currentUser.role}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <InformationCircleIcon className="h-5 w-5" />
                <span>
                  Department: {currentUser.department || "General"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalTickets}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">System-wide</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{openTickets}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Awaiting response</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{avgResolutionTime}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Average time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeUsers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {isAdmin ? 'Total users' : 'Information'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MegaphoneIcon className="h-6 w-6 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
          </div>
          <div className="space-y-4">
            {announcements.map(announcement => (
              <div 
                key={announcement.id}
                className={`border-l-4 rounded-r-lg p-4 ${getAnnouncementColor(announcement.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                  <span className="text-xs text-gray-500">
                    {announcement.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <InformationCircleIcon className="h-6 w-6 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all group"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mb-2 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Contact Support */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <PhoneIcon className="h-5 w-5 mr-2 text-gray-600" />
              Need Help?
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>Email:</strong> support@company.com
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> 1-800-SUPPORT
              </p>
              <p className="text-gray-700">
                <strong>Hours:</strong> Mon-Fri, 8 AM - 6 PM EST
              </p>
              <p className="text-gray-700">
                <strong>Emergency:</strong> 24/7 for critical issues
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <QuestionMarkCircleIcon className="h-6 w-6 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-sm text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-600 p-3 rounded-lg">
            <LightBulbIcon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Use clear, descriptive titles for your tickets to get faster responses</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Set the correct priority level - it helps us prioritize your request</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Check your ticket status regularly and respond to admin comments promptly</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Search existing tickets before creating new ones - your question might already be answered</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-900">Email System</span>
            </div>
            <span className="text-sm text-green-700 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-900">VPN Service</span>
            </div>
            <span className="text-sm text-green-700 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-900">File Sharing</span>
            </div>
            <span className="text-sm text-green-700 font-medium">Operational</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Printing Services</span>
            </div>
            <span className="text-sm text-yellow-700 font-medium">Scheduled Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
