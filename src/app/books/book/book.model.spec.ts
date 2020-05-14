import { BookModel } from './book.model';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookComponent } from './book.component';

import * as faker from 'faker';

describe('BookModel', () => {

  let image: string;
  let title: string;
  let description: string;
  let price: number;
  let upvotes: number;

  beforeEach(() => {

    const p = faker.commerce.price();
    console.log(p);

    image = faker.image.image();
    title = faker.lorem.words();
    description = faker.lorem.sentence();
    price = +p;
    upvotes = faker.random.number();

  });

  it('Should have a valid model', () => {
    const book = new BookModel(image, title, description, price, upvotes);
    console.log(book);

    expect(book.image).toEqual(image);
    expect(book.title).toEqual(title);
    expect(book.description).toEqual(description);
    expect(book.price).toEqual(price);
    expect(book.upvotes).toEqual(upvotes);
  });

});
