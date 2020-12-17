import parsers from "./runners/parsers.js";

export default (data, engine) => {
  const { id, ...items } = data;

  const bolt = {
    id,
    data,
    runners: {},
  };

  for (const { id, type } of Object.values(items)) {
    const runner = tryParse(id, type);
    if (runner) {
      bolt.runners[id] = runner;
    }
  }
  function tryParse(id, type) {
    const parser = parsers[`${type}Runner`];
    return parser?.(id, bolt);
  }

  bolt.update = (data) => {
    bolt.data = data;

    const oldRunners = Object.values(bolt.runners);

    const newDatas = Object.values(data).filter((t) => !(t.id in bolt.runners));
    newDatas.forEach((t) => {
      const runner = tryParse(t.id, t.type);
      if (runner) {
        bolt.runners[t.id] = runner;
      }
    });

    for (const runner of oldRunners) {
      const updateData = data[runner.id];
      if (updateData) {
        runner.update();
      } else {
        runner.unload();
        delete bolt.runners[runner.id];
      }
    }
  };

  bolt.start = () => bolt.getStartRunners().forEach((t) => t.in());
  bolt.getStartRunners = () =>
    Object.values(bolt.data)
      .filter((t) => t.type === "Start")
      .map((t) => bolt.runners[t.id]);

  bolt.send = () => engine.send(bolt.data);

  return bolt;
};
