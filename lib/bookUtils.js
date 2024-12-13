import dbPromise from './db';

export async function getBooks() {
  const db = await dbPromise;
  const booksCollection = await db.collection('books').find().toArray();
  //console.log("here1")
  //console.log(booksCollection);

  if (booksCollection.length > 0) {
    const books = booksCollection[0].books;
    console.log(books);
    return books;
  } else {
    return [];
  }
}

export async function getBookById(id) {
  const books = await getBooks();
  const book = books.find((book) => book.id === id);
  return book || null;
}

export async function getGenres() {
  const db = await dbPromise;
  const booksCollection = await db.collection('books').find().toArray();

  if (booksCollection.length > 0) {
    const genres = booksCollection[0].genres;
    return genres;
  } else {
    return [];
  }
}

export async function getAuthors() {
  const db = await dbPromise;
  const booksCollection = await db.collection('books').find().toArray();

  if (booksCollection.length > 0) {
    const authors = booksCollection[0].authors;
    return authors;
  } else {
    return [];
  }
}

export async function getAuthorById(id) {
  const authors = await getAuthors();
  //console.log(authors);
  const author = authors.find((author) => author.id === id);
  //console.log(author);
  return await author;
}

export async function getBooksByGenre(genreId) {
  const books = await getBooks();
  return books.filter((book) => book.genreId === genreId);
}

export async function getFeaturedBooks() {
  const books = await getBooks();
  return books.slice(0, 3);
}