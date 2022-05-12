import { atom, selector } from "recoil";

import { parser } from "dicey.js";
import worker from "workerize-loader!./worker"; // eslint-disable-line import/no-webpack-loader-syntax

let workerInstance = worker();

export let reload = atom({ key: "reload", default: Math.random() });
export let query = atom({ key: "query", default: "output 3d6" });
export let parsed = selector({
  key: "parsed",
  get: ({ get }) => {
    let expression = get(query);
    try {
      let x = parser.parse(expression);
      return { ok: true, v: x };
    } catch (e) {
      return { ok: false, error: e };
    }
  },
});

export let showReload = atom({ key: "showReload", default: false });
export let waitingWorker = atom({ key: "waitingWorker", default: null });

export let collapse = atom({ key: "collapse", default: true });
export let mode = atom({ key: "mode", default: "normal" });
export let transpose = atom({ key: "transpose", default: false });

let working = false;

export let sample = atom({ key: "sample", default: [] });
export let fresh = atom({ key: "fresh", default: false });
export let sampleError = atom({ key: " sampleError", default: null });
export let activeSample = selector({
  key: "selector",
  get: async ({ get }) => {
    let p = get(parsed);
    let c = get(collapse);
    let m = get(mode);
    let t = get(transpose);
    if (!p.ok) return false;

    if (working) {
      workerInstance.terminate();
      workerInstance = worker();
    } else {
      working = true;
    }

    let result = await workerInstance.compute({
      parsed: p,
      collapse: c,
      mode: m,
      transpose: t,
    });
    working = false;
    return result;
  },
});

export let errors = selector({
  key: "error",
  get: ({ get }) => {
    let p = get(parsed);

    if (!p.ok) {
      let s = `${p.error.name}: `;
      if (p.error.location)
        s += ` ${p.error.location.start.line}:${p.error.location.start.column}`;
      s += ` ${p.error.message}`;
      return s;
    }

    let se = get(sampleError);
    if (se) return se;
    return false;
  },
});
