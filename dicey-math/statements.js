class Output {
  constructor(e, name, text) {
    this.expression = e;
    this.name = name || text || "output";
    this.named = !!name;
  }
  get type() {
    return "output";
  }
  denseCloud() {
    return this.expression.denseCloud();
  }
  cloud() {
    return this.expression.cloud();
  }
}

module.exports = {
  Output,
};
