const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const fcSource = path.join(root, "node_modules", "fullcalendar");
const temporalSource = path.join(root, "node_modules", "temporal-polyfill");
const target = path.join(root, "assets", "fullcalendar");

/** @type {Array<{ from: string, to: string }>} */
const files = [
  {
    from: path.join(temporalSource, "global.js"),
    to: path.join(target, "temporal-polyfill.global.js"),
  },
  {
    from: path.join(fcSource, "all", "global.js"),
    to: path.join(target, "all.global.js"),
  },
  {
    from: path.join(fcSource, "locales", "fr", "global.js"),
    to: path.join(target, "locales", "fr.global.js"),
  },
  {
    from: path.join(fcSource, "themes", "breezy", "global.js"),
    to: path.join(target, "themes", "breezy", "global.js"),
  },
  {
    from: path.join(fcSource, "skeleton.css"),
    to: path.join(target, "skeleton.css"),
  },
  {
    from: path.join(fcSource, "themes", "breezy", "theme.css"),
    to: path.join(target, "themes", "breezy", "theme.css"),
  },
  {
    from: path.join(fcSource, "themes", "breezy", "palettes", "emerald.css"),
    to: path.join(target, "themes", "breezy", "palettes", "emerald.css"),
  },
];

if (!fs.existsSync(fcSource)) {
  console.warn(
    "vendorFullcalendar: node_modules/fullcalendar introuvable — skip (npm install d'abord)",
  );
  process.exit(0);
}

if (!fs.existsSync(temporalSource)) {
  console.error(
    "vendorFullcalendar: node_modules/temporal-polyfill introuvable (dépendance peer de fullcalendar@7)",
  );
  process.exit(1);
}

for (const { from, to } of files) {
  if (!fs.existsSync(from)) {
    console.error(
      `vendorFullcalendar: fichier manquant: ${path.relative(root, from)}`,
    );
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

console.log("vendorFullcalendar: fichiers copiés dans assets/fullcalendar/");
