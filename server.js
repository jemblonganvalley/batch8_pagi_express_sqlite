const express = require("express");
const cors = require("cors");
const user = require("./controller/userControllers");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", user);

app.listen(8000, () => console.log("listen 8000"));
