//@ts-check

// Section 3

/**
 * Bitwise OR on Buffer
 * @param {Buffer} a
 * @param {Buffer} b
 * @return {Buffer}
 */
function or(a, b) {
  const newBuffer = Buffer.alloc(Math.min(a.length, b.length));
  for (let i = 0; i < newBuffer.length; i++) {
    newBuffer[i] = a[i] | b[i];
  }
  return newBuffer;
}

/**
 * Bitwise AND on Buffer
 * @param {Buffer} a
 * @param {Buffer} b
 * @return {Buffer}
 */
function and(a, b) {
  const newBuffer = Buffer.alloc(Math.min(a.length, b.length));
  for (let i = 0; i < newBuffer.length; i++) {
    newBuffer[i] = a[i] & b[i];
  }
  return newBuffer;
}

/**
 * Bitwise XOR on Buffer
 * @param {Buffer} a
 * @param {Buffer} b
 * @return {Buffer}
 */
function xor(a, b) {
  const newBuffer = Buffer.alloc(Math.min(a.length, b.length));
  for (let i = 0; i < newBuffer.length; i++) {
    newBuffer[i] = a[i] ^ b[i];
  }
  return newBuffer;
}

/**
 * Bitwise NOT on Buffer
 * @param {Buffer} a
 * @return {Buffer}
 */
function not(a) {
  const newBuffer = Buffer.alloc(a.length);
  for (let i = 0; i < newBuffer.length; i++) {
    newBuffer[i] = ~a[i];
  }
  return newBuffer;
}

/**
 * X + Y. Section 3 b
 * @param {Buffer} a X
 * @param {Buffer} b Y
 * @return {Buffer}
 */
function add(a, b) {
  const newBuffer = Buffer.alloc(Math.min(a.length, b.length));
  let carry = 0;
  for (let i = 0; i < newBuffer.length; i++) {
    const sum = a[i] + b[i] + carry;
    if (sum > 0xff) {
      // for any case, if the sum overflows, the carry must be 1
      carry = 1;
    } else {
      carry = 0;
    }
    newBuffer[i] = sum & 0xff;
  }
  // discard carry
  return newBuffer;
}

/**
 * Right shift. Section 3 c
 * @param {Buffer} x
 * @param {number} n
 * @return {Buffer}
 */
function shr(x, n) {
  const newBuffer = Buffer.alloc(x.length);
  const driftBytes = Math.floor(n / 8);
  const driftBits = Math.floor(n % 8);
  const underflowMask = 2 ** driftBits - 1;
  let underflow = 0;
  for (let i = 0; i < newBuffer.length - driftBytes; i++) {
    const body = (x[i] >> driftBits) | (underflow << (8 - driftBits));
    underflow = x[i] & underflowMask;
    newBuffer[i + driftBytes] = body;
  }
  return newBuffer;
}

/**
 * Left shift.
 * @param {Buffer} x
 * @param {number} n
 * @return {Buffer}
 */
function shl(x, n) {
  return shr(x, -n);
}

/**
 * Rotate right. Section 3 d
 * @param {Buffer} x
 * @param {number} n
 * @return {Buffer}
 */
function rotr(x, n) {
  const w = x.length * 8;
  return or(shr(x, n), shl(x, w - n));
}

/**
 * Rotate left. Section 3 e
 * @param {Buffer} x
 * @param {number} n
 * @return {Buffer}
 */
function rotl(x, n) {
  const w = x.length * 8;
  return or(shl(x, n), shr(x, w - n));
}

module.exports = { and, or, xor, not, add, shr, shl, rotr, rotl };
