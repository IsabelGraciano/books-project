import { ErrorHandler } from "@angular/core";
import { Book, Error } from "../types/types";
import axios from "axios";

export async function getBooks(): Promise<Book[] | Error> {
  return axios.get('http://127.0.0.1:4000/api/books')
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}
