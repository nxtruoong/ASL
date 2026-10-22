export const mockUsers = {
  learner: {
    userId: "mock-learner",
    name: "Sao Mai student",
    roles: ["learner"]
  },
  instructor: {
    userId: "mock-instructor",
    name: "Galaxy Instructor",
    roles: ["learner", "instructor"]
  }
};

const accessPolicy = {
  "progress:write": ["learner"],
  "class:read": ["instructor"]
};

export const canAccess = (roles = [], permission) =>
accessPolicy[permission]?.some((role) => roles.includes(role)) ?? false;
