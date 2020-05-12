import { Course } from './../model/course';
import { COURSES } from './../../../../server/db-data';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';




describe('CoursesService', () => {

  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
      ]
    });

    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });


  it('Should retrieve all courses', () => {

    const sub = coursesService.findAllCourses().subscribe(courses => {

      sub.unsubscribe();

      expect(courses).toBeTruthy('No courses returned!');

      expect(courses.length).toBe(12, 'Incorrect number of courses');

      const couse = courses.find(row => row.id === 12);

      expect(couse.titles.description).toBe('Angular Testing Course');

    });

    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');

    req.flush({payload: Object.values(COURSES)});

  });




  it('Should find a course by id', () => {

    coursesService.findCourseById(12).subscribe(course => {

      expect(course).toBeTruthy();
      console.log(course);

      expect(course.id).toBe(12);

    });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('GET');

    req.flush(COURSES[12]);

  });






  it('Should save the course data', () => {

    const changes: Partial<Course> = {
      titles: { description: 'Testing Course' }
    };

    coursesService.saveCourse(12, changes).subscribe(course => {

      expect(course.id).toBe(12);

    });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');


    expect(req.request.body.titles.description).toEqual(changes.titles.description);

    req.flush({
      ...COURSES[12],
      ...changes
    });

  });




  it('Should give an error if save course fails', () => {

    const changes: Partial<Course> = {
      titles: { description: 'Testing Course' }
    };

    coursesService.saveCourse(12, changes).subscribe(
      () =>  fail('The save course opperation should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    req.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'});

  });




  afterEach(() => {

    httpTestingController.verify();

  })

});




