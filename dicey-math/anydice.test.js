const parse = require("./index");
const fs = require("fs");
const path = require("path");

let cached = {};
let cachePath = path.join(__dirname, "anydice-cache.json");

if (fs.existsSync(cachePath)) {
  cached = JSON.parse(fs.readFileSync(cachePath, "utf8"));
}

async function query(query) {
  if (cached[query]) {
    return cached[query];
  }

  if (!process.env.UPDATE_CACHE) {
    throw new Error(
      `The anydice cache is out of date, run with UPDATE_CACHE=1 to update`
    );
  }

  let fetch = require("node-fetch");
  let req = await fetch("https://anydice.com/calculator_limited.php", {
    headers: {
      accept: "application/json, text/javascript, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
    },
    referrer: "https://anydice.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: new URLSearchParams([["program", query]]),
    method: "POST",
    mode: "cors",
  });

  let data = await req.json();
  data.query = query;
  cached[query] = data;
  fs.writeFileSync(cachePath, JSON.stringify(cached, null, "\t"), "utf8");

  return data;
}

function anytest(dice, anydice = null) {
  if (anydice === null) anydice = `output ${dice}`;

  test(dice, async () => {
    let adr = await query(anydice);
    expect(adr.error).toBeUndefined();

    let w = parse(dice);
    let or = w.output()[0].denseCloud();

    let d1 = adr.distributions.data[0].filter((x) => x[0] !== null);
    let d2 = or.values.map((v) => [v.k[0], (100 * v.w) / or.total]);
    d2.sort((a, b) => a[0] - b[0]);
    expect(d2.length).toBe(d1.length);

    for (let i = 0; i < d1.length; ++i) {
      expect(d2[i][0]).toBe(d1[i][0]);
      expect(d2[i][1]).toBeCloseTo(d1[i][1]);
    }
  });
}

anytest("3d6");
anytest("d0");
anytest("3d6+20");
anytest("100d6");
anytest("300d6");
anytest("500d6");

anytest("500/10/5");
anytest("2+2*2");
anytest("2*2+2");

anytest("4d6dl", "output [highest 3 of 4d6]");
anytest("4d6dl(d5-1)", "output [highest (d5-1) of 4d6]");

anytest("1d6 + 1d10");

anytest("d6 * d6");
anytest("4d6 * 2d6");

anytest("(3d20dl)dh", "output 2@3d20");

anytest("2d20kh", "output [highest 1 of 2d20]");
anytest("output 3d6kl2kh1", "output 2@3d6");
anytest("2@3d6");

anytest("(d3)d6");
anytest("(d6)d6");
anytest("(2d6)d4");

anytest("10d{-1,0,1}");
anytest("10dF", "output 10d{-1,0,1}");
anytest("10d{-1,0,1,5}");
anytest("(d6)d{1,1,2,3,5,6}");

anytest("d(d6)", "function: z F:n { result: dF } output [z d6]");
anytest("d(d6) + d(d6)", "function: z F:n { result: dF } output [z d6]+[z d6]");
anytest("6d(d6)", "function: z F:n { result: 6dF } output [z d6]");
anytest("(d6)d(d6)", "function: z F:n { result: (d6)dF } output [z d6]");
anytest(
  "((d6)d(d6)) kh 2",
  "function: z F:n { result: (d6)dF } output [highest 2 of [z d6]]"
);

anytest("8d6+1 >= 40");
anytest("8d6 >= 7");

anytest("explode(d6)", "output [explode d6]");
anytest("repeat(explode(d6,2), 3)", "output 3d[explode d6]");
//anytest("2d(explode(d6))", "2d[explode d6]")

anytest("contains(3d6, 6)", "output [3d6 contains 6]");
anytest("count(3d6, 6)", "output [count 6 in 3d6]");

anytest("{1d20,10}kh + 5", "output 5 + [highest of d20 and 10]");
