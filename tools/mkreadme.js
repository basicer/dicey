let {join} = require('path');
let fs = require('fs');
let about = fs.readFileSync(join(__dirname, '..', 'src', 'docs', 'about.md'), 'utf8');
let docs = fs.readFileSync(join(__dirname, '..', 'src', 'docs', 'docs.md'), 'utf8');

let out = `
# Dicey
[![dicey-math tests](https://github.com/basicer/dicey/actions/workflows/tests.yml/badge.svg)](https://github.com/basicer/dicey/actions/workflows/tests.yml)
[![Build and Deploy](https://github.com/basicer/dicey/actions/workflows/main.yml/badge.svg)](https://github.com/basicer/dicey/actions/workflows/main.yml)
[![MIT License][license-image]][license-url]

### [dicey.js.org](http://dicey.js.org)

${about}

${docs}


[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
`

fs.writeFileSync(join(__dirname, '..', 'README.md'), out, 'utf8');