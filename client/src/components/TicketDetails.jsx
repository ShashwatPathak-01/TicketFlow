import { useState } from 'react';
import { useEffect } from "react";
import { getSupportAgents } from "../api/userApi";
import { 
  ArrowLeftIcon, 
  UserIcon, 
  CalendarIcon, 
  TagIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import {
  updateTicket,
  addComment,
  assignTicket,
} from "../api/ticketApi";

export default function TicketDetails({ ticket, onUpdateTicket, onBack, currentUser, users }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState(ticket);
  const [newComment, setNewComment] = useState('');
  const [supportAgents, setSupportAgents] = useState([]);

  const statuses = ['Open', 'In Progress', 'Pending', 'Resolved', 'Closed'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const isAdmin = currentUser.role === 'Admin';

  useEffect(() => {
    if (currentUser.role !== "Admin") return;

    const loadAgents = async () => {
      try {
        const data = await getSupportAgents();
        setSupportAgents(data.agents);
      } catch (error) {
        console.error(error);
      }
    };

    loadAgents();
  }, [currentUser.role]);

  const isTicketOwner =
    ticket.createdBy?._id === currentUser._id ||
    ticket.reportedFor?._id === currentUser._id;

  const canEdit =
    isAdmin ||
    isTicketOwner ||
    currentUser.role === "SupportAgent";

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

  const handleSave = async () => {
    try {

      // Update ticket details (status, priority, title, description, etc.)
      const response = await updateTicket(
        ticket._id,
        editedTicket
      );

      let updatedTicket = response.ticket;

      // If Admin assigned the ticket, save the assignment too
      if (
        currentUser.role === "Admin" &&
        editedTicket.assignedTo
      ) {
        const assignResponse = await assignTicket(
          ticket._id,
          editedTicket.assignedTo
        );

        updatedTicket = assignResponse.ticket;
      }

      onUpdateTicket(updatedTicket);

      setEditedTicket(updatedTicket);

      setIsEditing(false);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to update ticket."
      );
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await addComment(
        ticket._id,
        newComment
      );

      onUpdateTicket(response.ticket);

      setNewComment("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Unable to add comment."
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Tickets
        </button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{ticket.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
            <p className="text-gray-600">Ticket ID: {"TKT-" + ticket._id.slice(-6).toUpperCase()}</p>
          </div>
          {canEdit && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Ticket'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <ChatBubbleLeftIcon className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Comments ({ticket.comments?.length || 0})
              </h2>
            </div>

            {/* Existing Comments */}
            <div className="space-y-4 mb-6">
              {ticket.comments && ticket.comments.length > 0 ? (
                ticket.comments.map(comment => (
                  <div key={comment._id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{comment.author?.name || comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No comments yet</p>
              )}
            </div>

            {/* Add Comment */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Add a Comment</h3>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Status</h3>
            {isEditing && (currentUser.role === "Admin" || currentUser.role === "SupportAgent") ? (
              <select
                value={editedTicket.status}
                onChange={(e) => setEditedTicket({ ...editedTicket, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            ) : (
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            )}
            {isEditing &&
            !(currentUser.role === "Admin" || currentUser.role === "SupportAgent") && (
                <p className="text-xs text-gray-500 mt-2">
                    Only Admins and Support Agents can change status
                </p>
            )}
          </div>

          {/* Priority Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Priority</h3>
            {isEditing ? (
              <select
                value={editedTicket.priority}
                onChange={(e) => setEditedTicket({ ...editedTicket, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            ) : (
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded border ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            )}
          </div>

          {/* Assign To Card - Admin Only */}
          {isAdmin && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Assign To</h3>
              {isEditing ? (
                <select
                  value={editedTicket.assignedTo?._id || editedTicket.assignedTo || ""}
                  onChange={(e) => setEditedTicket({ ...editedTicket, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Unassigned</option>

                  {supportAgents.map((agent) => (
                    <option
                      key={agent._id}
                      value={agent._id}
                    >
                      {agent.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="inline-block px-3 py-1 text-sm font-medium rounded bg-gray-100 text-gray-800">
                  {ticket.assignedTo?.name || "Unassigned"}
                </span>
              )}
            </div>
          )}

          {/* Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <TagIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-900">{ticket.category}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Created By</p>
                  <p className="text-sm font-medium text-gray-900">{ticket.createdBy?.name}</p>
                  {ticket.createdBy?._id !== ticket.reportedFor?._id && (
                    <div className="flex items-start space-x-2">
                      <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Reported For</p>
                        <p className="text-sm font-medium text-gray-900">
                          {ticket.reportedFor?.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {ticket.assignedTo && (
                <div className="flex items-start space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Assigned To</p>
                    <p className="text-sm font-medium text-gray-900">{ticket.assignedTo?.name}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Changes */}
          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
