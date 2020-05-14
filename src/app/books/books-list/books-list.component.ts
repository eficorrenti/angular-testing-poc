import { IBook, BookModel } from './../book/book.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: IBook[] = [];

  constructor() {
    this.books = BookModel.query();
  }

  ngOnInit() {
  }

}
