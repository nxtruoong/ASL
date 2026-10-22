export const anonymousProgressKey = "orbit-learned-v1";

export const progressStorageKey = (userId) =>
userId ? `${anonymousProgressKey}:${userId}` : anonymousProgressKey;

export function loadProgress(storageKey, lessonCount, storage = localStorage) {
  try {
    const value = JSON.parse(storage.getItem(storageKey) || "[]");
    return Array.isArray(value) ?
    [
    ...new Set(
      value.filter(
        (id) => Number.isInteger(id) && id >= 1 && id <= lessonCount
      )
    )] :

    [];
  } catch {
    return [];
  }
}
