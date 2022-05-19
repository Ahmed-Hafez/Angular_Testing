import { CalculatorService } from './calculator.service';
describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let mockLoggerService: any;

  beforeEach(() => {
    console.log('initializing');
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log'])
    calculatorService = new CalculatorService(mockLoggerService);
  });
  it('should add two numbers', () => {
    console.log('calling');

    let n1 = 2, n2 = 3, expectedResult = n1 + n2;
    let actualResult = calculatorService.add(n1, n2);

    expect(actualResult).toBe(expectedResult);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('calling');
    let n1 = 2, n2 = 3, expectedResult = n1 - n2;
    let actualResult = calculatorService.subtract(n1, n2);

    expect(actualResult).toBe(expectedResult);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
});
