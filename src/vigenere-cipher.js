const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const keyLength = key.length;
    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      if (this.isLetter(char)) {
        const charCode = ((char.toUpperCase().charCodeAt() - 65) +
          (key[keyIndex % keyLength].toUpperCase().charCodeAt() - 65)) % 26;
        encryptedMessage += String.fromCharCode(charCode + 65);
        keyIndex++;
      } else {
        encryptedMessage += char;
      }
    }

    return this.direct ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    const keyLength = key.length;
    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];
      if (this.isLetter(char)) {
        const charCode = ((char.toUpperCase().charCodeAt() - 65) -
          (key[keyIndex % keyLength].toUpperCase().charCodeAt() - 65) + 26) % 26;
        decryptedMessage += String.fromCharCode(charCode + 65);
        keyIndex++;
      } else {
        decryptedMessage += char;
      }
    }

    return this.direct ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }

  isLetter(char) {
    return char.toUpperCase() !== char.toLowerCase();
  }
}

module.exports = {
  VigenereCipheringMachine
};
