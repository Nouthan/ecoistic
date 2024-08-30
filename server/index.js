const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./utils");
const routes = require("./routes/index.js");
const { errorHandler } = require("./middleware/errorMiddlewares.js");
dotenv.config();
dbConnection();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
