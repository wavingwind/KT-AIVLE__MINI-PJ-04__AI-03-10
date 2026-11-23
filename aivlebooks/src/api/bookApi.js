// 신규 도서 등록 (POST)
async function createBook({ title, author, category, content }) {
  const now = new Date().toISOString();

  const newBook = {
    title,
    author,
    category,
    content,
    coverImageUrl: '',
    createdAt: now,
    updatedAt: now,
  };

  try {
    const res = await fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });

    const saved = await res.json();
    return saved;
  } catch (err) {
    console.error(err);
  }
};

export default createBook;