const fs = require("fs");

async function loadFile(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    console.log("File loaded successfully");
    return fileContent;
  } catch (error) {
    throw new Error(`Error loading file: ${error.message}`);
  }
}

module.exports = { loadFile };
