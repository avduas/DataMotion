const { queryDatabase } = require("../db/Postrgesql_db");
const fs = require("fs");

async function executeQueryAndHandleResult(queryText, values) {
  try {
    const result = await queryDatabase(queryText, values);
    return result;
  } catch (error) {
    console.error("Error executing database query:", error);
    throw new Error("An error occurred while executing database query");
  }
}

async function deleteTemplateFromDatabase(templateId) {
  try {
    const queryText = "DELETE FROM app.templates WHERE template_id = $1";
    const values = [templateId];
    await queryDatabase(queryText, values);
  } catch (error) {
    console.error("Error deleting template from database:", error);
    throw new Error("An error occurred while deleting template from database");
  }
}

async function deleteTemplateFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error deleting template file:", error);
    throw new Error("An error occurred while deleting template file");
  }
}

async function deleteDataRouteFromDatabase(dataRouteId) {
  try {
    const queryText = "DELETE FROM app.data_routes where route_id = $1";
    const values = [dataRouteId];
    await queryDatabase(queryText, values);
  } catch(error) {
    console.error("Error deleting dataRoute_id from database:", error);
    throw new Error("An error occurred while deleting dataRoute from database");
  }
}

module.exports = {
  executeQueryAndHandleResult,
  deleteTemplateFromDatabase,
  deleteTemplateFile,
  deleteDataRouteFromDatabase
};