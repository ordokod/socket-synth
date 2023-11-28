import express from "express";
import http from "http";

const app = express();
app.use(express.static("public"));

export const PORT = process.env.PORT || 3000;
export const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
