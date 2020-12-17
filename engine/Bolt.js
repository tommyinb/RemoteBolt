import Start from "./runners/Start.js";

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
    switch (type) {
      case "Start":
        return Start(id, bolt);

      default:
        return undefined;
    }
  }

  bolt.update = (data) => {
    bolt.data = data;

    const oldRunners = Object.values(bolt.runners);

    const newDatas = Object.values(data).filter((t) => !(t.id in bolt.runners));
    newDatas.forEach((t) => {
      bolt.runners[t.id] = tryParse(t.id, bolt);
    });

    for (const runner of oldRunners) {
      const updateData = data[runner.id];
      if (updateData) {
        runner.update();
      } else {
        delete bolt.runners[runner.id];
      }
    }
  };

  bolt.send = () => engine.send(bolt.data);

  return bolt;
};
