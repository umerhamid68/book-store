import { getFeaturedBooks, getAuthorById,getBookById } from "../../../../lib/bookUtils";
import Layout from "../../../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
export default function AuthorDetails(props) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);
  return (
    <Layout>
      <h1>{props.author.name}</h1>
      <p>{props.author.biography}</p>
      <Link href={`/books/${props.bookId}`}>Back to Book</Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const books = await getFeaturedBooks();
  return { paths: books.map((book) => ({ params: { id: book.id } })), fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  
  // First, get the book to find its author
  const book = await getBookById(id);
  
  if (!book || !book.authorId) {
    return {
      notFound: true
    };
  }

  // Then, get the author details
  const author = await getAuthorById(book.authorId);
  
  return { 
    props: { 
      author, 
      bookId: id 
    } 
  };
}