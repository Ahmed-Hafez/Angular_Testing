import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    console.log('initializing');
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: jasmine.createSpyObj('LoggerService', ['log']),
        },
      ],
    });
    calculatorService = TestBed.inject(CalculatorService);
    loggerServiceSpy = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>;
  });
  it('should add two numbers', () => {
    console.log('calling');

    let n1 = 2,
      n2 = 3,
      expectedResult = n1 + n2;
    let actualResult = calculatorService.add(n1, n2);

    expect(actualResult).toBe(expectedResult);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('calling');
    let n1 = 2,
      n2 = 3,
      expectedResult = n1 - n2;
    let actualResult = calculatorService.subtract(n1, n2);

    expect(actualResult).toBe(expectedResult);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});
