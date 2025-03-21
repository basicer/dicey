module.exports = `

{
  function math(l,o) {
     let v = l;
     for (let i = 0; i < o.length; i++) {
       v = {type: 'math', right: o[i][3], left: v};
       if (typeof(o[i][1]) == "string") v.op = o[i][1];
       else Object.assign(v, o[i][1]);
     }
     return v;
  }
    function implicitMath(l,o) { // For DropLowest et al., there may or may not be an operand so assume 1 by default.
     let v = l;
     for (let i = 0; i < o.length; i++) {
       v = {type: 'math', right: o[i][3] || 1, left: v};
       if (typeof(o[i][1]) == "string") v.op = o[i][1];
       else Object.assign(v, o[i][1]);
     }
     return v;
  }
}

start =
  b:Block WS { return b; } /
  e:Expression WS? { return {
    type: 'block',
    body: [{type: 'output', expression: e, name: text()}]
  }; }

Block = e:(WS Statement)+ { return {
  type: 'block',
  body: e.map(v => v[1]) }; }

Statement = OutputStatement

OutputStatement = 'output' WS e:OutputExpression { return {type: 'output', expression: e[0], text: e[1], name: e[2]}; }
OutputExpression = e:Expression n:Named? { return [e, text(), n] }

Named = WS 'named' WS '"' s:$([^"]+) '"' { return s }

WS = [ \\n\\t\\r]*
Expression = P1Bin / Value

Call = 
  n:$([a-z]+) WS '(' WS ')' { return {type: 'call', name:n, args:[]}; } /
  n:$([a-z]+) WS '(' WS e:Expression WS o:(',' WS Expression WS)* ')' {
    let a = [e];
    for ( let b of o ) a.push(b[2]);
    return {type: 'call', name:n, args:a}; 
  }

CompareTypes = $('cs'i / 'ms'i / 'xo' / 'ro'i / 'zu'i / 'r'i)
Op = $([<>]'='?/'=='/'!='/'=')
Compare =
  m:$(CompareTypes)? o:Op { return m ? {m: m, op: o} : {op: o}; } /
  m:CompareTypes { return {m: m, op: "="}; }


P1Bin = l:P2Bin o:(WS e:Compare WS r:P2Bin)* { return math(l,o) } / P2Bin
P2Bin = l:P3Bin o:(WS e:[+-] WS r:P3Bin)* { return math(l,o); } / P3Bin
P3Bin = l:P4Bin o:(WS e:[*/] WS r:P4Bin)* { return math(l,o) } / P4Bin
P4Bin = 
  l:Primary o:(WS e:(DropLow/DropHigh/KeepLow/KeepHigh/'@') WS r:Primary?)* { return implicitMath(l,o) } /
  Primary

DropLow = ('droplow'i / 'dl'i) { return 'dl'; } 
KeepLow = ('keeplow'i / 'kl'i) { return 'kl'; } 
DropHigh = ('drophigh'i / 'dh'i) { return 'dh'; } 
KeepHigh = ('keephigh'i / 'kh'i) { return 'kh'; } 

Primary = Value / '(' WS e:Expression WS ')' { return e }
Numbery = Number / '(' WS e:Expression WS ')' { return e }

Value =  Set / Cloud / Call / Number / String

Set = '{' WS f:Expression WS e:(WS ',' WS Expression WS)* '}' {
  let elements = [f];
  for (let i = 0; i < e.length; i++) {
    elements.push(e[i][3]);
  }
  return {type: 'set', elements: elements };
}


Cloud = 
	d:Die {
    //return { type: 'set', elements: [d] };
    return d;
  } /
  n:Numbery WS d:Die { 
    if (n === 1) return d;
    return { type: 'die', times: n, sides: d.sides }
  } /
  n:Numbery WS 'd'i WS d:Set {
    return { type: 'die', times: n, sides: d };
  } /
  'd'i WS d:Set {
    return { type: 'die', sides: d };
  }

Die =
  'd'i n:Numbery { return {type: 'die', sides: n}; } /
  'd%'i { return {type: 'die', sides: 100}; } /
  'dF'i { return {type: 'die', sides: { type: 'set', elements: [-1, 0, 1] } }; }
 

Number = d:$([-]?[0-9]+) { return parseInt(d); }

EscapeSequence = [\\\\] e:["'] { return e }
String = 
  '"' v:(EscapeSequence / $[^"] / $' ')* '"' { return { type: 'string', value:  v.join('')}} /
  "'" v:(EscapeSequence / $[^'] / $' ')* "'" { return { type: 'string', value:  v.join('')}}


`;
