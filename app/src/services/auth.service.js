import { API } from "./API";

export const LoginService = async (credentials) => {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (response.status >= 400) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
