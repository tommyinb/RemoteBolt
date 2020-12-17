import Engine from "./engine/Engine.js";
const engine = Engine();

import express from "express";
const app = express();

app.use(express.json());

import expressWs from "express-ws";
expressWs(app);

app.ws("/debug/:id", (ws, req) => {
  try {
    engine.addSocket(ws, req.params.id);
  } catch (e) {
    ws.close();
  }
});

app.post("/start", (req, res) => {
  engine.addBolt(req.body);
  res.end("{}");
});

app.post("/update", (req, res) => {
  engine.updateBolt(req.body);
  res.end("{}");
});

app.post("/end/:id", (req, res) => {
  engine.removeBolt(req.params.id);
  res.end("{}");
});

app.use("/", express.static("public"));

app.listen(8080, () => console.log(`Listening on 8080....`));
