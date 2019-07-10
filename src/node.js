
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

  isWord () {
    return this._is_word
  }

  setWord () {
    this._is_word = true
  }
}

module.exports = Node
