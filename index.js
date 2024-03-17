const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./dbConnection");
const authRouter = require("./routes/auth.routes");
const Port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    messge: "A api success",
  });
});

app.listen(Port, async () => {
  try {
    await dbConnection;

    console.log(`listening on http://localhost:${Port}/`);
  } catch (error) {
    console.log("app.listen  error:", error);
    console.log(`error while listening on ${Port}`);
  }
});
