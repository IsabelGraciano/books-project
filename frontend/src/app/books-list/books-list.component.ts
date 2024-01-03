import { Component, OnInit } from '@angular/core';
import { getBooks } from '../functions/fetch';

export interface PeriodicElement {
  title: string;
  author: string;
  read: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 'Hydrogen', author: '1.0079', read: 'H'},
  {title: 'Helium', author: '4.0026', read: 'He'},
  {title: 'Lithium', author: '6.941', read: 'Li'},
  {title: 'Beryllium', author: '9.0122', read: 'Be'},
];

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})

export class BooksListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'read', 'actions'];
  dataSource = ELEMENT_DATA;

  async ngOnInit() {
    try {
      const response = await getBooks();
      console.log(response)
      // this.dataSource = response.data; // Assuming the data property holds the array of books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
}
