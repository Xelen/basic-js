const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const countMap = {};
  let count = 0;

  // Count characters in s1
  for (const char of s1) {
    if (countMap[char]) {
      countMap[char]++;
    } else {
      countMap[char] = 1;
    }
  }

  for (const char of s2) {
    if (countMap[char] && countMap[char] > 0) {
      countMap[char]--;
      count++;
    }
  }

  return count;
}

module.exports = {
  getCommonCharacterCount
};
