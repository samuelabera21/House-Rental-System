export const systemAdmins = [
  {
    fullName: "System Administrator",
    email: "admin@hrms.local",
    phone: "0910000000",
    address: "Addis Ababa",
    password: "ChangeMe@123",
    role: "admin",
    isSystemAccount: true,
  },
];

export function mergeUsersWithSystemAdmins(users) {
  const baseUsers = Array.isArray(users) ? users : [];
  const normalizedEmails = new Set(
    baseUsers
      .map((user) => user?.email)
      .filter(Boolean)
      .map((email) => email.toLowerCase()),
  );

  const missingAdmins = systemAdmins.filter(
    (admin) => !normalizedEmails.has(admin.email.toLowerCase()),
  );

  return [...baseUsers, ...missingAdmins];
}
