import assert from "node:assert/strict";
import test from "node:test";
import {
  anonymousProgressKey,
  loadProgress,
  progressStorageKey,
} from "../src/progress.js";

test("scopes progress by TideCloak subject", () => {
  assert.equal(progressStorageKey(), anonymousProgressKey);
  assert.equal(
    progressStorageKey("user-123"),
    `${anonymousProgressKey}:user-123`,
  );
});

test("accepts only unique lesson ids in range", () => {
  const storage = {
    getItem: () => JSON.stringify([1, 1, 14, 15, "2", null]),
  };

  assert.deepEqual(loadProgress("key", 14, storage), [1, 14]);
});

test("falls back safely for unavailable or malformed storage", () => {
  assert.deepEqual(loadProgress("key", 14, { getItem: () => "{" }), []);
  assert.deepEqual(
    loadProgress("key", 14, {
      getItem: () => {
        throw new Error("blocked");
      },
    }),
    [],
  );
});
