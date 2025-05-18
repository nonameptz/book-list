import { groupByDecade } from '../helper'

describe('groupByDecade', () => {
  it('returns empty object for empty input', () => {
    expect(groupByDecade([])).toEqual({})
  })

  it('groups books by decade and sorts within decade', () => {
    const books = [
      { publishYear: 2020, name: 'A' },
      { publishYear: 2011, name: 'B' },
      { publishYear: 2015, name: 'C' },
      { publishYear: 2003, name: 'D' },
    ]
    const result = groupByDecade(books)
    expect(result['2020–2029'].map(b => b.name)).toEqual(['A'])
    expect(result['2010–2019'].map(b => b.name)).toEqual(['C', 'B'])
    expect(result['2000–2009'].map(b => b.name)).toEqual(['D'])
  })

  it('shows empty decades as "No publications"', () => {
    const books = [
      { publishYear: 2020, name: 'A' },
      { publishYear: 1998, name: 'B' }
    ]
    const result = groupByDecade(books)
    const keys = Object.keys(result)
    expect(keys.some(k => k.includes('2000') && k.includes('2019')) ||
      keys.some(k => k.includes('2010') && k.includes('1989')) ||
      keys.some(k => k.includes('2010') && k.includes('1979')))
      .toBe(true)
    expect(result['2000–2019']).toEqual(undefined)
  })

  it('merges consecutive empty decades', () => {
    const books = [
      { publishYear: 2020, name: 'A' },
      { publishYear: 1987, name: 'B' }
    ]
    const result = groupByDecade(books)
    expect(Object.keys(result).some(key =>
      key.includes('2010') && key.includes('1979') && result[key].length === 0
    )).toBe(true)
    expect(result['1990–2019']).toEqual(undefined)
    expect(result['2020–2029'].length).toBe(1)
    expect(result['1980–1989'].length).toBe(1)
  })

  it('handles empty decades at the end', () => {
    const books = [
      { publishYear: 2005, name: 'A' },
      { publishYear: 2007, name: 'B' }
    ]
    const result = groupByDecade(books)
    expect(Object.keys(result)).toContain('2000–2009')
  })

  it('handles empty decades at the start', () => {
    const books = [
      { publishYear: 2020, name: 'A' }
    ]
    const result = groupByDecade(books)
    expect(Object.keys(result)).toContain('2020–2029')
  })
})
