export const mockUsers = [
  {
    id: 'user-1',
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    department: 'IT Support'
  },
  {
    id: 'user-2',
    username: 'john',
    password: 'john123',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'user',
    department: 'Sales'
  },
  {
    id: 'user-3',
    username: 'sarah',
    password: 'sarah123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'user',
    department: 'Design'
  },
  {
    id: 'user-4',
    username: 'michael',
    password: 'michael123',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'user',
    department: 'Finance'
  },
  {
    id: 'user-5',
    username: 'support',
    password: 'support123',
    name: 'Support Team',
    email: 'support@company.com',
    role: 'admin',
    department: 'IT Support'
  }
];

// Demo credentials for easy reference
export const demoCredentials = {
  admin: {
    username: 'admin',
    password: 'admin123',
    description: 'Full admin access - can manage all tickets, assign tickets, and view all data'
  },
  user: {
    username: 'john',
    password: 'john123',
    description: 'Regular user - can create and view own tickets, add comments'
  }
};
