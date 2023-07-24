const path = require('node:path');

// -> unix /
// windows \
console.log(path.sep);//saber que tipo de / usa el S.O

//Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);
//Nombre fiechero
const base = path.basename('/tmp/nagib-secret-files/password.txt');
console.log(base);

const fileName = path.basename('/tmp/nagib-secret-files/password.txt', '.txt');
console.log(fileName);

const extension = path.extname('image.jpg');
console.log(extension);