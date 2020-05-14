import { BookModel } from './book.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as faker from 'faker';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let book: BookModel;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    book = new BookModel(
      faker.image.image(),
      faker.lorem.words(),
      faker.lorem.paragraph(),
      1234.55,
      0
    );
    component.book = book;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });


  it('should show all properties', () => {
    const image = nativeElement.querySelector('.book-image').getAttribute('src');
    const title = nativeElement.querySelector('.book-title').innerHTML;
    const price = nativeElement.querySelector('.book-price').innerHTML;
    const description = nativeElement.querySelector('.book-description').innerHTML;
    const upvotes = nativeElement.querySelector('.book-upvotes').innerHTML;
    expect(image).toEqual(book.image);
    expect(title).toEqual(book.title);
    expect(price).toEqual('$1,234.55');
    expect(description).toEqual(book.description);
    expect(upvotes).toEqual(`Upvotes: ${book.upvotes.toString()}`);
  });


  it('should set correct number of upvotes', () => {
    const votes = component.votesCounter();
    expect(component.votesCounter()).toEqual(votes);
    expect(component.votesCounter()).toBeGreaterThan(votes - 1);
    expect(component.votesCounter()).not.toEqual(votes + 1);
    expect(component.votesCounter()).toBeLessThan(votes + 1);
  });


  it('upvote invokes the component function', () => {
    const spy = spyOn(component, 'upvote');
    const button = nativeElement.querySelector('button.upvote');
    button.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });


});
