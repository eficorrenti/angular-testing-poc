import { delay } from 'rxjs/operators';
import { fakeAsync, tick, flush, flushMicrotasks } from '@angular/core/testing';
import { of } from 'rxjs';






describe('AsyncExamples', () => {


  it('Asynchonous test example - Jasmine done()', (done: DoneFn) => {

    let test = false;

    setTimeout(() => {

      // console.log('running assertions');

      test = true;

      expect(test).toBeTruthy();

      done();

    }, 1000);

  });



  it('Asynchonous test example - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      // console.log('running assertions');

      test = true;

    }, 1000);

    tick(500);

    tick(499);

    tick(1);

    expect(test).toBeTruthy();

  }));




  it('Asynchonous test example - setTimeout() (flush)', fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      // console.log('running assertions');

      test = true;

    }, 1000);

    flush(); // in one shot! :-)

    expect(test).toBeTruthy();

  }));




  it('Asynchonous test example - plain Promise', fakeAsync(() => {

    let test = false;

    // console.log('Creating BALAGAN!');

    Promise.resolve().then(() => {
      // console.log('Promise first then() evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      // console.log('Promise second then() evaluated successfully');
      test = true;
    });

    flushMicrotasks();

    // console.log('Running test assertions');

    expect(test).toBeTruthy();

  }));



  it('Asynchonous test example - Promise and setTimeout()', fakeAsync(() => {

    let counter = 0;

    // console.log('Starting BALAGAN!');

    Promise.resolve()
    .then(() => {
      counter += 10;

      setTimeout(() => {

        counter += 40;

      }, 1000);

    });

    // flush(); // To do it in one step (all together)

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500); // OR flush();

    // console.log(counter);

    expect(counter).toBe(50);


  }));


  it('Asynchonous test example - Observables', fakeAsync(() => {

    let test = false;

    // console.log('Creating Observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {

      test = true;

    });

    tick(1000);

    // console.log('Running test assertions');

    expect(test).toBe(true);

  }));

});



