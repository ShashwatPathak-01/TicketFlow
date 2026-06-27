import API from "./api";

export const getTickets = async () => {
  const response = await API.get("/tickets");
  return response.data;
};

export const createTicket = async (ticketData) => {
  const response = await API.post("/tickets", ticketData);
  return response.data;
};

export const updateTicket = async (id, ticketData) => {
  const response = await API.put(`/tickets/${id}`, ticketData);
  return response.data;
};

export const assignTicket = async (id, assignedTo) => {
  const response = await API.put(`/tickets/${id}/assign`, {
    assignedTo,
  });

  return response.data;
};

export const addComment = async (id, message) => {
  const response = await API.post(`/tickets/${id}/comments`, {
    message,
  });

  return response.data;
};