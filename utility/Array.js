Array.prototype.remove = function (item) {
  const index = this.indexOf(item);
  this.splice(index, 1);
};
