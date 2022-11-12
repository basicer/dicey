
let {
    Die,
    SetValue,
    Cloud,
    NumberValue,
    BinaryOperation,
    Call,
    StringValue,
    ksort,
} = require("./values");

let { Output, Block } = require("./statements");

function crunch(e) {
    if (typeof e == "number") return e;
    switch (e.type) {
        case "die":
            return e;
        case "set":
            return e;
        case "math":
            return e;
        case "string":
            return e;
        case "cross":
            return {
                type: "set",
                elements: new Array(roll(e.left)).fill(0).map((n) => e.right),
            };
        default:
            throw new Error(`Unknown type: ${e.type}`);
    }
}

function valueize(e) {
    if (typeof e == "number") return new NumberValue(e);
    switch (e.type) {
        case "block":
            return new Block(e.body.map(valueize));
        case "output":
            return new Output(valueize(e.expression), e.name, e.text);
        case "die":
            return new Die(
                valueize(e.sides),
                e.times ? valueize(e.times) : undefined
            );
        case "set":
            return new SetValue(
                e.elements.map((v) => valueize(v)),
                true
            );
        case "string":
            return new StringValue(e.value);
        case "math":
            return new BinaryOperation(
                valueize(e.left),
                [e.op, e.m],
                valueize(e.right)
            );
        case "ntimes":
            let left = valueize(e.left);
            let right = valueize(e.right);

            if (left.type == "number")
                return new SetValue(new Array(left.value).fill(0).map((n) => right));

            return new BinaryOperation(left, "ntimes", right);
        case "call":
            return new Call(
                e.name,
                e.args.map((o) => valueize(o))
            );
        default:
            console.log("??", e, typeof e);
            throw new Error(`Unknown type: ${e.type}`);
    }
}

function debug(e) {
    if (typeof e == "number") return e;
    if (typeof e == "undefined") return "?";

    switch (e.type) {
        case "output":
            return `output ${debug(e.expression)}\n`;
        case "block":
            return e.body.map(debug);
        case "die":
            return `${e.times == undefined ? "" : "(" + debug(e.times) + ")"}d${debug(
                e.sides
            )}`;
        case "set":
            return "{" + e.elements.map((v) => debug(v)).join(",") + "}";
        case "math":
            return `(${debug(e.left)} ${e.op} ${debug(e.right)})`;
        case "ntimes":
            return `(${debug(e.left)} x ${debug(e.right)})`;
        case "call":
            return `${e.name}(${e.args.map((a) => debug(a)).join(", ")})`;
        case "string":
            return JSON.stringify(e.value);
        default:
            throw new Error(`Unknown type: ${e.type}`);
    }
}

function keyComp(ao, bo) {
    //let ao = JSON.parse(a);
    //let bo = JSON.parse(b);

    if (typeof ao == "number" && typeof bo == "number") return ksort(bo, ao);

    for (let i = 0; i < bo.length; ++i) {
        if (bo[i] === undefined) return 1;
        if (ao[i] != bo[i]) return ksort(bo[i], ao[i]);
    }

    if (bo.length > ao.length) return -1;

    return 0;
}

module.exports = {
    debug,
    valueize,
    keyComp,
};
