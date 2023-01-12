export const getAndSetAccessToken = () => {
  const user = JSON.parse(window.localStorage.getItem("APP_SESSION"));

  return `Bearer ${user.AccessToken}`;
};

export const postConfig = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export const authPostConfig = (data) => {
  if (data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAndSetAccessToken(),
    },
  };
};

export const authPutConfig = (data) => {
  if (data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAndSetAccessToken(),
      },
      body: JSON.stringify(data),
    };
  }
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAndSetAccessToken(),
    },
  };
};

export const authGetConfig = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAndSetAccessToken(),
    },
  };
};

export const authDeleteConfig = () => {
  return {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAndSetAccessToken(),
    },
  };
};

export const ApiFetchError = (errorMessage, customText) => {
  if (!window.navigator.onLine) {
    return {
      status: false,
      error: true,
      message: `Revisa tu conexión a internet`,
    };
  }
  if (errorMessage === "Failed to fetch") {
    return {
      status: false,
      error: true,
      message: `Conexión con el servidor perdida`,
    };
  }

  return {
    status: false,
    error: true,
    message: `${
      customText !== undefined && customText.length > 0
        ? customText
        : `Algo pasó, contácta al área de sistemas`
    }`,
  };
};
