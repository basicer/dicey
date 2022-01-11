let {join} = require('path');
let fs = require('fs');
let fxs = fs.readFileSync(join(__dirname, '..', 'dicey-math', 'functions.js'), 'utf8');

let found = [];
for ( let [m,doc,name] of fxs.matchAll(/\/\*\*(.*?)\*\/\s+function ([a-z]+)/ismg) ) {
    let lines = doc.split(/\n/g);
    let desc = '';
    let examples = []; 
    let params = [];
    let last = '@desc';
    for ( let line of lines ) {
        let parts = line.split(/ +/);

        if ( parts[2] && parts[2][0] == '@' ) {
            last = parts[2];
            if (last === '@example') examples.push((parts.slice(3).join(' ') || '') + "\n")
            if (last === '@param') {
                if (parts[3].indexOf('...') != -1) params.push('...');
                else params.push(parts[4]);
            }
        } else {
            let rest = line.substr(3);
            if (last === '@desc') desc += rest + "\n";
            else if (last === '@example') examples[examples.length - 1] += rest + "\n";
        } 
    }
    found.push({name, desc, examples, params})
}

found.sort((a,b) => {
    if ( a.name > b.name ) return 1;
    if ( a.name < b.name ) return -1;
    return 0;
})

let out = '## Function Library\n\n';

out += found.map(({name, desc, examples, params}) => 
`### \`${name}(${params.join(', ')})\`
${desc}
${examples.map(e => `&gt; ${e.trim()}\n\n`).join('')}
`).join("\n")

fs.writeFileSync(join(__dirname, '..', 'src', 'docs', 'functions.md'), out, 'utf8');