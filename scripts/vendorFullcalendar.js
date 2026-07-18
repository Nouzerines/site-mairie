const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const source = path.join(root, "node_modules", "fullcalendar");
const target = path.join(root, "assets", "fullcalendar");

const needed = [
  "all.global.js",
  "skeleton.css",
  "locales/fr.global.js",
  "themes/breezy/global.js",
  "themes/breezy/theme.css",
  "themes/breezy/palettes/emerald.css",
];

if (!fs.existsSync(source)) {
  console.warn(
    "vendorFullcalendar: node_modules/fullcalendar introuvable — skip (npm install d'abord)",
  );
  process.exit(0);
}

for (const rel of needed) {
  const from = path.join(source, rel);
  const to = path.join(target, rel);
  if (!fs.existsSync(from)) {
    console.error(`vendorFullcalendar: fichier manquant: ${rel}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

console.log("vendorFullcalendar: fichiers copiés dans assets/fullcalendar/");
