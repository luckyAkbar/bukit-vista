require("dotenv").config();

const crypto = require("crypto");
const logger = require("./logger");

const encryptionKey = Buffer.from(
  crypto
    .createHash("sha256")
    .update(String(process.env.ENCRYPTION_KEY))
    .digest("base64"),
  "base64"
);
const encryptionIV = process.env.ENCRYPTION_IV;
const encryptionAlgorithm = process.env.ALGORITHM;

const encrypt = (plain) => {
  try {
    const cipher = crypto.createCipheriv(
      encryptionAlgorithm,
      encryptionKey,
      Buffer.from(encryptionIV, "hex")
    );
    const cipherText = Buffer.concat([cipher.update(plain), cipher.final()]);
    return cipherText.toString("hex");
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

const decrypt = (cipherText) => {
  try {
    const decipher = crypto.createDecipheriv(
      encryptionAlgorithm,
      encryptionKey,
      Buffer.from(encryptionIV, "hex")
    );
    const plainText = Buffer.concat([
      decipher.update(Buffer.from(cipherText, "hex")),
      decipher.final(),
    ]);
    return plainText.toString();
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

console.log(encrypt("123456"));

module.exports = {
  encrypt,
  decrypt,
};
