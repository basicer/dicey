function int(v) {
    if (typeof(v) == "number" ) return parseFloat(v);
    return v.reduce(((a,b) => int(a)+int(b)), 0);
}

function set(v) {
    if (typeof (v) == "number") return [v];
    return v;
}

function str(v) {
    if (typeof (v) == "number") return v;
    if (Array.isArray(v)) return `{ ${v.map(v => str(v)).join(", ")} }`
    return v;
}

let defaultRandom = (a,b) => Math.floor((b-a+1) * Math.random() + 1);

function roll(node, random = defaultRandom) {

    
    if (typeof node == "number") {
        return {
            value: node,
            parts: [],
            str: [String(node)],
            depth: 1
        };
    }

    switch (node.type) {
        case 'block':
            return node.body.map((v) => roll(v, random))
        case 'output':
            return roll(node.expression, random);
        case 'math':
            return rollMath(node, random);
        case 'die':
            return rollDie(node, random);
        case 'set':
            return rollSet(node, random);
        

        default:
            console.log(node);
            throw new Error(`Unknown type: ${node.type}`)
    }
}


function rollMath(node, random) {
    let left = roll(node.left, random);
    let right = roll(node.right, random);
    let cost = 1;
    let value;
    let mode = 'add';
    switch (node.op) {
        case '+': value = int(left.value) + int(right.value); break;
        case '-': value = int(left.value) - int(right.value); break;
        case '*': value = int(left.value) * int(right.value); break;
        case '/': value = int(left.value) / int(right.value); break;
        case 'kl': 
            value = set(left.value).slice(0, int(right.value));;
            break;

        default: throw new Error(`Math Error: Unsupported operator ${node.op}`);
    }

    if ( node.left.op == node.op ) cost = 0;

    if ( Array.isArray(value) && value.length == 1) value = value[0];
    let depth = Math.max(left.depth, right.depth) + cost;
    switch (node.op) {
        case 'kl':
            left.depth = depth;
            break;
    }

    if ( right.type == 'math' ) {
        right.str.unshift("( ");
        right.str.push(" )");
        
    }

    return {
        depth: depth,
        value: value,
        boiled: str(value, mode),
        parts: [left, right],
        str: [0, " ", node.op, " ", 1],
        type: 'math'
    }
}

function rollSet(node, random) {
    console.log(node);
    let o = {
        value: [],
        str: ["{ "],
        parts: []
    };

    let i = 0;
    let depth = 1;
    for ( let e of node.elements ) {
        let r = roll(e);
        o.value.push(int(r.value));
        o.parts.push(r);
        if (o.str.length != 1) o.str.push(", ")
        o.str.push(i);
        depth = Math.max(depth, r.depth)
        ++i;
    }
    o.str.push(" }");
    o.boiled = str(o.value);
    o.depth = depth

    return o;
}


function rollDie(node, random) {
    console.log(node);
    let sides = roll(node.sides, random);
    let times = node.times ? roll(node.times, random).value : 1;

    console.log(sides, times);
    let rolls = [];

    for ( let i = 0; i < int(times); ++i ) {
        rolls.push(random(1, int(sides.value)));
    }

    let asSet = rollSet({
        type: 'set',
        elements: rolls
    }, random);
    asSet.parts.sort((a, b) => int(a.value) - int(b.value));

    return {
        value: rolls,
        boiled: int(rolls),
        parts: [asSet],
        str: ['d[', 0, ']'],
        type: 'die',
        depth: 1
    } 
}

module.exports = roll;