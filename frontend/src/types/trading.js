/**
 * @typedef {Object} Stock
 * @property {string} symbol
 * @property {string} name
 * @property {number} price
 * @property {number} change
 * @property {number} changePercent
 * @property {number} volume
 */

/**
 * @typedef {Object} Position
 * @property {string} symbol
 * @property {number} shares
 * @property {number} avgPrice
 * @property {number} currentPrice
 * @property {number} totalValue
 * @property {number} gainLoss
 * @property {number} gainLossPercent
 */

/**
 * @typedef {Object} Trade
 * @property {string} id
 * @property {string} symbol
 * @property {'buy' | 'sell'} type
 * @property {number} shares
 * @property {number} price
 * @property {number} total
 * @property {Date} timestamp
 */

/**
 * @typedef {Object} Portfolio
 * @property {number} cash
 * @property {number} totalValue
 * @property {Position[]} positions
 * @property {number} dayChange
 * @property {number} dayChangePercent
 */
