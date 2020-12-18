import CardRunner from "./CardRunner.js";

import "../../utility/Array.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  const cancellables = new Set();
  card.in = async (portId, _) => {
    if (portId !== card.ports.from) {
      return;
    }

    try {
      bolt.data[id].states.push("active");
      bolt.send();

      const cancellable = Cancellable();
      cancellables.add(cancellable);
      await cancellable.wait(100);

      const [value] = card.forceIn(card.ports.fromValue);
      if (value !== undefined) {
        bolt.data[id].main.value = value || 0;
      }

      bolt.send();

      await cancellable.wait(400);

      bolt.data[id].states.remove("active");
      bolt.data[card.ports.to].states.push("active");
      bolt.send();

      await cancellable.wait(300);

      bolt.data[card.ports.to].states.remove("active");
      card.out(card.ports.to);
      bolt.send();

      cancellables.delete(cancellable);
    } catch (e) {
      console.error(e);
    }
  };

  card.forceOut = () => bolt.data[id].main.value;

  card.unload = () => {
    cancellables.forEach((t) => t.cancel());
    cancellables.clear();
  };

  return card;
};
