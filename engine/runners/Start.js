import Card from "./Card.js";

export default (id, bolt) => {
  const card = Card(id, bolt);

  card.ports = {
    next: card.getPortId("Next"),
  };

  const timeout = setTimeout(() => {
    card.out(card.ports.next);
  }, 1000);

  return {
    id,
    unload: () => clearTimeout(timeout),
  };
};
