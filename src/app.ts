import express = require("express");
import path = require("node:path");
import router = require("./routes/router");
import categoryRouter = require("./routes/categoryRouter");
import productRouter = require("./routes/productRouter");
import converter = require("./utils/case-converter");
import optionRouter = require("./routes/optionRouter");

const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(converter.caseConverterMiddleware);

app.use("/", router);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/option", optionRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Fabric Shop Application listening on port ${PORT}`);
});
