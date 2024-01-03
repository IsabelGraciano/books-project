import { ErrorHandler } from "@angular/core";
import { Book, Error } from "../types/types";
import axios from "axios";

export async function getBooks(): Promise<Book[] | Error> {
  try {
    const response = await axios.get('http://127.0.0.1:4000/api/books');
    return response.data.message;
  }
  catch(error) {
    return error as Error;
  }
}

export async function createBook(book: Book): Promise<void> {
  try {
    await axios.post('http://127.0.0.1:4000/api/book', book)
  } catch (error) {
    console.error(error)
  }
}

export async function updateBook(bookId: string, book: Book): Promise<void> {
  try {
    await axios.put(`http://127.0.0.1:4000/api/book/${bookId}`, book)
  } catch (error) {
    console.error(error)
  }
}

export async function deleteBook(bookId: string): Promise<void> {
  try {
    await axios.delete(`http://127.0.0.1:4000/api/book/${bookId}`)
  } catch (error) {
    console.error(error)
  }
}
