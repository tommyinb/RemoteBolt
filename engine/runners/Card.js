export default (id, bolt) => {
  const card = {
    id,

    getPortId: (portText) => {
      const card = bolt.data[id];
      const port = Object.values(card.ports).find((t) => t.text === portText);
      return port?.id;
    },

    in: (portId, value) => undefined,

    out: (portId, value) =>
      Object.values(bolt.data)
        .filter((t) => t.type === "linkage")
        .filter((t) => t.from === portId)
        .map((t) => t.to)
        .map((t) => bolt.data[t])
        .map((port) => {
          const runner = bolt.runner[port.card];
          return runner?.in(port.id, value);
        }),

    update: () => undefined,

    unload: () => undefined,
  };

  return card;
};
