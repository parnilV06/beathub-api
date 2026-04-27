/**
 * Encode a value into a Base64 cursor string.
 * @param {string} value - The value to encode (typically a MongoDB ObjectId string).
 * @returns {string} Base64-encoded cursor.
 */
const encodeCursor = (value) => {
  return Buffer.from(value.toString(), "utf-8").toString("base64");
};

/**
 * Decode a Base64 cursor string back into its original value.
 * @param {string} cursor - The Base64-encoded cursor.
 * @returns {string} The decoded value.
 */
const decodeCursor = (cursor) => {
  return Buffer.from(cursor, "base64").toString("utf-8");
};

module.exports = { encodeCursor, decodeCursor };
