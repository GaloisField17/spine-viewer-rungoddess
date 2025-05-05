const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'public/models');

const fileList = path.join(__dirname, 'src/names/fileList.json');

fs.readdir(modelsDir, (err, files) => {
  if (err) {
    console.error('Failed to read directory:', err);
    process.exit(1);
  }

  const outputDir = path.dirname(fileList);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(fileList, JSON.stringify(files, null, 2));
  console.log(`File list generated at ${fileList}.`);
});
