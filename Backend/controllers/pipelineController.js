const { queryDatabase } = require("../db/Postrgesql_db");

async function getPipeline(req, res) {
  try {
    const userId = req.user.id;

    const [{ org_id }] = await queryDatabase(
      "SELECT * FROM app.get_user_data($1)",
      [userId]
    );

    const query = "SELECT p.pipeline_id, p.pipeline_name, p.template_id, p.cluster_type, t.template_name, t.elements " +
    "FROM app.pipelines p " +
    "INNER JOIN app.templates t ON t.template_id = p.template_id " +
    "WHERE p.org_id = $1";
    const rows = await queryDatabase(query, [org_id]);
    console.log(rows);

    if (!rows) {
      return res.status(200).json( "No data found" );
    }

    function randomizeData(dataArray) {
      return dataArray.map((value) => Math.floor(Math.random() * 100));
    }

    function updateLabelsAndDataEveryHour() {
      const labels = [
        "12:00 AM",
        "01:00 AM",
        "02:00 AM",
        "03:00 AM",
        "04:00 AM",
        "05:00 AM",
        "06:00 AM",
      ];
      const currentHour = new Date().getHours();
    
      const newLabels = labels
        .slice(currentHour)
        .concat(labels.slice(0, currentHour));
    
      const newData = randomizeData([45, 39, 60, 61, 46, 35, 50]);
    
      return {
        labels: newLabels,
        data: newData
      };
    }

    const chartDataArray = rows.map((row) => ({
      template_name: row.template_name,
      elements: row.elements,
      template_id: row.template_id,
      id: row.pipeline_id,
      name: row.pipeline_name,
      edge: Math.floor(Math.random() * 10),
      selectedCluster: row.cluster_type,
      events: Math.floor(Math.random() * 1000),
      bytes: Math.floor(Math.random() * 1000),
      chartData1: {
        labels: updateLabelsAndDataEveryHour().labels,
        datasets: [
          {
            label: "Chart Blue",
            data: updateLabelsAndDataEveryHour().data,
            borderColor: "#1847A6",
            backgroundColor: "#1847A6",
            borderWidth : 3,
            fill: {
                target: "origin",
                above: 'rgba(24, 71, 166, 0.04)'
                },
            tension : 0.16,
            pointRadius: 0,
            pointHoverRadius: 5
          },
        ],
      },
      chartData2: {
        labels: updateLabelsAndDataEveryHour().labels,
        datasets: [
          {
            label: "Chart Orange",
            data: updateLabelsAndDataEveryHour().data,
            borderColor: "#F47216",
            backgroundColor: "#F47216",
            borderWidth : 3,
            fill: {
                target: "origin",
                above: 'rgba(244,114,22, 0.04)'
                },
            tension : 0.16,
            pointRadius: 0
          },
        ],
      },
    }));

    res.status(200).json(chartDataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function insertPipeline(req, res) {
  const {
    PipelineName,
    selectedTemplate,
    selectedDataRoute,
    selectedCluster,
  } = req.body;
  const userId = req.user.id;

  const [{ org_id }] = await queryDatabase(
    "SELECT * FROM app.get_user_data($1)",
    [userId]
  );

  const query = `
    INSERT INTO app.pipelines (pipeline_name, template_id, data_route_id, cluster_type, org_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    PipelineName,
    selectedTemplate,
    selectedDataRoute,
    selectedCluster,
    org_id,
  ];

  try {
    const result = await queryDatabase(query, values);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deletePipeline (req, res) {

}

module.exports = { insertPipeline, getPipeline, deletePipeline };
