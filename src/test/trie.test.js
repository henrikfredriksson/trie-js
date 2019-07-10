const Trie = require('../trie')

describe('Simple Trie tests', () => {
  beforeAll(() => {
    this.trie = new Trie()

    this.trie.addWords('foobar', 'foo', 'bar', 'baz', 'qux',
      'quux', 'quuz', 'corge', 'grault', 'garply',
      'waldo', 'fred', 'plugh', 'xyzzy', 'thud')
  })

  afterAll(() => {
    delete this.trie
  })

  test('Trie should contain 15 words ', () => {
    expect(this.trie.getAllWords().length).toBe(15)
  })

  test('Search query "qu" should give suggestions ["qux", "quux", "quuz"]', () => {
    expect(this.trie.suggestWord('qu')).toStrictEqual(['qux', 'quux', 'quuz'])
  })

  test('"foo" is a word ', () => {
    expect(this.trie.searchWord('foo')).toBeTruthy()
  })

  test('"foop" is not a word ', () => {
    expect(this.trie.searchWord('foop')).toBeFalsy()
  })

  test('Add a word, and search for it ', () => {
    expect(this.trie.addWords('foobaz').searchWord('foo')).toBeTruthy()
  })

  test('Adding a number should throw an error', () => {
    expect(() => this.trie.addWords(42)).toThrow(TypeError)
  })

  test('Adding a object should throw an error ', () => {
    expect(() => this.trie.searchWord({ word: 'Hello' })).toThrow(TypeError)
  })

  test('Query "foo" should give suggestions ["foo", "foobar", "foobaz"]', () => {
    expect(this.trie.suggestWord('Foo')).toStrictEqual(['foo', 'foobar', 'foobaz'])
  })

  test('Query with no matching words should throw Error', () => {
    expect(() => this.trie.suggestWord('foz')).toThrow(Error)
  })

  test('If prefix matching word, and has no children should return word only', () => {
    expect(this.trie.suggestWord('thud')).toStrictEqual(['thud'])
  })
})

describe('Trie benchmark tests', () => {
  test('Benchmark tests', () => {
    const fs = require('fs')
    const path = require('path')

    const filename = path.join(__dirname, 'dictionary.txt')
    const words = fs.readFileSync(filename, 'utf8').split('\n')

    const trie = new Trie()
    trie.addWords(words)

    expect(trie.searchWord('unpatched')).toBeTruthy()

    expect(trie.suggestWord('gloe')).toStrictEqual([
      'gloea',
      'gloeal',
      'gloeocapsa',
      'gloeocapsoid',
      'gloeosporium',
    ])

    expect(trie.addWords('Bumfuzzle').searchWord('BUMFUZZLE')).toBeTruthy()
  })
})
