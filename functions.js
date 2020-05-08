// @ts-check

const { and, or, xor, not, add, shr, shl, rotr, rotl } = require("./ops");

// Section 5.1

function ch(x, y, z) {
  return xor(and(x, y), and(not(x), z));
}
function maj(x, y, z) {
  return xor(and(x, y), xor(and(y, z), and(x, z)));
}
function bsig0() {
  return xor(rotr(x, 2), xor(rotr(x, 13), rotr(x, 22)));
}
function bsig1() {
  return xor(rotr(x, 6), xor(rotr(x, 11), rotr(x, 25)));
}
function ssig0() {
  return xor(rotr(x, 7), xor(rotr(x, 18), shr(x, 3)));
}
function ssig1() {
  return xor(rotr(x, 17), xor(rotr(x, 19), shr(x, 10)));
}

const K = [
  Buffer.from("428a2f98", "hex"),
  Buffer.from("71374491", "hex"),
  Buffer.from("b5c0fbcf", "hex"),
  Buffer.from("e9b5dba5", "hex"),
  Buffer.from("3956c25b", "hex"),
  Buffer.from("59f111f1", "hex"),
  Buffer.from("923f82a4", "hex"),
  Buffer.from("ab1c5ed5", "hex"),
  Buffer.from("d807aa98", "hex"),
  Buffer.from("12835b01", "hex"),
  Buffer.from("243185be", "hex"),
  Buffer.from("550c7dc3", "hex"),
  Buffer.from("72be5d74", "hex"),
  Buffer.from("80deb1fe", "hex"),
  Buffer.from("9bdc06a7", "hex"),
  Buffer.from("c19bf174", "hex"),
  Buffer.from("e49b69c1", "hex"),
  Buffer.from("efbe4786", "hex"),
  Buffer.from("0fc19dc6", "hex"),
  Buffer.from("240ca1cc", "hex"),
  Buffer.from("2de92c6f", "hex"),
  Buffer.from("4a7484aa", "hex"),
  Buffer.from("5cb0a9dc", "hex"),
  Buffer.from("76f988da", "hex"),
  Buffer.from("983e5152", "hex"),
  Buffer.from("a831c66d", "hex"),
  Buffer.from("b00327c8", "hex"),
  Buffer.from("bf597fc7", "hex"),
  Buffer.from("c6e00bf3", "hex"),
  Buffer.from("d5a79147", "hex"),
  Buffer.from("06ca6351", "hex"),
  Buffer.from("14292967", "hex"),
  Buffer.from("27b70a85", "hex"),
  Buffer.from("2e1b2138", "hex"),
  Buffer.from("4d2c6dfc", "hex"),
  Buffer.from("53380d13", "hex"),
  Buffer.from("650a7354", "hex"),
  Buffer.from("766a0abb", "hex"),
  Buffer.from("81c2c92e", "hex"),
  Buffer.from("92722c85", "hex"),
  Buffer.from("a2bfe8a1", "hex"),
  Buffer.from("a81a664b", "hex"),
  Buffer.from("c24b8b70", "hex"),
  Buffer.from("c76c51a3", "hex"),
  Buffer.from("d192e819", "hex"),
  Buffer.from("d6990624", "hex"),
  Buffer.from("f40e3585", "hex"),
  Buffer.from("106aa070", "hex"),
  Buffer.from("19a4c116", "hex"),
  Buffer.from("1e376c08", "hex"),
  Buffer.from("2748774c", "hex"),
  Buffer.from("34b0bcb5", "hex"),
  Buffer.from("391c0cb3", "hex"),
  Buffer.from("4ed8aa4a", "hex"),
  Buffer.from("5b9cca4f", "hex"),
  Buffer.from("682e6ff3", "hex"),
  Buffer.from("748f82ee", "hex"),
  Buffer.from("78a5636f", "hex"),
  Buffer.from("84c87814", "hex"),
  Buffer.from("8cc70208", "hex"),
  Buffer.from("90befffa", "hex"),
  Buffer.from("a4506ceb", "hex"),
  Buffer.from("bef9a3f7", "hex"),
  Buffer.from("c67178f2", "hex"),
];

module.exports = { ch, maj, bsig0, bsig1, ssig0, ssig1, K };
