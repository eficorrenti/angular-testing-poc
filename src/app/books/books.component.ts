import { BookModel, IBook } from './book/book.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  cart: Array<IBook> = [];

  book = new BookModel(
    'http://lorempixel.com/640/480/cats',
    'qui laboriosam adipisci',
    'Vitae ipsa doloribus eum.',
    478, 5554
  );


  constructor() { }

  ngOnInit() {
  }

  addToCart(book: IBook) {
    this.cart.push(book);
  }

}
