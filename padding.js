// @ts-check

/**
 * Padding. Section 4.
 * @param {Buffer} x Buffer to be padded
 * @param {number} blockSize
 * @returns {Buffer}
 */
function pad(x) {
  const blockSize = 512;
  const blockBytes = blockSize / 8;
  const remainedBlockBytes = x.length % blockBytes;
  const L = remainedBlockBytes * 8;
  const expectedBytesB = blockBytes - 8;
  let bytesToAppendB = expectedBytesB - remainedBlockBytes;
  if (bytesToAppendB < 0) {
    bytesToAppendB += blockBytes;
  }
  console.log(bytesToAppendB);
  const bufferToConcat = Buffer.alloc(bytesToAppendB);
  bufferToConcat[0] = 0x80;

  const bitSizeEncoded = Buffer.alloc(8 /* = 64/8 */);
  //bitSizeEncoded[0] = (L >> 56) & 0xff;
  //bitSizeEncoded[1] = (L >> 48) & 0xff;
  //bitSizeEncoded[2] = (L >> 40) & 0xff;
  //bitSizeEncoded[3] = (L >> 32) & 0xff;
  bitSizeEncoded[4] = (L >> 24) & 0xff;
  bitSizeEncoded[5] = (L >> 16) & 0xff;
  bitSizeEncoded[6] = (L >> 8) & 0xff;
  bitSizeEncoded[7] = (L >> 0) & 0xff;

  const final = Buffer.concat([x, bufferToConcat, bitSizeEncoded]);
  return final;
}

module.exports = pad;
