import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';


describe('CalculatorService', () => {

  it('should add two numbers', () => {

    const logger = new LoggerService();

    spyOn(logger, 'log');

    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 4);

    expect(result).toBe(6);

    expect(logger.log).toHaveBeenCalledTimes(1);

  });


  it('should subtract two numbers', () => {

    const logger = jasmine.createSpyObj('LoggerService', ['log']);

    const calculator = new CalculatorService(logger);

    const result = calculator.subtract(10, 2);

    expect(result).toBe(8, `Unexpected subtraction result!`);

    expect(logger.log).toHaveBeenCalledTimes(1);

  });


});
