<template>
  <div class="bookshelf">
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="Object.keys(groupedBooks).length">
      <div v-for="(books, range) in groupedBooks" :key="range" class="shelf">
        <h2>{{ range }}</h2>
        <div class="book-row">
          <template v-if="books.length">
            <div
                v-for="book in books"
                :key="book.id"
                class="book"
                :style="{ backgroundColor: getRandomColor(book.name) }"
            >
              <div class="book-name">{{book.name}} — <b>{{book.author}}</b></div>
              <div class="book-year">{{ book.publishYear }}</div>
            </div>
          </template>
          <div v-else class="no-books">No publications</div>
        </div>
      </div>
    </div>
    <div v-else class="no-books">No publications found</div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import { fetchBooks } from '../api/books'
import { groupByDecade } from '../utils/helper'

const rawBooks = ref([])
const groupedBooks = ref({})
const loading = ref(true)
const error = ref(null)

function getRandomColor(seed) {
  if (!seed) return '#000000'
  const hash = Array.from(seed.toString()).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = hash % 360
  return `hsl(${hue}, 60%, 60%)`
}

async function loadBooks() {
  loading.value = true
  error.value = null
  try {
    const data = await fetchBooks()
    rawBooks.value = data
    groupedBooks.value = groupByDecade(data)
  } catch (err) {
    error.value = 'Failed to load books. Please try again later.'
    console.error('Error loading books:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadBooks)

defineExpose({
  loadBooks
})
</script>
<style scoped>
.bookshelf {
  padding: 20px;
}

.shelf {
  margin-bottom: 40px;
}

.shelf h2 {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

.book-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  border-top: 4px solid #6e4c1e;
  padding-top: 12px;
  overflow-x: auto;
}

.book {
  width: 30px;
  height: auto;
  min-height: 150px;
  border-radius: 2px;
  color: white;
  font-size: 16px;
  padding: 4px 2px;
  cursor: default;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.book-name {
  writing-mode: sideways-lr;
  margin: 0 auto;
}

.book-year {
  border-top: 1px solid #fff;
  padding-top: 5px;
  writing-mode: horizontal-tb;
  margin: 7px 0 0;
  text-align: center;
  font-size: 12px;
}

.no-books {
  font-style: italic;
  color: #999;
}
.error {
  color: #dc3545;
}

@media (max-width: 480px) {
  .bookshelf {
    padding: 10px;
  }

  .book {
    width: 140px;
    font-size: 75px;
  }

  .book-year {
    font-size: 50px;
  }

  .book-row {
    overflow-x: scroll;
    width: 100%;
  }

  .shelf h2 {
    font-size: 100px;
  }
}

</style>
