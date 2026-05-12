import express = require("express");
import path = require("node:path");
import router = require("./routes/router");

const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Fabric Shop Application listening on port ${PORT}`);
});
