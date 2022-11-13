#!/usr/bin/env node

let parse = require("./index");

let mode = "cloud";

let args = process.argv.slice(2);

while (args[0] && args[0].startsWith("--")) {
  let argument = args.shift().substr(2);
  switch (argument) {
    case "roll":
      mode = "roll";
      break;
    case "full":
      mode = "full";
      break;
    default:
      console.error(`Unknown argument: ${argument}`);
      process.exit(1);
  }
}

let exp = args.join(" ");
let ast;

try {
  ast = parse(exp);
} catch (e) {
  console.error(e.toString());
  process.exit(1);
}

if (mode == "roll") {
  let [line] = ast.roll();
  console.log(line);
  function str(n, d) {
    if (typeof n == "number") return String(n);
    if (n.depth <= d) return n.boiled || n.value;
    return n.str
      .map((v) => (typeof v == "number" ? str(n.parts[v], d) : v))
      .join("");
  }

  for (let i = 0; i < line.depth + 1; ++i) console.log(i, str(line, i));
  process.exit(1);
}

let dcs = ast.output();

for (let op of dcs) {
  let dc = mode == "full" ? op.cloud() : op.denseCloud();

  if (dc.sum) console.log(op.name + ":", "\t", "Avg: ", dc.sum / dc.total);
  else console.log(op.name + ":");

  let max = dc.values
    .map((v) => v.w / dc.total)
    .reduce((a, b) => (a > b ? a : b), 0);
  let scale = 30 / max;

  let vl = [].concat(dc.values);
  if (mode != "full") vl.sort((a, b) => parseFloat(a.k) - parseFloat(b.k));

  for (let v of vl) {
    let share = parseFloat(v.w) / dc.total;
    if (isNaN(share)) share = 0;

    console.log(
      [
        v.k,
        (share < 0.1 ? " " : "") + (100 * share).toFixed(2) + "%",
        //v.w,
        new Array(Math.floor(scale * share)).fill("*").join(""),
      ].join("\t")
    );
  }
  console.log();
}
