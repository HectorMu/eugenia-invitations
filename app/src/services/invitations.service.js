import {
  authDeleteConfig,
  authGetConfig,
  authPostConfig,
  authPutConfig,
} from "@/helpers/fetchHelpers";
import { API } from "./API";

export const getUserInvitations = async () => {
  const response = await fetch(`${API}/invitations`, authGetConfig());
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};

export const getInvitationDetail = async (id) => {
  const response = await fetch(`${API}/invitations/${id}`, authGetConfig());
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};

export const createNewInvitation = async (newInvitation) => {
  const response = await fetch(
    `${API}/invitations`,
    authPostConfig(newInvitation)
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};

export const updateInvitation = async (newInvitation) => {
  const response = await fetch(
    `${API}/invitations/${newInvitation.id}`,
    authPutConfig(newInvitation)
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteInvitation = async (id) => {
  const response = await fetch(`${API}/invitations/${id}`, authDeleteConfig());
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  if (response.status >= 400) {
    throw new Error(data.message);
  }

  return data;
};
