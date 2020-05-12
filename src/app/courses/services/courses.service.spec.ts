import { COURSES } from './../../../../server/db-data';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';




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


});




