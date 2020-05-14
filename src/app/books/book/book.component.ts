import { IBook } from './book.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: IBook;

  constructor() { }

  ngOnInit() {
  }

  votesCounter() {
    return this.book.upvotes;
  }

  upvote() {
    return this.book.upvotes++;
  }

}
