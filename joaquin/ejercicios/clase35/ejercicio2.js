// 2 - Captura el DNI y NIE

// Formato DNI: 11223344-A (Guión opcional).
// Válidos: 12345678-A, 11223344A,
// No válidos: A11223344, 1234567K

// tests en https://regex101.com/r/CNoZ4P/2/tests

const DNIs = ["12345678-A", "11223344A", "A11223344", "1234567K"];

const DNIpattern = /^\d{8}-?[A-Z]$/;

DNIs.filter(text=>DNIpattern.test(text));

// Formato para el NIE: X-1223344-A (Guión opcional).
// El inicio puede ser X, Y o Z.
// Válidos: X-1234567-A, X1234567A, Z1234567M
// No válidos: X-1233456, 1234567

// https://regex101.com/r/wI1YvA/2/tests

const NIEs = ["X-1234567-A", "X1234567A", "Z1234567M", "X-1233456", "1234567"];

const NIEpattern = /^[XYZ]-?\d{7}-?[A-Z]$/;

NIEs.filter(text=>NIEpattern.test(text));