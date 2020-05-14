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
  let book: BookModel;

  beforeEach(() => {

    const p = faker.commerce.price();
    console.log(p);

    image = faker.image.image();
    title = faker.lorem.words();
    description = faker.lorem.sentence();
    price = +p;
    upvotes = faker.random.number();

    book = new BookModel(image, title, description, price, upvotes);

    let  storage = {};
    spyOn(window.localStorage, 'getItem').and
      .callFake((key: string): string => storage[key] || null);

    spyOn(window.localStorage, 'removeItem').and
      .callFake((key: string): void => { delete storage[key]; });

    spyOn(window.localStorage, 'setItem').and
      .callFake((key: string, value: string): string => storage[key] = value);

    spyOn(window.localStorage, 'clear').and
      .callFake((): void => { storage = {}; });
  });


  it('Should have a valid model', () => {
    console.log(book);

    expect(book.image).toEqual(image);
    expect(book.title).toEqual(title);
    expect(book.description).toEqual(description);
    expect(book.price).toEqual(price);
    expect(book.upvotes).toEqual(upvotes);
  });

});
