require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const { handleError } = require("./helpers/errorHandler"); // Update to 'helper'

app.use(express.json());

// Your routes
app.use("/", require("./routes"));

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  handleError(err, res); // Use the custom error handler
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
