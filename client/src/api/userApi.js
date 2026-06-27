import API from "./api";

export const getSupportAgents = async () => {
  const response = await API.get("/users/support-agents");
  return response.data;
};