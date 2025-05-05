const fs = require("fs");
const path = require("path");

const fileList = path.join(__dirname, "src/names/fileList.json");
const nameList = path.join(__dirname, "src/names/nameList.json");

const modelsList = path.join(__dirname, "src/names/modelsList.json");

fs.readFile(fileList, "utf8", (errFile, dataFile) => {
  if (errFile) {
    console.error("Failed to read file:", errFile);
    process.exit(1);
  }

  const outputDir = path.dirname(modelsList);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.readFile(nameList, "utf8", (errName, dataName) => {
    if (errName) {
      console.error("Failed to read file:", errName);
      process.exit(1);
    }

    const heroes = [];
    const others = [];
    dataFile.replace(/"|,/g, "")
      .split("\n")
      .filter((line) => line.endsWith(".skel"))
      .forEach((l) => {
        line = l.replace(/\s|spine_/g, "");
        const modelPath = "models/spine_" + line;
        if (line.startsWith("hero_")) {
          const heroID = line.slice(5, 11);
          const heroName = JSON.parse(dataName)[heroID] ? JSON.parse(dataName)[heroID] : line;
          heroes.push(
            { type: "hero", id: heroID, dispName: heroName, path: modelPath }
          );
        } else {
          others.push(
            { type: "other", id: line, dispName: line, path: modelPath }
          );
        }
      })

    fs.writeFileSync(modelsList, JSON.stringify(heroes.concat(others), null, 2));
    console.log(`File list generated at ${modelsList}.`);
  });
});