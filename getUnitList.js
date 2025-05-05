const fs = require("fs");
const path = require("path");

const config = path.join(__dirname, "public/configs/en-US.txt");

const nameList = path.join(__dirname, "src/names/nameList.json");

fs.readFile(config, "utf8", (err, data) => {
  if (err) {
    console.error("Failed to read file:", err);
    process.exit(1);
  }

  const outputDir = path.dirname(nameList);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const heroes = {};
  data.replace(/"|;|\r/g, "")
    .split("\n")
    .filter((line) => line.startsWith("hero_name_"))
    .forEach((line) => {
      const [key, val] = line.replace("hero_name_", "").split("=");
      heroes[key] = val;
    })

  fs.writeFileSync(nameList, JSON.stringify(heroes, null, 2));
  console.log(`File list generated at ${nameList}.`);
});