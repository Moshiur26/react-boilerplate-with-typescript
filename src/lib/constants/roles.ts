export const roleBasedPermissions = {
  dashboard: ["super_admin", "admin"],
  admin: {
    list: ["super_admin", "admin"],
    details: ["super_admin", "admin"],
    edit: ["super_admin"],
    create: ["super_admin"],
  },
};
