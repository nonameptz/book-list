import { mount } from '@vue/test-utils'
import AddBookModal from '../AddBookModal.vue'

vi.mock('../../api/books', () => ({
  addBook: vi.fn(() => Promise.resolve({}))
}))

describe('AddBookModal.vue', () => {
  const visible = true
  const factory = (props = {}) =>
    mount(AddBookModal, {
      props: { visible, ...props }
    })

  it('renders modal when visible', () => {
    const wrapper = factory()
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('Add a Book')
  })

  it('hides modal when not visible', () => {
    const wrapper = factory({ visible: false })
    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  it('emits events after successful submit', async () => {
    const wrapper = factory()
    await wrapper.findAll('input')[0].setValue('Test Book')
    await wrapper.findAll('input')[1].setValue('Test Author')
    await wrapper.findAll('input')[2].setValue(2024)
    await wrapper.findAll('input')[3].setValue('Test Genre')

    await wrapper.find('form').trigger('submit.prevent')

    await new Promise(r => setTimeout(r))

    expect(wrapper.emitted().added).toBeTruthy()
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('emits close when Cancel is clicked', async () => {
    const wrapper = factory()
    await wrapper.find('button[type="button"], button:not([type="submit"])').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
