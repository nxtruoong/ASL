import fs from "node:fs/promises";
import path from "node:path";
import parser from "@babel/parser";
import traverseModule from "@babel/traverse";
import generatorModule from "@babel/generator";

const traverse = traverseModule.default;
const generate = generatorModule.default;
const root = path.resolve("src");
const cacheFile = path.resolve(".impeccable/translation-cache.json");
const fileNames = (await fs.readdir(root)).filter((name) => /\.(js|jsx)$/.test(name));
const hasVietnamese = (value) => /[À-ỹĐđ]/.test(value);
const documents = [];
const targets = [];

for (const name of fileNames) {
  const file = path.join(root, name);
  const source = await fs.readFile(file, "utf8");
  const ast = parser.parse(source, { sourceType: "module", plugins: ["jsx"] });
  const addTarget = (value, set) => {
    const text = value.trim();
    if (text && hasVietnamese(text)) targets.push({ text, value, set });
  };
  traverse(ast, {
    StringLiteral(nodePath) {
      addTarget(nodePath.node.value, (value) => { nodePath.node.value = value; });
    },
    TemplateElement(nodePath) {
      addTarget(nodePath.node.value.raw, (value) => {
        nodePath.node.value.raw = value;
        nodePath.node.value.cooked = value;
      });
    },
    JSXText(nodePath) {
      addTarget(nodePath.node.value, (value) => { nodePath.node.value = value; });
    },
  });
  documents.push({ ast, file, source });
}

const unique = [...new Set(targets.map(({ text }) => text))];
let savedTranslations = {};
try { savedTranslations = JSON.parse(await fs.readFile(cacheFile, "utf8")); } catch {}
const translations = new Map(Object.entries(savedTranslations));
for (const [index, text] of unique.entries()) {
  if (translations.has(text)) continue;
  const url = new URL("https://clients5.google.com/translate_a/t");
  url.search = new URLSearchParams({ client: "dict-chrome-ex", sl: "vi", tl: "en", q: text });
  let response;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    response = await fetch(url);
    if (response.ok) break;
    await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
  }
  if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
  const output = await response.json();
  if (!output[0]) throw new Error(`Missing translation ${index}`);
  translations.set(text, output[0]);
  await fs.writeFile(cacheFile, JSON.stringify(Object.fromEntries(translations), null, 2));
  if ((index + 1) % 25 === 0) console.log(`Translated ${index + 1}/${unique.length}`);
  await new Promise((resolve) => setTimeout(resolve, 80));
}

for (const target of targets)
  target.set(target.value.replace(target.text, translations.get(target.text)));
for (const { ast, file, source } of documents)
  await fs.writeFile(file, `${generate(ast, { retainLines: true }, source).code}\n`);

console.log(`Translated ${unique.length} unique UI strings across ${documents.length} files.`);
