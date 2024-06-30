const { queryDatabase } = require("../db/Postrgesql_db");
const { deleteDataRouteFromDatabase } = require("../middlewares/databaseUtils")

async function insertDataRoute(req, res) {
    const {
        route_name,
        columns,
        sample,
        table,
    } = req.body;

    const userId = req.user.id;

    // const [{ org_id, first_name, last_name }] = await queryDatabase(
    //   "SELECT * FROM app.get_user_data($1)",
    //   [userEmail]
    // );

    const userData = await queryDatabase(
      "SELECT org_id, first_name, last_name FROM app.users WHERE user_id = $1",
      [userId]
    );
    
    const org_id = userData[0].org_id;

    const query = `
    INSERT INTO app.data_routes (org_id, route_name, columns, "table", sample, last_modified_at, owner_user_id)
    VALUES ($1, $2, $3::jsonb, $4::jsonb, $5, NOW(), $6)
    RETURNING *;
  `;
  const values = [
    org_id,
    route_name,
    JSON.stringify(columns),
    JSON.stringify(table),
    sample,
    userId,
  ];

  try {
    const result = await queryDatabase(query, values);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDataRoute (req, res) {
  const userId = req.user.id;

try {
  const queryText =
  "SELECT t.route_id, t.route_name, t.org_id, t.last_modified_at, t.columns, t.table, t.sample, u.first_name, u.last_name " +
  "FROM app.data_routes t " +
  "LEFT JOIN app.users u ON t.owner_user_id = u.user_id " +
  "WHERE t.org_id = (SELECT org_id FROM app.users WHERE user_id = $1) " +
  "ORDER BY t.last_modified_at";
const values = [userId];

const result = await queryDatabase(queryText, values);

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

async function getOneData(req, res) {
  console.log(req.params);
  const route_id = req.params.id;

  try {
    const queryText = `
    SELECT route_id, route_name, org_id, last_modified_at, columns, "table", sample
    FROM app.data_routes
    WHERE route_id = $1
    `;

    const values = [route_id];

    console.log("Executing database query:", queryText, values);

    const result = await queryDatabase(queryText, values);
    if (result.length > 0) {
      console.log("DataRoute found:", result);
      res.json(result);
    } else {
      console.log("DataRoute file not found:", route_id);
      res.status(404).json({ error: "DataRoute not found" });
    }
  } catch (error) {
    console.error("Error fetching DataRoute by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteOneData(req, res) {
  const dataRouteId = req.params.id;

  try {
    const queryText =
      "SELECT * FROM app.data_routes WHERE route_id = $1";
    const values = [dataRouteId];
    console.log("Executing database query:", queryText, "with values:", values);
    const result = await queryDatabase(queryText, values);

    if (result.length > 0) {
        await deleteDataRouteFromDatabase(dataRouteId);
        res.status(200).json({ message: "Data routes deleted successfully" });
    } else {
      console.log("Data routes not found for id:", templateId);
      res.status(404).json({ error: "Data routes not found" });
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

module.exports = { insertDataRoute, getDataRoute, getOneData, deleteOneData };