/*!
 * @author      Henrik Fredriksson
 * @email       henrikfredriksson2@gmail.com
 * @version     1.0
 */

const Node = require('./node')

// const Node = require('./Node')

class Trie {
  /**
   *Creates an instance of Trie.
  * @memberof Trie
  */
  constructor () {
    this.root = new Node('')
  }

  /**
   * Add word or words to instance of Trie structure
   *
   * @param {...String} word
   * @throws {TypeError}
   * @memberof Trie
   */
  addWords (word, ...words) {
    let _words = [word, words || ''].flat()

    _words.forEach(w => {
      if ((typeof w) !== 'string') {
        throw new TypeError()
      }
    })

    _words.forEach(word => {
      let current = this.root
      const letters = word.toLowerCase().split('')

      letters.forEach(char => {
        if (!current.children.hasOwnProperty(char)) {
          current.children[char] = new Node(char)
        }
        current = current.children[char]
      })

      current.setWord()
    })

    return this
  }

  /**
   * Get the last character node a word
   *
   * @param {*} word
   * @returns
   * @memberof Trie
   */
  getTailNode (word) {
    word = word.toLowerCase().split('')
    let current = this.root

    try {
      word.forEach(char => {
        if (!current.children.hasOwnProperty(char)) {
          throw new Error(`${word.join('')} not found`)
        }

        current = current.children[char]
      })

      return current
    } catch (e) {
      return false
    }
  }

  /**
   * Verfify if word is contained in instance of Trie structure
   *
   * @param {*} word
   * @returns
   * @memberof Trie
   */
  searchWord (word) {
    if (this.getTailNode(word)) return this.getTailNode(word).isWord()

    return false
  }

  /**
   * Get suggestions of words base in prefix
   *
   * @param {*} prefix
   * @returns
   * @memberof Trie
   */
  suggestWord (prefix) {
    this.suggestions = []

    prefix = prefix.toLowerCase()

    let current = this.root
    let keys = prefix.split('')

    while (keys.length > 0) {
      let currentKey = keys.shift()

      if (!current.children.hasOwnProperty(currentKey)) {
        throw new Error('Key error')
      }

      current = current.children[currentKey]
    }

    if (current.isWord()) {
      if (!current.children) return [prefix]

      this.suggestions.push(prefix)
    }

    Object.values(current.children).forEach(node => {
      this._suggestWord(prefix, node)
    })

    return this.suggestions
  }

  /**
   * Recursively find suggestions of children
   *
   * @param {*} prefix
   * @param {*} node
   * @memberof Trie
   */
  _suggestWord (prefix, node) {
    prefix = prefix + node.value

    if (node.isWord()) {
      this.suggestions.push(prefix)

      if (!node.children) return
    }

    Object.values(node.children).forEach(node => {
      this._suggestWord(prefix, node)
    })
  }

  /**
   * Get all words of the instance of the Trie structure
   *
   * @returns {String[]}
   * @memberof Trie
   */
  getAllWords () {
    let current = this.root

    this.words = []

    Object.values(current.children).forEach(node => {
      this._getAllWords('', node)
    })

    return this.words
  }

  /**
   * Recursively find all words in instance of the Trie structure
   *
   * @param {*} prefix
   * @param {*} node
   * @memberof Trie
   */
  _getAllWords (prefix, node) {
    prefix = prefix.concat(node.value)

    if (node.isWord()) this.words.push(prefix)

    if (!node.children) return

    Object.values(node.children).forEach(node => {
      this._getAllWords(prefix, node)
    })
  }
}

module.exports = Trie
