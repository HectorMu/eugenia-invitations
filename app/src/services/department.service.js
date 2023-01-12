import { API } from "./API";

export const getDepartments = async () => {
  const response = await fetch(`${API}/departments`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};
