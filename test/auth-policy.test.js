import assert from "node:assert/strict";
import test from "node:test";
import { canAccess, mockUsers } from "../src/authPolicy.js";
import {
  authenticateMockUser,
  loadMockProfile,
  registerMockUser,
} from "../src/mockAuth.js";

test("simulated TideCloak roles enforce the same access policy", () => {
  assert.equal(canAccess(mockUsers.learner.roles, "progress:write"), true);
  assert.equal(canAccess(mockUsers.learner.roles, "class:read"), false);
  assert.equal(canAccess(mockUsers.instructor.roles, "class:read"), true);
  assert.equal(canAccess(mockUsers.instructor.roles, "unknown"), false);
});

test("registers and signs into a local learner account without storing the password", async () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  };
  const credentials = { name: "Sao Mai", email: "STAR@example.com", password: "orbit-123" };
  const registered = await registerMockUser(credentials, storage, crypto);
  const signedIn = await authenticateMockUser(credentials, storage, crypto);

  assert.deepEqual(signedIn, registered);
  assert.deepEqual(registered.roles, ["learner"]);
  assert.equal(loadMockProfile(registered.userId, storage).email, "star@example.com");
  assert.equal([...values.values()][0].includes(credentials.password), false);
});
