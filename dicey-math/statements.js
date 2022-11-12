/**
 * @typedef {import('./values.js').Cloud} Cloud
 */

class Output {
  constructor(e, name, text) {
    this.expression = e;
    this.name = name || text || "output";
    this.named = !!name;
  }
  get type() {
    return "output";
  }

  /**
   *
   * @returns {Cloud}
   */
  denseCloud() {
    return this.expression.denseCloud();
  }

  /**
   *
   * @returns {Cloud}
   */
  cloud() {
    return this.expression.cloud();
  }
}

class Block {
  get type() {
    return "block";
  }
  constructor(body) {
    this.body = body;
  }

  /**
   *
   * @returns {Output}
   */
  output() {
    return this.body;
  }
}

module.exports = {
  Output,
  Block,
};
