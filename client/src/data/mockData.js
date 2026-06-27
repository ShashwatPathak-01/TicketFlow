export const mockTickets = [
  {
    id: 'TKT-001',
    title: 'Unable to access email on mobile device',
    description: 'I am unable to sync my corporate email on my iPhone. Getting authentication error.',
    category: 'IT Support',
    priority: 'High',
    status: 'In Progress',
    createdBy: 'John Smith',
    reportedFor: 'John Smith',
    assignedTo: 'IT Team',
    createdAt: new Date('2024-01-15T09:30:00'),
    updatedAt: new Date('2024-01-15T14:20:00'),
    comments: [
      {
        id: 'CMT-001',
        ticketId: 'TKT-001',
        author: 'IT Team',
        content: 'We are looking into this issue. Please try resetting your password first.',
        createdAt: new Date('2024-01-15T10:15:00')
      }
    ]
  },
  {
    id: 'TKT-002',
    title: 'Request for new software license',
    description: 'Need Adobe Creative Suite license for the design team project.',
    category: 'IT Support',
    priority: 'Medium',
    status: 'Pending',
    createdBy: 'Sarah Johnson',
    assignedTo: 'Procurement',
    createdAt: new Date('2024-01-14T11:00:00'),
    updatedAt: new Date('2024-01-14T15:30:00')
  },
  {
    id: 'TKT-003',
    title: 'Payroll discrepancy in December salary',
    description: 'There is a mismatch in my salary credit. Expected amount was not received.',
    category: 'Finance',
    priority: 'Critical',
    status: 'Open',
    createdBy: 'Michael Chen',
    assignedTo: 'Finance Team',
    createdAt: new Date('2024-01-16T08:45:00'),
    updatedAt: new Date('2024-01-16T08:45:00')
  },
  {
    id: 'TKT-004',
    title: 'Conference room booking system not working',
    description: 'Cannot book meeting rooms through the portal. System shows error 500.',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
    createdBy: 'Emily Davis',
    assignedTo: 'Tech Support',
    createdAt: new Date('2024-01-15T13:20:00'),
    updatedAt: new Date('2024-01-16T09:10:00')
  },
  {
    id: 'TKT-005',
    title: 'Leave balance showing incorrect data',
    description: 'My leave balance is showing 5 days but I should have 15 days available.',
    category: 'HR',
    priority: 'Medium',
    status: 'Resolved',
    createdBy: 'David Wilson',
    assignedTo: 'HR Department',
    createdAt: new Date('2024-01-10T10:00:00'),
    updatedAt: new Date('2024-01-13T16:00:00')
  },
  {
    id: 'TKT-006',
    title: 'Air conditioning not working in office',
    description: 'AC unit in Floor 3, Zone B is not cooling properly.',
    category: 'Facilities',
    priority: 'Low',
    status: 'Closed',
    createdBy: 'Lisa Anderson',
    assignedTo: 'Facilities',
    createdAt: new Date('2024-01-08T14:30:00'),
    updatedAt: new Date('2024-01-09T17:00:00')
  },
  {
    id: 'TKT-007',
    title: 'VPN connection keeps dropping',
    description: 'Remote VPN connection disconnects every 15-20 minutes when working from home.',
    category: 'IT Support',
    priority: 'High',
    status: 'Open',
    createdBy: 'Robert Taylor',
    createdAt: new Date('2024-01-16T07:15:00'),
    updatedAt: new Date('2024-01-16T07:15:00')
  },
  {
    id: 'TKT-008',
    title: 'Request for parking space',
    description: 'Need a dedicated parking spot as I will be working from office full-time.',
    category: 'Facilities',
    priority: 'Low',
    status: 'Pending',
    createdBy: 'Jennifer Martinez',
    assignedTo: 'Admin',
    createdAt: new Date('2024-01-12T09:00:00'),
    updatedAt: new Date('2024-01-13T10:30:00')
  }
];
