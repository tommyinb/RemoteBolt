import CardRunner from "./CardRunner.js";
import Cancellable from "../../utility/Cancellable.js";

export default (id, bolt) => {
  const card = CardRunner(id, bolt);

  card.ports = {
    from: card.getPortId("From"),
    next: card.getPortId("Next"),
  };

  const cancellables = new Set();
  card.in = async (_, __) => {
    bolt.data[id].states.push("active");
    bolt.send();

    const cancellable = Cancellable();
    cancellables.add(cancellable);

    for (let i = 0; i < parseInt(bolt.data[id].main.time); i++) {
      await cancellable.wait(1000);
    }

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
