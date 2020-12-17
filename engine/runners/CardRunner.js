export default (id, bolt) => {
  const runner = {
    id,

    ports: Object.fromEntries(
      Object.values(bolt.data)
        .filter((t) => t.type === "port")
        .filter((t) => t.card === id)
        .map((t) => [t.name, t.id])
    ),

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

    forceIn: (portId) =>
      Object.values(bolt.data)
        .filter((t) => t.type === "linkage")
        .filter((t) => t.to === portId)
        .map((t) => t.from)
        .map((t) => bolt.data[t])
        .map((port) => {
          const runner = bolt.runners[port.card];
          return runner?.forceOut(port.id);
        }),
    forceOut: (portId) => undefined,

    update: () => undefined,

    unload: () => undefined,
  };

  return runner;
};
