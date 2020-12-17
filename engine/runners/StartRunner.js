import CardRunner from "./CardRunner.js";

import "../../utility/Array.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  card.ports = {
    next: card.getPortId("Next"),
  };

  const cancellables = new Set();
  card.in = async () => {
    const cancellable = Cancellable();
    cancellables.add(cancellable);

    await cancellable.wait(500);

    bolt.data[id].states.push("active");
    bolt.send();

    await cancellable.wait(500);

    bolt.data[id].states.remove("active");
    bolt.data[card.ports.next].states.push("active");
    bolt.send();

    await cancellable.wait(300);

    bolt.data[card.ports.next].states.remove("active");
    card.out(card.ports.next);
    bolt.send();

    cancellables.delete(cancellable);
  };

  card.unload = () => {
    cancellables.forEach((t) => t.cancel());
    cancellables.clear();
  };

  return card;
};
