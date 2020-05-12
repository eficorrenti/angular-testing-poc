import { Course } from './../model/course';
import { COURSES, findLessonsForCourse } from './../../../../server/db-data';
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

    const sub = coursesService.findCourseById(12).subscribe(course => {

      sub.unsubscribe();
      expect(course).toBeTruthy();
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

    const sub = coursesService.saveCourse(12, changes).subscribe(course => {

      sub.unsubscribe();
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

    const sub = coursesService.saveCourse(12, changes).subscribe(
      () =>  {
        sub.unsubscribe();
        fail('The save course opperation should have failed');
      },
      (error: HttpErrorResponse) => {
        sub.unsubscribe();
        expect(error.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    req.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'});

  });




  it('Should find a list of lessons', () => {

    const sub = coursesService.findLessons(12).subscribe(
      (lessons) =>  {
        sub.unsubscribe();
        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3);
      },
    );

    const req = httpTestingController.expectOne(row => row.url === '/api/lessons');

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3');

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    });

  });




  afterEach(() => {

    httpTestingController.verify();

  })

});




