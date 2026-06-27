import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CreateTicket({
  onCreateTicket,
  onCancel,
  currentUser,
  users,
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'IT Support',
    priority: 'Medium',

    createdBy: currentUser.name,

    reportedFor:
      currentUser.role === "admin"
        ? ""
        : currentUser.name,
  });

  const [errors, setErrors] = useState({});

  const categories = ['Technical', 'HR', 'Finance', 'IT Support', 'Facilities', 'Other'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.createdBy.trim()) {
      newErrors.createdBy = 'Your name is required';
    }
    if (
      currentUser.role === "admin" &&
      !formData.reportedFor
    ) {
      newErrors.reportedFor = "Please select an employee";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onCreateTicket({
        ...formData,
        status: 'Open',
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create New Ticket</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in the details below to submit your request</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Your Name */}
          <div>
            <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">Logged in as {currentUser.name}</p>
          </div>

          {currentUser.role === "admin" && (
            <div>
              <label
                htmlFor="reportedFor"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Raise Ticket For <span className="text-red-500">*</span>
              </label>

              <select
                id="reportedFor"
                name="reportedFor"
                value={formData.reportedFor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Employee</option>

                {users
                  .filter(user => user.role === "user")
                  .map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
              </select>

              {errors.reportedFor && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.reportedFor}
                </p>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of your issue"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Provide detailed information about your issue or request..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Priority Guidelines:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Critical:</strong> System down, major business impact</li>
              <li><strong>High:</strong> Significant impact on productivity</li>
              <li><strong>Medium:</strong> Moderate impact, workaround available</li>
              <li><strong>Low:</strong> Minor issue, minimal impact</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
