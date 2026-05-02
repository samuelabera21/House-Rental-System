export const STORAGE_KEYS = {
  USERS: "hrms_users",
  ACTIVE_USER: "hrms_active_user",
};

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function getSavedUsers() {
  if (typeof window === "undefined") {
    return [];
  }

  const parsed = safeParse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]", []);
  return Array.isArray(parsed) ? parsed : [];
}

export function getActiveUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const parsed = safeParse(localStorage.getItem(STORAGE_KEYS.ACTIVE_USER) || "null", null);

  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  if (!parsed.email || !parsed.role) {
    return null;
  }

  return parsed;
}

export function setActiveUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEYS.ACTIVE_USER,
    JSON.stringify({
      email: String(user.email || "").trim().toLowerCase(),
      role: user.role,
      fullName: user.fullName || "",
      isAuthenticated: true,
      authenticatedAt: new Date().toISOString(),
    }),
  );
}

export function clearActiveUser() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
}