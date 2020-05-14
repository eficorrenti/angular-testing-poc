import { NumberValueAccessor } from '@angular/forms';

export interface IBook {
  image: string;
  title: string;
  description: string;
  price: number;
  upvotes: number;
}


export class BookModel implements IBook {
  constructor(
    public image: string,
    public title: string,
    public description: string,
    public price: number,
    public upvotes: number = 0,
  ) { }

  public static query() {
    const books: Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    const bookModels: BookModel[] = [];
    for (const book of books) {
      const newBook = new BookModel(
        book.image, book.title, book.description, book.price, book.upvotes
      );
      bookModels.push(newBook);
    }
    return bookModels;
  }

  public static find(title: string) {
    const books: Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    for (const book of books) {
      if (book.title === title) {
        return new BookModel(book.image,
          book.title, book.description,
          book.price, book.upvotes);
      }
    }
    return null;
  }


  getData(): object {
    const result = {};
    Object.keys(this).map(key => result[key] = this[key]);
    return result;
  }


  destroy() {
    const books: Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    books.forEach((item, index) => {
      if (item.title === this.title) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    return null;
  }


  save() {
    const books: Array<BookModel> = JSON.parse(localStorage.getItem('books') || '[]');
    books.forEach((item, index) => {
      if (item.title === this.title) {
        books.splice(index, 1);
      }
    });
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }


}
