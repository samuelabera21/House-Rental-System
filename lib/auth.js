import { systemAdmins } from "./systemAdmins";

export const STORAGE_KEYS = {
  USERS: "hrms_users",
  ACTIVE_USER: "hrms_active_user",
  SYSTEM_ADMIN_OVERRIDES: "hrms_system_admin_overrides",
};

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function pickEditableProfileFields(user) {
  return {
    fullName: String(user.fullName || "").trim(),
    phone: String(user.phone || "").trim(),
    address: String(user.address || "").trim(),
    profileImage: String(user.profileImage || "").trim(),
    bio: String(user.bio || "").trim(),
  };
}

function normalizeApprovalState(user) {
  const role = String(user.role || "").toLowerCase();
  const accountStatus =
    String(user.accountStatus || "").trim() || (role === "owner" ? "Approved" : "Active");
  const isApproved =
    typeof user.isApproved === "boolean"
      ? user.isApproved
      : role === "owner"
        ? accountStatus === "Approved" || accountStatus === "Active"
        : true;

  return {
    accountStatus,
    isApproved,
  };
}

function readStoredObject(storageKey, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const parsed = safeParse(localStorage.getItem(storageKey) || JSON.stringify(fallback), fallback);
  return parsed && typeof parsed === "object" ? parsed : fallback;
}

function writeStoredObject(storageKey, value) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(storageKey, JSON.stringify(value));
}

function notifyAuthChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("hrms-auth-change"));
}

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

export function getSystemAdminOverrides() {
  return readStoredObject(STORAGE_KEYS.SYSTEM_ADMIN_OVERRIDES, {});
}

export function getMergedAccounts(users = getSavedUsers()) {
  const savedUsers = Array.isArray(users) ? users : [];
  const overrides = getSystemAdminOverrides();
  const savedEmails = new Set(
    savedUsers.map((user) => normalizeEmail(user?.email)).filter(Boolean),
  );

  const mergedAdmins = systemAdmins
    .map((admin) => {
      const override = overrides[normalizeEmail(admin.email)];

      return override ? { ...admin, ...override, email: normalizeEmail(admin.email) } : admin;
    })
    .filter((admin) => !savedEmails.has(normalizeEmail(admin.email)));

  return [...savedUsers, ...mergedAdmins];
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

  const approvalState = normalizeApprovalState(user);

  localStorage.setItem(
    STORAGE_KEYS.ACTIVE_USER,
    JSON.stringify({
      email: normalizeEmail(user.email),
      role: user.role,
      fullName: user.fullName || "",
      phone: user.phone || "",
      address: user.address || "",
      profileImage: user.profileImage || "",
      bio: user.bio || "",
      accountStatus: approvalState.accountStatus,
      isApproved: approvalState.isApproved,
      isSystemAccount: Boolean(user.isSystemAccount),
      isAuthenticated: true,
      authenticatedAt: new Date().toISOString(),
    }),
  );

  notifyAuthChange();
}

export function updateStoredUserProfile(email, updates) {
  const normalizedEmail = normalizeEmail(email);
  const editableUpdates = pickEditableProfileFields(updates || {});
  const savedUsers = getSavedUsers();
  const currentOverrides = getSystemAdminOverrides();

  const savedUserIndex = savedUsers.findIndex(
    (user) => normalizeEmail(user?.email) === normalizedEmail,
  );

  if (savedUserIndex !== -1) {
    const nextSavedUsers = [...savedUsers];
    nextSavedUsers[savedUserIndex] = {
      ...nextSavedUsers[savedUserIndex],
      ...editableUpdates,
      email: normalizedEmail,
    };
    writeStoredObject(STORAGE_KEYS.USERS, nextSavedUsers);

    const updatedUser = nextSavedUsers[savedUserIndex];
    const activeUser = getActiveUser();
    if (activeUser && normalizeEmail(activeUser.email) === normalizedEmail) {
      setActiveUser(updatedUser);
    }

    notifyAuthChange();

    return updatedUser;
  }

  const adminIndex = systemAdmins.findIndex(
    (admin) => normalizeEmail(admin.email) === normalizedEmail,
  );

  if (adminIndex !== -1) {
    const nextOverrides = {
      ...currentOverrides,
      [normalizedEmail]: {
        ...(currentOverrides[normalizedEmail] || {}),
        ...editableUpdates,
      },
    };

    writeStoredObject(STORAGE_KEYS.SYSTEM_ADMIN_OVERRIDES, nextOverrides);

    const updatedUser = getMergedAccounts(savedUsers).find(
      (user) => normalizeEmail(user.email) === normalizedEmail,
    );

    const activeUser = getActiveUser();
    if (updatedUser && activeUser && normalizeEmail(activeUser.email) === normalizedEmail) {
      setActiveUser(updatedUser);
    }

    notifyAuthChange();

    return updatedUser || null;
  }

  return null;
}

export function updateStoredUserApproval(email, updates) {
  const normalizedEmail = normalizeEmail(email);
  const savedUsers = getSavedUsers();
  const savedUserIndex = savedUsers.findIndex(
    (user) => normalizeEmail(user?.email) === normalizedEmail,
  );

  if (savedUserIndex === -1) {
    return null;
  }

  const approvalState = normalizeApprovalState(updates || {});
  const nextSavedUsers = [...savedUsers];
  nextSavedUsers[savedUserIndex] = {
    ...nextSavedUsers[savedUserIndex],
    ...approvalState,
    approvalNote: String(updates?.approvalNote || nextSavedUsers[savedUserIndex].approvalNote || "").trim(),
    reviewedBy: String(updates?.reviewedBy || nextSavedUsers[savedUserIndex].reviewedBy || "").trim(),
    reviewedAt: updates?.reviewedAt || new Date().toISOString(),
    email: normalizedEmail,
  };

  writeStoredObject(STORAGE_KEYS.USERS, nextSavedUsers);

  const updatedUser = nextSavedUsers[savedUserIndex];
  const activeUser = getActiveUser();
  if (activeUser && normalizeEmail(activeUser.email) === normalizedEmail) {
    setActiveUser(updatedUser);
  }

  notifyAuthChange();

  return updatedUser;
}

export function clearActiveUser() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
  notifyAuthChange();
}