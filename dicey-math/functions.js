const {
  SetValue,
  NumberValue,
  CloudBuilder,
  ksort,
  ntimes,
  StringValue,
  Cloud
} = require("./values");

/** @typedef {SetValue|NumberValue|StringValue|Cloud} Value  */

let arity = (fn, n) => {
  if (fn.arguments.length != n)
    throw new Error(
      `Function '${fn.name}' expets ${n} argument${n > 1 ? "s" : ""}`
    );
};

/**
 * Add the elements of each set together into a single field.
 * @param  {...Value} args
 * @returns {Value}
 * @example <kbd>sum(1, 2, 3)</kbd> = <kbd>6</kbd>
 * @example <kbd>sum(1, d6, 3d6)</kbd> = <kbd>4d6+1</kbd>
 */
function sum(...args) {
  return new SetValue([new SetValue(args)], true);
}

/**
 * Add the elements of each set to one big set.
 * @param  {...Value} args
 * @returns
 * @example <kbd>bag(3d6, 2d6, {d6, d6, d6})</kbd> = <kbd>8d6</kbd>
 */
function bag(...args) {
  return new SetValue(args);
}

/**
 * Create a set containing the arguments.
 * @param  {...Value} args
 * @returns
 * @example <kbd>set(3d6, 2d6)</kbd> = <kbd>{3d6, 2d6}</kbd>
 */
function set(...args) {
  return new SetValue(args, true);
}
/**
 * Find the maximum possible outcome in a field.
 * @param {Value} v
 * @returns
 * @example <kbd>max(d6)</kbd> = 6
 * @example <kbd>max(3d6)</kbd> = 18
 */
function max(v) {
  arity(this, 1);
  let vs1 = v.denseCloud().values;
  vs1.sort((a, b) => ksort(a.k, b.k));
  return new NumberValue(vs1[0].k[0]);
}

/**
 * Find the minimum possible outcome in a field.
 * @param {Value} v
 * @returns
 * @example <kbd>min(d6)</kbd> = 1
 * @example <kbd>min(3d6)</kbd> = 2
 */
function min(v) {
  arity(this, 1);
  let vs2 = v.denseCloud().values;
  vs2.sort((b, a) => ksort(a.k, b.k));
  return new NumberValue(vs2[0].k[0]);
}

/**
 * Find the mean outcome in a field.
 * @param {Value} v
 * @returns
 * @example <kbd>mean(d6)</kbd> = 3.5
 * @example <kbd>mean(3d6)</kbd> = 10.5
 */
function mean(v) {
  arity(this, 1);
  let vs2 = v.denseCloud();
  return new NumberValue(vs2.sum / vs2.total);
}

/**
 * A set containing the elment `cloud` repeated `times` times.
 * @param {*} what
 * @param {*} times
 * @returns
 * @example <kbd>repeat(d6, 3)</kbd> = <kbd>3d6</kbd>
 */
function repeat(a, b) {
  arity(this, 2);
  return ntimes(b, a, true);
}

function explode(...args) {
  let vs = args[0].denseCloud().values;
  vs.sort((a, b) => ksort(a.k, b.k));
  let best = vs.shift();
  let C = new CloudBuilder();
  let n = args.length > 1 ? args[1].value : 2;

  for (let i = 0; i <= n; ++i) {
    let extra = new Array(i).fill(best.k[0]);
    let penalty = 1 / Math.pow(vs.length + 1, i);
    let ls = i == n ? [].concat(vs, best) : vs;
    for (let o of ls) {
      let ne = [].concat(extra, o.k);
      C.add(ne, o.w * penalty);
    }
  }
  return C.done();
}

/**
 * Merge two probability clouds weighed by condition.
 * @param  {Value} condition
 * @param  {Value} concequent
 * @param  {Value} alternate
 * @returns
 * @example <kbd>iif(d20+5&gt;12, d8+5, 0)</kbd>
 */
function iif(condition, concequent, alternate) {
  if (!condition || !concequent)
    throw new Error(`function iif requires a least two arguments`);
  let parts = condition.denseCloud();
  if (parts.values.length > 2)
    throw new Error(`Condition must only have two outcomes`);

  concequent = concequent || new NumberValue(0);
  alternate = alternate || new NumberValue(0);

  let cw = 0;
  let aw = 0;

  for (let o of parts.values) {
    if (parseInt(o.k) === 1) {
      cw = o.w;
    } else if (parseInt(o.k) === 0) {
      aw = o.w;
    } else
      throw new Error(
        `Condition cloud must only contain 1 and 0, found ${o.k}`
      );
  }

  if (aw === 0) return concequent;
  if (cw === 0) return alternate;

  let C = new CloudBuilder();
  for (let v of concequent.cloud().values) {
    C.add(v.k, v.w * cw * alternate.cloud().total, v.sources);
  }
  for (let v of alternate.cloud().values) {
    C.add(v.k, v.w * aw * concequent.cloud().total, v.sources);
  }

  return C.done();
}

/**
 * A probability cloud follow the normal distribution from 0 to `range`
 * with mean `range/2` and standard deviation `stddev`
 * @param  {Value} range
 * @param  {Value} stddev
 * @returns
 * @example
 * <kbd>output min(3d6)+normal(max(3d6)-min(3d6),3)
 * output 3d6</kbd>
 */
function normal(...args) {
  arity(this, 2);
  let len = args[0].number().value;
  let stddev = args[1].number().value;
  let nvarianceX2 = -2 * (stddev * stddev);
  let mean = len / 2;

  let C = new CloudBuilder();
  for (let i = 0; i <= len; ++i) {
    C.add([i], Math.exp(((i - mean) * (i - mean)) / nvarianceX2));
  }

  return C.done();
}

/**
 * Returns the field represneting the chance of getting a number of target values.
 * @param {Cloud} search
 * @param {number} target
 * @returns
 * @example <kbd>count(3d6,6)</kbd>
 */
function count(cloud, t) {
  let target = t.number().value;

  return cloud.cloud().transform((v) => {
    return new NumberValue(v.filter((x) => x == target).length).denseCloud();
  });
}

/**
 * Returns the field represneting the chance of containing a number.
 * @param {Cloud} search
 * @param {number} target
 * @returns
 * @example <kbd>contains(3d6,6)</kbd>
 */
function contains(cloud, t) {
  let target = t.number().value;

  return cloud.cloud().transform((v) => {
    return new NumberValue(v.indexOf(target) === -1 ? 0 : 1).denseCloud();
  });
}

/**
 *
 * @param {Cloud} cloud
 * @param  {...any} args
 * @returns
 * @example <kbd>bucket(2d20kh, 'fumble', 2, 'failure', 10, 'success', 20, 'critical')</kbd>
 */
function bucket(cloud, ...args) {
  if (args.length < 3)
    throw new Error(`bucket function expects at least 4 args`);
  if (args.length % 2 != 1)
    throw new Error(`bucket function expects an even number of arguments`);

  return cloud.denseCloud().transform((v) => {
    for (let i = 0; i < args.length - 1; i += 2) {
      let target = args[i + 1].number().value;
      if (v < target) return args[i];
    }
    return args[args.length - 1];
  });
}

function diez(cloud) {
  let e = cloud.cloud().values[0].sources;
  return new StringValue(e ? e.map((x) => x.debug()).join(",") : "?");
}

module.exports = {
  sum,
  normal,
  min,
  max,
  explode,
  set,
  bag,
  iif,
  repeat,
  normal,
  mean,
  count,
  contains,
  bucket,
  diez,
};
