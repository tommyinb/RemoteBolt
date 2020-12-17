import Bolt from "./Bolt.js";

export default () => {
  const bolts = {};

  return {
    addBolt: (data) => {
      bolts[data.id] = {
        body: Bolt(data, bolts),
        sockets: new Set(),
      };
    },
    updateBolt: (data) => {
      const bolt = bolts[data.id];
      if (!bolt) {
        throw `Bolt ${id} not found`;
      }

      bolt.body.update(data);
    },
    removeBolt: (id) => delete bolts[id],

    addSocket: (socket, id) => {
      const item = bolts[id];
      if (!item) {
        throw `Bolt ${id} not found`;
      }

      item.sockets.add(socket);

      ws.on("close", () => {
        item.sockets.delete(socket);
      });
    },

    send: (data) => {
      const item = bolts[id];
      if (!item) {
        throw `Bolt ${id} not found`;
      }

      item.sockets.forEach((t) => t.send(data));
    },
  };
};
