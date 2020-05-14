import { IBook, BookModel } from './book.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: IBook;
  @Output() addToCart = new EventEmitter<IBook>();

  constructor() { }

  ngOnInit() {
  }

  sendToCart() {
    this.addToCart.emit(this.book);
  }

  votesCounter() {
    return this.book.upvotes;
  }

  upvote() {
    return this.book.upvotes++;
  }

}
