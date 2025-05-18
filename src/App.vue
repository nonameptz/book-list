<template>
  <div>
    <h1>📚 Book List</h1>
    <button class="add-book" @click="showModal = true">Add a Book</button>
    <BookList ref="bookListRef" />
    <AddBookModal :visible="showModal" @close="showModal = false" @added="reloadBooks" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BookList from './components/BookList.vue'
import AddBookModal from './components/AddBookModal.vue'

const showModal = ref(false)
const bookListRef = ref(null)

function reloadBooks() {
  bookListRef.value?.loadBooks()
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
@media (max-width: 480px) {
  .add-book {
    font-size: 50px;
  }
}
</style>
