const fs = require("fs");
const path = require("path");
const { queryDatabase } = require("../db/Postrgesql_db");
const {
  executeQueryAndHandleResult,
  deleteTemplateFromDatabase,
  deleteTemplateFile,
} = require("../middlewares/databaseUtils");
const { loadFile } = require("../middlewares/loadfile");

async function insertTemplate(req, res) {
  const { template_name, template_data, template_id } = req.body;
  const { nodes, edges } = template_data;
  const userId = req.user.id;
  const id = parseInt(template_id) || 0;

  try {
    // const [{ org_id, user_id, template_data: existingTemplateData }] =
    //   await queryDatabase("SELECT * FROM app.get_user_data($1)", [userId]);
    //   console.log("AAA", existingTemplateData)

    const dataFolderPath = path.join(__dirname, "../../data/templates");

    if (!fs.existsSync(dataFolderPath)) {
      fs.mkdirSync(dataFolderPath);
    }

    const [{org_id}] = 
    await queryDatabase("SELECT org_id FROM app.users WHERE user_id = $1", [userId]);

    // const fileName =
    //   id === 0
    //     ? `${Date.now()}_template.json`
    //     : path.basename(existingTemplateData);

    // const filePath = path.join(dataFolderPath, fileName);
    // console.log(filePath);

    const templateObject = {
      template_name,
      template_data: { nodes, edges },
    };

    const elementsCount = JSON.parse(nodes).length;

    if (id === 0) {

      const fileName = `${Date.now()}_template.json`;
      const filePath = path.join(dataFolderPath, fileName);
      console.log(filePath);

      await fs.promises.writeFile(filePath, JSON.stringify(templateObject));
      
      console.log("Preparing to insert into database:", template_name, filePath);
      
      const insertQuery = `
      INSERT INTO app.templates (template_name, template_data, org_id, owner_user_id, elements)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING template_id
    `;

      // const insertQuery = 'SELECT app.insert_template($1, $2, $3, $4, $5)';
      const insertValues = [
        template_name,
        filePath,
        org_id,
        userId,
        elementsCount,
      ];
      const [{ template_id: newTemplateId }] = await queryDatabase(
        insertQuery,
        insertValues
      );
      return res.json({ template_id: newTemplateId });
    } else {
      const [{ template_data: currentTemplateData }] = await queryDatabase(
        "SELECT template_data FROM app.templates WHERE template_id = $1",
        [id]
      );
      
      const currentFileName = path.basename(currentTemplateData);
      const currentFilePath = path.join(dataFolderPath, currentFileName);

      console.log(currentFilePath);
    
      await fs.promises.writeFile(currentFilePath, JSON.stringify(templateObject));
    
      const updateQuery = `
        UPDATE app.templates
        SET template_name = $2, elements = $3
        WHERE template_id = $1
      `;
      const updateValues = [id, template_name, elementsCount];
      await queryDatabase(updateQuery, updateValues);
      return res.json({ template_id: id });
    }
  } catch (error) {
    console.error("Error saving template:", error);
    res.status(500).send("Internal server error");
  }
}

async function getTemplateById(req, res) {
  const templateId = req.params.id;

  try {
    console.log("Fetching template by id:", templateId);

    const queryText =
      "SELECT template_name, template_data FROM app.templates WHERE template_id = $1";
    const values = [templateId];

    console.log("Executing database query:", queryText, values);

    const result = await queryDatabase(queryText, values);

    if (result.length > 0) {
      console.log("Template found:", result);

      const template = result[0];
      const templateDataFilePath = template.template_data;

      console.log(
        "Checking template data file existence:",
        templateDataFilePath
      );

      const fileContent = await loadFile(templateDataFilePath);

      try {
        console.log("Parsing template data as JSON");
        const templateData = JSON.parse(fileContent);

        res.status(200).json({
          template_name: template.template_name,
          template_data: templateData,
          template_id: templateId,
        });
      } catch (parseError) {
        console.error("Error parsing template data:", parseError);
        res.status(500).json({ error: "Error parsing template data" });
      }
    } else {
      console.log("Template file not found:", templateId);
      res.status(404).json({ error: "Template not found" });
    }
  } catch (error) {
    console.error("Error fetching template by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTemplatesByOrgId(req, res) {
  const userId = req.user.id;

  try {
    console.log("Fetching templates by org_id for user:", userId);

    const queryText = `
    SELECT t.template_id, t.template_name, t.last_modified_at, t.elements, u.first_name, u.last_name 
      FROM app.templates t 
      LEFT JOIN app.users u ON t.owner_user_id = u.user_id 
      WHERE t.org_id = (SELECT org_id FROM app.users WHERE user_id = $1) 
      ORDER BY t.last_modified_at
      `;
    const values = [userId];

    const result = await executeQueryAndHandleResult(queryText, values);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      console.log("Templates not found for user:", userId);
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error fetching templates by org_id:", error);
    res.status(500).json({ error: "Template file is corrupted, please" });
  }
}

async function deleteTemplates(req, res) {
  console.log("Starting deleteTemplates function...");
  const templateId = req.params.id;

  try {
    const queryText =
      "SELECT template_data FROM app.templates WHERE template_id = $1";
    const values = [templateId];
    console.log("Executing database query:", queryText, "with values:", values);
    const result = await executeQueryAndHandleResult(queryText, values);

    if (result.length > 0) {
      const templateDataFilePath = result[0].template_data;

      if (fs.existsSync(templateDataFilePath)) {
        deleteTemplateFile(templateDataFilePath);
        await deleteTemplateFromDatabase(templateId);
        res.status(200).json({ message: "Template deleted successfully" });
      } else {
        console.log("File not found:", templateDataFilePath);
        await deleteTemplateFromDatabase(templateId);
        res.status(200).json({});
      }
    } else {
      console.log("Template not found for id:", templateId);
      res.status(404).json({ error: "Template not found" });
    }
  } catch (error) {
    console.error("Error deleting file:", error);

    if (error.code === 'ENOENT') {
      res.status(404).json({ error: "File not found" });
    } else {
      res.status(500).json({ error: "An error occurred while deleting template" });
    }
  }
}

module.exports = {
  insertTemplate,
  getTemplatesByOrgId,
  deleteTemplates,
  getTemplateById,
};
