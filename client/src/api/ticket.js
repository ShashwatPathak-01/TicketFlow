import API from "./auth";

export const getTickets = () => API.get("/tickets");

export const createTicket = (data) =>
    API.post("/tickets", data);

export const updateTicket = (id, data) =>
    API.put(`/tickets/${id}`, data);

export const assignTicket = (id, data) =>
    API.put(`/tickets/${id}/assign`, data);