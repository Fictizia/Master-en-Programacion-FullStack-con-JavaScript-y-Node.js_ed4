// Ejercicio 2
// Captura el DNI y NIE

// - Formato DNI: 11223344-A (Guión opcional).
// Válidos: 12345678-A, 11223344A,
// No válidos: A11223344, 1234567K

// - Formato para el NIE: X-1223344-A (Guión opcional).
// 		El inicio puede ser X, Y o Z.
// Válidos: X-1234567-A, X1234567A, Z1234567M
// No válidos: X-1233456, 1234567



const regexDNI = /^[0-9]{8}([-]?)[A-Z]{1}$/gim;

const testDNI = `
Validas:
11223344-A
12345678-A
11223344A
No validos
A11223344
1234567K`;

testDNI.match(regexDNI);


const regexNIE = /^[XYZ]{1}([-]?)[0-9]{7}([-]?)[A-Z]$/gim;

const testNIE = `
Validas:
X-1223344-A
X-1234567-A
X1234567A
Z1234567M
No validos
X-1233456
1234567`;

testNIE.match(regexNIE);