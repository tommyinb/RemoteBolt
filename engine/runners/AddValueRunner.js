import CardRunner from "./CardRunner.js";

import "../../utility/Array.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  const cancellable = Cancellable();
  card.in = async (portId, value) => {
    if (portId !== card.ports.add) {
      return;
    }

    try {
      if (value !== bolt.data[id].main.value) {
        bolt.data[id].main.value = value;

        bolt.data[id].states.push("active");
        bolt.send();

        await cancellable.wait(500);

        bolt.data[id].states.remove("active");
        bolt.send();
      }
    } catch (e) {
      console.error(e);
    }
  };

  card.forceOut = () => {
    const from = parseFloat(card.forceIn(card.ports.from)) || 0;

    const add =
      parseFloat(card.forceIn(card.ports.add)) || parseFloat(bolt.data[id].main.value) || 0;

    return Math.round((from + add) * 10000) / 10000;
  };

  card.unload = () => cancellable.cancel();

  return card;
};
