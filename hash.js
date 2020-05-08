// @ts-check

const { and, or, xor, not, add, shr, shl, rotr, rotl } = require("./ops");
const { ch, maj, bsig0, bsig1, ssig0, ssig1, K } = require("./functions");

/**
 * Creates a initial state. Section 6.1
 * @returns {Buffer[]}
 */
function createInitialState() {
  return [
    Buffer.from("6a09e667", "hex"),
    Buffer.from("bb67ae85", "hex"),
    Buffer.from("3c6ef372", "hex"),
    Buffer.from("a54ff53a", "hex"),
    Buffer.from("510e527f", "hex"),
    Buffer.from("9b05688c", "hex"),
    Buffer.from("1f83d9ab", "hex"),
    Buffer.from("5be0cd19", "hex"),
  ];
}

/**
 * Calculates the next state from given state and data. Section 6.2
 * @param {Buffer[]} state
 * @param {Buffer} next
 * @returns {Buffer[]}
 */
function nextState(state, data) {
  // a, b, c, d, e, f, g, h
  let [a, b, c, d, e, f, g, h] = state;
  const W = Array(64);
  for (let i = 0; i < 16; i++) {
    W[i] = data.slice(i * 4, (i + 1) * 4);
  }
  for (let i = 16; i < 64; i++) {
    W[i] = add(add(ssig1(W[i - 2]), W[i - 7]), add(ssig0([0, 0, 0, i - 15]), W[i - 16]));
  }
  for (let t = 0; t < 64; t++) {
    const T1 = add(add(add(h, bsig1(e)), add(ch(e, f, g), K[t])), W[t]);
    const T2 = add(bsig0(a), maj(a, b, c));
    h = g;
    g = f;
    f = e;
    e = add(d, T1);
    d = c;
    c = b;
    b = a;
    a = add(T1, T2);
  }
  return [a, b, c, d, e, f, g, h].map((item, idx) => add(item, state[idx]));
}

module.exports = { createInitialState, nextState };
