import test from "node:test";
import assert from "node:assert/strict";
import { astronomyMonths } from "../src/astronomyEvents.js";
import { checkpointQuestions, lessonDetails, lessonQuizzes } from "../src/learningExtras.js";

test("every lesson has detailed sections and five quiz questions", () => {
  assert.equal(Object.keys(lessonDetails).length, 14);
  for (let id = 1; id <= 14; id += 1) {
    assert.ok(lessonDetails[id].every((paragraph) => paragraph.length > 180));
    assert.equal(lessonQuizzes[id].length, 5);
    assert.ok(lessonQuizzes[id].every((question) => question.options.length >= 3));
  }
});

test("checkpoint and annual calendar are complete", () => {
  assert.equal(checkpointQuestions.length, 25);
  assert.equal(astronomyMonths.length, 12);
  assert.ok(astronomyMonths.every((month) => month.events.length > 0));
});
