export function groupByDecade(books) {
  if (!books.length) return {}

  const result = {}
  const years = books.map(b => b.publishYear)
  const min = Math.floor(Math.min(...years) / 10) * 10
  const max = Math.floor(Math.max(...years) / 10) * 10

  for (let y = max; y >= min; y -= 10) {
    const range = `${y}–${y + 9}`
    const inRange = books
      .filter(b => b.publishYear >= y && b.publishYear <= y + 9)
      .sort((a, b) => b.publishYear - a.publishYear)
    result[range] = inRange
  }

  const entries = Object.entries(result)
  const merged = {}
  let emptyStart = null

  for (let i = 0; i < entries.length; i++) {
    const [range, books] = entries[i]

    if (books.length === 0) {
      if (emptyStart === null) {
        emptyStart = range
      }
    } else {
      if (emptyStart) {
        const start = parseInt(emptyStart.split('–')[0])
        const end = parseInt(range.split('–')[0]) - 1
        if (start !== end) {
          merged[`${start}–${end}`] = []
        }
        emptyStart = null
      }
      merged[range] = books
    }
  }

  if (emptyStart) {
    const start = parseInt(emptyStart.split('–')[0])
    const end = parseInt(entries[entries.length - 1][0].split('–')[1])
    merged[`${start}–${end}`] = []
  }

  return merged
}
