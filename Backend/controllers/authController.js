const { queryDatabase } = require("../db/Postrgesql_db");
const { generateToken } = require("../middlewares/auth");
const { findValueByKey } = require("../db/redisUtils");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const redisValue = await findValueByKey(email);

    console.log("Redis value found for email", email, ":", redisValue);

    if (redisValue !== null) {
      const [redisPassword, userId] = redisValue.split(":");

      if (redisPassword === password) {
        const user = { id: userId, email };
        const token = generateToken(user);

        console.log("Setting cookie...");

        const cookieConfig = JSON.parse(process.env.COOKIE_CONFIG);

        res.cookie("token", token, cookieConfig);

        const queryText = `SELECT * FROM app.users WHERE email = '${email}'`;
        const users = await queryDatabase(queryText);
        res.json(users);
      } else {
        res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(404).json({ error: "No value found for the specified email" });
    }
  } catch (error) {
    console.error("Error searching for password in Redis:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while searching for password in Redis",
      });
  }
}

module.exports = {
  login,
};
