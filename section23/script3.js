const fs = require('fs');

fs.readFile('./hello.txt', (err, data) => {
    if (err) { console.log('errrrrroooooorrrr'); }
    console.log('async', data.toString());
});

const file = fs.readFileSync('./hello.txt');
console.log('sync', file.toString());

// fs.appendFile('./hello.txt', 'whattttts upppp???', err => {
//     if (err) { console.log(err); }
// });

fs.writeFile('bye.txt', 'hasta la vista', err => {
    if (err) { console.log(err); }
});

fs.unlink('./bye.txt', err => {
    if (err) {
        console.log(err);
    }
    console.log('inception');
});