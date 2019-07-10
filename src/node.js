/**
 * @author Henrik Fredriksson
 * @version 1.0.0
 */

/**
 * Node class for Trie data structure
 *
 * @class Node
 */
class Node {
  constructor (value) {
    this.value = value
    this.children = {}
    this._is_word = false
    // this.frequency = 0
  }

  /**
   * Return true if node is tailnode, false otherwise
   *
   * @returns
   * @memberof Node
   */
  isWord () {
    return this._is_word
  }

  /**
   * Set instance of node to be a tailnode
   */
  setWord () {
    this._is_word = true
  }
}

module.exports = Node
