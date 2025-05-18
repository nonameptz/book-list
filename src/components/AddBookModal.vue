<template>
  <div v-if="visible" class="modal-overlay">
    <form class="modal-form" @submit.prevent="submit">
      <h2>Add a Book</h2>
      <label>Title:<input v-model="form.title" required /></label>
      <label>Author:<input v-model="form.author" required /></label>
      <label>Year:<input v-model.number="form.publishedYear" required type="number" /></label>
      <label>Genre:<input v-model="form.genre" required /></label>
      <label>Ratings:<input v-model="form.ratings" placeholder="optional" /></label>
      <div class="buttons">
        <button type="submit">Submit</button>
        <button @click.prevent="$emit('close')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { addBook } from '../api/books'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['close', 'added'])

const form = reactive({
  title: '',
  author: '',
  publishedYear: '',
  genre: '',
  ratings: '',
})

async function submit() {
  const book = {
    name: form.title,
    author: form.author,
    publishYear: form.publishedYear,
    category: form.genre,
    ratings: form.ratings
        ? form.ratings.split(',').map(r => ({ value: Number(r.trim()), source: 'Manual' }))
        : [],
  }

  try {
    await addBook(book)
    emit('added')
    emit('close')
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.modal-form {
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px 24px 24px;
  border-radius: 16px;
  min-width: 320px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  font-size: 18px;
}

h2 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 12px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 600;
  color: #222;
}

input {
  margin-top: 6px;
  padding: 16px;
  font-size: 18px;
  border: 1.5px solid #ccc;
  border-radius: 6px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

button {
  flex: 1;
  padding: 16px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: #555;
}

@media (max-width: 600px) {
  .modal-overlay {
    align-items: stretch;
    justify-content: stretch;
    background: white;
    padding: 0;
  }
  .modal-form {
    min-width: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    padding: 24px 10px 40px 10px;
    font-size: 17px;
  }
}
</style>
