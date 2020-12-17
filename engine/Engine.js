import Bolt from "./Bolt.js";

export default () => {
  const engine = { bolts: {} };

  engine.addBolt = (data) => {
    engine.bolts[data.id] = {
      body: Bolt(data, engine),
      sockets: new Set(),
    };
  };
  engine.updateBolt = (data) => {
    const bolt = engine.bolts[data.id];
    if (!bolt) {
      throw `Bolt ${data.id} not found`;
    }

    bolt.body.update(data);
  };
  engine.removeBolt = (id) => delete engine.bolts[id];

  engine.addSocket = (socket, id) => {
    const bolt = engine.bolts[id];
    if (!bolt) {
      throw `Bolt ${id} not found`;
    }

    bolt.sockets.add(socket);

    socket.on("message", (message) => {
      if (message === "start") {
        bolt.body.start();
      }
    });

    socket.on("close", () => {
      bolt.sockets.delete(socket);
    });
  };

  engine.send = (data) => {
    const item = engine.bolts[data.id];
    if (!item) {
      throw `Bolt ${data.id} not found`;
    }

    const json = JSON.stringify(data);
    item.sockets.forEach((t) => t.send(json));
  };

  return engine;
};
