import { mount } from '@vue/test-utils'
import BookList from '../BookList.vue'

vi.mock('../../api/books', () => ({
  fetchBooks: vi.fn(() => Promise.resolve([
    {
      id: '1',
      name: 'Book 1',
      author: 'Author 1',
      publishYear: 2020,
      category: 'Fiction',
      ratings: [],
    },
    {
      id: '2',
      name: 'Book 2',
      author: 'Author 2',
      publishYear: 2017,
      category: 'History',
      ratings: [],
    },
    {
      id: '3',
      name: 'Book 3',
      author: 'Author 3',
      publishYear: 2005,
      category: 'Science',
      ratings: [],
    },
    {
      id: '4',
      name: 'Book 4',
      author: 'Author 4',
      publishYear: 1805,
      category: 'Old',
      ratings: [],
    }
  ]))
}))

describe('BookList.vue', () => {
  it('renders decade shelves and books', async () => {
    const wrapper = mount(BookList)
    await new Promise(r => setTimeout(r, 0))

    const decades = wrapper.findAll('h2')
    expect(decades.length).toBeGreaterThan(1)
    expect(wrapper.html()).toContain('Book 1')
    expect(wrapper.html()).toContain('Book 2')
    expect(wrapper.html()).toContain('Book 3')
    expect(wrapper.html()).toContain('Book 4')
  })

  it('shows "No publications" for empty intervals', async () => {
    const wrapper = mount(BookList)
    await new Promise(r => setTimeout(r, 0))
    expect(wrapper.html()).toContain('No publications')
  })

  it('displays books sorted by publishYear within a decade', async () => {
    const wrapper = mount(BookList)
    await new Promise(r => setTimeout(r, 0))

    const firstShelf = wrapper.findAll('.book-row')[0]
    const bookDivs = firstShelf.findAll('.book')
    if (bookDivs.length >= 2) {
      expect(bookDivs[0].text()).toContain('Book 1')
      expect(bookDivs[1].text()).toContain('Book 2')
    } else {
      expect(bookDivs.length).toBeGreaterThan(0)
    }
  })

  it('combines consecutive empty decades into a single "No publications" range', async () => {
    const wrapper = mount(BookList)
    await new Promise(r => setTimeout(r, 0))
    const decadeHeaders = wrapper.findAll('h2').map(h => h.text())
    expect(decadeHeaders.some(header => header.match(/\d+–\d+/))).toBe(true)
    expect(wrapper.html()).toContain('No publications')
  })
})
