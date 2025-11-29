import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
