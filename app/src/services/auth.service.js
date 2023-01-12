import { API } from "./API";

export const LoginService = async (credentials) => {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
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

export const SignupService = async (credentials) => {
  const response = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(credentials),
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

export const RecoverAccountService = async (email) => {
  const response = await fetch(`${API}/recover-password/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(email),
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

export const VerifyRecoverAccountTokenService = async (token) => {
  const response = await fetch(`${API}/verify-reset-token/${token}/`, {
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

export const ChangePasswordWithRecoverTokenService = async (
  token,
  newPassword
) => {
  const response = await fetch(`${API}/reset-password/${token}/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ password: newPassword }),
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
