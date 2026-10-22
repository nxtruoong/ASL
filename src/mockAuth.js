import { mockUsers } from "./authPolicy.js";

const mockUsersKey = "orbit-tidecloak-mock-users";

const publicProfile = ({ passwordHash, salt, ...profile }) => profile;

const readUsers = (storage) => {
  try {
    const users = JSON.parse(storage.getItem(mockUsersKey) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const hashPassword = async (password, salt, cryptoApi) => {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await cryptoApi.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
  byte.toString(16).padStart(2, "0")
  ).join("");
};

export function loadMockProfile(userId, storage = localStorage) {
  const demo = Object.values(mockUsers).find((user) => user.userId === userId);
  const stored = readUsers(storage).find((user) => user.userId === userId);
  return demo || stored && publicProfile(stored) || null;
}

export async function registerMockUser(
{ name, email, password },
storage = localStorage,
cryptoApi = crypto)
{
  const normalizedEmail = email.trim().toLocaleLowerCase("vi");
  const users = readUsers(storage);
  if (!name.trim()) throw new Error("Please enter your name.");
  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail))
  throw new Error("Email is not in correct format.");
  if (password.length < 8) throw new Error("Password needs at least 8 characters.");
  if (users.some((user) => user.email === normalizedEmail))
  throw new Error("This email has been registered.");

  const salt = cryptoApi.randomUUID();
  const user = {
    userId: `mock-${cryptoApi.randomUUID()}`,
    name: name.trim(),
    email: normalizedEmail,
    roles: ["learner"],
    salt,
    passwordHash: await hashPassword(password, salt, cryptoApi)
  };
  storage.setItem(mockUsersKey, JSON.stringify([...users, user]));
  return publicProfile(user);
}

export async function authenticateMockUser(
{ email, password },
storage = localStorage,
cryptoApi = crypto)
{
  const normalizedEmail = email.trim().toLocaleLowerCase("vi");
  const user = readUsers(storage).find((item) => item.email === normalizedEmail);
  if (!user || (await hashPassword(password, user.salt, cryptoApi)) !== user.passwordHash)
  throw new Error("Email or password is incorrect.");
  return publicProfile(user);
}
