/**
 * Sleep function
 *
 * @param {number} ms
 * @returns
 */
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export { sleep };
