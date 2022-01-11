let { parser, valueize } = require("./index");

let exp = process.argv.slice(2).join(" ");
let ast;

try {
  ast = parser.parse(exp);
} catch ( e ) {
  console.log(e.toString());
  process.exit(1);
}

let dcs = valueize(ast).output();

for (let op of dcs) {
  let dc = op.denseCloud();

  if (dc.sum) console.log(op.name + ":", "\t", "Avg: ", dc.sum / dc.total);
  else console.log(op.name + ":");

  for (let v of dc.values) {
    let share = parseFloat(v.w) / dc.total;
    if (isNaN(share)) share = 0;

    console.log(
      [
        v.k,
        (100 * share).toFixed(2) + "%",
        v.w,
        new Array(Math.floor(50 * share)).fill("*").join(""),
      ].join("\t")
    );
  }
  console.log();
}
