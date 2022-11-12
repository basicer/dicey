let parser;

try {
  parser = require("../pegjs-loader.js!./parser.js");
} catch (e) {
  parser = require("pegjs").generate(require("./parser.js"));
}

let { debug, valueize, keyComp } = require("./utils");

let roll = require("./roll");

/**
 * @typedef {import('./statements.js').Block} Block
 * @typedef {import('./statements.js').Output} Output
 */

class ParseResult {
  constructor() {}

  /**
   * @returns {string}
   */
  get debugString() {
    return debug(this.parsed);
  }

  /**
   * @returns {Block}
   */
  get result() {
    if (!this.value) this.value = valueize(this.parsed);
    return this.value;
  }

  roll() {
    return roll(this.parsed);
  }

  /**
   * @returns {Output}
   */
  output() {
    return this.result.output();
  }
}

/**
 *
 * @param {String} code
 * @returns {ParseResult}
 */
module.exports = (code) => {
  let o = new ParseResult();
  o.parsed = parser.parse(code);
  return o;
};

Object.assign(module.exports, {
  parser,
  rehydrate: (i) => {
    let o = new ParseResult();
    o.parsed = i.parsed;
    return o;
  },
  debug,
  valueize,
  keyComp,
});
