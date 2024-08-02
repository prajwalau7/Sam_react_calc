const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { evaluate } = require("mathjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/calculate", (req, res) => {
  const { expression } = req.body;

  try {
    const result = evaluate(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).send("Invalid expression");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
