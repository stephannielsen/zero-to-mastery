console.time('santas-node-helper');
const fs = require('fs');
let readable = fs.createReadStream('./input.txt', {
    encoding: 'utf8',
    fd: null,
});
let first = true;
readable.on('readable', () => {
    let chunk;
    let floor = 0;
    let position = 0;
    let firstBasement;
    while (null !== (chunk = readable.read(1))) {
        if (chunk === '(')
            floor++;
        else if (chunk === ')')
            floor--;
        position++;
        if (floor < 0 && !firstBasement) {
            firstBasement = position;
            console.log('entered basement at position ', firstBasement, floor);
        }
    }
    if (first)
        console.log('final floor: ', floor)
    first = false;
    console.timeEnd('santas-node-helper');
});