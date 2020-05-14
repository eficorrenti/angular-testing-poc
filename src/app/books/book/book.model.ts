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
}
