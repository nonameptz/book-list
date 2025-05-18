const API_BASE = 'https://63c10327716562671870f959.mockapi.io';


export async function fetchBooks() {
  const res = await fetch(`${API_BASE}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return await res.json();
}

export async function addBook(book) {
  const res = await fetch(`${API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to add book');
  return await res.json();
}
