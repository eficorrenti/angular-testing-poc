import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;

  let el: DebugElement;


  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoursesModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesCardListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

  }));


  it('Should create the component', () => {

    expect(component).toBeTruthy();

  });


  it('Should display the course list', () => {

    component.courses = setupCourses();

    fixture.detectChanges();

    const carts = el.queryAll(By.css('.course-card'));

    expect(carts).toBeTruthy('Could not find carts');

    expect(carts.length).toBe(12, 'Unexpected number of courses');

  });


  it('Should display the first course', () => {

    component.courses = setupCourses();

    fixture.detectChanges();

    const course = component.courses[0];

    const card = el.query(By.css('.course-card:first-child'));
    const title = card.query(By.css('mat-card-title'));
    const image = card.query(By.css('img'));

    expect(card).toBeTruthy('Could notfind course card');

    expect(title.nativeElement.textContent).toBe(course.titles.description);

    expect(image.nativeElement.src).toBe(course.iconUrl);

  });


});


