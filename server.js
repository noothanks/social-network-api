
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌐 Listening on http://localhost:${PORT}`);
  });
});