import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookComponent } from './books/book/book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './courses/home/home.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './courses/course/course.component';
import { CourseResolver } from './courses/services/course.resolver';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/books-list/books-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: 'list',
        component: BooksListComponent,
      },
      {
        path: ':title',
        component: BookComponent,
      },
      {
        path: 'books/:title/edit',
        component: BookEditComponent,
      },
      {
        path: '**',
        redirectTo: 'list'
      },
    ]
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    resolve: {
      course: CourseResolver
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
