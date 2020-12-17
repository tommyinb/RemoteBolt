export default (id, bolt) => {
  const runner = {
    id,

    getPortId: (portText) => {
      const port = Object.values(bolt.data).find(
        (t) => t.type === "port" && t.card === id && t.text === portText
      );
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
          const runner = bolt.runners[port.card];
          return runner?.in(port.id, value);
        }),

    update: () => undefined,

    unload: () => undefined,
  };

  return runner;
};
