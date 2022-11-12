let ksort = (b, a) => {
  a = isNaN(parseFloat(a)) ? a : parseFloat(a);
  b = isNaN(parseFloat(b)) ? b : parseFloat(b);

  if (b > a) return -1;
  if (a > b) return 1;
  return 0;
};

const ntimes = (left, right, set = false) => {
  if (left.type == "number" && left.value == 1) return right;
  let lc = left.denseCloud();
  let z = lc.values;

  if (z.length == 1) {
    return new SetValue(new Array(z[0].k[0]).fill(right), set);
  }

  return lc.transform((k) => {
    let s = new SetValue(new Array(k[0]).fill(right), set);
    return s;
  });
};

class CloudBuilder {
  constructor() {
    this.entries = {};
    this.total = 0;
    this.dense = true;
    this.sum = 0;
  }
  add(k, w, sources = undefined) {
    let key;
    if (k.length != 1) {
      this.dense = false;
      key = k;
    } else {
      key = JSON.stringify(k);
    }

    if (!this.entries[key]) this.entries[key] = { k: k, w: w, sources };
    else this.entries[key].w += w;

    if (this.dense) this.sum += k[0] * w;

    this.total += w;
  }

  done() {
    if (this.total > 1e30) {
      let reduction = 1e10;
      for (let k in this.entries) this.entries[k].w /= reduction;
      this.total /= reduction;
      if (this.dense) this.sum /= reduction;
    }
    let c = new Cloud(this.entries, this.total, this.dense);
    if (this.dense) c.sum = this.sum;
    return c;
  }
}



class Die {
  get type() {
    return "die";
  }
  debug() {
    return `d${this.sides.debug()}`;
  }

  constructor(sides = 6, times = undefined) {
    this.sides = sides;
    this.times = times == undefined ? new NumberValue(1) : times;
  }

  denseCloud() {
    return this.tx().denseCloud();
  }

  tx() {
    if (this.sides.type == "number") {
      let total = this.sides.value;
      if (total == 0) return new Cloud({ "[0]": { k: [0], w: 1 } }, 1, true);

      let C = new CloudBuilder();
      for (let i = 1; i <= Math.max(0, 0 | this.sides); ++i) {
        C.add([i], 1, [this]);
      }
      return ntimes(this.times, C.done());
    }
    if (this.sides.type == "set" && this.sides.collapse) {
      let C = new CloudBuilder();
      for (let i = 0; i < this.sides.elements.length; ++i) {
        C.add([this.sides.elements[i].value], 1, [this]);
      }
      return ntimes(this.times, C.done());
    } else {
      return this.sides.denseCloud().transform((v) => {
        if (v[0] == 0) return new Cloud({ "[0]": { k: [0], w: 1 } }, 1, true);
        return new Die(new NumberValue(v[0]), this.times).denseCloud();
      });
    }
  }

  cloud() {
    if (this.times.type == "number" && this.times.value == 1)
      return this.tx().denseCloud();
    else return this.tx().cloud();
  }
}

function cross(a, b) {
  let C = new CloudBuilder();

  for (let lv of a.values) {
    for (let rv of b.values) {
      let ne = [].concat(lv.k, rv.k);
      ne.sort(ksort);
      let sources = undefined;
      if (lv.sources && rv.sources) sources = [].concat(lv.sources, rv.sources);
      C.add(ne, rv.w * lv.w, sources);
    }
  }

  return C.done();
}


class Call {
  constructor(name, args) {
    this.name = name;
    this.arguments = args;
  }

  fn() {
    let fn = require("./functions")[this.name];
    if (!fn) throw new Error(`Undefined function '${this.name}'`);
    return fn.apply(this, this.arguments);
  }

  denseCloud() {
    return this.fn().denseCloud();
  }

  number() {
    return this.fn().number();
  }

  cloud() {
    switch (this.name) {
      case "sum":
      case "max":
      case "min":
        return this.denseCloud();
      default:
        return this.fn().cloud();
    }
  }
}

class SetValue {
  get type() {
    return "set";
  }
  debug() {
    return "{" + this.elements.map((v) => v.debug()).join(",") + "}";
  }

  constructor(elements, collapse = false) {
    this.elements = elements;
    this.collapse = collapse;
  }

  cloud() {
    let clouds = this.collapse
      ? this.elements.map((c) => c.denseCloud())
      : this.elements.map((c) => c.cloud());

    while (clouds.length > 1) {
      let cn = [];
      for (let i = 0; i < clouds.length; i += 2) {
        if (clouds.length == i + 1) {
          cn.push(clouds[i]);
          break;
        }

        cn.push(cross(clouds[i], clouds[i + 1]));
      }
      clouds = cn;
    }
    return clouds[0];
  }

  denseCloud() {
    let clouds = this.elements.map((c) => c.denseCloud());
    while (clouds.length > 1) {
      let cn = [];
      for (let i = 0; i < clouds.length; i += 2) {
        if (clouds.length == i + 1) {
          cn.push(clouds[i]);
          break;
        }

        if (
          (i > 1) & (clouds[i] === clouds[i - 2]) &&
          clouds[i + 1] === clouds[i - 1]
        ) {
          cn.push(cn[cn.length - 1]);
          continue;
        }

        let C = new CloudBuilder();

        for (let lv of clouds[i].values) {
          for (let rv of clouds[i + 1].values) {
            let ne = lv.k[0] + rv.k[0];
            C.add([ne], rv.w * lv.w);
          }
        }

        cn.push(C.done());
      }
      clouds = cn;
    }
    return clouds[0];
  }
}

class Cloud {
  get type() {
    return "cloud";
  }
  constructor(map, total, dense = false) {
    this.values = Object.values(map);
    this.total = total;
    this.dense = dense;
    for (let v of Object.values(map))
      if (v.k === undefined) throw new Error("Invalid map");
  }

  cloud() {
    return this;
  }
  denseCloud() {
    if (this.dense) return this;
    return this.collapse();
  }

  number() {
    if (this.values.length != 1) throw new Error("Wanted a single value.");
    if (this.values[0].k.length != 1) throw new Error("Wanted a single value.");
    return new NumberValue(this.values[0].k[0]);
  }

  collapse(fn) {
    if (fn == undefined && this.dense) return this;
    if (fn == undefined)
      fn = (k) => [
        k.reduce((v, e) => {
          if (typeof v == "number" && typeof e == "number") return v + e;
          else return "" + v + " " + e;
        }),
      ];

    let C = new CloudBuilder();
    for (let v of this.values) {
      if (v.k.length > 0) {
        let ne = fn(v.k);
        C.add(ne, v.w);
      } else {
        C.add([0], v.w);
      }
    }
    return C.done();
  }

  // Takes a function that given a vaue returns a cloud;
  transform(fn) {
    let C = new CloudBuilder();

    for (let v of this.values) {
      let rv = fn(v.k, v).cloud();
      for (let nv of rv.values) {
        let dx = (nv.w / rv.total) * v.w;
        C.add(nv.k, dx);
      }
    }
    return C.done();
  }
}

class NumberValue {
  get type() {
    return "number";
  }
  debug() {
    return `${this.value}`;
  }

  constructor(val) {
    this.value = parseFloat(val);
  }

  valueOf() {
    return this.value;
  }

  cloud() {
    let elements = {};
    elements[JSON.stringify([this.value])] = { k: [this.value], w: 1 };
    return new Cloud(elements, 1, this);
  }
  denseCloud() {
    return this.cloud();
  }
  number() {
    return this;
  }
}

class StringValue {
  constructor(value) {
    this.value = value;
  }
  cloud() {
    let elements = {};
    elements[JSON.stringify([this.value])] = { k: [this.value], w: 1 };
    return new Cloud(elements, 1, this);
  }
  denseCloud() {
    return this.cloud();
  }
  number() {
    throw new Error("needed a number but got a string");
  }
}

class BinaryOperation {
  constructor(l, [o, m], r) {
    this.left = l;
    this.op = o;
    this.opMode = m;
    this.right = r;
  }

  static applyOp(left, op, right) {
    switch (op) {
      case "+":
        if (typeof left == "number" && typeof right == "number")
          return left + right;
        else return "" + left + " " + right;
      case "-":
        return left - right;
      case "/":
        return Math.floor(left / right);
      case "*":
        return left * right;

      case ">":
        return left > right ? 1 : 0;
      case "<":
        return left < right ? 1 : 0;
      case ">=":
        return left >= right ? 1 : 0;
      case "<=":
        return left >= right ? 1 : 0;

      case "==":
      case "=":
        return left == right ? 1 : 0;
      case "!=":
        return left != right ? 1 : 0;
    }
  }

  denseCloud() {
    return this.cloud().collapse();
  }

  number() {
    return this.cloud().number();
  }

  cloud() {
    if (this.op == "dl") {
      let lc = this.left.cloud();
      let rc = this.right.denseCloud();
      return rc.transform((v) =>
        lc.collapse((k) => k.slice(0, Math.max(k.length - v[0], 0)))
      );
    }
    if (this.op == "dh") {
      let lc = this.left.cloud();
      let rc = this.right.denseCloud();
      return rc.transform((v) => lc.collapse((k) => k.slice(v[0])));
    }

    if (this.op == "kh") {
      let lc = this.left.cloud();
      let rc = this.right.denseCloud();
      return rc.transform((v) => lc.collapse((k) => k.slice(0, v[0])));
    }
    if (this.op == "kl") {
      let lc = this.left.cloud();
      let rc = this.right.denseCloud();
      return rc.transform((v) =>
        lc.collapse((k) => k.slice(Math.max(k.length - v[0], 0)))
      );
    }
    if (this.op == "@") {
      let lc = this.left.denseCloud();
      let rc = this.right.cloud();
      return lc.transform((v) =>
        rc.collapse((k) => (v[0] > 0 && k.length >= v[0] ? [k[v[0] - 1]] : [0]))
      );
    }

    if (this.op == "ntimes") {
      return ntimes(this.left, this.right).cloud();
    }

    if (this.opMode === "cs") {
      let val = this.right.number();

      return this.left.cloud().transform((k) => {
        let count = k.filter((n) =>
          BinaryOperation.applyOp(n, this.op, val)
        ).length;
        return new NumberValue(count).denseCloud();
      });
    }

    if (this.opMode === "ro") {
      let val = this.right.number();

      let cb = new CloudBuilder();
      for (let e of this.left.cloud().values) {
        let reroll = [];
        let okay = [];
        for (let i = 0; i < e.k.length; ++i) {
          if (BinaryOperation.applyOp(e.k[i], this.op, val)) {
            if (!e.sources)
              throw new Error(
                "Tried to reroll a value that couldnt be traced back to a die"
              );
            reroll.push(new Die(e.sources[i].sides));
          } else {
            okay.push(e.k[i]);
          }
        }

        if (reroll.length === 0) {
          cb.add(e.k, e.w, e.sources);
        } else {
          let s = new SetValue(reroll);
          let c = s.cloud();
          for (let o of c.values) {
            let ne = [].concat(okay, o.k);
            ne.sort(ksort);
            cb.add(ne, (e.w * o.w) / c.total);
          }
        }
      }

      return cb.done();
    }

    if (this.opMode === "zu") {
      let val = this.right.number();

      let cb = new CloudBuilder();
      for (let e of this.left.cloud().values) {
        let kk = [];
        for (let i = 0; i < e.k.length; ++i) {
          if (BinaryOperation.applyOp(e.k[i], this.op, val)) {
            kk.push(e.k[i]);
          } else {
            kk.push(0);
          }
        }

        cb.add(kk, e.w);
      }

      return cb.done();
    }

    let left = this.left.denseCloud();
    let right = this.right.denseCloud();

    let C = new CloudBuilder();

    for (let lv of left.values) {
      for (let rv of right.values) {
        let nv = lv.w * rv.w;
        let ne = BinaryOperation.applyOp(lv.k[0], this.op, rv.k[0]);
        C.add([ne], nv);
      }
    }

    return C.done();
  }
}

module.exports = {
  Die,
  SetValue,
  Cloud,
  NumberValue,
  BinaryOperation,
  Call,
  CloudBuilder,
  StringValue,
  ksort,
  ntimes,
};
