import { rehydrate, keyComp } from "dicey.js";

console.log("Loading worker");

export async function compute({ collapse, parsed, mode, transpose }) {
  if (!parsed.v) return [];
  console.log(parsed.v);
  let o = rehydrate(parsed.v);
  let output = o.output().map((V) => {
    let c;
    try {
      if (collapse) c = V.denseCloud();
      else c = V.cloud();
    } catch (e) {
      console.log(e);
      throw e;
    }

    let entries = c.values.map((v) => ({
      name: collapse ? v.k[0] : "" + JSON.stringify(v.k),
      uv: (100 * v.w) / c.total,
    }));
    entries.sort((a, b) => keyComp(a.name, b.name));
    return {
      entries,
      name: (V && V.name) || "output",
      named: !!(V && V.named),
    };
  });

  if (transpose) {
    let transposed = {};
    for (let ds of output) {
      for (let p of ds.entries) {
        if (!transposed[p.name])
          transposed[p.name] = { name: p.name, entries: [], nameIsValue: true };
        transposed[p.name].entries.push({ name: ds.name, uv: p.uv });
      }
    }

    output = Object.values(transposed);
  }

  let entries = output.map(({ entries, ...rest }) => {
    let raw = entries;

    if (mode === "atmost") {
      let acc = 0;
      entries = entries.map((v) => {
        acc += v.uv;
        return { name: v.name, uv: acc };
      });
    }

    if (mode === "atleast") {
      let acc = 0;
      entries = entries
        .reverse()
        .map((v) => {
          acc += v.uv;
          return { name: v.name, uv: acc };
        })
        .reverse();
    }

    return { entries, raw, ...rest };
  });

  return entries;
}
