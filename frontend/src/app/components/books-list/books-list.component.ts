import { Component, OnInit } from '@angular/core';
import { getBooks, createBook, updateBook, deleteBook } from '../../functions/fetch';
import { Book } from '../../types/types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})

export class BooksListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'read', 'actions'];
  books : Book[] = [];
  isAddModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  bookForm: FormGroup;
  currentBookId:string = '';

  async ngOnInit() {
    await this.loadBooks();
  }

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      read: [false, Validators.required],
    });
  }

  async loadBooks() {
    try {
      const response = await getBooks();
      if (Array.isArray(response)) {
        this.books = response;
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  openAddModal() {
    this.bookForm.reset({
      title: '',
      author: '',
      read: [false],
    });
    this.isAddModalOpen = true;
  }
  async onAddModalConfirm() {
    if (this.bookForm.valid) {
      const book = this.bookForm.value;
      const booleanReadValue = book.read === 'true';
      book.read = booleanReadValue;
      await createBook(book);
      await this.loadBooks();
      this.bookForm.reset();
      this.bookForm.reset({
        title: '',
        author: '',
        read: [false],
      });
      this.isAddModalOpen = false;
    } else {
      alert('Please fill in all the required fields.');
    }
  }

  onAddModalClose() {
    this.isAddModalOpen = false;
  }


  openDeleteModal(bookId: string) {
    this.currentBookId = bookId;
    this.isDeleteModalOpen = true;
  }
  async onDeleteModalConfirm() {
    await deleteBook(this.currentBookId);
    await this.loadBooks();
    this.isDeleteModalOpen = false;
    this.currentBookId = '';
  }
  onDeleteModalClose() {
    this.isDeleteModalOpen = false;
  }

  openUpdateModal(book: Book) {
    this.currentBookId = book.id;
    this.isUpdateModalOpen = true;

    this.bookForm.reset({
      title: book.title,
      author: book.author,
    });
    this.bookForm.get('read')?.setValue(book.read);
  }
  async onUpdateModalConfirm() {
    if (this.bookForm.valid) {
      const book = this.bookForm.value;
      const booleanReadValue = book.read === 'true';
      book.read = booleanReadValue;
      await updateBook(this.currentBookId, book);
      await this.loadBooks();
      this.currentBookId = '';
      this.isUpdateModalOpen = false;
    } else {
      alert('Please fill in all the required fields.');
    }
  }
  onUpdateModalClose() {
    this.isUpdateModalOpen = false;
  }
}
