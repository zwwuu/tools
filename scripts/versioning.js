const path = require("path");
const fs = require("fs");

const version = process.argv[2];
const versionDirectory = path.join(__dirname, `../src/data/changelogs`);
const versionFile = path.join(`${versionDirectory}/${version}.md`);

fs.mkdirSync(versionDirectory, { recursive: true });
fs.writeFileSync(
  versionFile,
  `---
version: '${version}'
date: '${new Date().toISOString()}'
---
`,
  "utf8",
);
