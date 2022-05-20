import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService],
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should have empty messages array', () => {
    expect(loggerService.messages.length).toEqual(0);
  });

  it('should contain 1 message when log method is called one time', () => {
    loggerService.log('log');
    expect(loggerService.messages.length).toEqual(1);
  });

  it('should have no messages when clear method is called', () => {
    loggerService.log('log');
    loggerService.clear();
    expect(loggerService.messages.length).toEqual(0);
  });
});
